import fs from "node:fs";
import path from "node:path";
import { operatorList } from "@/data/operator";
import { type OperatorOverride } from "@/data/operator/manual/operator-override";
import { operatorMatchExclusionList } from "@/data/operator/manual/operator-match-exclusions";
import {
  CN_CHARACTER_TABLE_PATH,
  CN_UNIEQUIP_TABLE_PATH,
  GLOBAL_CHARACTER_TABLE_PATH,
  GLOBAL_UNIEQUIP_TABLE_PATH,
} from "../table-path";
import {
  loadCnGamedataPath,
  loadGamedataPath,
} from "../operator-generator/loaders/load-gamedata-path";
import {
  createFilteredOperatorRecord,
  type CharacterForOperatorFilter,
} from "../operator-generator/parsers/filter-normal-operators";
import {
  createModuleTypeFromParts,
  normalizeModuleTypeForCompare,
} from "../operator-generator/utils/module-type";

const OVERRIDE_DRAFT_OUTPUT_PATH =
  "src/data/operator/generated/operator-overrides.draft.generated.ts";

const OVERRIDE_REPORT_OUTPUT_PATH =
  "src/data/operator/generated/operator-override-report.md";

type Server = "global" | "future";

type MatchMethod = "name" | "imageFilename";

type OperatorMatchExclusion = {
  legacyId: number;
  reason: string;
};

type LegacyOperator = {
  id?: unknown;
  name?: unknown;
  imageFilename?: unknown;

  skillList?: unknown;
  moduleList?: unknown;

  nicknameList?: unknown;
  preferSkillList?: unknown;

  preferModules?: unknown;
  preferModuleList?: unknown;
  preferModuleInfoList?: unknown;
  preferModuleNameList?: unknown;

  preferModule?: unknown;
  preferModuleInfo?: unknown;
  preferModuleName?: unknown;
};

type CharacterSkillInfo = NonNullable<
  CharacterForOperatorFilter["skills"]
>[number] & {
  skillId?: string;
};

type CharacterInfo = CharacterForOperatorFilter & {
  displayNumber?: string;
  skills?: CharacterSkillInfo[];
};

type CharacterTable = Record<string, CharacterInfo>;

type UniequipInfo = {
  uniEquipId?: string;
  uniEquipName?: string;
  type?: string;
  typeName1?: string;
  typeName2?: string;
  charId?: string;
  tmplId?: string | null;
  charEquipOrder?: number;
};

type UniequipTable = {
  equipDict?: Record<string, UniequipInfo>;
};

type GameModuleInfo = {
  type: string;
  name: string;
  charEquipOrder: number;
};

type LegacyModuleInfo = {
  type: string;
  name: string;
};

type CharacterCandidate = {
  charId: string;
  character: CharacterInfo;
  server: Server;
  imageFilename: string;
};

type MatchedOperatorInfo = {
  legacyOperator: LegacyOperator;
  charId: string;
  character: CharacterInfo;
  server: Server;
  matchMethod: MatchMethod;
};

type UnmatchedLegacyOperatorInfo = {
  legacyId: number | null;
  name: string;
  imageFilename: string;
  reason: string;
};

type AmbiguousLegacyOperatorInfo = {
  legacyId: number | null;
  name: string;
  imageFilename: string;
  reason: string;
  candidateCharIds: string[];
};

type ImageFilenameMatchedOperatorInfo = {
  legacyId: number | null;
  name: string;
  imageFilename: string;
  charId: string;
  server: Server;
};

type ManuallyManagedLegacyOperatorInfo = {
  legacyId: number;
  name: string;
  imageFilename: string;
  reason: string;
};

type UnmatchedPreferSkillInfo = {
  charId: string;
  operatorName: string;
  skillName: string;
  availableSkillNames: string[];
};

type UnmatchedPreferModuleInfo = {
  charId: string;
  operatorName: string;
  moduleName: string;
  availableModules: GameModuleInfo[];
};

type ExtractOverrideResult = {
  overrideList: OperatorOverride[];
  unmatchedLegacyOperatorList: UnmatchedLegacyOperatorInfo[];
  ambiguousLegacyOperatorList: AmbiguousLegacyOperatorInfo[];
  imageFilenameMatchedOperatorList: ImageFilenameMatchedOperatorInfo[];
  manuallyManagedLegacyOperatorList: ManuallyManagedLegacyOperatorInfo[];
  unmatchedPreferSkillList: UnmatchedPreferSkillInfo[];
  unmatchedPreferModuleList: UnmatchedPreferModuleInfo[];
};

const matchExclusionByLegacyId = new Map(
  operatorMatchExclusionList.map((exclusion) => {
    const typedExclusion = exclusion as OperatorMatchExclusion;

    return [typedExclusion.legacyId, typedExclusion];
  }),
);

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

const getIntegerValue = (value: unknown) => {
  const numberValue = getNumberValue(value);

  if (numberValue !== null && Number.isInteger(numberValue)) {
    return numberValue;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsedValue = Number(value);

    if (Number.isInteger(parsedValue)) {
      return parsedValue;
    }
  }

  return null;
};

