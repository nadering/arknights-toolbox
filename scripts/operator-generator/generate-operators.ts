import fs from "node:fs";
import path from "node:path";
import {
  type OperatorOverride,
  operatorOverrideList,
} from "@/data/operator/manual/operator-override";
import { customOperatorList } from "@/data/operator/manual/custom-operators";
import { type CountableMaterial } from "@/data/material";
import {
  operatorReleaseInfoByCharId,
  type GeneratedOperatorReleaseInfo,
} from "@/data/operator/generated/operator-release-info-map.generated";
import {
  CN_CHARACTER_TABLE_PATH,
  CN_SKILL_TABLE_PATH,
  CN_UNIEQUIP_TABLE_PATH,
  GLOBAL_CHARACTER_TABLE_PATH,
  GLOBAL_SKILL_TABLE_PATH,
  GLOBAL_UNIEQUIP_TABLE_PATH,
} from "../table-path";
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

const OPERATOR_DRAFT_OUTPUT_PATH =
  "src/data/operator/generated/operators.draft.generated.ts";

const OPERATOR_GENERATED_OUTPUT_PATH =
  "src/data/operator/generated/operators.generated.ts";

const OPERATOR_BY_ID_OUTPUT_PATH =
  "src/data/operator/generated/operator-by-id.generated.ts";

const OPERATOR_ID_MIGRATION_MAP_OUTPUT_PATH =
  "src/data/operator/generated/operator-id-migration-map.generated.ts";

const OPERATOR_GENERATION_REPORT_OUTPUT_PATH =
  "src/data/operator/generated/operator-generation-report.md";

const MISSING_RELEASE_INFO: GeneratedOperatorReleaseInfo = {
  eventId: "missing_release_info",
  eventName: "출시 정보 누락",
  category: "other",
  order: Number.MIN_SAFE_INTEGER,
};

const CUSTOM_RELEASE_INFO_FALLBACK_OPERATOR_ID_LIST_BY_OPERATOR_ID: Record<
  string,
  string[]
> = {
  char_1001_amiya2: ["char_002_amiya", "char_0002_amiya"],
  char_1037_amiya3: ["char_002_amiya", "char_0002_amiya"],
};

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

type MissingReleaseInfo = {
  operatorId: string;
  operatorName: string;
  server: BuiltOperator["server"];
  reason: string;
};

type ReleaseInfoFallbackInfo = {
  operatorId: string;
  operatorName: string;
  fallbackOperatorId: string;
  fallbackEventId: string;
  fallbackEventName: string;
};

type OperatorWithReleaseInfo = BuiltOperator & {
  releaseInfo: GeneratedOperatorReleaseInfo;
};

type DuplicateLegacyIdInfo = {
  legacyId: number;
  operatorIds: string[];
};

type MissingLegacyIdInfo = {
  operatorId: string;
  operatorName: string;
  server: OperatorWithReleaseInfo["server"];
};

type GenerateOperatorResult = {
  operatorList: OperatorWithReleaseInfo[];

  generatedGlobalOperatorCount: number;
  generatedFutureOperatorCount: number;
  customOperatorCount: number;
  futureModuleAddedList: FutureModuleAddedInfo[];

  filteredGlobalOperatorCount: number;
  filteredCnOperatorCount: number;

  excludedGlobalOperatorList: {
    charId: string;
    name: string;
    profession: string;
    rarity: string;
    reasons: string[];
  }[];
  excludedCnOperatorList: {
    charId: string;
    name: string;
    profession: string;
    rarity: string;
    reasons: string[];
  }[];

  missingReleaseInfoList: MissingReleaseInfo[];
  releaseInfoFallbackList: ReleaseInfoFallbackInfo[];

  operatorIdMigrationMap: Record<string, string>;
  duplicateLegacyIdList: DuplicateLegacyIdInfo[];
  missingLegacyIdList: MissingLegacyIdInfo[];

  buildWarningList: OperatorBuildWarning[];
  materialConversionContext: MaterialConversionContext;
  duplicateOperatorOverrideList: DuplicateOperatorOverrideInfo[];
};

type FutureModuleMergeResult = {
  operator: BuiltOperator;
  addedModuleList: FutureModuleAddedInfo[];
};

