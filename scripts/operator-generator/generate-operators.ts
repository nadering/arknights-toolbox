import fs from "node:fs";
import path from "node:path";
import {
  type OperatorOverride,
  operatorOverrideList,
} from "@/data/operator/manual/operator-override";
import { customOperatorList } from "@/data/operator/manual/custom-operators";
import { type CountableMaterial } from "@/data/material";
import { buildCustomOperatorList } from "./builders/build-custom-operator";
import {
  buildOperatorList,
  type BuiltModuleInfo,
  type BuiltOperator,
  type BuiltSkillUpgradeMaterials,
  type OperatorBuildWarning,
} from "./builders/build-operator";
import {
  assertNoMaterialConversionWarnings,
  convertModuleMaterialsByType,
  createMaterialConversionContext,
  type ConvertedCommonSkillUpgradeMaterials,
  type ConvertedEliteMaterials,
  type ConvertedModuleMaterials,
  type ConvertedSkillMasteryMaterials,
  type MaterialConversionContext,
} from "./converters/convert-material-costs";
import {
  loadCnGamedataPath,
  loadGamedataPath,
} from "./loaders/load-gamedata-path";
import { createFilteredOperatorRecord } from "./parsers/filter-normal-operators";
import {
  type CharacterForParser,
  type CharacterTableForParser,
} from "./parsers/parse-character-table";
import {
  parseSkillTable,
  type SkillTableForParser,
} from "./parsers/parse-skill-table";
import {
  parseCharacterModuleInfo,
  type ParsedModuleInfo,
  type UniequipTableForParser,
} from "./parsers/parse-uniequip-table";

const GLOBAL_CHARACTER_TABLE_PATH = "kr/gamedata/excel/character_table.json";
const GLOBAL_SKILL_TABLE_PATH = "kr/gamedata/excel/skill_table.json";
const GLOBAL_UNIEQUIP_TABLE_PATH = "kr/gamedata/excel/uniequip_table.json";

const CN_CHARACTER_TABLE_PATH = "zh_CN/gamedata/excel/character_table.json";
const CN_SKILL_TABLE_PATH = "zh_CN/gamedata/excel/skill_table.json";
const CN_UNIEQUIP_TABLE_PATH = "zh_CN/gamedata/excel/uniequip_table.json";

const OPERATOR_DRAFT_OUTPUT_PATH =
  "src/data/operator/generated/operators.draft.generated.ts";

const OPERATOR_GENERATION_REPORT_OUTPUT_PATH =
  "src/data/operator/generated/operator-generation-report.md";

type DuplicateOperatorOverrideInfo = {
  charId: string;
  count: number;
};

type FutureModuleAddedInfo = {
  operatorId: string;
  operatorName: string;
  moduleType: string;
  moduleName: string;
};

type ExcludedOperatorInfo = {
  charId: string;
  name: string;
  profession: string;
  rarity: string;
  reasons: string[];
};

type GenerateOperatorResult = {
  operatorList: BuiltOperator[];

  generatedGlobalOperatorCount: number;
  generatedFutureOperatorCount: number;
  customOperatorCount: number;
  futureModuleAddedList: FutureModuleAddedInfo[];

  filteredGlobalOperatorCount: number;
  filteredCnOperatorCount: number;

  excludedGlobalOperatorList: ExcludedOperatorInfo[];
  excludedCnOperatorList: ExcludedOperatorInfo[];

  buildWarningList: OperatorBuildWarning[];
  materialConversionContext: MaterialConversionContext;
  duplicateOperatorOverrideList: DuplicateOperatorOverrideInfo[];
};

type FutureModuleMergeResult = {
  operator: BuiltOperator;
  addedModuleList: FutureModuleAddedInfo[];
};

const readLatestJsonFile = <TValue>(
  repositoryPath: string,
  filePath: string,
) => {
  const rawJson = fs.readFileSync(path.join(repositoryPath, filePath), "utf-8");

  return JSON.parse(rawJson) as TValue;
};

const writeFile = (outputPath: string, content: string) => {
  const resolvedOutputPath = path.resolve(process.cwd(), outputPath);

  fs.mkdirSync(path.dirname(resolvedOutputPath), {
    recursive: true,
  });

  fs.writeFileSync(resolvedOutputPath, content, "utf-8");
};

