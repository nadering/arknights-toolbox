import { type OperatorOverride } from "@/data/operator/manual/operator-override";
import {
  parseCharacterOperator,
  type CharacterForParser,
  type CharacterTableForParser,
  type ParsedOperatorClass,
  type ParsedRarityNumber,
} from "../parsers/parse-character-table";
import {
  parseCharacterSkillInfo,
  type ParsedSkillInfoRecord,
} from "../parsers/parse-skill-table";
import {
  parseCharacterModuleInfo,
  type ParsedModuleInfo,
  type UniequipTableForParser,
} from "../parsers/parse-uniequip-table";
import {
  convertCommonSkillUpgradeMaterials,
  convertEliteMaterials,
  convertModuleMaterialsByType,
  convertSkillMasteryMaterialsBySkillId,
  type ConvertedCommonSkillUpgradeMaterials,
  type ConvertedEliteMaterials,
  type ConvertedModuleMaterials,
  type ConvertedSkillMasteryMaterials,
  type MaterialConversionContext,
} from "../converters/convert-material-costs";

export type BuiltOperatorServer = "global" | "future";

export type BuiltOperatorGrowthType = "normal" | "roguelike";

export type BuiltSkillUpgradeMaterials = {
  common: ConvertedCommonSkillUpgradeMaterials;
  [skillName: string]:
    | ConvertedCommonSkillUpgradeMaterials
    | ConvertedSkillMasteryMaterials;
};

export type BuiltModuleInfo = {
  type: string;
  name: string;
  charEquipOrder: number;
  server: BuiltOperatorServer;
};

export type BuiltOperator = {
  id: string;
  legacyId?: number;

  name: string;
  nicknameList?: string[];

  imageFilename: string;

  class: ParsedOperatorClass;
  rarity: ParsedRarityNumber;

  growthType: BuiltOperatorGrowthType;

  eliteMaterials: ConvertedEliteMaterials;

  skillList: string[];
  preferSkillIndexes?: OperatorOverride["preferSkillIndexes"];
  skillUpgradeMaterials: BuiltSkillUpgradeMaterials;

  moduleList: BuiltModuleInfo[];
  preferModules?: OperatorOverride["preferModules"];
  moduleMaterials: Record<string, ConvertedModuleMaterials> | null;

  server: BuiltOperatorServer;
};

export type OperatorBuildWarningType =
  | "missing_skill"
  | "duplicate_skill_name"
  | "reserved_skill_name";

export type OperatorBuildWarning = {
  charId: string;
  operatorName: string;
  type: OperatorBuildWarningType;
  message: string;
};

export type BuildOperatorParams = {
  charId: string;
  character: CharacterForParser;
  skillInfoById: ParsedSkillInfoRecord;
  uniequipTable: UniequipTableForParser;
  materialConversionContext: MaterialConversionContext;
  operatorOverride?: OperatorOverride;
  server: BuiltOperatorServer;
  warningList?: OperatorBuildWarning[];
};

export type BuildOperatorListParams = {
  operatorRecord: CharacterTableForParser;
  skillInfoById: ParsedSkillInfoRecord;
  uniequipTable: UniequipTableForParser;
  materialConversionContext: MaterialConversionContext;
  operatorOverrideByCharId: Map<string, OperatorOverride>;
  server: BuiltOperatorServer;
  warningList?: OperatorBuildWarning[];
};

const pushWarning = (
  warningList: OperatorBuildWarning[] | undefined,
  warning: OperatorBuildWarning,
) => {
  if (warningList === undefined) {
    return;
  }

  warningList.push(warning);
};

const getSkillDisplayName = (
  skillId: string,
  defaultSkillName: string,
  operatorOverride: OperatorOverride | undefined,
) => {
  return operatorOverride?.translatedSkillNames?.[skillId] ?? defaultSkillName;
};

const createSkillNameBySkillId = (
  skillList: {
    skillId: string;
    name: string;
  }[],
  operatorOverride: OperatorOverride | undefined,
) => {
  return Object.fromEntries(
    skillList.map((skill) => {
      return [
        skill.skillId,
        getSkillDisplayName(skill.skillId, skill.name, operatorOverride),
      ];
    }),
  );
};

const createFinalSkillList = (
  skillList: {
    skillId: string;
    name: string;
  }[],
  operatorOverride: OperatorOverride | undefined,
) => {
  return skillList.map((skill) => {
    return getSkillDisplayName(skill.skillId, skill.name, operatorOverride);
  });
};

const createSkillUpgradeMaterials = (params: {
  charId: string;
  operatorName: string;
  common: ConvertedCommonSkillUpgradeMaterials;
  masteryBySkillId: Record<string, ConvertedSkillMasteryMaterials>;
  skillNameBySkillId: Record<string, string>;
  warningList?: OperatorBuildWarning[];
}): BuiltSkillUpgradeMaterials => {
  const skillUpgradeMaterials: BuiltSkillUpgradeMaterials = {
    common: params.common,
  };

  Object.entries(params.masteryBySkillId).forEach(
    ([skillId, masteryMaterials]) => {
      const skillName = params.skillNameBySkillId[skillId] ?? skillId;

      if (skillName === "common") {
        pushWarning(params.warningList, {
          charId: params.charId,
          operatorName: params.operatorName,
          type: "reserved_skill_name",
          message:
            "스킬명이 common이라 skillUpgradeMaterials.common과 충돌할 수 있습니다.",
        });

        return;
      }

      if (skillUpgradeMaterials[skillName] !== undefined) {
        pushWarning(params.warningList, {
          charId: params.charId,
          operatorName: params.operatorName,
          type: "duplicate_skill_name",
          message: `중복 스킬명이 있어 mastery 재료가 덮어써질 수 있습니다. skillName=${skillName}`,
        });
      }

      skillUpgradeMaterials[skillName] = masteryMaterials;
    },
  );

  return skillUpgradeMaterials;
};

