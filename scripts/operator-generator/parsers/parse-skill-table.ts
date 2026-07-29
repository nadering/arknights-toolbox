import {
  type CharacterForParser,
  type ParsedMaterialCost,
} from "./parse-character-table";

export type ParsedSkillLevelKey = "2" | "3" | "4" | "5" | "6" | "7";

export type ParsedSkillMasteryLevelKey = "8" | "9" | "10";

export type ParsedSkillInfo = {
  skillId: string;
  name: string;
};

export type ParsedSkillInfoRecord = Record<string, ParsedSkillInfo>;

export type ParsedCommonSkillUpgradeMaterials = Record<
  ParsedSkillLevelKey,
  ParsedMaterialCost[]
>;

export type ParsedSkillMasteryMaterials = Record<
  ParsedSkillMasteryLevelKey,
  ParsedMaterialCost[]
>;

export type ParsedCharacterSkillUpgradeMaterials = {
  common: ParsedCommonSkillUpgradeMaterials;

  /**
   * key는 skillId입니다.
   *
   * 최종 Operator 생성 단계에서 translatedSkillNames를 적용한 뒤
   * 실제 표시 스킬명 기준으로 변환하는 것을 권장합니다.
   */
  masteryBySkillId: Record<string, ParsedSkillMasteryMaterials>;
};

export type ParsedCharacterSkillInfo = {
  skillList: ParsedSkillInfo[];
  skillUpgradeMaterials: ParsedCharacterSkillUpgradeMaterials;
  missingSkillIdList: string[];
};

type SkillLevelInfo = {
  name?: string;
};

type SkillInfoForParser = {
  levels?: SkillLevelInfo[];
};

export type SkillTableForParser = Record<string, SkillInfoForParser>;

const SKILL_LEVEL_KEYS = ["2", "3", "4", "5", "6", "7"] as const;

const SKILL_MASTERY_LEVEL_KEYS = ["8", "9", "10"] as const;

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

const getSkillName = (skillId: string, skillInfo: SkillInfoForParser) => {
  if (!Array.isArray(skillInfo.levels)) {
    return skillId;
  }

  const firstNamedLevel = skillInfo.levels.find((level) => {
    return getStringValue(level.name) !== "";
  });

  return getStringValue(firstNamedLevel?.name) || skillId;
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

const createEmptyCommonSkillUpgradeMaterials =
  (): ParsedCommonSkillUpgradeMaterials => {
    return {
      "2": [],
      "3": [],
      "4": [],
      "5": [],
      "6": [],
      "7": [],
    };
  };

const createEmptySkillMasteryMaterials = (): ParsedSkillMasteryMaterials => {
  return {
    "8": [],
    "9": [],
    "10": [],
  };
};

const hasAnyMaterialCost = (
  materialRecord: Record<string, ParsedMaterialCost[]>,
) => {
  return Object.values(materialRecord).some((costList) => {
    return costList.length > 0;
  });
};

export const parseSkillTable = (
  skillTable: SkillTableForParser,
): ParsedSkillInfoRecord => {
  return Object.fromEntries(
    Object.entries(skillTable).map(([skillId, skillInfo]) => {
      return [
        skillId,
        {
          skillId,
          name: getSkillName(skillId, skillInfo),
        },
      ];
    }),
  );
};

const parseCommonSkillUpgradeMaterials = (
  character: CharacterForParser,
): ParsedCommonSkillUpgradeMaterials => {
  const commonSkillUpgradeMaterials = createEmptyCommonSkillUpgradeMaterials();

  if (!Array.isArray(character.allSkillLvlup)) {
    return commonSkillUpgradeMaterials;
  }

  SKILL_LEVEL_KEYS.forEach((levelKey, index) => {
    const levelUpInfo = character.allSkillLvlup?.[index];

    commonSkillUpgradeMaterials[levelKey] = parseMaterialCostList(
      levelUpInfo?.lvlUpCost,
    );
  });

  return commonSkillUpgradeMaterials;
};

const parseSkillMasteryMaterials = (
  skill: NonNullable<CharacterForParser["skills"]>[number],
): ParsedSkillMasteryMaterials => {
  const skillMasteryMaterials = createEmptySkillMasteryMaterials();

  if (!Array.isArray(skill.levelUpCostCond)) {
    return skillMasteryMaterials;
  }

  SKILL_MASTERY_LEVEL_KEYS.forEach((levelKey, index) => {
    const levelUpCondition = skill.levelUpCostCond?.[index];

    skillMasteryMaterials[levelKey] = parseMaterialCostList(
      levelUpCondition?.levelUpCost,
    );
  });

  return skillMasteryMaterials;
};

const parseSkillIdListFromCharacter = (character: CharacterForParser) => {
  if (!Array.isArray(character.skills)) {
    return [];
  }

  return character.skills
    .map((skill) => {
      return getStringValue(skill.skillId);
    })
    .filter((skillId) => {
      return skillId !== "";
    });
};

const parseSkillList = (
  character: CharacterForParser,
  skillInfoById: ParsedSkillInfoRecord,
) => {
  const missingSkillIdList: string[] = [];

  const skillList = parseSkillIdListFromCharacter(character).map((skillId) => {
    const skillInfo = skillInfoById[skillId];

    if (skillInfo === undefined) {
      missingSkillIdList.push(skillId);

      return {
        skillId,
        name: skillId,
      };
    }

    return skillInfo;
  });

  return {
    skillList,
    missingSkillIdList,
  };
};

const parseMasteryMaterialsBySkillId = (character: CharacterForParser) => {
  const masteryBySkillId: Record<string, ParsedSkillMasteryMaterials> = {};

  if (!Array.isArray(character.skills)) {
    return masteryBySkillId;
  }

  character.skills.forEach((skill) => {
    const skillId = getStringValue(skill.skillId);

    if (skillId === "") {
      return;
    }

    const skillMasteryMaterials = parseSkillMasteryMaterials(skill);

    if (!hasAnyMaterialCost(skillMasteryMaterials)) {
      return;
    }

    masteryBySkillId[skillId] = skillMasteryMaterials;
  });

  return masteryBySkillId;
};

export const parseCharacterSkillInfo = (
  character: CharacterForParser,
  skillInfoById: ParsedSkillInfoRecord,
): ParsedCharacterSkillInfo => {
  const { skillList, missingSkillIdList } = parseSkillList(
    character,
    skillInfoById,
  );

  return {
    skillList,
    skillUpgradeMaterials: {
      common: parseCommonSkillUpgradeMaterials(character),
      masteryBySkillId: parseMasteryMaterialsBySkillId(character),
    },
    missingSkillIdList,
  };
};
