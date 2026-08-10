import { type ParsedMaterialCost } from "./parse-character-table";
import { createModuleTypeFromParts } from "../utils/module-type";

export type ParsedModuleLevelKey = "1" | "2" | "3";

export type ParsedModuleInfo = {
  moduleId: string;
  type: string;
  name: string;
  charEquipOrder: number;
};

export type ParsedModuleMaterials = Record<
  ParsedModuleLevelKey,
  ParsedMaterialCost[]
>;

export type ParsedCharacterModuleInfo = {
  moduleList: ParsedModuleInfo[];

  /**
   * key는 module type입니다.
   *
   * 예:
   * {
   *   "DRE-X": {
   *     "1": [...],
   *     "2": [...],
   *     "3": [...]
   *   }
   * }
   */
  moduleMaterials: Record<string, ParsedModuleMaterials>;
};

type UniequipItemCost = Record<string, unknown[] | null | undefined>;

type UniequipInfoForParser = {
  uniEquipId?: string;
  uniEquipName?: string;

  type?: string;
  typeName1?: string;
  typeName2?: string;

  charId?: string;
  tmplId?: string | null;
  charEquipOrder?: number;

  itemCost?: UniequipItemCost | unknown[] | null;
};

export type UniequipTableForParser = {
  equipDict?: Record<string, UniequipInfoForParser>;
};

const MODULE_LEVEL_KEYS = ["1", "2", "3"] as const;

const getUnknownRecord = (value: unknown): Record<string, unknown> => {
  if (typeof value === "object" && value !== null) {
    return value as Record<string, unknown>;
  }

  return {};
};

const getStringValue = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }

  return "";
};

const getNumberValue = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  return null;
};

const parseMaterialCost = (value: unknown): ParsedMaterialCost | null => {
  const record = getUnknownRecord(value);
  const itemId = getStringValue(record.id) || getStringValue(record.itemId);
  const count = getNumberValue(record.count);

  if (itemId === "" || count === null) {
    return null;
  }

  return {
    itemId,
    count,
  };
};

const parseMaterialCostList = (
  costList: unknown[] | null | undefined,
): ParsedMaterialCost[] => {
  if (!Array.isArray(costList)) {
    return [];
  }

  return costList
    .map(parseMaterialCost)
    .filter((cost): cost is ParsedMaterialCost => {
      return cost !== null;
    });
};

const createEmptyModuleMaterials = (): ParsedModuleMaterials => {
  return {
    "1": [],
    "2": [],
    "3": [],
  };
};

const createModuleType = (module: UniequipInfoForParser) => {
  return createModuleTypeFromParts(
    getStringValue(module.typeName1),
    getStringValue(module.typeName2),
    getStringValue(module.type),
  );
};

const isAdvancedModule = (module: UniequipInfoForParser) => {
  return getStringValue(module.type) !== "INITIAL";
};

/**
 * 모듈이 실제로 귀속되는 오퍼레이터 ID를 반환합니다.
 *
 * 아미야 특수 형태처럼 tmplId가 있는 모듈은 charId가 기본 형태를 가리키므로,
 * 이 경우 tmplId를 실제 owner id로 사용해야 합니다.
 */
const getModuleOwnerId = (module: UniequipInfoForParser) => {
  return getStringValue(module.tmplId) || getStringValue(module.charId);
};

const parseModuleMaterials = (
  itemCost: UniequipInfoForParser["itemCost"],
): ParsedModuleMaterials => {
  const moduleMaterials = createEmptyModuleMaterials();

  if (Array.isArray(itemCost)) {
    moduleMaterials["1"] = parseMaterialCostList(itemCost);
    return moduleMaterials;
  }

  const itemCostRecord = getUnknownRecord(itemCost);

  MODULE_LEVEL_KEYS.forEach((levelKey) => {
    const costList = itemCostRecord[levelKey];

    moduleMaterials[levelKey] = Array.isArray(costList)
      ? parseMaterialCostList(costList)
      : [];
  });

  return moduleMaterials;
};

const hasAnyMaterialCost = (moduleMaterials: ParsedModuleMaterials) => {
  return Object.values(moduleMaterials).some((costList) => {
    return costList.length > 0;
  });
};

const parseModuleInfo = (
  moduleId: string,
  module: UniequipInfoForParser,
): ParsedModuleInfo | null => {
  const type = createModuleType(module);

  if (type === "") {
    return null;
  }

  return {
    moduleId,
    type,
    name: getStringValue(module.uniEquipName) || moduleId,
    charEquipOrder: module.charEquipOrder ?? 999,
  };
};

const sortModuleInfoList = (moduleList: ParsedModuleInfo[]) => {
  return moduleList.sort((moduleA, moduleB) => {
    if (moduleA.charEquipOrder !== moduleB.charEquipOrder) {
      return moduleA.charEquipOrder - moduleB.charEquipOrder;
    }

    return moduleA.moduleId.localeCompare(moduleB.moduleId);
  });
};

export const parseCharacterModuleInfo = (
  charId: string,
  uniequipTable: UniequipTableForParser,
): ParsedCharacterModuleInfo => {
  const equipDict = uniequipTable.equipDict ?? {};
  const moduleList: ParsedModuleInfo[] = [];
  const moduleMaterials: Record<string, ParsedModuleMaterials> = {};

  Object.entries(equipDict)
    .filter(([, module]) => {
      return getModuleOwnerId(module) === charId && isAdvancedModule(module);
    })
    .forEach(([moduleId, module]) => {
      const moduleInfo = parseModuleInfo(moduleId, module);

      if (moduleInfo === null) {
        return;
      }

      moduleList.push(moduleInfo);

      const parsedModuleMaterials = parseModuleMaterials(module.itemCost);

      if (hasAnyMaterialCost(parsedModuleMaterials)) {
        moduleMaterials[moduleInfo.type] = parsedModuleMaterials;
      }
    });

  return {
    moduleList: sortModuleInfoList(moduleList),
    moduleMaterials,
  };
};

export const parseUniequipTable = (
  uniequipTable: UniequipTableForParser,
): Record<string, ParsedCharacterModuleInfo> => {
  const equipDict = uniequipTable.equipDict ?? {};
  const charIdSet = new Set<string>();

  Object.values(equipDict).forEach((module) => {
    const ownerId = getModuleOwnerId(module);

    if (ownerId !== "" && isAdvancedModule(module)) {
      charIdSet.add(ownerId);
    }
  });

  return Object.fromEntries(
    Array.from(charIdSet)
      .sort((charIdA, charIdB) => {
        return charIdA.localeCompare(charIdB);
      })
      .map((charId) => {
        return [charId, parseCharacterModuleInfo(charId, uniequipTable)];
      }),
  );
};