const createModuleDisplayName = (
  module: ParsedModuleInfo,
  operatorOverride: OperatorOverride | undefined,
) => {
  return operatorOverride?.translatedModuleNames?.[module.type] ?? module.name;
};

const createBuiltModuleList = (
  moduleList: ParsedModuleInfo[],
  operatorOverride: OperatorOverride | undefined,
  server: BuiltOperatorServer,
): BuiltModuleInfo[] => {
  return moduleList.map((module) => {
    return {
      type: module.type,
      name: createModuleDisplayName(module, operatorOverride),
      charEquipOrder: module.charEquipOrder,
      server,
    };
  });
};

const createModuleMaterials = (
  convertedModuleMaterialsByType: Record<string, ConvertedModuleMaterials>,
) => {
  if (Object.keys(convertedModuleMaterialsByType).length === 0) {
    return null;
  }

  return convertedModuleMaterialsByType;
};

const pushMissingSkillWarnings = (params: {
  charId: string;
  operatorName: string;
  missingSkillIdList: string[];
  warningList?: OperatorBuildWarning[];
}) => {
  params.missingSkillIdList.forEach((skillId) => {
    pushWarning(params.warningList, {
      charId: params.charId,
      operatorName: params.operatorName,
      type: "missing_skill",
      message: `skill_table에서 skillId를 찾을 수 없습니다. skillId=${skillId}`,
    });
  });
};

export const buildOperator = ({
  charId,
  character,
  skillInfoById,
  uniequipTable,
  materialConversionContext,
  operatorOverride,
  server,
  warningList,
}: BuildOperatorParams): BuiltOperator => {
  const parsedCharacter = parseCharacterOperator(charId, character);
  const parsedSkillInfo = parseCharacterSkillInfo(character, skillInfoById);
  const parsedModuleInfo = parseCharacterModuleInfo(charId, uniequipTable);

  const operatorName = operatorOverride?.translatedName ?? parsedCharacter.name;

  pushMissingSkillWarnings({
    charId,
    operatorName,
    missingSkillIdList: parsedSkillInfo.missingSkillIdList,
    warningList,
  });

  const convertedCommonSkillUpgradeMaterials =
    convertCommonSkillUpgradeMaterials(
      materialConversionContext,
      parsedSkillInfo.skillUpgradeMaterials.common,
    );

  const convertedSkillMasteryMaterialsBySkillId =
    convertSkillMasteryMaterialsBySkillId(
      materialConversionContext,
      parsedSkillInfo.skillUpgradeMaterials.masteryBySkillId,
    );

  const skillNameBySkillId = createSkillNameBySkillId(
    parsedSkillInfo.skillList,
    operatorOverride,
  );

  const convertedModuleMaterialsByType = convertModuleMaterialsByType(
    materialConversionContext,
    parsedModuleInfo.moduleMaterials,
  );

  return {
    id: parsedCharacter.id,
    ...(operatorOverride?.legacyId !== undefined
      ? { legacyId: operatorOverride.legacyId }
      : {}),

    name: operatorName,
    ...(operatorOverride?.nicknameList !== undefined &&
    operatorOverride.nicknameList.length > 0
      ? { nicknameList: operatorOverride.nicknameList }
      : {}),

    imageFilename: parsedCharacter.imageFilename,

    class: parsedCharacter.class,
    rarity: parsedCharacter.rarity,

    growthType: operatorOverride?.growthType ?? "normal",

    eliteMaterials: convertEliteMaterials(
      materialConversionContext,
      parsedCharacter.eliteMaterials,
    ),

    skillList: createFinalSkillList(
      parsedSkillInfo.skillList,
      operatorOverride,
    ),
    ...(operatorOverride?.preferSkillIndexes !== undefined
      ? { preferSkillIndexes: operatorOverride.preferSkillIndexes }
      : {}),
    skillUpgradeMaterials: createSkillUpgradeMaterials({
      charId,
      operatorName,
      common: convertedCommonSkillUpgradeMaterials,
      masteryBySkillId: convertedSkillMasteryMaterialsBySkillId,
      skillNameBySkillId,
      warningList,
    }),

    moduleList: createBuiltModuleList(
      parsedModuleInfo.moduleList,
      operatorOverride,
      server,
    ),
    ...(operatorOverride?.preferModules !== undefined
      ? { preferModules: operatorOverride.preferModules }
      : {}),
    moduleMaterials: createModuleMaterials(convertedModuleMaterialsByType),

    server,
  };
};

export const buildOperatorList = ({
  operatorRecord,
  skillInfoById,
  uniequipTable,
  materialConversionContext,
  operatorOverrideByCharId,
  server,
  warningList,
}: BuildOperatorListParams): BuiltOperator[] => {
  return Object.entries(operatorRecord)
    .map(([charId, character]) => {
      return buildOperator({
        charId,
        character,
        skillInfoById,
        uniequipTable,
        materialConversionContext,
        operatorOverride: operatorOverrideByCharId.get(charId),
        server,
        warningList,
      });
    })
    .sort((operatorA, operatorB) => {
      return operatorA.id.localeCompare(operatorB.id);
    });
};