type AttachReleaseInfoResult = {
  operatorList: OperatorWithReleaseInfo[];
  missingReleaseInfoList: MissingReleaseInfo[];
  releaseInfoFallbackList: ReleaseInfoFallbackInfo[];
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

const formatReleaseInfo = (
  releaseInfo: GeneratedOperatorReleaseInfo,
  level: number,
) => {
  return [
    "{",
    `${getIndent(level + 1)}eventId: ${toStringLiteral(releaseInfo.eventId)},`,
    `${getIndent(level + 1)}eventName: ${toStringLiteral(
      releaseInfo.eventName,
    )},`,
    `${getIndent(level + 1)}category: ${toStringLiteral(
      releaseInfo.category,
    )},`,
    `${getIndent(level + 1)}order: ${releaseInfo.order},`,
    `${getIndent(level)}}`,
  ].join("\n");
};

const formatOperator = (
  operator: OperatorWithReleaseInfo,
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
  lines.push(
    `${getIndent(level + 1)}releaseInfo: ${formatReleaseInfo(
      operator.releaseInfo,
      level + 1,
    )},`,
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

const createOperatorReleaseImportContent = () => {
  return 'import { type OperatorReleaseCategory } from "../manual/operator-release-types";';
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

export type GeneratedOperatorReleaseInfo = {
  eventId: string;
  eventName: string;
  category: OperatorReleaseCategory;
  order: number;
};

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
  releaseInfo: GeneratedOperatorReleaseInfo;

  eliteMaterials: GeneratedEliteMaterials;

  skillList: string[];
  preferSkillIndexes?: GeneratedSkillIndex[];
  skillUpgradeMaterials: GeneratedSkillUpgradeMaterials;

  moduleList: GeneratedModuleInfo[];
  preferModules?: GeneratedPreferModuleInfo[];
  moduleMaterials: Record<string, GeneratedModuleMaterials> | null;
};`;
};

const createGeneratedOperatorFileContent = ({
  operatorList,
  exportName,
  description,
}: {
  operatorList: OperatorWithReleaseInfo[];
  exportName: string;
  description: string;
}) => {
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
    createOperatorReleaseImportContent(),
    "",
    createGeneratedOperatorTypeContent(),
    "",
    "/**",
    ` * ${description}`,
    " *",
    " * global/CN character_table, skill_table, uniequip_table와 custom operator에서 생성되었습니다.",
    " * 직접 수정하지 말고 npm run generate:operators로 재생성하세요.",
    " */",
    `export const ${exportName}: GeneratedOperator[] = ${operatorListContent};`,
    "",
  ].join("\n");
};

const createOperatorByIdFileContent = () => {
  return `import {
  generatedOperatorList,
  type GeneratedOperator,
} from "./operators.generated";

/**
 * operator id로 operator를 빠르게 조회하기 위한 generated map입니다.
 *
 * 직접 수정하지 말고 npm run generate:operators로 재생성하세요.
 */
export const operatorById: Record<string, GeneratedOperator> = Object.fromEntries(
  generatedOperatorList.map((operator) => {
    return [operator.id, operator];
  }),
);
`;
};

const createOperatorIdMigrationMapFileContent = (
  operatorIdMigrationMap: Record<string, string>,
) => {
  return `/**
 * legacy number operator id를 신규 string operator id로 변환하기 위한 generated map입니다.
 *
 * 예:
 * - "327" → "char_4134_cetsyr"
 * - "75.2" → custom operator id
 *
 * 직접 수정하지 말고 npm run generate:operators로 재생성하세요.
 */
export const OPERATOR_ID_MIGRATION_MAP: Record<string, string> = ${JSON.stringify(
    operatorIdMigrationMap,
    null,
    2,
  )};
`;
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

const createCustomOperatorIdSet = () => {
  return new Set(
    customOperatorList.map((operator) => {
      return operator.id;
    }),
  );
};

const findReleaseInfoFallback = (operatorId: string) => {
  const fallbackOperatorIdList =
    CUSTOM_RELEASE_INFO_FALLBACK_OPERATOR_ID_LIST_BY_OPERATOR_ID[operatorId] ??
    [];

  const fallbackOperatorId = fallbackOperatorIdList.find((targetOperatorId) => {
    return operatorReleaseInfoByCharId[targetOperatorId] !== undefined;
  });

  if (fallbackOperatorId === undefined) {
    return null;
  }

  return {
    fallbackOperatorId,
    releaseInfo: operatorReleaseInfoByCharId[fallbackOperatorId],
  };
};

const attachReleaseInfoToOperatorList = (
  operatorList: BuiltOperator[],
): AttachReleaseInfoResult => {
  const customOperatorIdSet = createCustomOperatorIdSet();
  const missingReleaseInfoList: MissingReleaseInfo[] = [];
  const releaseInfoFallbackList: ReleaseInfoFallbackInfo[] = [];

  const operatorListWithReleaseInfo = operatorList.map((operator) => {
    const releaseInfo = operatorReleaseInfoByCharId[operator.id];

    if (releaseInfo !== undefined) {
      return {
        ...operator,
        releaseInfo,
      };
    }

    const fallback = findReleaseInfoFallback(operator.id);

    if (fallback !== null) {
      releaseInfoFallbackList.push({
        operatorId: operator.id,
        operatorName: operator.name,
        fallbackOperatorId: fallback.fallbackOperatorId,
        fallbackEventId: fallback.releaseInfo.eventId,
        fallbackEventName: fallback.releaseInfo.eventName,
      });

      return {
        ...operator,
        releaseInfo: fallback.releaseInfo,
      };
    }

    missingReleaseInfoList.push({
      operatorId: operator.id,
      operatorName: operator.name,
      server: operator.server,
      reason: customOperatorIdSet.has(operator.id)
        ? "custom operator이지만 releaseInfo fallback이 지정되지 않았습니다."
        : "operatorReleaseInfoByCharId에서 releaseInfo를 찾을 수 없습니다.",
    });

    return {
      ...operator,
      releaseInfo: MISSING_RELEASE_INFO,
    };
  });

  return {
    operatorList: operatorListWithReleaseInfo,
    missingReleaseInfoList,
    releaseInfoFallbackList,
  };
};

const assertUniqueOperatorIds = (operatorList: { id: string }[]) => {
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

const createOperatorIdMigrationMap = (
  operatorList: OperatorWithReleaseInfo[],
) => {
  const migrationEntries = operatorList
    .filter((operator) => {
      return operator.legacyId !== undefined;
    })
    .map((operator) => {
      return [String(operator.legacyId), operator.id] as const;
    })
    .sort(([legacyIdA], [legacyIdB]) => {
      const numericLegacyIdA = Number(legacyIdA);
      const numericLegacyIdB = Number(legacyIdB);

      if (
        Number.isFinite(numericLegacyIdA) &&
        Number.isFinite(numericLegacyIdB) &&
        numericLegacyIdA !== numericLegacyIdB
      ) {
        return numericLegacyIdA - numericLegacyIdB;
      }

      return legacyIdA.localeCompare(legacyIdB);
    });

  return Object.fromEntries(migrationEntries);
};

const createDuplicateLegacyIdList = (
  operatorList: OperatorWithReleaseInfo[],
) => {
  const operatorIdsByLegacyId = new Map<number, string[]>();

  operatorList.forEach((operator) => {
    if (operator.legacyId === undefined) {
      return;
    }

    operatorIdsByLegacyId.set(operator.legacyId, [
      ...(operatorIdsByLegacyId.get(operator.legacyId) ?? []),
      operator.id,
    ]);
  });

  return Array.from(operatorIdsByLegacyId.entries())
    .filter(([, operatorIds]) => {
      return operatorIds.length > 1;
    })
    .map(([legacyId, operatorIds]) => {
      return {
        legacyId,
        operatorIds,
      };
    })
    .sort((infoA, infoB) => {
      return infoA.legacyId - infoB.legacyId;
    });
};

const createMissingLegacyIdList = (operatorList: OperatorWithReleaseInfo[]) => {
  const customOperatorIdSet = createCustomOperatorIdSet();

  return operatorList
    .filter((operator) => {
      if (operator.legacyId !== undefined) {
        return false;
      }

      if (operator.server === "future") {
        return false;
      }

      return !customOperatorIdSet.has(operator.id);
    })
    .map((operator) => {
      return {
        operatorId: operator.id,
        operatorName: operator.name,
        server: operator.server,
      };
    })
    .sort((operatorA, operatorB) => {
      return operatorA.operatorId.localeCompare(operatorB.operatorId);
    });
};

const createReleaseInfoFallbackSection = (
  releaseInfoFallbackList: ReleaseInfoFallbackInfo[],
) => {
  const lines: string[] = ["## Release Info Fallbacks", ""];

  if (releaseInfoFallbackList.length === 0) {
    lines.push("- 없음");
    lines.push("");

    return lines;
  }

  releaseInfoFallbackList.forEach((fallback) => {
    lines.push(
      `- \`${fallback.operatorId}\` / ${fallback.operatorName} → \`${fallback.fallbackOperatorId}\` / ${fallback.fallbackEventId} / ${fallback.fallbackEventName}`,
    );
  });

  lines.push("");

  return lines;
};