const isUsefulSingleValue = (value: unknown) => {
  if (typeof value === "string") {
    return value.trim() !== "";
  }

  if (typeof value === "number") {
    return Number.isFinite(value);
  }

  if (typeof value === "object" && value !== null) {
    return true;
  }

  return false;
};

const createLegacyOperator = (rawOperator: unknown): LegacyOperator => {
  const operatorRecord = getUnknownRecord(rawOperator);

  return {
    id: operatorRecord.id,
    name: operatorRecord.name,
    imageFilename: operatorRecord.imageFilename,

    skillList: operatorRecord.skillList,
    moduleList: operatorRecord.moduleList,

    nicknameList: operatorRecord.nicknameList,
    preferSkillList: operatorRecord.preferSkillList,

    preferModules: operatorRecord.preferModules,
    preferModuleList: operatorRecord.preferModuleList,
    preferModuleInfoList: operatorRecord.preferModuleInfoList,
    preferModuleNameList: operatorRecord.preferModuleNameList,

    preferModule: operatorRecord.preferModule,
    preferModuleInfo: operatorRecord.preferModuleInfo,
    preferModuleName: operatorRecord.preferModuleName,
  };
};

const getLegacyId = (legacyOperator: LegacyOperator) => {
  return getNumberValue(legacyOperator.id);
};

const getLegacyName = (legacyOperator: LegacyOperator) => {
  return getStringValue(legacyOperator.name);
};

const getLegacyImageFilename = (legacyOperator: LegacyOperator) => {
  return getStringValue(legacyOperator.imageFilename);
};

const getStringArrayProperty = (
  target: LegacyOperator,
  propertyNames: string[],
) => {
  const targetRecord = getUnknownRecord(target);

  const matchedValue = propertyNames
    .map((propertyName) => {
      return targetRecord[propertyName];
    })
    .find((value) => {
      return Array.isArray(value);
    });

  if (!Array.isArray(matchedValue)) {
    return [];
  }

  return matchedValue.filter((value): value is string => {
    return typeof value === "string" && value.trim() !== "";
  });
};

const getLegacySkillNameList = (legacyOperator: LegacyOperator) => {
  return getStringArrayProperty(legacyOperator, ["skillList"]);
};

const getLegacyNicknameList = (legacyOperator: LegacyOperator) => {
  return getStringArrayProperty(legacyOperator, ["nicknameList"]);
};

const getLegacyPreferSkillNameList = (legacyOperator: LegacyOperator) => {
  return getStringArrayProperty(legacyOperator, ["preferSkillList"]);
};

