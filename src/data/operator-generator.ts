/**
 * operator-generator.ts
 * 
 * 목적:
 * - 인게임 character JSON + 최소 메타정보를 받아서
 * - 프로젝트의 Operator 객체 코드(export const ...)를 자동 생성합니다.
 * 
 * JSON 파일 경로:
 * https://github.com/ArknightsAssets/ArknightsGamedata
 * - bili/gamedata/excel 폴더 내부의, character_table.json, uniequip_table.json 파일 2개를 사용
 * 
 * 현재 JSON 파일 버전:
 * - CharacterTable/UniEquipTable: 20260617
 *
 * 인코딩 변경 (데이터 생성 전에 1회 실행, 복사 편의성을 위해 형식 무시):
$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
 *
 * 실제 사용 (복사 편의성을 위해 형식 무시):
npx tsx src/data/operator-generator.ts `
  --id 1 `
  --ko "" `
  --cn "" `
  --skills "" `
  --out src/data/generated `
  --source src/data/character_table.json `
  --module-source src/data/uniequip_table.json `
  --nicknames "" `
  --prefer ""
*
 * 주의:
 * - materialMap은 id -> Material 객체를 찾기 위해 사용합니다.
 * - ELITE_ONE_LMD_TABLE / ELITE_TWO_LMD_TABLE은 정예화 LMD 비용 자동 추가에 사용합니다.
 * - 모듈 이름 번역 및 선호 모듈 설정은 직접 해야하며, nicknames(별명) / prefer(선호 스킬) 부분도 마찬가지로 직접 해야합니다.
 */

import fs from "node:fs";
import path from "node:path";
import { materialMap } from "./material";
import { ELITE_ONE_LMD_TABLE, ELITE_TWO_LMD_TABLE } from "./operator/table";

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

type GeneratorArgs = {
  source: string;
  moduleSource?: string;
  id: number;
  ko: string;
  cn: string;
  skills: string[];
  nicknames: string[];
  out?: string;
  preferSkills?: string[];
  constName?: string;
  imageFilename?: string;
};

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

