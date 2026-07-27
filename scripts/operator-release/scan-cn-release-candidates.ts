import fs from "node:fs";
import path from "node:path";
import {
  loadCnGamedataPath,
  loadGamedataPath,
} from "../operator-generator/loaders/load-gamedata-path";
import { ActivityTable } from "./activity-types";
import { classifyActivity } from "./classify-activity";
import { CharacterInfo, CharacterTable } from "./character-types";
import {
  getCommitDate,
  getCommitHashesByFilePath,
  getShortCommitHash,
  readFileAtCommit,
} from "./git-utils";
import {
  CnAddedActivityInfo,
  CnAddedGachaInfo,
  CnAddedOperatorInfo,
  CnReleaseCandidate,
  CnReleaseCandidateConfidence,
} from "./cn-release-candidate-types";
import { getAddedKeys, parseJsonOrNull } from "./table-diff-utils";

const CN_CHARACTER_TABLE_PATH = "zh_CN/gamedata/excel/character_table.json";
const CN_ACTIVITY_TABLE_PATH = "zh_CN/gamedata/excel/activity_table.json";
const CN_GACHA_TABLE_PATH = "zh_CN/gamedata/excel/gacha_table.json";

const GLOBAL_CHARACTER_TABLE_PATH = "kr/gamedata/excel/character_table.json";
const GLOBAL_ACTIVITY_TABLE_PATH = "kr/gamedata/excel/activity_table.json";

const CN_RELEASE_CANDIDATES_OUTPUT_PATH =
  "src/data/operator/generated/operator-cn-release-candidates.generated.ts";

const CN_RELEASE_CANDIDATE_REPORT_OUTPUT_PATH =
  "src/data/operator/generated/operator-cn-release-candidate-report.md";

const BASELINE_OPERATOR_COUNT_THRESHOLD = 30;

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

const readLatestJsonFile = <TValue>(
  repositoryPath: string,
  filePath: string,
) => {
  const rawJson = fs.readFileSync(path.join(repositoryPath, filePath), "utf-8");

  return JSON.parse(rawJson) as TValue;
};

const formatDate = (timestamp: number | null) => {
  if (timestamp === null || timestamp <= 0) {
    return "-";
  }

  return new Date(timestamp * 1000).toISOString().slice(0, 10);
};

const toTimestampOrNull = (value: number | undefined | null) => {
  if (value === undefined || value === null || value <= 0) {
    return null;
  }

  return value;
};

