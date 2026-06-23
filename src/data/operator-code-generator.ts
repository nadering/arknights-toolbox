import { materialMap } from "@/data/material";
import {
  ELITE_ONE_LMD_TABLE,
  ELITE_TWO_LMD_TABLE,
} from "@/data/operator";

export type OperatorSkillInput = {
  name: string;
  preferred: boolean;
};

export type GenerateOperatorCodeInput = {
  id: number;
  koreanName: string;
  chineseName: string;
  skills: OperatorSkillInput[];
};

type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

type OperatorClass =
  | "Vanguard"
  | "Guard"
  | "Defender"
  | "Sniper"
  | "Caster"
  | "Medic"
  | "Supporter"
  | "Specialist";

type RawMaterialCost = {
  id: string;
  count: number;
  type: string;
};

type RawPhase = {
  evolveCost: RawMaterialCost[] | null;
};

type RawSkill = {
  skillId: string;
  levelUpCostCond: {
    levelUpCost: RawMaterialCost[];
  }[];
};

type RawCharacter = {
  name: string;
  appellation: string;
  rarity: string;
  profession: string;
  potentialItemId?: string | null;
  phases: RawPhase[];
  skills: RawSkill[];
  allSkillLvlup: {
    lvlUpCost: RawMaterialCost[];
  }[];
};

type RawCharacterTable = Record<string, RawCharacter>;

type RawModule = {
  uniEquipId: string;
  uniEquipName: string;
  typeIcon: string;
  typeName1: string;
  typeName2: string | null;
  charId: string;
  itemCost: Record<string, RawMaterialCost[]> | null;
  charEquipOrder: number;
};

type RawModuleTable = Record<string, RawModule>;

const PROFESSION_TO_CLASS: Record<string, OperatorClass> = {
  PIONEER: "Vanguard",
  WARRIOR: "Guard",
  TANK: "Defender",
  SNIPER: "Sniper",
  CASTER: "Caster",
  MEDIC: "Medic",
  SUPPORT: "Supporter",
  SPECIAL: "Specialist",
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isRawCharacter = (value: unknown): value is RawCharacter => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.name === "string" &&
    typeof value.appellation === "string" &&
    typeof value.rarity === "string" &&
    typeof value.profession === "string" &&
    Array.isArray(value.phases) &&
    Array.isArray(value.skills) &&
    Array.isArray(value.allSkillLvlup)
  );
};

const isRawModule = (value: unknown): value is RawModule => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.uniEquipId === "string" &&
    typeof value.uniEquipName === "string" &&
    typeof value.typeIcon === "string" &&
    typeof value.typeName1 === "string" &&
    typeof value.charId === "string" &&
    typeof value.charEquipOrder === "number"
  );
};

const extractCharacterTable = (
  value: unknown,
): RawCharacterTable | RawCharacter => {
  if (isRawCharacter(value)) {
    return value;
  }

  if (!isObject(value)) {
    throw new Error("character_table 데이터 형식이 올바르지 않습니다.");
  }

  return value as RawCharacterTable;
};

const extractModuleTable = (value: unknown): RawModuleTable => {
  if (!isObject(value)) {
    throw new Error("uniequip_table 데이터 형식이 올바르지 않습니다.");
  }

  if (isObject(value.equipDict)) {
    return value.equipDict as RawModuleTable;
  }

  return value as RawModuleTable;
};

const findCharacterByChineseName = (
  table: RawCharacterTable | RawCharacter,
  chineseName: string,
): { characterKey: string; character: RawCharacter } => {
  if (isRawCharacter(table)) {
    if (table.name !== chineseName) {
      throw new Error(
        `중국어 이름 "${chineseName}"에 해당하는 오퍼레이터를 찾지 못했습니다.`,
      );
    }

    return {
      characterKey: table.appellation,
      character: table,
    };
  }

  const entry = Object.entries(table).find(([, character]) => {
    return isRawCharacter(character) && character.name === chineseName;
  });

  if (!entry) {
    throw new Error(
      `중국어 이름 "${chineseName}"에 해당하는 오퍼레이터를 찾지 못했습니다.`,
    );
  }

  return {
    characterKey: entry[0],
    character: entry[1],
  };
};

const getEnglishIdFromCharacter = (
  characterKey: string,
  character: RawCharacter,
): string => {
  const potentialItemEnglishId = character.potentialItemId
    ?.split("_")
    .filter(Boolean)
    .at(-1);

  if (potentialItemEnglishId) {
    return potentialItemEnglishId;
  }

  const characterKeyEnglishId = characterKey.split("_").filter(Boolean).at(-1);

  if (characterKeyEnglishId) {
    return characterKeyEnglishId;
  }

  throw new Error(`영어 ID를 찾지 못했습니다. characterKey=${characterKey}`);
};