const normalizeText = (value: string) => {
  return value.replace(/\s+/g, "").toLowerCase();
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

const getEnglishIdFromCharacter = (characterKey: string) => {
  return characterKey.split("_").slice(2).join("_");
};

const toImageFilename = (
  appellation: string | undefined,
  fallbackValue: string,
) => {
  const filename = normalizeImageFilename(getStringValue(appellation));

  return filename || fallbackValue.toLowerCase();
};

const createCandidateImageFilename = (
  charId: string,
  character: CharacterInfo,
) => {
  const englishId = getEnglishIdFromCharacter(charId);

  return toImageFilename(character.appellation, englishId);
};

const createCharacterCandidateList = (
  globalCharacterTable: CharacterTable,
  cnCharacterTable: CharacterTable,
) => {
  const globalFilterResult =
    createFilteredOperatorRecord<CharacterInfo>(globalCharacterTable);
  const cnFilterResult =
    createFilteredOperatorRecord<CharacterInfo>(cnCharacterTable);

  const globalCharIdSet = new Set(
    Object.keys(globalFilterResult.operatorRecord),
  );

  const globalCandidateList: CharacterCandidate[] = Object.entries(
    globalFilterResult.operatorRecord,
  ).map(([charId, character]) => {
    return {
      charId,
      character,
      server: "global",
      imageFilename: createCandidateImageFilename(charId, character),
    };
  });

  const futureCandidateList: CharacterCandidate[] = Object.entries(
    cnFilterResult.operatorRecord,
  )
    .filter(([charId]) => {
      return !globalCharIdSet.has(charId);
    })
    .map(([charId, character]) => {
      return {
        charId,
        character,
        server: "future",
        imageFilename: createCandidateImageFilename(charId, character),
      };
    });

  return [...globalCandidateList, ...futureCandidateList];
};

const findMatchedCandidatesByName = (
  legacyOperator: LegacyOperator,
  candidateList: CharacterCandidate[],
) => {
  const legacyName = getLegacyName(legacyOperator);

  if (legacyName === "") {
    return [];
  }

  return candidateList.filter((candidate) => {
    return candidate.character.name === legacyName;
  });
};

const findMatchedCandidatesByImageFilename = (
  legacyOperator: LegacyOperator,
  candidateList: CharacterCandidate[],
) => {
  const legacyImageFilename = getLegacyImageFilename(legacyOperator);

  if (legacyImageFilename === "") {
    return [];
  }

  return candidateList.filter((candidate) => {
    return (
      normalizeImageFilename(candidate.imageFilename) ===
      normalizeImageFilename(legacyImageFilename)
    );
  });
};

const createMatchedOperatorInfo = (
  legacyOperator: LegacyOperator,
  candidate: CharacterCandidate,
  matchMethod: MatchMethod,
): MatchedOperatorInfo => {
  return {
    legacyOperator,
    charId: candidate.charId,
    character: candidate.character,
    server: candidate.server,
    matchMethod,
  };
};

const findMatchedOperatorList = (
  legacyOperatorList: LegacyOperator[],
  candidateList: CharacterCandidate[],
) => {
  const matchedOperatorList: MatchedOperatorInfo[] = [];
  const unmatchedLegacyOperatorList: UnmatchedLegacyOperatorInfo[] = [];
  const ambiguousLegacyOperatorList: AmbiguousLegacyOperatorInfo[] = [];
  const imageFilenameMatchedOperatorList: ImageFilenameMatchedOperatorInfo[] =
    [];
  const manuallyManagedLegacyOperatorList: ManuallyManagedLegacyOperatorInfo[] =
    [];

  legacyOperatorList.forEach((legacyOperator) => {
    const legacyId = getLegacyId(legacyOperator);
    const legacyName = getLegacyName(legacyOperator);
    const legacyImageFilename = getLegacyImageFilename(legacyOperator);

    if (legacyId !== null) {
      const matchExclusion = matchExclusionByLegacyId.get(legacyId);

      if (matchExclusion !== undefined) {
        manuallyManagedLegacyOperatorList.push({
          legacyId,
          name: legacyName || "-",
          imageFilename: legacyImageFilename || "-",
          reason: matchExclusion.reason,
        });

        return;
      }
    }

    if (legacyName === "" && legacyImageFilename === "") {
      unmatchedLegacyOperatorList.push({
        legacyId,
        name: "-",
        imageFilename: "-",
        reason: "legacy operator name and imageFilename are missing",
      });

      return;
    }

    const nameMatchedCandidates = findMatchedCandidatesByName(
      legacyOperator,
      candidateList,
    );

    if (nameMatchedCandidates.length === 1) {
      matchedOperatorList.push(
        createMatchedOperatorInfo(
          legacyOperator,
          nameMatchedCandidates[0],
          "name",
        ),
      );

      return;
    }

    const imageMatchedCandidates = findMatchedCandidatesByImageFilename(
      legacyOperator,
      candidateList,
    );

    if (imageMatchedCandidates.length === 1) {
      const matchedCandidate = imageMatchedCandidates[0];

      matchedOperatorList.push(
        createMatchedOperatorInfo(
          legacyOperator,
          matchedCandidate,
          "imageFilename",
        ),
      );

      imageFilenameMatchedOperatorList.push({
        legacyId,
        name: legacyName || "-",
        imageFilename: legacyImageFilename || "-",
        charId: matchedCandidate.charId,
        server: matchedCandidate.server,
      });

      return;
    }

    if (nameMatchedCandidates.length > 1) {
      ambiguousLegacyOperatorList.push({
        legacyId,
        name: legacyName || "-",
        imageFilename: legacyImageFilename || "-",
        reason: "multiple candidates matched by name",
        candidateCharIds: nameMatchedCandidates.map((candidate) => {
          return candidate.charId;
        }),
      });

      return;
    }

    if (imageMatchedCandidates.length > 1) {
      ambiguousLegacyOperatorList.push({
        legacyId,
        name: legacyName || "-",
        imageFilename: legacyImageFilename || "-",
        reason: "multiple candidates matched by imageFilename",
        candidateCharIds: imageMatchedCandidates.map((candidate) => {
          return candidate.charId;
        }),
      });

      return;
    }

    unmatchedLegacyOperatorList.push({
      legacyId,
      name: legacyName || "-",
      imageFilename: legacyImageFilename || "-",
      reason:
        "matching character was not found by name or imageFilename in global/CN character_table",
    });
  });

  return {
    matchedOperatorList,
    unmatchedLegacyOperatorList,
    ambiguousLegacyOperatorList,
    imageFilenameMatchedOperatorList,
    manuallyManagedLegacyOperatorList,
  };
};

const createTranslatedName = (
  legacyOperator: LegacyOperator,
  character: CharacterInfo,
  server: Server,
): OperatorOverride["translatedName"] => {
  if (server !== "future") {
    return undefined;
  }

  const legacyName = getLegacyName(legacyOperator);

  if (legacyName === "" || legacyName === character.name) {
    return undefined;
  }

  return legacyName;
};

const createPreferSkillIndexes = (
  charId: string,
  operatorName: string,
  legacyOperator: LegacyOperator,
  unmatchedPreferSkillList: UnmatchedPreferSkillInfo[],
): OperatorOverride["preferSkillIndexes"] => {
  const legacySkillNameList = getLegacySkillNameList(legacyOperator);
  const preferSkillNameList = getLegacyPreferSkillNameList(legacyOperator);

  if (preferSkillNameList.length === 0) {
    return undefined;
  }

  const preferSkillIndexes: NonNullable<
    OperatorOverride["preferSkillIndexes"]
  > = [];

  preferSkillNameList.forEach((preferSkillName) => {
    const matchedIndex = legacySkillNameList.findIndex((skillName) => {
      return normalizeText(skillName) === normalizeText(preferSkillName);
    });

    if (matchedIndex === 0 || matchedIndex === 1 || matchedIndex === 2) {
      preferSkillIndexes.push(matchedIndex);
      return;
    }

    unmatchedPreferSkillList.push({
      charId,
      operatorName,
      skillName: preferSkillName,
      availableSkillNames: legacySkillNameList,
    });
  });

  if (preferSkillIndexes.length === 0) {
    return undefined;
  }

  return Array.from(new Set(preferSkillIndexes));
};

const createTranslatedSkillNames = (
  legacyOperator: LegacyOperator,
  character: CharacterInfo,
): OperatorOverride["translatedSkillNames"] => {
  const legacySkillNameList = getLegacySkillNameList(legacyOperator);

  if (legacySkillNameList.length === 0 || !Array.isArray(character.skills)) {
    return undefined;
  }

  const translatedSkillNames = Object.fromEntries(
    character.skills
      .map((skill, index) => {
        const skillId = getStringValue(skill.skillId);
        const legacySkillName = legacySkillNameList[index];

        if (skillId === "" || legacySkillName === undefined) {
          return null;
        }

        return [skillId, legacySkillName];
      })
      .filter((entry): entry is [string, string] => {
        return entry !== null;
      }),
  );

  if (Object.keys(translatedSkillNames).length === 0) {
    return undefined;
  }

  return translatedSkillNames;
};

const normalizeModuleTypeNamePart = (value: string) => {
  if (value === "D") {
    return "Δ";
  }

  return value;
};

const createGameModuleType = (module: UniequipInfo) => {
  return createModuleTypeFromParts(
    getStringValue(module.typeName1),
    getStringValue(module.typeName2),
    getStringValue(module.type),
  );
};

const getModuleOwnerId = (module: UniequipInfo) => {
  return getStringValue(module.tmplId) || getStringValue(module.charId);
};

const sortGameModuleList = (moduleList: GameModuleInfo[]) => {
  return [...moduleList].sort((moduleA, moduleB) => {
    if (moduleA.charEquipOrder !== moduleB.charEquipOrder) {
      return moduleA.charEquipOrder - moduleB.charEquipOrder;
    }

    return moduleA.type.localeCompare(moduleB.type);
  });
};

const createGameModuleList = (
  charId: string,
  uniequipTable: UniequipTable,
): GameModuleInfo[] => {
  const equipDict = uniequipTable.equipDict ?? {};

  return sortGameModuleList(
    Object.values(equipDict)
      .filter((module) => {
        return (
          getModuleOwnerId(module) === charId &&
          getStringValue(module.type) !== "INITIAL"
        );
      })
      .map((module) => {
        return {
          type: createGameModuleType(module),
          name: getStringValue(module.uniEquipName),
          charEquipOrder: module.charEquipOrder ?? 999,
        };
      })
      .filter((module) => {
        return module.type !== "";
      }),
  );
};

const createMergedGameModuleList = (
  charId: string,
  globalUniequipTable: UniequipTable,
  cnUniequipTable: UniequipTable,
  server: Server,
): GameModuleInfo[] => {
  if (server === "future") {
    return createGameModuleList(charId, cnUniequipTable);
  }

  const globalModuleList = createGameModuleList(charId, globalUniequipTable);
  const globalModuleTypeSet = new Set(
    globalModuleList.map((module) => {
      return module.type;
    }),
  );

  const cnOnlyModuleList = createGameModuleList(charId, cnUniequipTable).filter(
    (module) => {
      return !globalModuleTypeSet.has(module.type);
    },
  );

  return sortGameModuleList([...globalModuleList, ...cnOnlyModuleList]);
};

const createModuleTranslationTargetList = (
  charId: string,
  globalUniequipTable: UniequipTable,
  cnUniequipTable: UniequipTable,
  server: Server,
): GameModuleInfo[] => {
  if (server === "future") {
    return createGameModuleList(charId, cnUniequipTable);
  }

  const globalModuleTypeSet = new Set(
    createGameModuleList(charId, globalUniequipTable).map((module) => {
      return module.type;
    }),
  );

  return createGameModuleList(charId, cnUniequipTable).filter((module) => {
    return !globalModuleTypeSet.has(module.type);
  });
};

const getLegacyModuleRawList = (legacyOperator: LegacyOperator) => {
  if (!Array.isArray(legacyOperator.moduleList)) {
    return [];
  }

  return legacyOperator.moduleList;
};

const getLegacyModuleType = (value: unknown) => {
  const record = getUnknownRecord(value);

  return (
    getStringValue(record.type) ||
    getStringValue(record.moduleType) ||
    getStringValue(record.typeName)
  );
};

const getLegacyModuleName = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }

  const record = getUnknownRecord(value);

  return (
    getStringValue(record.name) ||
    getStringValue(record.moduleName) ||
    getStringValue(record.uniEquipName) ||
    getStringValue(record.equipName)
  );
};

