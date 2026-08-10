import fs from "node:fs";
import path from "node:path";
import { loadGamedataPath } from "../operator-generator/loaders/load-gamedata-path";
import { ActivityTable } from "./activity-types";
import {
  AddedOperatorInfo,
  CharacterInfo,
  CharacterTable,
} from "./character-types";
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

// SERVER_PATH = "kr" | "jp" | "en" | "cn" | "tw";
const SERVER_PATH = "kr";
const CHARACTER_TABLE_PATH = `${SERVER_PATH}/gamedata/excel/character_table.json`;
const ACTIVITY_TABLE_PATH = `${SERVER_PATH}/gamedata/excel/activity_table.json`;
const GACHA_TABLE_PATH = `${SERVER_PATH}/gamedata/excel/gacha_table.json`;

const RELEASE_CANDIDATES_OUTPUT_PATH =
  "src/data/operator/generated/operator-release-candidates.generated.ts";

const RELEASE_CANDIDATE_REPORT_OUTPUT_PATH =
  "src/data/operator/generated/operator-release-candidate-report.md";

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

/**
 * 현재 로컬에 있는 최신 JSON 파일을 읽습니다.
 *
 * Git history의 특정 commit snapshot이 아니라, 현재 checkout된 최신 파일 기준
 * 메타데이터를 가져올 때 사용합니다.
 */
