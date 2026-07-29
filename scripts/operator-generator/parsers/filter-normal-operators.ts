import { operatorExclusionList } from "../../../src/data/operator/manual/operator-exclusions";

export type CharacterPhaseForOperatorFilter = {
  evolveCost?: unknown[] | null;
};

export type SkillLevelUpCostConditionForOperatorFilter = {
  levelUpCost?: unknown[] | null;
};

export type SkillForOperatorFilter = {
  skillId?: string;
  levelUpCostCond?: SkillLevelUpCostConditionForOperatorFilter[];
};

export type AllSkillLevelUpForOperatorFilter = {
  lvlUpCost?: unknown[] | null;
};

export type CharacterForOperatorFilter = {
  name?: string;
  appellation?: string;
  displayNumber?: string;

  profession?: string;
  rarity?: string;

  isNotObtainable?: boolean;

  phases?: CharacterPhaseForOperatorFilter[];
  skills?: SkillForOperatorFilter[];
  allSkillLvlup?: AllSkillLevelUpForOperatorFilter[];

  itemObtainApproach?: string | null;
};

export type ExcludedOperatorInfo = {
  charId: string;
  name: string;
  profession: string;
  rarity: string;
  reasons: string[];
};

export type FilteredOperatorRecordResult<
  TCharacter extends CharacterForOperatorFilter,
> = {
  operatorRecord: Record<string, TCharacter>;
  excludedOperatorList: ExcludedOperatorInfo[];
};

const PLAYABLE_PROFESSIONS = new Set([
  "PIONEER",
  "WARRIOR",
  "TANK",
  "SNIPER",
  "CASTER",
  "MEDIC",
  "SUPPORT",
  "SPECIAL",
]);

const RARITY_NUMBER_BY_TIER: Record<string, number> = {
  TIER_1: 1,
  TIER_2: 2,
  TIER_3: 3,
  TIER_4: 4,
  TIER_5: 5,
  TIER_6: 6,
};

const manualExclusionByCharId = Object.fromEntries(
  operatorExclusionList.map((exclusion) => {
    return [exclusion.charId, exclusion.reason];
  }),
);

const getStringValue = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }

  return "";
};

const getOperatorName = (character: CharacterForOperatorFilter) => {
  return (
    getStringValue(character.name) ||
    getStringValue(character.appellation) ||
    "-"
  );
};

const getRarityNumber = (character: CharacterForOperatorFilter) => {
  if (character.rarity === undefined) {
    return null;
  }

  return RARITY_NUMBER_BY_TIER[character.rarity] ?? null;
};

const hasValidCharIdShape = (charId: string) => {
  return charId.startsWith("char_");
};

const hasPlayableProfession = (character: CharacterForOperatorFilter) => {
  if (character.profession === undefined) {
    return false;
  }

  return PLAYABLE_PROFESSIONS.has(character.profession);
};

const hasValidRarity = (character: CharacterForOperatorFilter) => {
  return getRarityNumber(character) !== null;
};

const hasNonEmptyCost = (cost: unknown[] | null | undefined) => {
  return Array.isArray(cost) && cost.length > 0;
};

const hasAnyCommonSkillLevelUpCost = (
  character: CharacterForOperatorFilter,
) => {
  if (!Array.isArray(character.allSkillLvlup)) {
    return false;
  }

  return character.allSkillLvlup.some((levelUpInfo) => {
    return hasNonEmptyCost(levelUpInfo.lvlUpCost);
  });
};

const hasAnySkillMasteryCost = (character: CharacterForOperatorFilter) => {
  if (!Array.isArray(character.skills)) {
    return false;
  }

  return character.skills.some((skill) => {
    if (!Array.isArray(skill.levelUpCostCond)) {
      return false;
    }

    return skill.levelUpCostCond.some((levelUpCondition) => {
      return hasNonEmptyCost(levelUpCondition.levelUpCost);
    });
  });
};

const getExpectedElitePhaseIndexes = (rarityNumber: number) => {
  if (rarityNumber <= 3) {
    return [];
  }

  return [1, 2];
};

