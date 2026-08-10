import fs from "node:fs";
import path from "node:path";
import { cnOperatorReleaseCandidateList } from "@/data/operator/generated/operator-cn-release-candidates.generated";
import { OperatorReleaseEvent } from "@/data/operator/manual/operator-release-types";

const OUTPUT_PATH =
  "src/data/operator/generated/operator-release-events.draft.generated.ts";

const RELEASE_ACTIVITY_CATEGORY_SCORE: Record<
  OperatorReleaseEvent["category"],
  number
> = {
  main_story: 100,
  side_story: 100,
  mini_event: 100,
  roguelike: 80,
  crisis: 60,
  server_open: -100,
  other: -100,
};

const EXCLUDED_ACTIVITY_PATTERNS = [
  /sign/i,
  /login/i,
  /checkin/i,
  /check_in/i,
  /signin/i,
  /attendance/i,
];

type CnReleaseCandidate = (typeof cnOperatorReleaseCandidateList)[number];

type CnReleaseActivity = CnReleaseCandidate["addedActivityList"][number];

const createSafeEventId = (value: string) => {
  return value
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_/, "")
    .replace(/_$/, "");
};

const createFallbackEventId = (commitDate: string, operatorIds: string[]) => {
  const date = commitDate.slice(0, 10).replace(/-/g, "");
  const firstOperatorId = operatorIds[0] ?? "unknown";

  return `cn_${date}_${firstOperatorId}`;
};

const isExcludedActivity = (activity: CnReleaseActivity) => {
  const searchableText = [
    activity.id,
    activity.type,
    activity.cnName,
    activity.globalName ?? "",
  ].join(" ");

  return EXCLUDED_ACTIVITY_PATTERNS.some((pattern) => {
    return pattern.test(searchableText);
  });
};

const getReleaseActivityScore = (activity: CnReleaseActivity) => {
  if (isExcludedActivity(activity)) {
    return -1000;
  }

  if (activity.isRerun || activity.isReplicate) {
    return -500;
  }

  let score = RELEASE_ACTIVITY_CATEGORY_SCORE[activity.category];

  if (activity.hasEventShop) {
    score += 10;
  }

  if (activity.hasGlobalMatch) {
    score += 5;
  }

  return score;
};

const pickBestReleaseActivity = (candidate: CnReleaseCandidate) => {
  const scoredActivityList = candidate.addedActivityList
    .map((activity) => {
      return {
        activity,
        score: getReleaseActivityScore(activity),
      };
    })
    .sort((a, b) => {
      return b.score - a.score;
    });

  const bestActivity = scoredActivityList[0];

  if (bestActivity === undefined || bestActivity.score <= 0) {
    return undefined;
  }

  return bestActivity.activity;
};

const createEventId = (candidate: CnReleaseCandidate) => {
  const releaseActivity = pickBestReleaseActivity(candidate);

  if (releaseActivity !== undefined) {
    return createSafeEventId(releaseActivity.id);
  }

  return createFallbackEventId(
    candidate.commitDate,
    candidate.addedOperatorList.map((operator) => {
      return operator.charId;
    }),
  );
};

const createEventName = (candidate: CnReleaseCandidate) => {
  const releaseActivity = pickBestReleaseActivity(candidate);

  if (releaseActivity !== undefined) {
    return releaseActivity.globalName ?? releaseActivity.cnName;
  }

  const operatorNames = candidate.addedOperatorList.map((operator) => {
    return operator.globalName ?? operator.cnName;
  });

  if (operatorNames.length === 0) {
    return `${candidate.commitDate.slice(0, 10)} 매핑 필요 이벤트`;
  }

  return `${candidate.commitDate.slice(0, 10)} 출시 후보: ${operatorNames.join(
    ", ",
  )}`;
};

const createEventCategory = (
  candidate: CnReleaseCandidate,
): OperatorReleaseEvent["category"] => {
  const releaseActivity = pickBestReleaseActivity(candidate);

  if (releaseActivity !== undefined) {
    return releaseActivity.category;
  }

  return "other";
};

const createEventServer = (
  candidate: CnReleaseCandidate,
): OperatorReleaseEvent["server"] => {
  if (candidate.addedOperatorList.length === 0) {
    const releaseActivity = pickBestReleaseActivity(candidate);

    if (releaseActivity === undefined) {
      return "future";
    }

    return releaseActivity.hasGlobalMatch ? "global" : "future";
  }

  const hasFutureOperator = candidate.addedOperatorList.some((operator) => {
    return operator.server === "future";
  });

  return hasFutureOperator ? "future" : "global";
};

const shouldCreateDraftEvent = (candidate: CnReleaseCandidate) => {
  if (candidate.kind === "cn_release_candidate") {
    return true;
  }

  if (candidate.kind === "cn_unmapped_release_activity") {
    return true;
  }

  return false;
};

const createOperatorReleaseEventDraftList = (): OperatorReleaseEvent[] => {
  return cnOperatorReleaseCandidateList
    .filter((candidate) => {
      return shouldCreateDraftEvent(candidate);
    })
    .map((candidate) => {
      return {
        id: createEventId(candidate),
        name: createEventName(candidate),
        category: createEventCategory(candidate),
        server: createEventServer(candidate),
        source: "cn_git_history",
        operatorIds: candidate.addedOperatorList.map((operator) => {
          return operator.charId;
        }),
      };
    });
};

const createFileContent = (eventList: OperatorReleaseEvent[]) => {
  return `import { OperatorReleaseEvent } from "../manual/operator-release-types";

/**
 * CN release candidate에서 자동 생성한 출시 이벤트 초안입니다.
 *
 * 직접 수정하지 말고 참고용으로만 사용하세요.
 * 최종 확정본은 src/data/operator/manual/operator-release-events.ts에 작성합니다.
 *
 * operatorIds가 빈 배열인 항목은 출시성 이벤트로 보이지만
 * 자동으로 매핑된 오퍼레이터가 없는 항목입니다.
 */
export const operatorReleaseEventDraftList: OperatorReleaseEvent[] = ${JSON.stringify(
    eventList,
    null,
    2,
  )};
`;
};

const writeGeneratedFile = (outputPath: string, content: string) => {
  const resolvedOutputPath = path.resolve(process.cwd(), outputPath);

  fs.mkdirSync(path.dirname(resolvedOutputPath), {
    recursive: true,
  });

  fs.writeFileSync(resolvedOutputPath, content, "utf-8");
};

const main = () => {
  const eventList = createOperatorReleaseEventDraftList();

  writeGeneratedFile(OUTPUT_PATH, createFileContent(eventList));

  const unmappedEventCount = eventList.filter((event) => {
    return event.operatorIds.length === 0;
  }).length;

  console.log(`출시 이벤트 초안 ${eventList.length}개를 생성했습니다.`);
  console.log(
    `오퍼레이터 매핑 필요 이벤트 ${unmappedEventCount}개를 포함했습니다.`,
  );
  console.log(`생성 완료: ${OUTPUT_PATH}`);
};

main();
