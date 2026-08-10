import { loadGamedataPath } from "../operator-generator/loaders/load-gamedata-path";
import {
  getCommitDate,
  getCommitHashesByFilePath,
  getShortCommitHash,
  readFileAtCommit,
} from "./git-utils";
import {
  CharacterInfo,
  CharacterTable,
  OperatorFirstAppearance,
} from "./character-types";

// 오퍼레이터 출시 순서 분석 스크립트

type OutputOrder = "oldest_first" | "latest_first";
const outputOrder: OutputOrder = "latest_first";

const CHARACTER_TABLE_PATH = "kr/gamedata/excel/character_table.json";

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

const sortOperatorFirstAppearances = (
  firstAppearances: OperatorFirstAppearance[],
  outputOrder: OutputOrder,
) => {
  if (outputOrder === "latest_first") {
    return [...firstAppearances].reverse();
  }

  return firstAppearances;
};

const parseCharacterTable = (rawCharacterTable: string) => {
  return JSON.parse(rawCharacterTable) as CharacterTable;
};

/**
 * character_table에는 token, trap, 적/소환물 계열 데이터도 섞일 수 있습니다.
 * 출시순 분석에서는 실제 오퍼레이터 후보만 필요하므로 playable profession만 통과시킵니다.
 */
const isPlayableOperator = (charId: string, character: CharacterInfo) => {
  if (!charId.startsWith("char_")) {
    return false;
  }

  if (character.profession === undefined) {
    return false;
  }

  return PLAYABLE_PROFESSIONS.has(character.profession);
};

const createCurrentOperatorMap = (characterTable: CharacterTable) => {
  const operatorMap = new Map<string, CharacterInfo>();

  Object.entries(characterTable).forEach(([charId, character]) => {
    if (!isPlayableOperator(charId, character)) {
      return;
    }

    operatorMap.set(charId, character);
  });

  return operatorMap;
};

/**
 * character_table.json의 Git history를 오래된 순서부터 순회하면서
 * 각 charId가 처음 등장한 commit을 기록합니다.
 */
const scanOperatorFirstAppearances = (
  repositoryPath: string,
): OperatorFirstAppearance[] => {
  const commitHashes = getCommitHashesByFilePath(
    repositoryPath,
    CHARACTER_TABLE_PATH,
  );

  const seenOperatorIds = new Set<string>();
  const firstAppearances: OperatorFirstAppearance[] = [];

  commitHashes.forEach((commitHash) => {
    const rawCharacterTable = readFileAtCommit(
      repositoryPath,
      commitHash,
      CHARACTER_TABLE_PATH,
    );

    if (rawCharacterTable === null) {
      return;
    }

    const characterTable = parseCharacterTable(rawCharacterTable);
    const currentOperatorMap = createCurrentOperatorMap(characterTable);
    const commitDate = getCommitDate(repositoryPath, commitHash);

    currentOperatorMap.forEach((character, charId) => {
      if (seenOperatorIds.has(charId)) {
        return;
      }

      seenOperatorIds.add(charId);

      firstAppearances.push({
        charId,
        name: character.name,
        profession: character.profession ?? "",
        firstSeenCommitHash: commitHash,
        firstSeenCommitDate: commitDate,
      });
    });
  });

  return firstAppearances;
};

const main = () => {
  const gamedataPath = loadGamedataPath();
  const firstAppearances = scanOperatorFirstAppearances(gamedataPath);

  const sortedFirstAppearances = sortOperatorFirstAppearances(
    firstAppearances,
    outputOrder,
  );

  console.log(
    `총 ${firstAppearances.length}명의 오퍼레이터 후보를 찾았습니다.`,
  );
  console.log(`출력 순서: ${outputOrder}`);

  console.table(
    sortedFirstAppearances.slice(0, 30).map((operator) => {
      return {
        charId: operator.charId,
        name: operator.name,
        profession: operator.profession,
        date: operator.firstSeenCommitDate.slice(0, 10),
        commit: getShortCommitHash(operator.firstSeenCommitHash),
      };
    }),
  );
};

main();