const getIndent = (level: number) => {
  return "  ".repeat(level);
};

const toStringLiteral = (value: string) => {
  return JSON.stringify(value);
};

const formatStringArray = (valueList: string[], level: number) => {
  if (valueList.length === 0) {
    return "[]";
  }

  const lines = valueList.map((value) => {
    return `${getIndent(level + 1)}${toStringLiteral(value)}`;
  });

  return `[\n${lines.join(",\n")},\n${getIndent(level)}]`;
};

const formatSkillIndexArray = (
  valueList: NonNullable<OperatorOverride["preferSkillIndexes"]>,
  level: number,
) => {
  if (valueList.length === 0) {
    return "[]";
  }

  const lines = valueList.map((value) => {
    return `${getIndent(level + 1)}${value}`;
  });

  return `[\n${lines.join(",\n")},\n${getIndent(level)}]`;
};

const formatCountableMaterial = (
  countableMaterial: CountableMaterial,
  level: number,
  usedMaterialObjectNameSet: Set<string>,
) => {
  usedMaterialObjectNameSet.add(countableMaterial.material.objectName);

  return [
    `${getIndent(level)}{`,
    `${getIndent(level + 1)}material: ${countableMaterial.material.objectName},`,
    `${getIndent(level + 1)}count: ${countableMaterial.count},`,
    `${getIndent(level)}},`,
  ].join("\n");
};

const formatCountableMaterialList = (
  countableMaterialList: CountableMaterial[],
  level: number,
  usedMaterialObjectNameSet: Set<string>,
) => {
  if (countableMaterialList.length === 0) {
    return "[]";
  }

  const lines = countableMaterialList.map((countableMaterial) => {
    return formatCountableMaterial(
      countableMaterial,
      level + 1,
      usedMaterialObjectNameSet,
    );
  });

  return `[\n${lines.join("\n")}\n${getIndent(level)}]`;
};

const formatEliteMaterials = (
  eliteMaterials: ConvertedEliteMaterials,
  level: number,
  usedMaterialObjectNameSet: Set<string>,
) => {
  return [
    "{",
    `${getIndent(level + 1)}"0": ${formatCountableMaterialList(
      eliteMaterials["0"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level + 1)}"1": ${formatCountableMaterialList(
      eliteMaterials["1"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level + 1)}"2": ${formatCountableMaterialList(
      eliteMaterials["2"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level)}}`,
  ].join("\n");
};

const formatCommonSkillUpgradeMaterials = (
  commonSkillUpgradeMaterials: ConvertedCommonSkillUpgradeMaterials,
  level: number,
  usedMaterialObjectNameSet: Set<string>,
) => {
  return [
    "{",
    `${getIndent(level + 1)}"2": ${formatCountableMaterialList(
      commonSkillUpgradeMaterials["2"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level + 1)}"3": ${formatCountableMaterialList(
      commonSkillUpgradeMaterials["3"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level + 1)}"4": ${formatCountableMaterialList(
      commonSkillUpgradeMaterials["4"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level + 1)}"5": ${formatCountableMaterialList(
      commonSkillUpgradeMaterials["5"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level + 1)}"6": ${formatCountableMaterialList(
      commonSkillUpgradeMaterials["6"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level + 1)}"7": ${formatCountableMaterialList(
      commonSkillUpgradeMaterials["7"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level)}}`,
  ].join("\n");
};