/**
 * 출시 후보 분석용 오퍼레이터 필터입니다.
 *
 * 지금 단계에서는 너무 강하게 제외하지 않고, 실제 직군을 가진 char_ 계열만 남깁니다.
 * 이벤트성 캐릭터나 특수 데이터는 이후 suspicious report에서 따로 걸러내는 쪽이 안전합니다.
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

const createAddedOperatorList = (
  previousCnOperatorRecord: Record<string, CharacterInfo>,
  currentCnOperatorRecord: Record<string, CharacterInfo>,
  globalOperatorRecord: Record<string, CharacterInfo>,
): CnAddedOperatorInfo[] => {
  return getAddedKeys(previousCnOperatorRecord, currentCnOperatorRecord).map(
    (charId) => {
      const cnOperator = currentCnOperatorRecord[charId];
      const globalOperator = globalOperatorRecord[charId];

      return {
        charId,
        cnName: cnOperator.name,
        globalName: globalOperator?.name ?? null,
        profession: cnOperator.profession ?? "",
        server: globalOperator === undefined ? "future" : "global",
      };
    },
  );
};

const getActivityBasicInfoRecord = (activityTable: ActivityTable | null) => {
  return activityTable?.basicInfo ?? {};
};

const createAddedActivityList = (
  previousCnActivityTable: ActivityTable | null,
  currentCnActivityTable: ActivityTable | null,
  latestCnActivityTable: ActivityTable,
  latestGlobalActivityTable: ActivityTable,
): CnAddedActivityInfo[] => {
  if (currentCnActivityTable === null) {
    return [];
  }

  const previousCnBasicInfo = getActivityBasicInfoRecord(
    previousCnActivityTable,
  );
  const currentCnBasicInfo = getActivityBasicInfoRecord(currentCnActivityTable);
  const latestCnBasicInfo = getActivityBasicInfoRecord(latestCnActivityTable);
  const latestGlobalBasicInfo = getActivityBasicInfoRecord(
    latestGlobalActivityTable,
  );

  return getAddedKeys(previousCnBasicInfo, currentCnBasicInfo).map(
    (activityId) => {
      const firstSeenActivity = currentCnBasicInfo[activityId];
      const latestCnActivity =
        latestCnBasicInfo[activityId] ?? firstSeenActivity;
      const latestGlobalActivity = latestGlobalBasicInfo[activityId] ?? null;

      const classification = classifyActivity(latestCnActivity);

      return {
        id: latestCnActivity.id,

        cnName: latestCnActivity.name,
        globalName: latestGlobalActivity?.name ?? null,

        // 표시용 메타데이터는 최신 CN JSON 기준으로 맞춥니다.
        type: String(latestCnActivity.type),

        // 과거 commit에서 숫자 enum으로 들어온 경우를 추적하기 위해 남깁니다.
        firstSeenType: String(firstSeenActivity.type),

        displayType: latestCnActivity.displayType,
        category: classification.category,

        isRerun: classification.isRerun,
        isReplicate: latestCnActivity.isReplicate ?? false,
        hasEventShop: classification.hasEventShop,

        templateShopId: latestCnActivity.templateShopId ?? null,

        cnStartTime: toTimestampOrNull(latestCnActivity.startTime),
        cnEndTime: toTimestampOrNull(latestCnActivity.endTime),

        globalStartTime: toTimestampOrNull(latestGlobalActivity?.startTime),
        globalEndTime: toTimestampOrNull(latestGlobalActivity?.endTime),

        hasGlobalMatch: latestGlobalActivity !== null,
      };
    },
  );
};

/**
 * gacha_table 구조는 서버/시점에 따라 흔들릴 수 있어서
 * 여러 후보 위치에서 id/name을 느슨하게 수집합니다.
 */