const getRarity = (rawRarity: string): Rarity => {
  const match = rawRarity.match(/\d+/);

  if (!match) {
    throw new Error(`레어도 파싱 실패: ${rawRarity}`);
  }

  const rarity = Number(match[0]);

  if (![1, 2, 3, 4, 5, 6].includes(rarity)) {
    throw new Error(`지원하지 않는 레어도: ${rawRarity}`);
  }

  return rarity as Rarity;
};

const getOperatorClass = (profession: string): OperatorClass => {
  const operatorClass = PROFESSION_TO_CLASS[profession];

  if (!operatorClass) {
    throw new Error(`알 수 없는 profession: ${profession}`);
  }

  return operatorClass;
};

const createAsciiIdentifier = (value: string): string => {
  return value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};

const toPascalCaseIdentifier = (
  appellation: string,
  fallbackValue: string,
): string => {
  const identifier =
    createAsciiIdentifier(appellation) || createAsciiIdentifier(fallbackValue);

  if (!identifier) {
    throw new Error(`const 이름 생성 실패: ${appellation}`);
  }

  return /^[0-9]/.test(identifier) ? `Operator${identifier}` : identifier;
};

const toImageFilename = (
  appellation: string,
  fallbackValue: string,
): string => {
  const filename = appellation
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return filename || fallbackValue.toLowerCase();
};

const quoteProperty = (key: string): string => {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
    ? key
    : JSON.stringify(key);
};

const toStringArrayCode = (values: string[]): string => {
  return `[${values.map((value) => JSON.stringify(value)).join(", ")}]`;
};

const getMaterialObjectName = (id: string): string => {
  if (id === "4001" || id === "LMD") {
    return "LMD";
  }

  const material = materialMap.get(id);

  if (!material) {
    throw new Error(`materialMap에서 재료 ID "${id}"를 찾지 못했습니다.`);
  }

  return material.objectName;
};

const toMaterialCostCode = (
  costs: RawMaterialCost[],
  indentLevel = 3,
): string => {
  const indent = "  ".repeat(indentLevel);
  const childIndent = "  ".repeat(indentLevel + 1);

  if (costs.length === 0) {
    return "[]";
  }

  return [
    "[",
    ...costs.map((cost) => {
      const objectName = getMaterialObjectName(cost.id);

      return [
        `${childIndent}{`,
        `${childIndent}  material: ${objectName},`,
        `${childIndent}  count: ${cost.count},`,
        `${childIndent}},`,
      ].join("\n");
    }),
    `${indent}]`,
  ].join("\n");
};

const withLmd = (count: number, costs: RawMaterialCost[]): RawMaterialCost[] => {
  if (count <= 0) {
    return costs;
  }

  return [{ id: "4001", count, type: "GOLD" }, ...costs];
};

const buildEliteMaterialsCode = (
  character: RawCharacter,
  rarity: Rarity,
): string => {
  const eliteOneCosts = character.phases[1]?.evolveCost ?? [];
  const eliteTwoCosts = character.phases[2]?.evolveCost ?? [];

  return [
    "  eliteMaterials: {",
    '    "0": [],',
    `    "1": ${toMaterialCostCode(
      withLmd(ELITE_ONE_LMD_TABLE[rarity], eliteOneCosts),
      2,
    )},`,
    `    "2": ${toMaterialCostCode(
      withLmd(ELITE_TWO_LMD_TABLE[rarity], eliteTwoCosts),
      2,
    )},`,
    "  },",
  ].join("\n");
};

const buildCommonSkillMaterialsCode = (character: RawCharacter): string => {
  const entries = character.allSkillLvlup.map((levelUp, index) => {
    return `      "${index + 2}": ${toMaterialCostCode(
      levelUp.lvlUpCost,
      3,
    )},`;
  });

  return ["    common: {", ...entries, "    },"].join("\n");
};

const buildSkillMasteryMaterialsCode = (
  character: RawCharacter,
  skillNames: string[],
): string => {
  return character.skills
    .map((skill, skillIndex) => {
      const skillName = skillNames[skillIndex];
      const levels = skill.levelUpCostCond.map((condition, index) => {
        return `      "${index + 8}": ${toMaterialCostCode(
          condition.levelUpCost,
          3,
        )},`;
      });

      return [
        `    ${quoteProperty(skillName)}: {`,
        ...levels,
        "    },",
      ].join("\n");
    })
    .join("\n");
};