const formatSkillMasteryMaterials = (
  skillMasteryMaterials: ConvertedSkillMasteryMaterials,
  level: number,
  usedMaterialObjectNameSet: Set<string>,
) => {
  return [
    "{",
    `${getIndent(level + 1)}"8": ${formatCountableMaterialList(
      skillMasteryMaterials["8"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level + 1)}"9": ${formatCountableMaterialList(
      skillMasteryMaterials["9"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level + 1)}"10": ${formatCountableMaterialList(
      skillMasteryMaterials["10"],
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
    `${getIndent(level)}}`,
  ].join("\n");
};

const formatSkillUpgradeMaterials = (
  skillUpgradeMaterials: BuiltSkillUpgradeMaterials,
  level: number,
  usedMaterialObjectNameSet: Set<string>,
) => {
  const lines: string[] = [
    "{",
    `${getIndent(level + 1)}common: ${formatCommonSkillUpgradeMaterials(
      skillUpgradeMaterials.common,
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
  ];

  Object.entries(skillUpgradeMaterials)
    .filter(([skillName]) => {
      return skillName !== "common";
    })
    .forEach(([skillName, masteryMaterials]) => {
      lines.push(
        `${getIndent(level + 1)}${toStringLiteral(
          skillName,
        )}: ${formatSkillMasteryMaterials(
          masteryMaterials as ConvertedSkillMasteryMaterials,
          level + 1,
          usedMaterialObjectNameSet,
        )},`,
      );
    });

  lines.push(`${getIndent(level)}}`);

  return lines.join("\n");
};

const formatModuleInfoList = (moduleList: BuiltModuleInfo[], level: number) => {
  if (moduleList.length === 0) {
    return "[]";
  }

  const lines = moduleList.map((module) => {
    return [
      `${getIndent(level + 1)}{`,
      `${getIndent(level + 2)}type: ${toStringLiteral(module.type)},`,
      `${getIndent(level + 2)}name: ${toStringLiteral(module.name)},`,
      `${getIndent(level + 2)}charEquipOrder: ${module.charEquipOrder},`,
      `${getIndent(level + 2)}server: ${toStringLiteral(module.server)},`,
      `${getIndent(level + 1)}},`,
    ].join("\n");
  });

  return `[\n${lines.join("\n")}\n${getIndent(level)}]`;
};

const formatPreferModules = (
  preferModules: NonNullable<OperatorOverride["preferModules"]>,
  level: number,
) => {
  if (preferModules.length === 0) {
    return "[]";
  }

  const lines = preferModules.map((module) => {
    return [
      `${getIndent(level + 1)}{`,
      `${getIndent(level + 2)}type: ${toStringLiteral(module.type)},`,
      `${getIndent(level + 2)}level: ${module.level},`,
      `${getIndent(level + 1)}},`,
    ].join("\n");
  });

  return `[\n${lines.join("\n")}\n${getIndent(level)}]`;
};

const formatModuleMaterials = (
  moduleMaterials: Record<string, ConvertedModuleMaterials> | null,
  level: number,
  usedMaterialObjectNameSet: Set<string>,
) => {
  if (moduleMaterials === null) {
    return "null";
  }

  const lines: string[] = ["{"];

  Object.entries(moduleMaterials).forEach(([moduleType, materials]) => {
    lines.push(`${getIndent(level + 1)}${toStringLiteral(moduleType)}: {`);
    lines.push(
      `${getIndent(level + 2)}"1": ${formatCountableMaterialList(
        materials["1"],
        level + 2,
        usedMaterialObjectNameSet,
      )},`,
    );
    lines.push(
      `${getIndent(level + 2)}"2": ${formatCountableMaterialList(
        materials["2"],
        level + 2,
        usedMaterialObjectNameSet,
      )},`,
    );
    lines.push(
      `${getIndent(level + 2)}"3": ${formatCountableMaterialList(
        materials["3"],
        level + 2,
        usedMaterialObjectNameSet,
      )},`,
    );
    lines.push(`${getIndent(level + 1)}},`);
  });

  lines.push(`${getIndent(level)}}`);

  return lines.join("\n");
};

const formatOperator = (
  operator: BuiltOperator,
  level: number,
  usedMaterialObjectNameSet: Set<string>,
) => {
  const lines: string[] = [
    `${getIndent(level)}{`,
    `${getIndent(level + 1)}id: ${toStringLiteral(operator.id)},`,
  ];

  if (operator.legacyId !== undefined) {
    lines.push(`${getIndent(level + 1)}legacyId: ${operator.legacyId},`);
  }

  lines.push("");
  lines.push(`${getIndent(level + 1)}name: ${toStringLiteral(operator.name)},`);

  if (operator.nicknameList !== undefined && operator.nicknameList.length > 0) {
    lines.push(
      `${getIndent(level + 1)}nicknameList: ${formatStringArray(
        operator.nicknameList,
        level + 1,
      )},`,
    );
  }

  lines.push("");
  lines.push(
    `${getIndent(level + 1)}imageFilename: ${toStringLiteral(
      operator.imageFilename,
    )},`,
  );
  lines.push("");
  lines.push(
    `${getIndent(level + 1)}class: ${toStringLiteral(operator.class)},`,
  );
  lines.push(`${getIndent(level + 1)}rarity: ${operator.rarity},`);
  lines.push("");
  lines.push(
    `${getIndent(level + 1)}growthType: ${toStringLiteral(
      operator.growthType,
    )},`,
  );
  lines.push(
    `${getIndent(level + 1)}server: ${toStringLiteral(operator.server)},`,
  );
  lines.push("");
  lines.push(
    `${getIndent(level + 1)}eliteMaterials: ${formatEliteMaterials(
      operator.eliteMaterials,
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
  );
  lines.push("");
  lines.push(
    `${getIndent(level + 1)}skillList: ${formatStringArray(
      operator.skillList,
      level + 1,
    )},`,
  );

  if (
    operator.preferSkillIndexes !== undefined &&
    operator.preferSkillIndexes.length > 0
  ) {
    lines.push(
      `${getIndent(level + 1)}preferSkillIndexes: ${formatSkillIndexArray(
        operator.preferSkillIndexes,
        level + 1,
      )},`,
    );
  }

  lines.push(
    `${getIndent(
      level + 1,
    )}skillUpgradeMaterials: ${formatSkillUpgradeMaterials(
      operator.skillUpgradeMaterials,
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
  );
  lines.push("");
  lines.push(
    `${getIndent(level + 1)}moduleList: ${formatModuleInfoList(
      operator.moduleList,
      level + 1,
    )},`,
  );

  if (
    operator.preferModules !== undefined &&
    operator.preferModules.length > 0
  ) {
    lines.push(
      `${getIndent(level + 1)}preferModules: ${formatPreferModules(
        operator.preferModules,
        level + 1,
      )},`,
    );
  }

  lines.push(
    `${getIndent(level + 1)}moduleMaterials: ${formatModuleMaterials(
      operator.moduleMaterials,
      level + 1,
      usedMaterialObjectNameSet,
    )},`,
  );

  lines.push(`${getIndent(level)}},`);

  return lines.join("\n");
};

const createMaterialImportContent = (
  usedMaterialObjectNameSet: Set<string>,
) => {
  const usedMaterialObjectNameList = Array.from(usedMaterialObjectNameSet).sort(
    (materialNameA, materialNameB) => {
      return materialNameA.localeCompare(materialNameB);
    },
  );

  return [
    "import {",
    "  type CountableMaterial,",
    ...usedMaterialObjectNameList.map((materialObjectName) => {
      return `  ${materialObjectName},`;
    }),
    '} from "@/data/material";',
  ].join("\n");
};

const createGeneratedOperatorTypeContent = () => {
  return `export type GeneratedOperatorServer = "global" | "future";

export type GeneratedOperatorGrowthType = "normal" | "roguelike";

export type GeneratedOperatorClass =
  | "Vanguard"
  | "Guard"
  | "Defender"
  | "Sniper"
  | "Caster"
  | "Medic"
  | "Supporter"
  | "Specialist";

export type GeneratedSkillIndex = 0 | 1 | 2;

export type GeneratedEliteMaterials = {
  "0": CountableMaterial[];
  "1": CountableMaterial[];
  "2": CountableMaterial[];
};

export type GeneratedCommonSkillUpgradeMaterials = {
  "2": CountableMaterial[];
  "3": CountableMaterial[];
  "4": CountableMaterial[];
  "5": CountableMaterial[];
  "6": CountableMaterial[];
  "7": CountableMaterial[];
};

export type GeneratedSkillMasteryMaterials = {
  "8": CountableMaterial[];
  "9": CountableMaterial[];
  "10": CountableMaterial[];
};

export type GeneratedSkillUpgradeMaterials = {
  common: GeneratedCommonSkillUpgradeMaterials;
} & Record<string, GeneratedCommonSkillUpgradeMaterials | GeneratedSkillMasteryMaterials>;

export type GeneratedModuleInfo = {
  type: string;
  name: string;
  charEquipOrder: number;
  server: GeneratedOperatorServer;
};

export type GeneratedPreferModuleInfo = {
  type: string;
  level: 1 | 2 | 3;
};

export type GeneratedModuleMaterials = {
  "1": CountableMaterial[];
  "2": CountableMaterial[];
  "3": CountableMaterial[];
};

export type GeneratedOperator = {
  id: string;
  legacyId?: number;

  name: string;
  nicknameList?: string[];

  imageFilename: string;

  class: GeneratedOperatorClass;
  rarity: 1 | 2 | 3 | 4 | 5 | 6;

  growthType: GeneratedOperatorGrowthType;
  server: GeneratedOperatorServer;

  eliteMaterials: GeneratedEliteMaterials;

  skillList: string[];
  preferSkillIndexes?: GeneratedSkillIndex[];
  skillUpgradeMaterials: GeneratedSkillUpgradeMaterials;

  moduleList: GeneratedModuleInfo[];
  preferModules?: GeneratedPreferModuleInfo[];
  moduleMaterials: Record<string, GeneratedModuleMaterials> | null;
};`;
};

const createGeneratedOperatorFileContent = (operatorList: BuiltOperator[]) => {
  const usedMaterialObjectNameSet = new Set<string>();

  const operatorListContent =
    operatorList.length === 0
      ? "[]"
      : `[\n${operatorList
          .map((operator) => {
            return formatOperator(operator, 1, usedMaterialObjectNameSet);
          })
          .join("\n")}\n]`;

  return [
    createMaterialImportContent(usedMaterialObjectNameSet),
    "",
    createGeneratedOperatorTypeContent(),
    "",
    "/**",
    " * global/CN character_table, skill_table, uniequip_table와 custom operator에서 생성한 operator draft입니다.",
    " *",
    " * 아직 releaseInfo, migration map은 합쳐지지 않은 상태입니다.",
    " */",
    `export const generatedOperatorDraftList: GeneratedOperator[] = ${operatorListContent};`,
    "",
  ].join("\n");
};

const createOperatorOverrideByCharId = () => {
  const operatorOverrideByCharId = new Map<string, OperatorOverride>();
  const countByCharId = new Map<string, number>();

  operatorOverrideList.forEach((operatorOverride) => {
    countByCharId.set(
      operatorOverride.charId,
      (countByCharId.get(operatorOverride.charId) ?? 0) + 1,
    );

    if (!operatorOverrideByCharId.has(operatorOverride.charId)) {
      operatorOverrideByCharId.set(operatorOverride.charId, operatorOverride);
    }
  });

  const duplicateOperatorOverrideList = Array.from(countByCharId.entries())
    .filter(([, count]) => {
      return count > 1;
    })
    .map(([charId, count]) => {
      return {
        charId,
        count,
      };
    })
    .sort((overrideA, overrideB) => {
      return overrideA.charId.localeCompare(overrideB.charId);
    });

  return {
    operatorOverrideByCharId,
    duplicateOperatorOverrideList,
  };
};

const createFutureOperatorRecord = (
  globalOperatorRecord: CharacterTableForParser,
  cnOperatorRecord: CharacterTableForParser,
): CharacterTableForParser => {
  const globalCharIdSet = new Set(Object.keys(globalOperatorRecord));
  const futureOperatorRecord: CharacterTableForParser = {};

  Object.entries(cnOperatorRecord).forEach(([charId, character]) => {
    if (globalCharIdSet.has(charId)) {
      return;
    }

    futureOperatorRecord[charId] = character;
  });

  return futureOperatorRecord;
};

const createFutureModuleName = (
  module: ParsedModuleInfo,
  operatorOverride: OperatorOverride | undefined,
) => {
  return operatorOverride?.translatedModuleNames?.[module.type] ?? module.name;
};

const createBuiltFutureModuleList = (
  moduleList: ParsedModuleInfo[],
  operatorOverride: OperatorOverride | undefined,
): BuiltModuleInfo[] => {
  return moduleList.map((module) => {
    return {
      type: module.type,
      name: createFutureModuleName(module, operatorOverride),
      charEquipOrder: module.charEquipOrder,
      server: "future",
    };
  });
};

const sortBuiltModuleList = (moduleList: BuiltModuleInfo[]) => {
  return [...moduleList].sort((moduleA, moduleB) => {
    if (moduleA.charEquipOrder !== moduleB.charEquipOrder) {
      return moduleA.charEquipOrder - moduleB.charEquipOrder;
    }

    return moduleA.type.localeCompare(moduleB.type);
  });
};

const createMergedModuleMaterials = (
  currentModuleMaterials: BuiltOperator["moduleMaterials"],
  futureModuleMaterials: Record<string, ConvertedModuleMaterials>,
): BuiltOperator["moduleMaterials"] => {
  const mergedModuleMaterials = {
    ...(currentModuleMaterials ?? {}),
    ...futureModuleMaterials,
  };

  if (Object.keys(mergedModuleMaterials).length === 0) {
    return null;
  }

  return mergedModuleMaterials;
};

const mergeFutureModulesIntoOperator = ({
  operator,
  cnUniequipTable,
  materialConversionContext,
  operatorOverrideByCharId,
}: {
  operator: BuiltOperator;
  cnUniequipTable: UniequipTableForParser;
  materialConversionContext: MaterialConversionContext;
  operatorOverrideByCharId: Map<string, OperatorOverride>;
}): FutureModuleMergeResult => {
  const parsedCnModuleInfo = parseCharacterModuleInfo(
    operator.id,
    cnUniequipTable,
  );

  const existingModuleTypeSet = new Set(
    operator.moduleList.map((module) => {
      return module.type;
    }),
  );

  const futureParsedModuleList = parsedCnModuleInfo.moduleList.filter(
    (module) => {
      return !existingModuleTypeSet.has(module.type);
    },
  );

  if (futureParsedModuleList.length === 0) {
    return {
      operator,
      addedModuleList: [],
    };
  }

  const futureModuleTypeSet = new Set(
    futureParsedModuleList.map((module) => {
      return module.type;
    }),
  );

  const futureParsedModuleMaterials = Object.fromEntries(
    Object.entries(parsedCnModuleInfo.moduleMaterials).filter(
      ([moduleType]) => {
        return futureModuleTypeSet.has(moduleType);
      },
    ),
  );

  const operatorOverride = operatorOverrideByCharId.get(operator.id);

  const futureModuleList = createBuiltFutureModuleList(
    futureParsedModuleList,
    operatorOverride,
  );

  const futureModuleMaterials = convertModuleMaterialsByType(
    materialConversionContext,
    futureParsedModuleMaterials,
  );

  return {
    operator: {
      ...operator,
      moduleList: sortBuiltModuleList([
        ...operator.moduleList,
        ...futureModuleList,
      ]),
      moduleMaterials: createMergedModuleMaterials(
        operator.moduleMaterials,
        futureModuleMaterials,
      ),
    },
    addedModuleList: futureModuleList.map((module) => {
      return {
        operatorId: operator.id,
        operatorName: operator.name,
        moduleType: module.type,
        moduleName: module.name,
      };
    }),
  };
};

const mergeFutureModulesIntoOperatorList = ({
  operatorList,
  cnUniequipTable,
  materialConversionContext,
  operatorOverrideByCharId,
}: {
  operatorList: BuiltOperator[];
  cnUniequipTable: UniequipTableForParser;
  materialConversionContext: MaterialConversionContext;
  operatorOverrideByCharId: Map<string, OperatorOverride>;
}) => {
  const futureModuleAddedList: FutureModuleAddedInfo[] = [];

  const mergedOperatorList = operatorList.map((operator) => {
    const mergeResult = mergeFutureModulesIntoOperator({
      operator,
      cnUniequipTable,
      materialConversionContext,
      operatorOverrideByCharId,
    });

    futureModuleAddedList.push(...mergeResult.addedModuleList);

    return mergeResult.operator;
  });

  return {
    operatorList: mergedOperatorList,
    futureModuleAddedList,
  };
};

const assertUniqueOperatorIds = (operatorList: BuiltOperator[]) => {
  const operatorIdSet = new Set<string>();
  const duplicatedOperatorIdList: string[] = [];

  operatorList.forEach((operator) => {
    if (operatorIdSet.has(operator.id)) {
      duplicatedOperatorIdList.push(operator.id);
      return;
    }

    operatorIdSet.add(operator.id);
  });

  if (duplicatedOperatorIdList.length === 0) {
    return;
  }

  throw new Error(
    `중복 operator id가 있습니다: ${duplicatedOperatorIdList.join(", ")}`,
  );
};

const createReport = (result: GenerateOperatorResult) => {
  const lines: string[] = [
    "# Operator Generation Report",
    "",
    "> global + future + custom operator draft 생성 결과입니다.",
    "",
    `- Generated operators: ${result.operatorList.length}`,
    `- Generated global operators: ${result.generatedGlobalOperatorCount}`,
    `- Generated future operators: ${result.generatedFutureOperatorCount}`,
    `- Custom operators: ${result.customOperatorCount}`,
    `- Added future modules: ${result.futureModuleAddedList.length}`,
    `- Filtered global source operators: ${result.filteredGlobalOperatorCount}`,
    `- Filtered CN source operators: ${result.filteredCnOperatorCount}`,
    `- Excluded global operators: ${result.excludedGlobalOperatorList.length}`,
    `- Excluded CN operators: ${result.excludedCnOperatorList.length}`,
    `- Build warnings: ${result.buildWarningList.length}`,
    `- Missing materials: ${result.materialConversionContext.warningList.length}`,
    `- Duplicate operator overrides: ${result.duplicateOperatorOverrideList.length}`,
    "",
  ];

  lines.push("## Added Future Modules");
  lines.push("");

  if (result.futureModuleAddedList.length === 0) {
    lines.push("- 없음");
  } else {
    result.futureModuleAddedList.forEach((module) => {
      lines.push(
        `- \`${module.operatorId}\` / ${module.operatorName} / ${module.moduleType} / ${module.moduleName}`,
      );
    });
  }

  lines.push("");
  lines.push("## Build Warnings");
  lines.push("");

  if (result.buildWarningList.length === 0) {
    lines.push("- 없음");
  } else {
    result.buildWarningList.forEach((warning) => {
      lines.push(
        `- \`${warning.charId}\` / ${warning.operatorName} / ${warning.type}: ${warning.message}`,
      );
    });
  }

  lines.push("");
  lines.push("## Missing Materials");
  lines.push("");

  if (result.materialConversionContext.warningList.length === 0) {
    lines.push("- 없음");
  } else {
    result.materialConversionContext.warningList.forEach((warning) => {
      lines.push(
        `- itemId=${warning.itemId}, count=${warning.count}: ${warning.reason}`,
      );
    });
  }

  lines.push("");
  lines.push("## Duplicate Operator Overrides");
  lines.push("");

  if (result.duplicateOperatorOverrideList.length === 0) {
    lines.push("- 없음");
  } else {
    result.duplicateOperatorOverrideList.forEach((override) => {
      lines.push(`- \`${override.charId}\`: ${override.count}개`);
    });
  }

  lines.push("");
  lines.push("## Excluded Global Operators");
  lines.push("");

  if (result.excludedGlobalOperatorList.length === 0) {
    lines.push("- 없음");
  } else {
    result.excludedGlobalOperatorList.forEach((operator) => {
      lines.push(
        `- \`${operator.charId}\` / ${operator.name} / ${operator.profession} / ${operator.rarity}`,
      );
      operator.reasons.forEach((reason) => {
        lines.push(`  - ${reason}`);
      });
    });
  }

  lines.push("");
  lines.push("## Excluded CN Operators");
  lines.push("");

  if (result.excludedCnOperatorList.length === 0) {
    lines.push("- 없음");
  } else {
    result.excludedCnOperatorList.forEach((operator) => {
      lines.push(
        `- \`${operator.charId}\` / ${operator.name} / ${operator.profession} / ${operator.rarity}`,
      );
      operator.reasons.forEach((reason) => {
        lines.push(`  - ${reason}`);
      });
    });
  }

  lines.push("");

  return `${lines.join("\n")}\n`;
};

const generateOperators = (): GenerateOperatorResult => {
  const gamedataPath = loadGamedataPath();
  const cnGamedataPath = loadCnGamedataPath();

  const globalCharacterTable = readLatestJsonFile<CharacterTableForParser>(
    gamedataPath,
    GLOBAL_CHARACTER_TABLE_PATH,
  );

  const globalSkillTable = readLatestJsonFile<SkillTableForParser>(
    gamedataPath,
    GLOBAL_SKILL_TABLE_PATH,
  );

  const globalUniequipTable = readLatestJsonFile<UniequipTableForParser>(
    gamedataPath,
    GLOBAL_UNIEQUIP_TABLE_PATH,
  );

  const cnCharacterTable = readLatestJsonFile<CharacterTableForParser>(
    cnGamedataPath,
    CN_CHARACTER_TABLE_PATH,
  );

  const cnSkillTable = readLatestJsonFile<SkillTableForParser>(
    cnGamedataPath,
    CN_SKILL_TABLE_PATH,
  );

  const cnUniequipTable = readLatestJsonFile<UniequipTableForParser>(
    cnGamedataPath,
    CN_UNIEQUIP_TABLE_PATH,
  );

  const globalFilterResult =
    createFilteredOperatorRecord<CharacterForParser>(globalCharacterTable);
  const cnFilterResult =
    createFilteredOperatorRecord<CharacterForParser>(cnCharacterTable);

  const futureOperatorRecord = createFutureOperatorRecord(
    globalFilterResult.operatorRecord,
    cnFilterResult.operatorRecord,
  );

  const globalSkillInfoById = parseSkillTable(globalSkillTable);
  const cnSkillInfoById = parseSkillTable(cnSkillTable);

  const materialConversionContext = createMaterialConversionContext();
  const buildWarningList: OperatorBuildWarning[] = [];

  const { operatorOverrideByCharId, duplicateOperatorOverrideList } =
    createOperatorOverrideByCharId();

  const generatedGlobalOperatorList = buildOperatorList({
    operatorRecord: globalFilterResult.operatorRecord,
    skillInfoById: globalSkillInfoById,
    uniequipTable: globalUniequipTable,
    materialConversionContext,
    operatorOverrideByCharId,
    server: "global",
    warningList: buildWarningList,
  });

  const generatedFutureOperatorList = buildOperatorList({
    operatorRecord: futureOperatorRecord,
    skillInfoById: cnSkillInfoById,
    uniequipTable: cnUniequipTable,
    materialConversionContext,
    operatorOverrideByCharId,
    server: "future",
    warningList: buildWarningList,
  });

  const builtCustomOperatorList = buildCustomOperatorList({
    customOperatorList,
    uniequipTable: globalUniequipTable,
    materialConversionContext,
  });

  const operatorListBeforeFutureModuleMerge = [
    ...generatedGlobalOperatorList,
    ...generatedFutureOperatorList,
    ...builtCustomOperatorList,
  ];

  const futureModuleMergeResult = mergeFutureModulesIntoOperatorList({
    operatorList: operatorListBeforeFutureModuleMerge,
    cnUniequipTable,
    materialConversionContext,
    operatorOverrideByCharId,
  });

  const operatorList = futureModuleMergeResult.operatorList.sort(
    (operatorA, operatorB) => {
      return operatorA.id.localeCompare(operatorB.id);
    },
  );

  assertUniqueOperatorIds(operatorList);

  return {
    operatorList,
    generatedGlobalOperatorCount: generatedGlobalOperatorList.length,
    generatedFutureOperatorCount: generatedFutureOperatorList.length,
    customOperatorCount: builtCustomOperatorList.length,
    futureModuleAddedList: futureModuleMergeResult.futureModuleAddedList,
    filteredGlobalOperatorCount: Object.keys(globalFilterResult.operatorRecord)
      .length,
    filteredCnOperatorCount: Object.keys(cnFilterResult.operatorRecord).length,
    excludedGlobalOperatorList: globalFilterResult.excludedOperatorList,
    excludedCnOperatorList: cnFilterResult.excludedOperatorList,
    buildWarningList,
    materialConversionContext,
    duplicateOperatorOverrideList,
  };
};

const main = () => {
  const result = generateOperators();

  writeFile(
    OPERATOR_DRAFT_OUTPUT_PATH,
    createGeneratedOperatorFileContent(result.operatorList),
  );

  writeFile(OPERATOR_GENERATION_REPORT_OUTPUT_PATH, createReport(result));

  console.log(`operator draft ${result.operatorList.length}개를 생성했습니다.`);
  console.log(`global operator: ${result.generatedGlobalOperatorCount}개`);
  console.log(`future operator: ${result.generatedFutureOperatorCount}개`);
  console.log(`custom operator: ${result.customOperatorCount}개`);
  console.log(`future module 추가: ${result.futureModuleAddedList.length}개`);
  console.log(`build warning: ${result.buildWarningList.length}개`);
  console.log(
    `missing material: ${result.materialConversionContext.warningList.length}개`,
  );
  console.log(`생성 완료: ${OPERATOR_DRAFT_OUTPUT_PATH}`);
  console.log(`생성 완료: ${OPERATOR_GENERATION_REPORT_OUTPUT_PATH}`);

  assertNoMaterialConversionWarnings(result.materialConversionContext);
};

main();
