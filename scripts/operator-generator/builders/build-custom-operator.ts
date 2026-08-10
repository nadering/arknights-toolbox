import { type CustomOperator } from "@/data/operator/manual/custom-operators";
import {
  parseCharacterModuleInfo,
  type ParsedModuleInfo,
  type UniequipTableForParser,
} from "../parsers/parse-uniequip-table";
import {
  convertModuleMaterialsByType,
  type ConvertedCommonSkillUpgradeMaterials,
  type ConvertedEliteMaterials,
  type ConvertedModuleMaterials,
  type ConvertedSkillMasteryMaterials,
  type MaterialConversionContext,
} from "../converters/convert-material-costs";
import {
  type BuiltModuleInfo,
  type BuiltOperator,
  type BuiltOperatorGrowthType,
  type BuiltOperatorServer,
  type BuiltSkillUpgradeMaterials,
} from "./build-operator";

type CustomModuleInfo = CustomOperator["moduleList"][number] & {
  charEquipOrder?: number;
  server?: BuiltOperatorServer;
};

type CustomOperatorWithOptionalFields = CustomOperator & {
  growthType?: BuiltOperatorGrowthType;
  preferModules?: BuiltOperator["preferModules"];
};

type BuildCustomOperatorParams = {
  customOperator: CustomOperator;
  uniequipTable: UniequipTableForParser;
  materialConversionContext: MaterialConversionContext;
};

type BuildCustomOperatorListParams = {
  customOperatorList: CustomOperator[];
  uniequipTable: UniequipTableForParser;
  materialConversionContext: MaterialConversionContext;
};

const SKILL_LEVEL_KEYS = ["2", "3", "4", "5", "6", "7"] as const;
const SKILL_MASTERY_LEVEL_KEYS = ["8", "9", "10"] as const;
const MODULE_LEVEL_KEYS = ["1", "2", "3"] as const;

const createEmptyCommonSkillUpgradeMaterials =
  (): ConvertedCommonSkillUpgradeMaterials => {
    return {
      "2": [],
      "3": [],
      "4": [],
      "5": [],
      "6": [],
      "7": [],
    };
  };

const createEmptySkillMasteryMaterials = (): ConvertedSkillMasteryMaterials => {
  return {
    "8": [],
    "9": [],
    "10": [],
  };
};

const createEmptyModuleMaterials = (): ConvertedModuleMaterials => {
  return {
    "1": [],
    "2": [],
    "3": [],
  };
};

const normalizeCommonSkillUpgradeMaterials = (
  commonSkillUpgradeMaterials: CustomOperator["skillUpgradeMaterials"]["common"],
): ConvertedCommonSkillUpgradeMaterials => {
  const normalizedMaterials = createEmptyCommonSkillUpgradeMaterials();

  SKILL_LEVEL_KEYS.forEach((levelKey) => {
    normalizedMaterials[levelKey] = commonSkillUpgradeMaterials[levelKey] ?? [];
  });

  return normalizedMaterials;
};

const normalizeSkillMasteryMaterials = (
  skillMasteryMaterials: Record<string, ConvertedSkillMasteryMaterials["8"]>,
): ConvertedSkillMasteryMaterials => {
  const normalizedMaterials = createEmptySkillMasteryMaterials();

  SKILL_MASTERY_LEVEL_KEYS.forEach((levelKey) => {
    normalizedMaterials[levelKey] = skillMasteryMaterials[levelKey] ?? [];
  });

  return normalizedMaterials;
};

const normalizeSkillUpgradeMaterials = (
  skillUpgradeMaterials: CustomOperator["skillUpgradeMaterials"],
): BuiltSkillUpgradeMaterials => {
  const normalizedMaterials: BuiltSkillUpgradeMaterials = {
    common: normalizeCommonSkillUpgradeMaterials(skillUpgradeMaterials.common),
  };

  Object.entries(skillUpgradeMaterials)
    .filter(([skillName]) => {
      return skillName !== "common";
    })
    .forEach(([skillName, skillMasteryMaterials]) => {
      normalizedMaterials[skillName] = normalizeSkillMasteryMaterials(
        skillMasteryMaterials,
      );
    });

  return normalizedMaterials;
};

const normalizeEliteMaterials = (
  eliteMaterials: CustomOperator["eliteMaterials"],
): ConvertedEliteMaterials => {
  return {
    "0": eliteMaterials["0"],
    "1": eliteMaterials["1"],
    "2": eliteMaterials["2"],
  };
};

const normalizeCustomModuleMaterials = (
  moduleMaterials: Record<"1" | "2" | "3", ConvertedModuleMaterials["1"]>,
): ConvertedModuleMaterials => {
  const normalizedMaterials = createEmptyModuleMaterials();

  MODULE_LEVEL_KEYS.forEach((levelKey) => {
    normalizedMaterials[levelKey] = moduleMaterials[levelKey] ?? [];
  });

  return normalizedMaterials;
};