const getLegacyModuleList = (
  legacyOperator: LegacyOperator,
): LegacyModuleInfo[] => {
  return getLegacyModuleRawList(legacyOperator)
    .map((module) => {
      return {
        type: getLegacyModuleType(module),
        name: getLegacyModuleName(module),
      };
    })
    .filter((module) => {
      return module.type !== "" && module.name !== "";
    });
};

const createLegacyModuleTypeByName = (legacyOperator: LegacyOperator) => {
  return new Map(
    getLegacyModuleList(legacyOperator).map((module) => {
      return [normalizeText(module.name), module.type];
    }),
  );
};

const createTranslatedModuleNames = (
  legacyOperator: LegacyOperator,
  targetModuleList: GameModuleInfo[],
): OperatorOverride["translatedModuleNames"] => {
  if (targetModuleList.length === 0) {
    return undefined;
  }

  const legacyModuleList = getLegacyModuleList(legacyOperator);

  if (legacyModuleList.length === 0) {
    return undefined;
  }

  const translatedModuleNameEntries = targetModuleList
    .map((targetModule) => {
      const matchedLegacyModule = legacyModuleList.find((legacyModule) => {
        return (
          normalizeModuleTypeForCompare(legacyModule.type) ===
          normalizeModuleTypeForCompare(targetModule.type)
        );
      });

      if (matchedLegacyModule === undefined) {
        return null;
      }

      return [targetModule.type, matchedLegacyModule.name];
    })
    .filter((entry): entry is [string, string] => {
      return entry !== null;
    });

  if (translatedModuleNameEntries.length === 0) {
    return undefined;
  }

  return Object.fromEntries(translatedModuleNameEntries);
};

