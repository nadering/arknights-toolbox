import { type CharacterForOperatorFilter } from "./filter-normal-operators";

export type ParsedRarityNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type ParsedOperatorClass =
  | "Vanguard"
  | "Guard"
  | "Defender"
  | "Sniper"
  | "Caster"
  | "Medic"
  | "Supporter"
  | "Specialist";

export type ParsedMaterialCost = {
  itemId: string;
  count: number;
};

export type ParsedEliteMaterials = {
  "0": ParsedMaterialCost[];
  "1": ParsedMaterialCost[];
  "2": ParsedMaterialCost[];
};

export type ParsedCharacterOperator = {
  id: string;

  name: string;
  appellation: string;
  displayNumber: string;

  imageFilename: string;

  class: ParsedOperatorClass;
  rarity: ParsedRarityNumber;

  eliteMaterials: ParsedEliteMaterials;

  /**
   * character_table의 skills 순서를 유지합니다.
   *
   * 이후 skill_table parser에서 skillId를 스킬명/마스터리 재료로 변환할 때 사용합니다.
   */
  skillIdList: string[];
};

type CharacterPhaseInfo = NonNullable<
  CharacterForOperatorFilter["phases"]
>[number] & {
  evolveCost?: unknown[] | null;
};

type CharacterSkillInfo = NonNullable<
  CharacterForOperatorFilter["skills"]
>[number] & {
  skillId?: string;
};

export type CharacterForParser = CharacterForOperatorFilter & {
  name?: string;
  appellation?: string;
  displayNumber?: string;

  phases?: CharacterPhaseInfo[];
  skills?: CharacterSkillInfo[];
};

export type CharacterTableForParser = Record<string, CharacterForParser>;

const OPERATOR_CLASS_BY_PROFESSION: Record<string, ParsedOperatorClass> = {
  PIONEER: "Vanguard",
  WARRIOR: "Guard",
  TANK: "Defender",
  SNIPER: "Sniper",
  CASTER: "Caster",
  MEDIC: "Medic",
  SUPPORT: "Supporter",
  SPECIAL: "Specialist",
};

const RARITY_NUMBER_BY_TIER: Record<string, ParsedRarityNumber> = {
  TIER_1: 1,
  TIER_2: 2,
  TIER_3: 3,
  TIER_4: 4,
  TIER_5: 5,
  TIER_6: 6,
};

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

const getRequiredStringValue = (
  value: unknown,
  fieldName: string,
  charId: string,
) => {
  const stringValue = getStringValue(value);

  if (stringValue === "") {
    throw new Error(`${charId}: ${fieldName} 값이 비어 있습니다.`);
  }

  return stringValue;
};

const getOperatorClass = (charId: string, profession: unknown) => {
  const professionValue = getRequiredStringValue(
    profession,
    "profession",
    charId,
  );

  const operatorClass = OPERATOR_CLASS_BY_PROFESSION[professionValue];

  if (operatorClass === undefined) {
    throw new Error(
      `${charId}: 지원하지 않는 profession입니다. profession=${professionValue}`,
    );
  }

  return operatorClass;
};

const getRarityNumber = (charId: string, rarity: unknown) => {
  const rarityValue = getRequiredStringValue(rarity, "rarity", charId);
  const rarityNumber = RARITY_NUMBER_BY_TIER[rarityValue];

  if (rarityNumber === undefined) {
    throw new Error(
      `${charId}: 지원하지 않는 rarity입니다. rarity=${rarityValue}`,
    );
  }

  return rarityNumber;
};

const normalizeImageFilename = (value: string) => {
  const filename = value.replace(/\\/g, "/").split("/").pop() ?? value;
  const filenameWithoutExtension = filename.replace(
    /\.(png|jpg|jpeg|webp)$/i,
    "",
  );

  return filenameWithoutExtension
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getEnglishIdFromCharacter = (charId: string) => {
  return charId.split("_").slice(2).join("_");
};

const createImageFilename = (charId: string, character: CharacterForParser) => {
  const filename = normalizeImageFilename(
    getStringValue(character.appellation),
  );

  if (filename !== "") {
    return filename;
  }

  return getEnglishIdFromCharacter(charId).toLowerCase();
};

const parseMaterialCost = (value: unknown): ParsedMaterialCost | null => {
  const record = getUnknownRecord(value);
  const itemId = getStringValue(record.id);
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

const parseElitePhaseCostList = (
  character: CharacterForParser,
  phaseIndex: 0 | 1 | 2,
) => {
  const phase = character.phases?.[phaseIndex];

  if (phase === undefined) {
    return [];
  }

  return parseMaterialCostList(phase.evolveCost);
};

const parseEliteMaterials = (
  character: CharacterForParser,
): ParsedEliteMaterials => {
  return {
    "0": parseElitePhaseCostList(character, 0),
    "1": parseElitePhaseCostList(character, 1),
    "2": parseElitePhaseCostList(character, 2),
  };
};

const parseSkillIdList = (character: CharacterForParser) => {
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

export const parseCharacterOperator = (
  charId: string,
  character: CharacterForParser,
): ParsedCharacterOperator => {
  return {
    id: charId,

    name: getRequiredStringValue(character.name, "name", charId),
    appellation: getStringValue(character.appellation),
    displayNumber: getStringValue(character.displayNumber),

    imageFilename: createImageFilename(charId, character),

    class: getOperatorClass(charId, character.profession),
    rarity: getRarityNumber(charId, character.rarity),

    eliteMaterials: parseEliteMaterials(character),

    skillIdList: parseSkillIdList(character),
  };
};

export const parseCharacterTable = (
  characterTable: CharacterTableForParser,
) => {
  return Object.entries(characterTable)
    .map(([charId, character]) => {
      return parseCharacterOperator(charId, character);
    })
    .sort((operatorA, operatorB) => {
      return operatorA.id.localeCompare(operatorB.id);
    });
};