const splitCsv = (value: string): string[] => {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseCliArgs = (): GeneratorArgs => {
  const args = process.argv.slice(2);

  const getValue = (key: string): string | undefined => {
    const index = args.indexOf(key);
    return index === -1 ? undefined : args[index + 1];
  };

  const source = getValue("--source");
  const id = getValue("--id");
  const ko = getValue("--ko");
  const cn = getValue("--cn");
  const skills = getValue("--skills");
  const nicknames = getValue("--nicknames") ?? getValue("--nickname");

  if (!source || !id || !ko || !cn) {
    throw new Error(
      [
        "필수 인자가 부족합니다.",
        "필수: --source <path> --id <number> --ko <한글명> --cn <중국어명>",
        "선택: --skills <스킬1,스킬2,...> --nicknames <닉네임1,닉네임2,...> --module-source <path> --out <output-directory> --prefer <스킬명,스킬명> --const <ConstName> --image <imageFilename>",
      ].join("\n"),
    );
  }

  const parsedId = Number(id);

  if (!Number.isInteger(parsedId)) {
    throw new Error(`--id 값은 정수여야 합니다. 입력값: ${id}`);
  }

  return {
    source,
    moduleSource: getValue("--module-source"),
    id: parsedId,
    ko,
    cn,
    skills: splitCsv(skills ?? ""),
    nicknames: splitCsv(nicknames ?? ""),
    out: getValue("--out"),
    preferSkills: splitCsv(getValue("--prefer") ?? ""),
    constName: getValue("--const"),
    imageFilename: getValue("--image"),
  };
};

const parseLooseJson = <T>(rawText: string): T => {
  const trimmed = rawText.trim();

  try {
    return JSON.parse(trimmed) as T;
  } catch {
    // 아래에서 "key": { ... }, 형태를 다시 시도합니다.
  }

  const withoutTrailingComma = trimmed.replace(/,\s*$/, "");

  try {
    return JSON.parse(`{${withoutTrailingComma}}`) as T;
  } catch {
    // 아래에서 명확한 에러를 던집니다.
  }

  throw new Error(
    'JSON 파싱에 실패했습니다. 전체 JSON 객체 또는 "key": { ... }, 형태를 넣어주세요.',
  );
};

const parseLooseCharacterJson = (
  rawText: string,
): RawCharacterTable | RawCharacter => {
  return parseLooseJson<RawCharacterTable | RawCharacter>(rawText);
};

const extractModuleTable = (parsed: unknown): RawModuleTable => {
  if (!isObject(parsed)) {
    throw new Error("모듈 JSON은 객체 형태여야 합니다.");
  }

  const equipDict = parsed.equipDict;

  if (isObject(equipDict)) {
    return equipDict as RawModuleTable;
  }

  return parsed as RawModuleTable;
};

const findCharacterByChineseName = (
  parsed: RawCharacterTable | RawCharacter,
  chineseName: string,
): { key: string; character: RawCharacter } => {
  if (isRawCharacter(parsed)) {
    if (parsed.name !== chineseName) {
      throw new Error(
        `중국어 이름 "${chineseName}"에 해당하는 오퍼레이터를 찾지 못했습니다.`,
      );
    }

    return {
      key: parsed.appellation,
      character: parsed,
    };
  }

  const entry = Object.entries(parsed).find(([, character]) => {
    return character.name === chineseName;
  });

  if (!entry) {
    throw new Error(
      `중국어 이름 "${chineseName}"에 해당하는 오퍼레이터를 찾지 못했습니다.`,
    );
  }

  const [key, character] = entry;

  return {
    key,
    character,
  };
};

const getEnglishIdFromCharacter = (
  characterKey: string,
  character: RawCharacter,
): string => {
  const fromPotentialItemId = character.potentialItemId
    ?.split("_")
    .filter(Boolean)
    .at(-1);

  if (fromPotentialItemId) {
    return fromPotentialItemId;
  }

  const fromCharacterKey = characterKey.split("_").filter(Boolean).at(-1);

  if (fromCharacterKey) {
    return fromCharacterKey;
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

const toPascalCaseIdentifier = (
  value: string,
  fallbackValue?: string,
): string => {
  const createIdentifier = (source: string): string => {
    return source
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  };

  const normalized = createIdentifier(value);
  const fallbackNormalized = fallbackValue
    ? createIdentifier(fallbackValue)
    : "";
  const identifier = normalized || fallbackNormalized;

  if (!identifier) {
    throw new Error(`const 이름 생성 실패: ${value}`);
  }

  return /^[0-9]/.test(identifier) ? `Operator${identifier}` : identifier;
};

const toImageFilename = (appellation: string): string => {
  return appellation
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const quoteProperty = (key: string): string => {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
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

const withLmd = (
  count: number,
  costs: RawMaterialCost[],
): RawMaterialCost[] => {
  if (count <= 0) {
    return costs;
  }

  return [
    {
      id: "4001",
      count,
      type: "GOLD",
    },
    ...costs,
  ];
};

const buildEliteMaterialsCode = (
  character: RawCharacter,
  rarity: Rarity,
): string => {
  const eliteOneCosts = character.phases[1]?.evolveCost ?? [];
  const eliteTwoCosts = character.phases[2]?.evolveCost ?? [];

  const eliteOneLmd = ELITE_ONE_LMD_TABLE[rarity];
  const eliteTwoLmd = ELITE_TWO_LMD_TABLE[rarity];

  return [
    "  eliteMaterials: {",
    '    "0": [],',
    `    "1": ${toMaterialCostCode(withLmd(eliteOneLmd, eliteOneCosts), 2)},`,
    `    "2": ${toMaterialCostCode(withLmd(eliteTwoLmd, eliteTwoCosts), 2)},`,
    "  },",
  ].join("\n");
};

const buildCommonSkillMaterialsCode = (character: RawCharacter): string => {
  const entries = character.allSkillLvlup.map((levelUp, index) => {
    const targetLevel = String(index + 2);
    return `      "${targetLevel}": ${toMaterialCostCode(levelUp.lvlUpCost, 3)},`;
  });

  return ["    common: {", ...entries, "    },"].join("\n");
};

const buildSkillMasteryMaterialsCode = (
  character: RawCharacter,
  skillNames: string[],
): string => {
  if (character.skills.length === 0) {
    return "";
  }

  if (character.skills.length !== skillNames.length) {
    throw new Error(
      `스킬 개수가 맞지 않습니다. JSON skills=${character.skills.length}, 입력 skillNames=${skillNames.length}`,
    );
  }

  return character.skills
    .map((skill, skillIndex) => {
      const skillName = skillNames[skillIndex];

      const levelEntries = skill.levelUpCostCond.map((condition, index) => {
        const targetLevel = String(index + 8);
        return `      "${targetLevel}": ${toMaterialCostCode(condition.levelUpCost, 3)},`;
      });

      return [
        `    ${quoteProperty(skillName)}: {`,
        ...levelEntries,
        "    },",
      ].join("\n");
    })
    .join("\n");
};

const buildSkillUpgradeMaterialsCode = (
  character: RawCharacter,
  skillNames: string[],
  preferSkills: string[],
): string => {
  if (character.skills.length === 0) {
    return [
      "  skillList: [],",
      "  preferSkillList: [],",
      "  skillUpgradeMaterials: {",
      "    common: {},",
      "  },",
    ].join("\n");
  }

  return [
    `  skillList: ${toStringArrayCode(skillNames)},`,
    `  preferSkillList: ${toStringArrayCode(preferSkills)},`,
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

const buildModuleListCode = (modules: RawModule[]): string => {
  if (modules.length === 0) {
    return "  moduleList: [],";
  }

  const lines = modules.flatMap((module) => {
    const type = normalizeModuleType(module.typeIcon);

    return [
      "    {",
      `      type: ${JSON.stringify(type)},`,
      `      name: ${JSON.stringify(module.uniEquipName)},`,
      "    },",
    ];
  });

  return ["  moduleList: [", ...lines, "  ],"].join("\n");
};

const buildPreferModuleListCode = (): string => {
  return "  preferModuleList: [],";
};

const buildModuleMaterialsCode = (modules: RawModule[]): string => {
  if (modules.length === 0) {
    return "  moduleMaterials: {},";
  }

  const moduleEntries = modules.map((module) => {
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

  return ["  moduleMaterials: {", ...moduleEntries, "  },"].join("\n");
};

const buildModuleCode = (
  args: GeneratorArgs,
  characterKey: string,
  character: RawCharacter,
): string => {
  if (!args.moduleSource) {
    return [
      "  moduleList: [],",
      "  preferModuleList: [],",
      "  moduleMaterials: {},",
    ].join("\n");
  }

  const rawText = fs.readFileSync(args.moduleSource, "utf-8");
  const parsed = parseLooseJson<unknown>(rawText);
  const moduleTable = extractModuleTable(parsed);
  const englishId = getEnglishIdFromCharacter(characterKey, character);
  const modules = getModulesForCharacter(moduleTable, characterKey, englishId);

  return [
    buildModuleListCode(modules),
    buildPreferModuleListCode(),
    buildModuleMaterialsCode(modules),
  ].join("\n");
};

const buildNicknameListCode = (nicknames: string[]): string | null => {
  if (nicknames.length === 0) {
    return null;
  }

  return `  nicknameList: ${toStringArrayCode(nicknames)},`;
};

const toOutputFilenameBase = (
  appellation: string,
  fallbackValue: string,
): string => {
  const normalized = appellation
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized) {
    return normalized;
  }

  return fallbackValue
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const createOutputPath = (
  out: string,
  characterKey: string,
  character: RawCharacter,
): string => {
  const englishId = getEnglishIdFromCharacter(characterKey, character);
  const outputFilenameBase = toOutputFilenameBase(
    character.appellation,
    englishId,
  );
  const outputFileName = `${outputFilenameBase}.generated.ts`;
  const outputPath = path.resolve(out);

  if (path.extname(outputPath)) {
    return path.join(path.dirname(outputPath), outputFileName);
  }

  return path.join(outputPath, outputFileName);
};

const buildOperatorCode = (
  args: GeneratorArgs,
): { code: string; characterKey: string; character: RawCharacter } => {
  const rawText = fs.readFileSync(args.source, "utf-8");
  const parsed = parseLooseCharacterJson(rawText);
  const { key: characterKey, character } = findCharacterByChineseName(
    parsed,
    args.cn,
  );

  const rarity = getRarity(character.rarity);
  const operatorClass = getOperatorClass(character.profession);
  const englishId = getEnglishIdFromCharacter(characterKey, character);
  const constName =
    args.constName ?? toPascalCaseIdentifier(character.appellation, englishId);
  const imageFilename =
    (args.imageFilename ??
      toImageFilename(character.appellation || englishId)) ||
    englishId;

  const nicknameListCode = buildNicknameListCode(args.nicknames);

  const code = [
    "/* eslint-disable */",
    "// @ts-nocheck",
    "",
    `/** ${args.ko} */`,
    `export const ${constName}: ${operatorClass} = {`,
    `  id: ${args.id},`,
    `  name: ${JSON.stringify(args.ko)},`,
    ...(nicknameListCode ? [nicknameListCode] : []),
    `  imageFilename: ${JSON.stringify(imageFilename)},`,
    `  class: ${JSON.stringify(operatorClass)},`,
    `  rarity: ${rarity},`,
    buildEliteMaterialsCode(character, rarity),
    buildSkillUpgradeMaterialsCode(
      character,
      args.skills,
      args.preferSkills ?? [],
    ),
    buildModuleCode(args, characterKey, character),
    "};",
    "",
  ].join("\n");

  return {
    code,
    characterKey,
    character,
  };
};

const main = (): void => {
  const args = parseCliArgs();
  const { code, characterKey, character } = buildOperatorCode(args);

  if (args.out) {
    const outputPath = createOutputPath(args.out, characterKey, character);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, code, "utf-8");
    console.log(`생성 완료: ${outputPath}`);
    return;
  }

  console.log(code);
};

main();