const getLegacyPreferModuleArrayValue = (legacyOperator: LegacyOperator) => {
  const candidate = [
    legacyOperator.preferModules,
    legacyOperator.preferModuleList,
    legacyOperator.preferModuleInfoList,
    legacyOperator.preferModuleNameList,
  ].find((value) => {
    return Array.isArray(value);
  });

  if (!Array.isArray(candidate)) {
    return [];
  }

  return candidate;
};

const getLegacyPreferModuleSingleValueList = (
  legacyOperator: LegacyOperator,
) => {
  return [
    legacyOperator.preferModule,
    legacyOperator.preferModuleInfo,
    legacyOperator.preferModuleName,
  ].filter(isUsefulSingleValue);
};

const getLegacyPreferModuleRawList = (legacyOperator: LegacyOperator) => {
  const arrayValue = getLegacyPreferModuleArrayValue(legacyOperator);

  if (arrayValue.length > 0) {
    return arrayValue;
  }

  return getLegacyPreferModuleSingleValueList(legacyOperator);
};

const getLegacyPreferModuleLevel = (value: unknown): 1 | 2 | 3 => {
  const record = getUnknownRecord(value);
  const moduleRecord = getUnknownRecord(record.module);

  const levelCandidateList = [
    record.level,
    record.moduleLevel,
    record.stage,
    record.moduleStage,
    record.moduleUpgradeLevel,
    moduleRecord.level,
    moduleRecord.moduleLevel,
    moduleRecord.stage,
    moduleRecord.moduleStage,
    moduleRecord.moduleUpgradeLevel,
  ];

  const matchedLevel = levelCandidateList.map(getIntegerValue).find((level) => {
    return level === 1 || level === 2 || level === 3;
  });

  if (matchedLevel === 1 || matchedLevel === 2 || matchedLevel === 3) {
    return matchedLevel;
  }

  return 3;
};

const getLegacyPreferModuleName = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }

  const record = getUnknownRecord(value);
  const moduleRecord = getUnknownRecord(record.module);

  return (
    getStringValue(record.name) ||
    getStringValue(record.moduleName) ||
    getStringValue(record.uniEquipName) ||
    getStringValue(record.equipName) ||
    getStringValue(moduleRecord.name) ||
    getStringValue(moduleRecord.moduleName) ||
    getStringValue(moduleRecord.uniEquipName) ||
    getStringValue(moduleRecord.equipName)
  );
};

const getLegacyPreferModuleType = (value: unknown) => {
  const record = getUnknownRecord(value);
  const moduleRecord = getUnknownRecord(record.module);

  return (
    getStringValue(record.type) ||
    getStringValue(record.moduleType) ||
    getStringValue(record.typeName) ||
    getStringValue(moduleRecord.type) ||
    getStringValue(moduleRecord.moduleType) ||
    getStringValue(moduleRecord.typeName)
  );
};

const getLegacyPreferModuleIndex = (value: unknown) => {
  if (typeof value === "number") {
    return getIntegerValue(value);
  }

  const record = getUnknownRecord(value);
  const moduleRecord = getUnknownRecord(record.module);

  const indexCandidateList = [
    record.index,
    record.moduleIndex,
    record.moduleOrder,
    record.charEquipOrder,
    moduleRecord.index,
    moduleRecord.moduleIndex,
    moduleRecord.moduleOrder,
    moduleRecord.charEquipOrder,
  ];

  return (
    indexCandidateList.map(getIntegerValue).find((index) => {
      return index !== null;
    }) ?? null
  );
};