const normalizeCustomModuleMaterialsByType = (
  moduleMaterials: CustomOperator["moduleMaterials"],
): Record<string, ConvertedModuleMaterials> | null => {
  if (moduleMaterials === null) {
    return null;
  }

  return Object.fromEntries(
    Object.entries(moduleMaterials).map(([moduleType, materials]) => {
      return [moduleType, normalizeCustomModuleMaterials(materials)];
    }),
  );
};

const createModuleMaterials = (
  moduleMaterials: Record<string, ConvertedModuleMaterials>,
) => {
  if (Object.keys(moduleMaterials).length === 0) {
    return null;
  }

  return moduleMaterials;
};

const createBuiltModuleListFromParsed = (
  moduleList: ParsedModuleInfo[],
  server: BuiltOperatorServer,
): BuiltModuleInfo[] => {
  return moduleList.map((module) => {
    return {
      type: module.type,
      name: module.name,
      charEquipOrder: module.charEquipOrder,
      server,
    };
  });
};

const createBuiltModuleListFromCustom = (
  moduleList: CustomOperator["moduleList"],
  server: BuiltOperatorServer,
): BuiltModuleInfo[] => {
  return moduleList.map((module, index) => {
    const customModule = module as CustomModuleInfo;

    return {
      type: customModule.type,
      name: customModule.name,
      charEquipOrder: customModule.charEquipOrder ?? index + 1,
      server: customModule.server ?? server,
    };
  });
};

const getCustomOperatorGrowthType = (
  customOperator: CustomOperator,
): BuiltOperatorGrowthType => {
  const growthType = (customOperator as CustomOperatorWithOptionalFields)
    .growthType;

  if (growthType === "roguelike") {
    return "roguelike";
  }

  return "normal";
};

const getCustomPreferModules = (
  customOperator: CustomOperator,
): BuiltOperator["preferModules"] => {
  const preferModules = (customOperator as CustomOperatorWithOptionalFields)
    .preferModules;

  if (preferModules === undefined || preferModules.length === 0) {
    return undefined;
  }

  return preferModules;
};

export const buildCustomOperator = ({
  customOperator,
  uniequipTable,
  materialConversionContext,
}: BuildCustomOperatorParams): BuiltOperator => {
  const parsedModuleInfo = parseCharacterModuleInfo(
    customOperator.id,
    uniequipTable,
  );

  const convertedParsedModuleMaterials = convertModuleMaterialsByType(
    materialConversionContext,
    parsedModuleInfo.moduleMaterials,
  );

  const hasParsedModule = parsedModuleInfo.moduleList.length > 0;

  const moduleList = hasParsedModule
    ? createBuiltModuleListFromParsed(
        parsedModuleInfo.moduleList,
        customOperator.server,
      )
    : createBuiltModuleListFromCustom(
        customOperator.moduleList,
        customOperator.server,
      );

  const moduleMaterials = hasParsedModule
    ? createModuleMaterials(convertedParsedModuleMaterials)
    : normalizeCustomModuleMaterialsByType(customOperator.moduleMaterials);

  const preferModules = getCustomPreferModules(customOperator);

  return {
    id: customOperator.id,
    legacyId: customOperator.legacyId,

    name: customOperator.name,
    ...(customOperator.nicknameList !== undefined &&
    customOperator.nicknameList.length > 0
      ? { nicknameList: customOperator.nicknameList }
      : {}),

    imageFilename: customOperator.imageFilename,

    class: customOperator.class,
    rarity: customOperator.rarity,

    growthType: getCustomOperatorGrowthType(customOperator),

    eliteMaterials: normalizeEliteMaterials(customOperator.eliteMaterials),

    skillList: customOperator.skillList,
    ...(customOperator.preferSkillIndexes !== undefined
      ? { preferSkillIndexes: customOperator.preferSkillIndexes }
      : {}),
    skillUpgradeMaterials: normalizeSkillUpgradeMaterials(
      customOperator.skillUpgradeMaterials,
    ),

    moduleList,
    ...(preferModules !== undefined ? { preferModules } : {}),
    moduleMaterials,

    server: customOperator.server,
  };
};

export const buildCustomOperatorList = ({
  customOperatorList,
  uniequipTable,
  materialConversionContext,
}: BuildCustomOperatorListParams): BuiltOperator[] => {
  return customOperatorList
    .map((customOperator) => {
      return buildCustomOperator({
        customOperator,
        uniequipTable,
        materialConversionContext,
      });
    })
    .sort((operatorA, operatorB) => {
      return operatorA.id.localeCompare(operatorB.id);
    });
};
