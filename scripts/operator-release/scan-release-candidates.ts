import { loadGamedataPath } from "../operator-generator/loaders/load-gamedata-path";
import { ActivityTable } from "./activity-types";
import { CharacterInfo, CharacterTable } from "./character-types";
import {
  getCommitDate,
  getCommitHashesByFilePath,
  getShortCommitHash,
  readFileAtCommit,
} from "./git-utils";
import {
  AddedActivityInfo,
  AddedGachaInfo,
  OperatorReleaseCandidate,
  OperatorReleaseCandidateConfidence,
} from "./release-candidate-types";
import { getAddedKeys, parseJsonOrNull } from "./table-diff-utils";

const CHARACTER_TABLE_PATH = "kr/gamedata/excel/character_table.json";
const ACTIVITY_TABLE_PATH = "kr/gamedata/excel/activity_table.json";
const GACHA_TABLE_PATH = "kr/gamedata/excel/gacha_table.json";

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

type GachaTableLike = {
  gachaPoolClient?: unknown;
  gachaPoolDetail?: Record<string, unknown>;
};

/**
 * release candidate 분석용 오퍼레이터 필터입니다.
 *
 * 지금 단계에서는 너무 강하게 거르지 않고, 실제 직군을 가진 char_ 계열만 후보로 남깁니다.
 * 이벤트성 캐릭터나 특수 데이터는 이후 상세 report 단계에서 제외하는 쪽이 안전합니다.
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

const createOperatorRecord = (characterTable: CharacterTable) => {
  const operatorRecord: Record<string, CharacterInfo> = {};

  Object.entries(characterTable).forEach(([charId, character]) => {
    if (!isPlayableOperator(charId, character)) {
      return;
    }

    operatorRecord[charId] = character;
  });

  return operatorRecord;
};

const createAddedActivityList = (
  previousActivityTable: ActivityTable | null,
  currentActivityTable: ActivityTable | null,
): AddedActivityInfo[] => {
  if (currentActivityTable === null) {
    return [];
  }

  const previousBasicInfo = previousActivityTable?.basicInfo ?? {};
  const currentBasicInfo = currentActivityTable.basicInfo;

  return getAddedKeys(previousBasicInfo, currentBasicInfo).map((activityId) => {
    const activity = currentBasicInfo[activityId];

    return {
      id: activity.id,
      name: activity.name,
      type: activity.type,
      displayType: activity.displayType,
      isReplicate: activity.isReplicate ?? false,
    };
  });
};

/**
 * gacha_table은 구조가 activity_table보다 덜 고정적으로 느껴질 수 있어서
 * 우선 여러 후보 위치에서 id/name을 최대한 느슨하게 수집합니다.
 */
const createGachaRecord = (gachaTable: GachaTableLike | null) => {
  const gachaRecord: Record<string, AddedGachaInfo> = {};

  if (gachaTable === null) {
    return gachaRecord;
  }

  if (gachaTable.gachaPoolDetail !== undefined) {
    Object.entries(gachaTable.gachaPoolDetail).forEach(([gachaId, value]) => {
      const maybeGacha = value as {
        gachaPoolId?: string;
        gachaIndex?: string;
        gachaName?: string;
        name?: string;
      };

      const id = maybeGacha.gachaPoolId ?? maybeGacha.gachaIndex ?? gachaId;
      const name = maybeGacha.gachaName ?? maybeGacha.name ?? "";

      gachaRecord[id] = {
        id,
        name,
      };
    });
  }

  if (Array.isArray(gachaTable.gachaPoolClient)) {
    gachaTable.gachaPoolClient.forEach((value) => {
      const maybeGacha = value as {
        gachaPoolId?: string;
        gachaIndex?: string;
        gachaName?: string;
        name?: string;
      };

      const id = maybeGacha.gachaPoolId ?? maybeGacha.gachaIndex;

      if (id === undefined) {
        return;
      }

      gachaRecord[id] = {
        id,
        name: maybeGacha.gachaName ?? maybeGacha.name ?? "",
      };
    });
  }

  return gachaRecord;
};

const createAddedGachaList = (
  previousGachaTable: GachaTableLike | null,
  currentGachaTable: GachaTableLike | null,
): AddedGachaInfo[] => {
  const previousGachaRecord = createGachaRecord(previousGachaTable);
  const currentGachaRecord = createGachaRecord(currentGachaTable);

  return getAddedKeys(previousGachaRecord, currentGachaRecord).map(
    (gachaId) => {
      return currentGachaRecord[gachaId];
    },
  );
};

const getCandidateConfidence = (
  addedOperatorIds: string[],
  addedActivityList: AddedActivityInfo[],
  addedGachaList: AddedGachaInfo[],
): OperatorReleaseCandidateConfidence => {
  if (
    addedOperatorIds.length > 0 &&
    addedActivityList.length > 0 &&
    addedGachaList.length > 0
  ) {
    return "high";
  }

  if (
    addedOperatorIds.length > 0 &&
    (addedActivityList.length > 0 || addedGachaList.length > 0)
  ) {
    return "medium";
  }

  return "low";
};