const createMissingReleaseInfoSection = (
  missingReleaseInfoList: MissingReleaseInfo[],
) => {
  const lines: string[] = ["## Missing Release Info", ""];

  if (missingReleaseInfoList.length === 0) {
    lines.push("- 없음");
    lines.push("");

    return lines;
  }

  missingReleaseInfoList.forEach((operator) => {
    lines.push(
      `- \`${operator.operatorId}\` / ${operator.operatorName} / ${operator.server}: ${operator.reason}`,
    );
  });

  lines.push("");

  return lines;
};

const createDuplicateLegacyIdSection = (
  duplicateLegacyIdList: DuplicateLegacyIdInfo[],
) => {
  const lines: string[] = ["## Duplicate Legacy IDs", ""];

  if (duplicateLegacyIdList.length === 0) {
    lines.push("- 없음");
    lines.push("");

    return lines;
  }

  duplicateLegacyIdList.forEach((info) => {
    lines.push(
      `- legacyId=${info.legacyId}: ${info.operatorIds
        .map((operatorId) => {
          return `\`${operatorId}\``;
        })
        .join(", ")}`,
    );
  });

  lines.push("");

  return lines;
};

const createMissingLegacyIdSection = (
  missingLegacyIdList: MissingLegacyIdInfo[],
) => {
  const lines: string[] = ["## Missing Legacy IDs", ""];

  if (missingLegacyIdList.length === 0) {
    lines.push("- 없음");
    lines.push("");

    return lines;
  }

  missingLegacyIdList.forEach((operator) => {
    lines.push(
      `- \`${operator.operatorId}\` / ${operator.operatorName} / ${operator.server}`,
    );
  });

  lines.push("");

  return lines;
};