const createGachaRecord = (gachaTable: GachaTableLike | null) => {
  const gachaRecord: Record<string, CnAddedGachaInfo> = {};

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

      gachaRecord[id] = {
        id,
        name: maybeGacha.gachaName ?? maybeGacha.name ?? "",
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
  previousCnGachaTable: GachaTableLike | null,
  currentCnGachaTable: GachaTableLike | null,
): CnAddedGachaInfo[] => {
  const previousGachaRecord = createGachaRecord(previousCnGachaTable);
  const currentGachaRecord = createGachaRecord(currentCnGachaTable);

  return getAddedKeys(previousGachaRecord, currentGachaRecord).map(
    (gachaId) => {
      return currentGachaRecord[gachaId];
    },
  );
};

const getCandidateConfidence = (
  addedOperatorList: CnAddedOperatorInfo[],
  addedActivityList: CnAddedActivityInfo[],
  addedGachaList: CnAddedGachaInfo[],
): CnReleaseCandidateConfidence => {
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
  addedOperatorList: CnAddedOperatorInfo[],
  addedActivityList: CnAddedActivityInfo[],
  addedGachaList: CnAddedGachaInfo[],
) => {
  const reasons: string[] = [];

  const globalOperatorCount = addedOperatorList.filter((operator) => {
    return operator.server === "global";
  }).length;

  const futureOperatorCount = addedOperatorList.length - globalOperatorCount;

  if (addedOperatorList.length > 0) {
    reasons.push(`${addedOperatorList.length} operator(s) added`);
  }

  if (globalOperatorCount > 0) {
    reasons.push(`${globalOperatorCount} operator(s) matched global`);
  }

  if (futureOperatorCount > 0) {
    reasons.push(`${futureOperatorCount} operator(s) are future`);
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
 * CN Git history를 기준으로 출시 후보를 만들고,
 * KR 최신 JSON을 overlay해서 global/future 상태와 KR 이벤트 시간을 붙입니다.
 */
const scanCnReleaseCandidates = (
  cnRepositoryPath: string,
  globalRepositoryPath: string,
) => {
  const latestGlobalCharacterTable = readLatestJsonFile<CharacterTable>(
    globalRepositoryPath,
    GLOBAL_CHARACTER_TABLE_PATH,
  );

  const latestCnActivityTable = readLatestJsonFile<ActivityTable>(
    cnRepositoryPath,
    CN_ACTIVITY_TABLE_PATH,
  );

  const latestGlobalActivityTable = readLatestJsonFile<ActivityTable>(
    globalRepositoryPath,
    GLOBAL_ACTIVITY_TABLE_PATH,
  );

  const globalOperatorRecord = createOperatorRecord(latestGlobalCharacterTable);

  const commitHashes = getCommitHashesByFilePath(
    cnRepositoryPath,
    CN_CHARACTER_TABLE_PATH,
  );

  const candidates: CnReleaseCandidate[] = [];

  commitHashes.forEach((commitHash, index) => {
    const previousCommitHash = commitHashes[index - 1] ?? null;

    const previousCnCharacterTable = parseJsonOrNull<CharacterTable>(
      previousCommitHash === null
        ? null
        : readFileAtCommit(
            cnRepositoryPath,
            previousCommitHash,
            CN_CHARACTER_TABLE_PATH,
          ),
    );

    const currentCnCharacterTable = parseJsonOrNull<CharacterTable>(
      readFileAtCommit(cnRepositoryPath, commitHash, CN_CHARACTER_TABLE_PATH),
    );

    if (currentCnCharacterTable === null) {
      return;
    }

    const previousCnOperatorRecord =
      previousCnCharacterTable === null
        ? {}
        : createOperatorRecord(previousCnCharacterTable);

    const currentCnOperatorRecord = createOperatorRecord(
      currentCnCharacterTable,
    );

    const addedOperatorList = createAddedOperatorList(
      previousCnOperatorRecord,
      currentCnOperatorRecord,
      globalOperatorRecord,
    );

    if (addedOperatorList.length === 0) {
      return;
    }

    const previousCnActivityTable = parseJsonOrNull<ActivityTable>(
      previousCommitHash === null
        ? null
        : readFileAtCommit(
            cnRepositoryPath,
            previousCommitHash,
            CN_ACTIVITY_TABLE_PATH,
          ),
    );

    const currentCnActivityTable = parseJsonOrNull<ActivityTable>(
      readFileAtCommit(cnRepositoryPath, commitHash, CN_ACTIVITY_TABLE_PATH),
    );

    const previousCnGachaTable = parseJsonOrNull<GachaTableLike>(
      previousCommitHash === null
        ? null
        : readFileAtCommit(
            cnRepositoryPath,
            previousCommitHash,
            CN_GACHA_TABLE_PATH,
          ),
    );

    const currentCnGachaTable = parseJsonOrNull<GachaTableLike>(
      readFileAtCommit(cnRepositoryPath, commitHash, CN_GACHA_TABLE_PATH),
    );

    const addedActivityList = createAddedActivityList(
      previousCnActivityTable,
      currentCnActivityTable,
      latestCnActivityTable,
      latestGlobalActivityTable,
    );

    const addedGachaList = createAddedGachaList(
      previousCnGachaTable,
      currentCnGachaTable,
    );

    const isHistoricalBaseline =
      previousCommitHash === null ||
      addedOperatorList.length >= BASELINE_OPERATOR_COUNT_THRESHOLD;

    candidates.push({
      kind: isHistoricalBaseline
        ? "cn_historical_baseline"
        : "cn_release_candidate",
      commitHash,
      commitDate: getCommitDate(cnRepositoryPath, commitHash),
      addedOperatorList,
      addedActivityList,
      addedGachaList,
      confidence: isHistoricalBaseline
        ? "low"
        : getCandidateConfidence(
            addedOperatorList,
            addedActivityList,
            addedGachaList,
          ),
      reasons: isHistoricalBaseline
        ? [
            "CN repository baseline batch",
            `${addedOperatorList.length} operator(s) already existed at first tracked commit`,
          ]
        : createCandidateReasons(
            addedOperatorList,
            addedActivityList,
            addedGachaList,
          ),
    });
  });

  return candidates;
};

const createGeneratedFileContent = (candidates: CnReleaseCandidate[]) => {
  return `import { CnReleaseCandidate } from "../../../../scripts/operator-release/cn-release-candidate-types";

/**
 * CN 히스토리 기준으로 자동 생성된 오퍼레이터 출시 후보 목록입니다.
 *
 * 직접 수정하지 말고 \`npm run scan:cn-operator-release\`로 재생성하세요.
 */
export const cnOperatorReleaseCandidateList: CnReleaseCandidate[] = ${JSON.stringify(
    candidates,
    null,
    2,
  )};
`;
};

const createReport = (candidates: CnReleaseCandidate[]) => {
  const releaseCandidates = candidates.filter((candidate) => {
    return candidate.kind === "cn_release_candidate";
  });

  const baselineCandidates = candidates.filter((candidate) => {
    return candidate.kind === "cn_historical_baseline";
  });

  const lines: string[] = [
    "# CN Operator Release Candidate Report",
    "",
    "> CN Git history를 기준으로 생성한 출시 후보 보고서입니다.",
    "> KR/global 최신 JSON에 매칭되는 경우 한국 서버 정보도 함께 표시합니다.",
    "",
    `- Total candidates: ${candidates.length}`,
    `- Release candidates: ${releaseCandidates.length}`,
    `- Historical baseline batches: ${baselineCandidates.length}`,
    "",
  ];

  if (baselineCandidates.length > 0) {
    lines.push("## Historical Baseline");
    lines.push("");

    baselineCandidates.forEach((candidate) => {
      lines.push(
        `### ${candidate.commitDate.slice(0, 10)} / ${getShortCommitHash(
          candidate.commitHash,
        )}`,
      );
      lines.push("");
      lines.push(`- Operators: ${candidate.addedOperatorList.length}`);
      lines.push(`- Reasons: ${candidate.reasons.join(", ")}`);
      lines.push("");
    });
  }

  lines.push("## Release Candidates");
  lines.push("");

  releaseCandidates.forEach((candidate) => {
    lines.push(
      `### ${candidate.commitDate.slice(0, 10)} / ${getShortCommitHash(
        candidate.commitHash,
      )}`,
    );

    lines.push("");
    lines.push(`- Confidence: ${candidate.confidence}`);
    lines.push(`- Reasons: ${candidate.reasons.join(", ") || "-"}`);
    lines.push("");

    lines.push("#### Operators");

    candidate.addedOperatorList.forEach((operator) => {
      const displayName = operator.globalName ?? operator.cnName;

      lines.push(
        `- \`${operator.charId}\` / ${displayName} / CN: ${operator.cnName} / global: ${operator.globalName ?? "-"} / ${operator.profession} / ${operator.server}`,
      );
    });

    lines.push("");
    lines.push("#### Activities");

    if (candidate.addedActivityList.length === 0) {
      lines.push("- 없음");
    } else {
      candidate.addedActivityList.forEach((activity) => {
        lines.push(
          `- \`${activity.id}\` / ${activity.globalName ?? activity.cnName} / category: ${activity.category} / type: ${activity.type} / firstSeenType: ${activity.firstSeenType} / CN: ${formatDate(activity.cnStartTime)}~${formatDate(activity.cnEndTime)} / KR: ${formatDate(activity.globalStartTime)}~${formatDate(activity.globalEndTime)} / globalMatch: ${activity.hasGlobalMatch}`,
        );
      });
    }

    lines.push("");
    lines.push("#### Gachas");

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
  const cnGamedataPath = loadCnGamedataPath();
  const globalGamedataPath = loadGamedataPath();

  const candidates = scanCnReleaseCandidates(
    cnGamedataPath,
    globalGamedataPath,
  );

  const latestCandidates = [...candidates].reverse();

  writeGeneratedFile(
    CN_RELEASE_CANDIDATES_OUTPUT_PATH,
    createGeneratedFileContent(latestCandidates),
  );

  writeGeneratedFile(
    CN_RELEASE_CANDIDATE_REPORT_OUTPUT_PATH,
    createReport(latestCandidates),
  );

  const releaseCandidates = latestCandidates.filter((candidate) => {
    return candidate.kind === "cn_release_candidate";
  });

  console.log(
    `총 ${candidates.length}개의 CN release batch 후보를 찾았습니다.`,
  );
  console.log(`일반 출시 후보: ${releaseCandidates.length}개`);
  console.log(`생성 완료: ${CN_RELEASE_CANDIDATES_OUTPUT_PATH}`);
  console.log(`생성 완료: ${CN_RELEASE_CANDIDATE_REPORT_OUTPUT_PATH}`);
};

main();