const getGameModuleByType = (
  gameModuleList: GameModuleInfo[],
  moduleType: string,
) => {
  return gameModuleList.find((module) => {
    return (
      normalizeModuleTypeForCompare(module.type) ===
      normalizeModuleTypeForCompare(moduleType)
    );
  });
};

const getGameModuleByName = (
  gameModuleList: GameModuleInfo[],
  moduleName: string,
) => {
  return gameModuleList.find((module) => {
    return normalizeText(module.name) === normalizeText(moduleName);
  });
};

const getGameModuleByIndex = (
  gameModuleList: GameModuleInfo[],
  legacyModuleList: LegacyModuleInfo[],
  moduleIndex: number,
) => {
  const legacyModuleByZeroBasedIndex = legacyModuleList[moduleIndex];

  if (legacyModuleByZeroBasedIndex !== undefined) {
    return getGameModuleByType(
      gameModuleList,
      legacyModuleByZeroBasedIndex.type,
    );
  }

  const legacyModuleByOneBasedIndex = legacyModuleList[moduleIndex - 1];

  if (legacyModuleByOneBasedIndex !== undefined) {
    return getGameModuleByType(
      gameModuleList,
      legacyModuleByOneBasedIndex.type,
    );
  }

  const gameModuleByZeroBasedIndex = gameModuleList[moduleIndex];

  if (gameModuleByZeroBasedIndex !== undefined) {
    return gameModuleByZeroBasedIndex;
  }

  const gameModuleByOneBasedIndex = gameModuleList[moduleIndex - 1];

  if (gameModuleByOneBasedIndex !== undefined) {
    return gameModuleByOneBasedIndex;
  }

  return undefined;
};

const createPreferModules = (
  charId: string,
  operatorName: string,
  legacyOperator: LegacyOperator,
  gameModuleList: GameModuleInfo[],
  unmatchedPreferModuleList: UnmatchedPreferModuleInfo[],
): OperatorOverride["preferModules"] => {
  const legacyPreferModuleRawList =
    getLegacyPreferModuleRawList(legacyOperator);

  if (legacyPreferModuleRawList.length === 0) {
    return undefined;
  }

  const legacyModuleList = getLegacyModuleList(legacyOperator);
  const legacyModuleTypeByName = createLegacyModuleTypeByName(legacyOperator);
  const preferModules: NonNullable<OperatorOverride["preferModules"]> = [];

  legacyPreferModuleRawList.forEach((legacyPreferModule) => {
    const legacyPreferModuleName =
      getLegacyPreferModuleName(legacyPreferModule);
    const legacyPreferModuleTypeFromValue =
      getLegacyPreferModuleType(legacyPreferModule);
    const legacyPreferModuleTypeFromName =
      legacyModuleTypeByName.get(normalizeText(legacyPreferModuleName)) ?? "";
    const legacyPreferModuleType =
      legacyPreferModuleTypeFromValue || legacyPreferModuleTypeFromName;
    const legacyPreferModuleIndex =
      getLegacyPreferModuleIndex(legacyPreferModule);
    const level = getLegacyPreferModuleLevel(legacyPreferModule);

    if (
      legacyPreferModuleName === "" &&
      legacyPreferModuleType === "" &&
      legacyPreferModuleIndex === null
    ) {
      return;
    }

    const matchedModuleByType =
      legacyPreferModuleType !== ""
        ? getGameModuleByType(gameModuleList, legacyPreferModuleType)
        : undefined;

    const matchedModuleByName =
      legacyPreferModuleName !== ""
        ? getGameModuleByName(gameModuleList, legacyPreferModuleName)
        : undefined;

    const matchedModuleByIndex =
      legacyPreferModuleIndex !== null
        ? getGameModuleByIndex(
            gameModuleList,
            legacyModuleList,
            legacyPreferModuleIndex,
          )
        : undefined;

    const matchedModule =
      matchedModuleByType ?? matchedModuleByName ?? matchedModuleByIndex;

    if (matchedModule === undefined) {
      unmatchedPreferModuleList.push({
        charId,
        operatorName,
        moduleName:
          legacyPreferModuleName ||
          legacyPreferModuleType ||
          String(legacyPreferModuleIndex ?? "-"),
        availableModules: gameModuleList,
      });

      return;
    }

    preferModules.push({
      type: matchedModule.type,
      level,
    });
  });

  if (preferModules.length === 0) {
    return undefined;
  }

  return preferModules.filter((module, index, array) => {
    return (
      array.findIndex((target) => {
        return target.type === module.type && target.level === module.level;
      }) === index
    );
  });
};