const createReport = (result: GenerateOperatorResult) => {
  const lines: string[] = [
    "# Operator Generation Report",
    "",
    "> global + future + custom operator generated data 생성 결과입니다.",
    "",
    `- Generated operators: ${result.operatorList.length}`,
    `- Generated global operators: ${result.generatedGlobalOperatorCount}`,
    `- Generated future operators: ${result.generatedFutureOperatorCount}`,
    `- Custom operators: ${result.customOperatorCount}`,
    `- Added future modules: ${result.futureModuleAddedList.length}`,
    `- Release info fallbacks: ${result.releaseInfoFallbackList.length}`,
    `- Missing releaseInfo: ${result.missingReleaseInfoList.length}`,
    `- Operator id migration map entries: ${
      Object.keys(result.operatorIdMigrationMap).length
    }`,
    `- Duplicate legacy IDs: ${result.duplicateLegacyIdList.length}`,
    `- Missing legacy IDs: ${result.missingLegacyIdList.length}`,
    `- Filtered global source operators: ${result.filteredGlobalOperatorCount}`,
    `- Filtered CN source operators: ${result.filteredCnOperatorCount}`,
    `- Excluded global operators: ${result.excludedGlobalOperatorList.length}`,
    `- Excluded CN operators: ${result.excludedCnOperatorList.length}`,
    `- Build warnings: ${result.buildWarningList.length}`,
    `- Missing materials: ${result.materialConversionContext.warningList.length}`,
    `- Duplicate operator overrides: ${result.duplicateOperatorOverrideList.length}`,
    "",
  ];

  lines.push(
    ...createReleaseInfoFallbackSection(result.releaseInfoFallbackList),
  );
  lines.push(...createMissingReleaseInfoSection(result.missingReleaseInfoList));
  lines.push(...createDuplicateLegacyIdSection(result.duplicateLegacyIdList));
  lines.push(...createMissingLegacyIdSection(result.missingLegacyIdList));

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

  const releaseInfoAttachResult = attachReleaseInfoToOperatorList(
    futureModuleMergeResult.operatorList,
  );

  const operatorList = releaseInfoAttachResult.operatorList.sort(
    (operatorA, operatorB) => {
      if (operatorA.releaseInfo.order !== operatorB.releaseInfo.order) {
        return operatorB.releaseInfo.order - operatorA.releaseInfo.order;
      }

      return operatorA.id.localeCompare(operatorB.id);
    },
  );

  assertUniqueOperatorIds(operatorList);

  const operatorIdMigrationMap = createOperatorIdMigrationMap(operatorList);
  const duplicateLegacyIdList = createDuplicateLegacyIdList(operatorList);
  const missingLegacyIdList = createMissingLegacyIdList(operatorList);

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
    missingReleaseInfoList: releaseInfoAttachResult.missingReleaseInfoList,
    releaseInfoFallbackList: releaseInfoAttachResult.releaseInfoFallbackList,
    operatorIdMigrationMap,
    duplicateLegacyIdList,
    missingLegacyIdList,
    buildWarningList,
    materialConversionContext,
    duplicateOperatorOverrideList,
  };
};

