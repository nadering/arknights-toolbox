import fs from "node:fs";
import path from "node:path";
import { loadGamedataPath } from "../operator-generator/loaders/load-gamedata-path";
import { classifyActivity } from "./classify-activity";
import {
  ActivityBasicInfo,
  ActivitySummary,
  ActivityTable,
} from "./activity-types";

// 이벤트 테이블 검사 스크립트

type InspectMode =
  | "event_catalog" // 사이드, 메인 이벤트 등
  | "operator_release_candidate" // 오퍼레이터가 출시된 이벤트 후보
  | "all_classified"; // 전체 이벤트

const formatDate = (timestamp: number | null) => {
  if (timestamp === null || timestamp <= 0) {
    return "";
  }

  return new Date(timestamp * 1000).toISOString().slice(0, 10);
};

const shouldShowActivity = (
  activity: ActivitySummary,
  inspectMode: InspectMode,
) => {
  if (inspectMode === "event_catalog") {
    return activity.isEventCatalogCandidate;
  }

  if (inspectMode === "operator_release_candidate") {
    return activity.isOperatorReleaseCandidate;
  }

  return activity.category !== "other";
};

const createActivitySummary = (
  activity: ActivityBasicInfo,
): ActivitySummary => {
  const classification = classifyActivity(activity);

  return {
    id: activity.id,
    type: activity.type,
    displayType: activity.displayType,
    name: activity.name,

    category: classification.category,

    startTime: activity.startTime,
    endTime: activity.endTime,
    startDate: formatDate(activity.startTime),
    endDate: formatDate(activity.endTime),

    isRerun: classification.isRerun,
    hasEventShop: classification.hasEventShop,
    isEventCatalogCandidate: classification.isEventCatalogCandidate,
    isOperatorReleaseCandidate: classification.isOperatorReleaseCandidate,

    templateShopId: activity.templateShopId ?? null,

    reasons: classification.reasons,
  };
};

const loadActivityTable = () => {
  const gamedataPath = loadGamedataPath();

  const activityTablePath = path.join(
    gamedataPath,
    "cn",
    "gamedata",
    "excel",
    "activity_table.json",
  );

  const rawActivityTable = fs.readFileSync(activityTablePath, "utf-8");

  return JSON.parse(rawActivityTable) as ActivityTable;
};

const main = () => {
  const inspectMode: InspectMode = "operator_release_candidate"; // "event_catalog" | "operator_release_candidate" | "all_classified"
  const activityTable = loadActivityTable();

  const activitySummaries = Object.values(activityTable.basicInfo)
    .map((activity) => {
      return createActivitySummary(activity);
    })
    .filter((activity) => {
      return shouldShowActivity(activity, inspectMode);
    })
    .slice(0, 20);

  console.table(
    activitySummaries.map((activity) => {
      return {
        id: activity.id,
        type: activity.type,
        displayType: activity.displayType,
        name: activity.name,
        category: activity.category,
        startDate: activity.startDate,
        endDate: activity.endDate,
        isRerun: activity.isRerun,
        hasEventShop: activity.hasEventShop,
        isEventCatalogCandidate: activity.isEventCatalogCandidate,
        isOperatorReleaseCandidate: activity.isOperatorReleaseCandidate,
        templateShopId: activity.templateShopId,
        reasons: activity.reasons.join(", "),
      };
    }),
  );
};

main();