const createOverrideList = (
  matchedOperatorList: MatchedOperatorInfo[],
  globalUniequipTable: UniequipTable,
  cnUniequipTable: UniequipTable,
  unmatchedPreferSkillList: UnmatchedPreferSkillInfo[],
  unmatchedPreferModuleList: UnmatchedPreferModuleInfo[],
) => {
  return matchedOperatorList
    .map(({ legacyOperator, charId, character, server }) => {
      const legacyId = getLegacyId(legacyOperator);
      const operatorName = getLegacyName(legacyOperator) || charId;
      const nicknameList = getLegacyNicknameList(legacyOperator);

      const gameModuleList = createMergedGameModuleList(
        charId,
        globalUniequipTable,
        cnUniequipTable,
        server,
      );

      const moduleTranslationTargetList = createModuleTranslationTargetList(
        charId,
        globalUniequipTable,
        cnUniequipTable,
        server,
      );

      const preferSkillIndexes = createPreferSkillIndexes(
        charId,
        operatorName,
        legacyOperator,
        unmatchedPreferSkillList,
      );

      const preferModules = createPreferModules(
        charId,
        operatorName,
        legacyOperator,
        gameModuleList,
        unmatchedPreferModuleList,
      );

      const translatedName = createTranslatedName(
        legacyOperator,
        character,
        server,
      );

      const translatedSkillNames =
        server === "future"
          ? createTranslatedSkillNames(legacyOperator, character)
          : undefined;

      const translatedModuleNames = createTranslatedModuleNames(
        legacyOperator,
        moduleTranslationTargetList,
      );

      return {
        charId,
        ...(legacyId !== null ? { legacyId } : {}),
        ...(nicknameList.length > 0 ? { nicknameList } : {}),
        ...(preferSkillIndexes !== undefined ? { preferSkillIndexes } : {}),
        ...(preferModules !== undefined ? { preferModules } : {}),
        ...(translatedName !== undefined ? { translatedName } : {}),
        ...(translatedSkillNames !== undefined ? { translatedSkillNames } : {}),
        ...(translatedModuleNames !== undefined
          ? { translatedModuleNames }
          : {}),
      } satisfies OperatorOverride;
    })
    .sort((operatorA, operatorB) => {
      return operatorA.charId.localeCompare(operatorB.charId);
    });
};

const createDraftFileContent = (overrideList: OperatorOverride[]) => {
  return `import { type OperatorOverride } from "../manual/operator-override";

/**
 * 기존 legacy operatorList에서 자동 추출한 operator override 초안입니다.
 *
 * 이 파일은 직접 source of truth로 사용하지 말고,
 * 내용을 검수한 뒤 manual/operator-override.ts로 옮겨주세요.
 */
export const operatorOverrideDraftList: OperatorOverride[] = ${JSON.stringify(
    overrideList,
    null,
    2,
  )};
`;
};

const createReport = (result: ExtractOverrideResult) => {
  const extractedPreferModuleCount = result.overrideList.filter((override) => {
    return override.preferModules !== undefined;
  }).length;

  const extractedTranslatedModuleNameCount = result.overrideList.filter(
    (override) => {
      return override.translatedModuleNames !== undefined;
    },
  ).length;

  const lines: string[] = [
    "# Operator Override Report",
    "",
    "> legacy operatorList에서 operator-overrides 초안을 추출한 결과입니다.",
    "",
    `- Extracted overrides: ${result.overrideList.length}`,
    `- Extracted preferModules: ${extractedPreferModuleCount}`,
    `- Extracted translatedModuleNames: ${extractedTranslatedModuleNameCount}`,
    `- Manually managed legacy operators: ${result.manuallyManagedLegacyOperatorList.length}`,
    `- Unmatched legacy operators: ${result.unmatchedLegacyOperatorList.length}`,
    `- Ambiguous legacy operators: ${result.ambiguousLegacyOperatorList.length}`,
    `- Image filename matched operators: ${result.imageFilenameMatchedOperatorList.length}`,
    `- Unmatched prefer skills: ${result.unmatchedPreferSkillList.length}`,
    `- Unmatched prefer modules: ${result.unmatchedPreferModuleList.length}`,
    "",
  ];

  lines.push("## Manually Managed Legacy Operators");
  lines.push("");

  if (result.manuallyManagedLegacyOperatorList.length === 0) {
    lines.push("- 없음");
  } else {
    result.manuallyManagedLegacyOperatorList.forEach((operator) => {
      lines.push(
        `- legacyId=${operator.legacyId} / ${operator.name} / image=${operator.imageFilename} / ${operator.reason}`,
      );
    });
  }

  lines.push("");
  lines.push("## Unmatched Legacy Operators");
  lines.push("");

  if (result.unmatchedLegacyOperatorList.length === 0) {
    lines.push("- 없음");
  } else {
    result.unmatchedLegacyOperatorList.forEach((operator) => {
      lines.push(
        `- legacyId=${operator.legacyId ?? "-"} / ${operator.name} / image=${operator.imageFilename} / ${operator.reason}`,
      );
    });
  }

  lines.push("");
  lines.push("## Ambiguous Legacy Operators");
  lines.push("");

  if (result.ambiguousLegacyOperatorList.length === 0) {
    lines.push("- 없음");
  } else {
    result.ambiguousLegacyOperatorList.forEach((operator) => {
      lines.push(
        `- legacyId=${operator.legacyId ?? "-"} / ${operator.name} / image=${operator.imageFilename} / ${operator.reason}`,
      );
      lines.push(`  - candidates: ${operator.candidateCharIds.join(", ")}`);
    });
  }

  lines.push("");
  lines.push("## Image Filename Matched Operators");
  lines.push("");

  if (result.imageFilenameMatchedOperatorList.length === 0) {
    lines.push("- 없음");
  } else {
    result.imageFilenameMatchedOperatorList.forEach((operator) => {
      lines.push(
        `- legacyId=${operator.legacyId ?? "-"} / ${operator.name} / image=${operator.imageFilename} → \`${operator.charId}\` (${operator.server})`,
      );
    });
  }

  lines.push("");
  lines.push("## Unmatched Prefer Skills");
  lines.push("");

  if (result.unmatchedPreferSkillList.length === 0) {
    lines.push("- 없음");
  } else {
    result.unmatchedPreferSkillList.forEach((skill) => {
      lines.push(
        `- \`${skill.charId}\` / ${skill.operatorName} / ${skill.skillName}`,
      );
      lines.push(
        `  - legacy skillList: ${
          skill.availableSkillNames.length > 0
            ? skill.availableSkillNames.join(", ")
            : "-"
        }`,
      );
    });
  }

  lines.push("");
  lines.push("## Unmatched Prefer Modules");
  lines.push("");

  if (result.unmatchedPreferModuleList.length === 0) {
    lines.push("- 없음");
  } else {
    result.unmatchedPreferModuleList.forEach((module) => {
      lines.push(
        `- \`${module.charId}\` / ${module.operatorName} / ${module.moduleName}`,
      );
      lines.push(
        `  - available: ${
          module.availableModules.length > 0
            ? module.availableModules
                .map((availableModule) => {
                  return `${availableModule.type}(${availableModule.name})`;
                })
                .join(", ")
            : "-"
        }`,
      );
    });
  }

  lines.push("");

  return `${lines.join("\n")}\n`;
};