const main = () => {
  const result = generateOperators();

  writeFile(
    OPERATOR_DRAFT_OUTPUT_PATH,
    createGeneratedOperatorFileContent({
      operatorList: result.operatorList,
      exportName: "generatedOperatorDraftList",
      description: "검수용 operator draft입니다.",
    }),
  );

  writeFile(
    OPERATOR_GENERATED_OUTPUT_PATH,
    createGeneratedOperatorFileContent({
      operatorList: result.operatorList,
      exportName: "generatedOperatorList",
      description: "앱에서 사용할 최종 generated operator list입니다.",
    }),
  );

  writeFile(OPERATOR_BY_ID_OUTPUT_PATH, createOperatorByIdFileContent());

  writeFile(
    OPERATOR_ID_MIGRATION_MAP_OUTPUT_PATH,
    createOperatorIdMigrationMapFileContent(result.operatorIdMigrationMap),
  );

  writeFile(OPERATOR_GENERATION_REPORT_OUTPUT_PATH, createReport(result));

  console.log(`operator ${result.operatorList.length}개를 생성했습니다.`);
  console.log(`global operator: ${result.generatedGlobalOperatorCount}개`);
  console.log(`future operator: ${result.generatedFutureOperatorCount}개`);
  console.log(`custom operator: ${result.customOperatorCount}개`);
  console.log(`future module 추가: ${result.futureModuleAddedList.length}개`);
  console.log(
    `releaseInfo fallback: ${result.releaseInfoFallbackList.length}개`,
  );
  console.log(`missing releaseInfo: ${result.missingReleaseInfoList.length}개`);
  console.log(
    `migration map: ${Object.keys(result.operatorIdMigrationMap).length}개`,
  );
  console.log(`duplicate legacyId: ${result.duplicateLegacyIdList.length}개`);
  console.log(`missing legacyId: ${result.missingLegacyIdList.length}개`);
  console.log(`build warning: ${result.buildWarningList.length}개`);
  console.log(
    `missing material: ${result.materialConversionContext.warningList.length}개`,
  );
  console.log(`생성 완료: ${OPERATOR_DRAFT_OUTPUT_PATH}`);
  console.log(`생성 완료: ${OPERATOR_GENERATED_OUTPUT_PATH}`);
  console.log(`생성 완료: ${OPERATOR_BY_ID_OUTPUT_PATH}`);
  console.log(`생성 완료: ${OPERATOR_ID_MIGRATION_MAP_OUTPUT_PATH}`);
  console.log(`생성 완료: ${OPERATOR_GENERATION_REPORT_OUTPUT_PATH}`);

  assertNoMaterialConversionWarnings(result.materialConversionContext);
};

main();