const readLatestJsonFile = <TValue>(
  repositoryPath: string,
  filePath: string,
) => {
  const rawJson = fs.readFileSync(path.join(repositoryPath, filePath), "utf-8");

  return JSON.parse(rawJson) as TValue;
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

const createAddedOperatorList = (
  previousOperatorRecord: Record<string, CharacterInfo>,
  currentOperatorRecord: Record<string, CharacterInfo>,
): AddedOperatorInfo[] => {
  return getAddedKeys(previousOperatorRecord, currentOperatorRecord).map(
    (charId) => {
      const operator = currentOperatorRecord[charId];

      return {
        charId,
        name: operator.name,
        profession: operator.profession ?? "",
      };
    },
  );
};

const createAddedActivityList = (
  previousActivityTable: ActivityTable | null,
  currentActivityTable: ActivityTable | null,
  latestActivityTable: ActivityTable | null,
): AddedActivityInfo[] => {
  if (currentActivityTable === null) {
    return [];
  }

  const previousBasicInfo = previousActivityTable?.basicInfo ?? {};
  const currentBasicInfo = currentActivityTable.basicInfo;
  const latestBasicInfo = latestActivityTable?.basicInfo ?? {};

  return getAddedKeys(previousBasicInfo, currentBasicInfo).map((activityId) => {
    const firstSeenActivity = currentBasicInfo[activityId];
    const latestActivity = latestBasicInfo[activityId] ?? firstSeenActivity;

    return {
      id: latestActivity.id,
      name: latestActivity.name,

      // report 표시는 최신 JSON 기준으로 맞춥니다.
      type: String(latestActivity.type),

      // 과거 commit에서 숫자 enum으로 들어온 경우 추적용으로 남깁니다.
      firstSeenType: String(firstSeenActivity.type),

      displayType: latestActivity.displayType,
      isReplicate: latestActivity.isReplicate ?? false,
    };
  });
};

/**
 * gacha_table은 구조가 activity_table보다 덜 고정적일 수 있어서
 * 우선 여러 후보 위치에서 id/name을 느슨하게 수집합니다.
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
  addedOperatorList: AddedOperatorInfo[],
  addedActivityList: AddedActivityInfo[],
  addedGachaList: AddedGachaInfo[],
): OperatorReleaseCandidateConfidence => {
  if (
    addedOperatorList.length > 0 &&
    addedActivityList.length > 0 &&
    addedGachaList.length > 0
  ) {
    return "high";
  }

  if (
    addedOperatorList.length > 0 &&
    (addedActivityList.length > 0 || addedGachaList.length > 0)
  ) {
    return "medium";
  }

  return "low";
};

const createCandidateReasons = (
  addedOperatorList: AddedOperatorInfo[],
  addedActivityList: AddedActivityInfo[],
  addedGachaList: AddedGachaInfo[],
) => {
  const reasons: string[] = [];

  if (addedOperatorList.length > 0) {
    reasons.push(`${addedOperatorList.length} operator(s) added`);
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
  const latestActivityTable = readLatestJsonFile<ActivityTable>(
    repositoryPath,
    ACTIVITY_TABLE_PATH,
  );

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

    const addedOperatorList = createAddedOperatorList(
      previousOperatorRecord,
      currentOperatorRecord,
    );

    if (addedOperatorList.length === 0) {
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
      latestActivityTable,
    );

    const addedGachaList = createAddedGachaList(
      previousGachaTable,
      currentGachaTable,
    );

    candidates.push({
      commitHash,
      commitDate: getCommitDate(repositoryPath, commitHash),
      addedOperatorList,
      addedActivityList,
      addedGachaList,
      confidence: getCandidateConfidence(
        addedOperatorList,
        addedActivityList,
        addedGachaList,
      ),
      reasons: createCandidateReasons(
        addedOperatorList,
        addedActivityList,
        addedGachaList,
      ),
    });
  });

  return candidates;
};

const createReleaseCandidatesFileContent = (
  candidates: OperatorReleaseCandidate[],
) => {
  return `import { OperatorReleaseCandidate } from "../../../../scripts/operator-release/release-candidate-types";

/**
 * 자동 생성된 오퍼레이터 출시 후보 목록입니다.
 *
 * 직접 수정하지 말고 \`npm run scan:operator-release\`로 재생성하세요.
 */
export const operatorReleaseCandidateList: OperatorReleaseCandidate[] = ${JSON.stringify(
    candidates,
    null,
    2,
  )};
`;
};

const createReleaseCandidateReport = (
  candidates: OperatorReleaseCandidate[],
) => {
  const lines: string[] = [
    "# Operator Release Candidate Report",
    "",
    "> 자동 생성된 후보 보고서입니다. 최종 출시는 `operator-release-events.ts`에서 확정합니다.",
    "",
    `- Total candidates: ${candidates.length}`,
    "",
  ];

  candidates.forEach((candidate) => {
    lines.push(
      `## ${candidate.commitDate.slice(0, 10)} / ${getShortCommitHash(
        candidate.commitHash,
      )}`,
    );

    lines.push("");
    lines.push(`- Confidence: ${candidate.confidence}`);
    lines.push(`- Reasons: ${candidate.reasons.join(", ") || "-"}`);
    lines.push("");

    lines.push("### Operators");
    candidate.addedOperatorList.forEach((operator) => {
      lines.push(
        `- \`${operator.charId}\` / ${operator.name} / ${operator.profession}`,
      );
    });

    lines.push("");
    lines.push("### Activities");

    if (candidate.addedActivityList.length === 0) {
      lines.push("- 없음");
    } else {
      candidate.addedActivityList.forEach((activity) => {
        lines.push(
          `- \`${activity.id}\` / ${activity.name} / type: ${activity.type} / firstSeenType: ${activity.firstSeenType} / ${activity.displayType} / isReplicate: ${activity.isReplicate}`,
        );
      });
    }

    lines.push("");
    lines.push("### Gachas");

    if (candidate.addedGachaList.length === 0) {
      lines.push("- 없음");
    } else {
      candidate.addedGachaList.forEach((gacha) => {
        lines.push(`- \`${gacha.id}\` / ${gacha.name || "-"}`);
      });
    }

    lines.push("");
  });

  return `${lines.join("\n")}\n`;
};

const writeGeneratedFile = (outputPath: string, content: string) => {
  const resolvedOutputPath = path.resolve(process.cwd(), outputPath);

  fs.mkdirSync(path.dirname(resolvedOutputPath), {
    recursive: true,
  });

  fs.writeFileSync(resolvedOutputPath, content, "utf-8");
};

const main = () => {
  const gamedataPath = loadGamedataPath();
  const candidates = scanReleaseCandidates(gamedataPath);
  const latestCandidates = [...candidates].reverse();

  writeGeneratedFile(
    RELEASE_CANDIDATES_OUTPUT_PATH,
    createReleaseCandidatesFileContent(latestCandidates),
  );

  writeGeneratedFile(
    RELEASE_CANDIDATE_REPORT_OUTPUT_PATH,
    createReleaseCandidateReport(latestCandidates),
  );

  console.log(`총 ${candidates.length}개의 release batch 후보를 찾았습니다.`);
  console.log(`생성 완료: ${RELEASE_CANDIDATES_OUTPUT_PATH}`);
  console.log(`생성 완료: ${RELEASE_CANDIDATE_REPORT_OUTPUT_PATH}`);
};

main();