const main = () => {
  const gamedataPath = loadGamedataPath();
  const cnGamedataPath = loadCnGamedataPath();

  const legacyOperatorList = operatorList.map(createLegacyOperator);

  const globalCharacterTable = readLatestJsonFile<CharacterTable>(
    gamedataPath,
    GLOBAL_CHARACTER_TABLE_PATH,
  );

  const globalUniequipTable = readLatestJsonFile<UniequipTable>(
    gamedataPath,
    GLOBAL_UNIEQUIP_TABLE_PATH,
  );

  const cnCharacterTable = readLatestJsonFile<CharacterTable>(
    cnGamedataPath,
    CN_CHARACTER_TABLE_PATH,
  );

  const cnUniequipTable = readLatestJsonFile<UniequipTable>(
    cnGamedataPath,
    CN_UNIEQUIP_TABLE_PATH,
  );

  const candidateList = createCharacterCandidateList(
    globalCharacterTable,
    cnCharacterTable,
  );

  const {
    matchedOperatorList,
    unmatchedLegacyOperatorList,
    ambiguousLegacyOperatorList,
    imageFilenameMatchedOperatorList,
    manuallyManagedLegacyOperatorList,
  } = findMatchedOperatorList(legacyOperatorList, candidateList);

  const unmatchedPreferSkillList: UnmatchedPreferSkillInfo[] = [];
  const unmatchedPreferModuleList: UnmatchedPreferModuleInfo[] = [];

  const overrideList = createOverrideList(
    matchedOperatorList,
    globalUniequipTable,
    cnUniequipTable,
    unmatchedPreferSkillList,
    unmatchedPreferModuleList,
  );

  const result: ExtractOverrideResult = {
    overrideList,
    unmatchedLegacyOperatorList,
    ambiguousLegacyOperatorList,
    imageFilenameMatchedOperatorList,
    manuallyManagedLegacyOperatorList,
    unmatchedPreferSkillList,
    unmatchedPreferModuleList,
  };

  writeFile(OVERRIDE_DRAFT_OUTPUT_PATH, createDraftFileContent(overrideList));
  writeFile(OVERRIDE_REPORT_OUTPUT_PATH, createReport(result));

  const extractedPreferModuleCount = overrideList.filter((override) => {
    return override.preferModules !== undefined;
  }).length;

  const extractedTranslatedModuleNameCount = overrideList.filter((override) => {
    return override.translatedModuleNames !== undefined;
  }).length;

  console.log(`override 초안 ${overrideList.length}개를 생성했습니다.`);
  console.log(`추천 모듈 추출: ${extractedPreferModuleCount}개`);
  console.log(`모듈 번역명 추출: ${extractedTranslatedModuleNameCount}개`);
  console.log(
    `수동 관리 legacy 오퍼레이터: ${manuallyManagedLegacyOperatorList.length}개`,
  );
  console.log(`legacy 매칭 실패: ${unmatchedLegacyOperatorList.length}개`);
  console.log(`legacy 중복 후보: ${ambiguousLegacyOperatorList.length}개`);
  console.log(
    `imageFilename 매칭: ${imageFilenameMatchedOperatorList.length}개`,
  );
  console.log(`추천 스킬 매칭 실패: ${unmatchedPreferSkillList.length}개`);
  console.log(`추천 모듈 매칭 실패: ${unmatchedPreferModuleList.length}개`);
  console.log(`생성 완료: ${OVERRIDE_DRAFT_OUTPUT_PATH}`);
  console.log(`생성 완료: ${OVERRIDE_REPORT_OUTPUT_PATH}`);
};

main();