const getMaterialExclusionReasons = (character: CharacterForOperatorFilter) => {
  const reasons: string[] = [];
  const rarityNumber = getRarityNumber(character);

  if (rarityNumber === null) {
    return reasons;
  }

  if (!Array.isArray(character.phases) || character.phases.length === 0) {
    reasons.push("phases is missing or empty");
    return reasons;
  }

  const expectedElitePhaseIndexes = getExpectedElitePhaseIndexes(rarityNumber);

  expectedElitePhaseIndexes.forEach((phaseIndex) => {
    const phase = character.phases?.[phaseIndex];

    if (phase === undefined) {
      reasons.push(`expected elite phase ${phaseIndex} is missing`);
      return;
    }

    if (!hasNonEmptyCost(phase.evolveCost)) {
      reasons.push(`elite phase ${phaseIndex} evolveCost is missing or empty`);
    }
  });

  if (rarityNumber >= 3 && !hasAnyCommonSkillLevelUpCost(character)) {
    reasons.push("common skill level-up costs are missing");
  }

  if (rarityNumber >= 4 && !hasAnySkillMasteryCost(character)) {
    reasons.push("skill mastery costs are missing");
  }

  return reasons;
};

/**
 * report에 올릴 만한 후보인지 판단합니다.
 *
 * token, trap, NPC처럼 명백히 오퍼레이터가 아닌 항목은 조용히 무시하고,
 * char_ 형태이면서 직군/희귀도 중 일부라도 오퍼레이터 구조에 가까운 항목만
 * excluded report에 남깁니다.
 */
const isReportableOperatorCandidate = (
  charId: string,
  character: CharacterForOperatorFilter,
) => {
  if (manualExclusionByCharId[charId] !== undefined) {
    return true;
  }

  if (!hasValidCharIdShape(charId)) {
    return false;
  }

  if (hasPlayableProfession(character)) {
    return true;
  }

  if (hasValidRarity(character)) {
    return true;
  }

  return false;
};

const getExclusionReasons = (
  charId: string,
  character: CharacterForOperatorFilter,
) => {
  const reasons: string[] = [];

  const manualExclusionReason = manualExclusionByCharId[charId];

  if (manualExclusionReason !== undefined) {
    reasons.push(`manual exclusion: ${manualExclusionReason}`);
  }

  if (!hasValidCharIdShape(charId)) {
    reasons.push("charId does not start with char_");
  }

  if (character.profession === undefined) {
    reasons.push("profession is missing");
  } else if (!PLAYABLE_PROFESSIONS.has(character.profession)) {
    reasons.push(`profession is not playable: ${character.profession}`);
  }

  if (character.rarity === undefined) {
    reasons.push("rarity is missing");
  } else if (!hasValidRarity(character)) {
    reasons.push(`rarity is not valid: ${character.rarity}`);
  }

  if (getOperatorName(character) === "-") {
    reasons.push("name is missing");
  }

  reasons.push(...getMaterialExclusionReasons(character));

  return reasons;
};

export const isNormalOperator = (
  charId: string,
  character: CharacterForOperatorFilter,
) => {
  return getExclusionReasons(charId, character).length === 0;
};

export const createFilteredOperatorRecord = <
  TCharacter extends CharacterForOperatorFilter,
>(
  characterTable: Record<string, TCharacter>,
): FilteredOperatorRecordResult<TCharacter> => {
  const operatorRecord: Record<string, TCharacter> = {};
  const excludedOperatorList: ExcludedOperatorInfo[] = [];

  Object.entries(characterTable).forEach(([charId, character]) => {
    const reasons = getExclusionReasons(charId, character);

    if (reasons.length === 0) {
      operatorRecord[charId] = character;
      return;
    }

    if (!isReportableOperatorCandidate(charId, character)) {
      return;
    }

    excludedOperatorList.push({
      charId,
      name: getOperatorName(character),
      profession: character.profession ?? "-",
      rarity: character.rarity ?? "-",
      reasons,
    });
  });

  return {
    operatorRecord,
    excludedOperatorList: excludedOperatorList.sort((operatorA, operatorB) => {
      return operatorA.charId.localeCompare(operatorB.charId);
    }),
  };
};