const createCandidateReasons = (
  addedOperatorIds: string[],
  addedActivityList: AddedActivityInfo[],
  addedGachaList: AddedGachaInfo[],
) => {
  const reasons: string[] = [];

  if (addedOperatorIds.length > 0) {
    reasons.push(`${addedOperatorIds.length} operator(s) added`);
  }

  if (addedActivityList.length > 0) {
    reasons.push(
      `${addedActivityList.length} activity(s) added in same commit`,
    );
  }

  if (addedGachaList.length > 0) {
    reasons.push(`${addedGachaList.length} gacha(s) added in same commit`);
  }

  return reasons;
};

/**
 * character_table 변경 commit을 기준으로 release batch 후보를 생성합니다.
 *
 * 이 단계에서는 "같은 commit에 같이 추가된 데이터"만 묶습니다.
 * 이벤트/배너와 오퍼레이터의 실제 연결 여부는 이후 report에서 사람이 확인해야 합니다.
 */
const scanReleaseCandidates = (repositoryPath: string) => {
  const commitHashes = getCommitHashesByFilePath(
    repositoryPath,
    CHARACTER_TABLE_PATH,
  );

  const candidates: OperatorReleaseCandidate[] = [];

  commitHashes.forEach((commitHash, index) => {
    const previousCommitHash = commitHashes[index - 1] ?? null;

    const previousCharacterTable = parseJsonOrNull<CharacterTable>(
      previousCommitHash === null
        ? null
        : readFileAtCommit(
            repositoryPath,
            previousCommitHash,
            CHARACTER_TABLE_PATH,
          ),
    );

    const currentCharacterTable = parseJsonOrNull<CharacterTable>(
      readFileAtCommit(repositoryPath, commitHash, CHARACTER_TABLE_PATH),
    );

    if (currentCharacterTable === null) {
      return;
    }

    const previousOperatorRecord =
      previousCharacterTable === null
        ? {}
        : createOperatorRecord(previousCharacterTable);

    const currentOperatorRecord = createOperatorRecord(currentCharacterTable);

    const addedOperatorIds = getAddedKeys(
      previousOperatorRecord,
      currentOperatorRecord,
    );

    if (addedOperatorIds.length === 0) {
      return;
    }

    const previousActivityTable = parseJsonOrNull<ActivityTable>(
      previousCommitHash === null
        ? null
        : readFileAtCommit(
            repositoryPath,
            previousCommitHash,
            ACTIVITY_TABLE_PATH,
          ),
    );

    const currentActivityTable = parseJsonOrNull<ActivityTable>(
      readFileAtCommit(repositoryPath, commitHash, ACTIVITY_TABLE_PATH),
    );

    const previousGachaTable = parseJsonOrNull<GachaTableLike>(
      previousCommitHash === null
        ? null
        : readFileAtCommit(
            repositoryPath,
            previousCommitHash,
            GACHA_TABLE_PATH,
          ),
    );

    const currentGachaTable = parseJsonOrNull<GachaTableLike>(
      readFileAtCommit(repositoryPath, commitHash, GACHA_TABLE_PATH),
    );

    const addedActivityList = createAddedActivityList(
      previousActivityTable,
      currentActivityTable,
    );

    const addedGachaList = createAddedGachaList(
      previousGachaTable,
      currentGachaTable,
    );

    candidates.push({
      commitHash,
      commitDate: getCommitDate(repositoryPath, commitHash),
      addedOperatorIds,
      addedActivityList,
      addedGachaList,
      confidence: getCandidateConfidence(
        addedOperatorIds,
        addedActivityList,
        addedGachaList,
      ),
      reasons: createCandidateReasons(
        addedOperatorIds,
        addedActivityList,
        addedGachaList,
      ),
    });
  });

  return candidates;
};

const main = () => {
  const gamedataPath = loadGamedataPath();
  const candidates = scanReleaseCandidates(gamedataPath);
  const latestCandidates = [...candidates].reverse();

  console.log(`총 ${candidates.length}개의 release batch 후보를 찾았습니다.`);

  console.table(
    latestCandidates.slice(0, 30).map((candidate) => {
      return {
        date: candidate.commitDate.slice(0, 10),
        commit: getShortCommitHash(candidate.commitHash),
        operators: candidate.addedOperatorIds.join(", "),
        activities: candidate.addedActivityList
          .map((activity) => activity.name)
          .join(", "),
        gachas: candidate.addedGachaList
          .map((gacha) => gacha.name || gacha.id)
          .join(", "),
        confidence: candidate.confidence,
        reasons: candidate.reasons.join(", "),
      };
    }),
  );
};

main();