const buildSkillCode = (
  character: RawCharacter,
  skills: OperatorSkillInput[],
): string => {
  const normalizedSkills = skills
    .map((skill) => ({
      name: skill.name.trim(),
      preferred: skill.preferred,
    }))
    .filter((skill) => skill.name.length > 0);

  if (character.skills.length !== normalizedSkills.length) {
    throw new Error(
      `스킬 개수가 맞지 않습니다. 게임 데이터=${character.skills.length}, 입력=${normalizedSkills.length}`,
    );
  }

  if (character.skills.length === 0) {
    return [
      "  skillList: [],",
      "  preferSkillList: [],",
      "  skillUpgradeMaterials: {",
      "    common: {},",
      "  },",
    ].join("\n");
  }

  const skillNames = normalizedSkills.map((skill) => skill.name);
  const preferredSkillNames = normalizedSkills
    .filter((skill) => skill.preferred)
    .map((skill) => skill.name);

  return [
    `  skillList: ${toStringArrayCode(skillNames)},`,
    `  preferSkillList: ${toStringArrayCode(preferredSkillNames)},`,
    "  skillUpgradeMaterials: {",
    buildCommonSkillMaterialsCode(character),
    buildSkillMasteryMaterialsCode(character, skillNames),
    "  },",
  ].join("\n");
};

const normalizeModuleType = (typeIcon: string): string => {
  return typeIcon.trim().toUpperCase();
};

const getModulesForCharacter = (
  moduleTable: RawModuleTable,
  characterKey: string,
  englishId: string,
): RawModule[] => {
  return Object.values(moduleTable)
    .filter(isRawModule)
    .filter((module) => {
      const isOriginal =
        module.typeName1 === "ORIGINAL" || module.typeIcon === "original";
      const isSameCharacter =
        module.charId === characterKey ||
        module.uniEquipId.endsWith(`_${englishId}`);

      return !isOriginal && isSameCharacter;
    })
    .sort((a, b) => a.charEquipOrder - b.charEquipOrder);
};

const buildModuleCode = (modules: RawModule[]): string => {
  if (modules.length === 0) {
    return [
      "  moduleList: [],",
      "  preferModuleList: [],",
      "  moduleMaterials: {},",
    ].join("\n");
  }

  const moduleListLines = modules.flatMap((module) => {
    return [
      "    {",
      `      type: ${JSON.stringify(normalizeModuleType(module.typeIcon))},`,
      `      name: ${JSON.stringify(module.uniEquipName)},`,
      "    },",
    ];
  });

  const moduleMaterialLines = modules.map((module) => {
    const type = normalizeModuleType(module.typeIcon);
    const itemCost = module.itemCost ?? {};

    return [
      `    ${JSON.stringify(type)}: {`,
      `      "1": ${toMaterialCostCode(itemCost["1"] ?? [], 3)},`,
      `      "2": ${toMaterialCostCode(itemCost["2"] ?? [], 3)},`,
      `      "3": ${toMaterialCostCode(itemCost["3"] ?? [], 3)},`,
      "    },",
    ].join("\n");
  });

  return [
    "  moduleList: [",
    ...moduleListLines,
    "  ],",
    "  preferModuleList: [],",
    "  moduleMaterials: {",
    ...moduleMaterialLines,
    "  },",
  ].join("\n");
};

export const generateOperatorCode = (
  input: GenerateOperatorCodeInput,
  characterTableValue: unknown,
  moduleTableValue?: unknown,
): string => {
  if (!Number.isInteger(input.id) || input.id < 0) {
    throw new Error("아이디는 0 이상의 정수여야 합니다.");
  }

  const koreanName = input.koreanName.trim();
  const chineseName = input.chineseName.trim();

  if (!koreanName || !chineseName) {
    throw new Error("한글 이름과 중국어 이름을 모두 입력해 주세요.");
  }

  const characterTable = extractCharacterTable(characterTableValue);
  const { characterKey, character } = findCharacterByChineseName(
    characterTable,
    chineseName,
  );

  const rarity = getRarity(character.rarity);
  const operatorClass = getOperatorClass(character.profession);
  const englishId = getEnglishIdFromCharacter(characterKey, character);
  const constName = toPascalCaseIdentifier(character.appellation, englishId);
  const imageFilename = toImageFilename(character.appellation, englishId);

  const modules = moduleTableValue
    ? getModulesForCharacter(
        extractModuleTable(moduleTableValue),
        characterKey,
        englishId,
      )
    : [];

  return [
    `/** ${koreanName} */`,
    `export const ${constName}: ${operatorClass} = {`,
    `  id: ${input.id},`,
    `  name: ${JSON.stringify(koreanName)},`,
    `  imageFilename: ${JSON.stringify(imageFilename)},`,
    `  class: ${JSON.stringify(operatorClass)},`,
    `  rarity: ${rarity},`,
    buildEliteMaterialsCode(character, rarity),
    buildSkillCode(character, input.skills),
    buildModuleCode(modules),
    "};",
  ].join("\n");
};
