import { OperatorReleaseCategory } from "@/data/operator/manual/operator-release-type";
import { ActivityBasicInfo, ActivityClassification } from "./activity-types";

// 이벤트 분류

const isSideStoryActivity = (activity: ActivityBasicInfo) => {
  if (activity.displayType === "SIDESTORY") {
    return true;
  }

  if (/^act\d+side$/.test(activity.id)) {
    return true;
  }

  if (/^act\d+sre$/.test(activity.id)) {
    return true;
  }

  if (activity.type.endsWith("SIDE")) {
    return true;
  }

  if (activity.templateShopId?.includes("side") === true) {
    return true;
  }

  return false;
};

const isMainStoryActivity = (activity: ActivityBasicInfo) => {
  if (/^act\d+mainss$/.test(activity.id)) {
    return true;
  }

  if (activity.type === "TYPE_MAINSS") {
    return true;
  }

  if (activity.templateShopId?.includes("mainss") === true) {
    return true;
  }

  return false;
};

const isMiniEventActivity = (activity: ActivityBasicInfo) => {
  const lowerId = activity.id.toLowerCase();
  const lowerType = activity.type.toLowerCase();
  const lowerDisplayType = activity.displayType.toLowerCase();

  return (
    lowerDisplayType.includes("mini") ||
    lowerId.includes("mini") ||
    lowerId.includes("ministory") ||
    lowerType.includes("mini")
  );
};

const isRoguelikeActivity = (activity: ActivityBasicInfo) => {
  const lowerId = activity.id.toLowerCase();
  const lowerType = activity.type.toLowerCase();
  const lowerDisplayType = activity.displayType.toLowerCase();

  return (
    lowerDisplayType.includes("rogue") ||
    lowerId.includes("rogue") ||
    lowerType.includes("rogue")
  );
};

const isRerunActivity = (activity: ActivityBasicInfo) => {
  if (activity.isReplicate === true) {
    return true;
  }

  if (activity.name.includes("재개방")) {
    return true;
  }

  if (/re$/.test(activity.id)) {
    return true;
  }

  if (/sre$/.test(activity.id)) {
    return true;
  }

  return false;
};

const getActivityCategory = (
  activity: ActivityBasicInfo,
): OperatorReleaseCategory => {
  if (isMainStoryActivity(activity)) {
    return "main_story";
  }

  if (isSideStoryActivity(activity)) {
    return "side_story";
  }

  if (isMiniEventActivity(activity)) {
    return "mini_event";
  }

  if (isRoguelikeActivity(activity)) {
    return "roguelike";
  }

  return "other";
};

/**
 * 이벤트를 분류합니다.
 * @param activity 이벤트 정보
 * @returns 이벤트 분류 결과
 */
export const classifyActivity = (
  activity: ActivityBasicInfo,
): ActivityClassification => {
  const category = getActivityCategory(activity);
  const isRerun = isRerunActivity(activity);
  const hasEventShop =
    activity.templateShopId !== null &&
    activity.templateShopId !== undefined &&
    activity.templateShopId !== "";

  const reasons: string[] = [];

  if (category !== "other") {
    reasons.push(`${category} pattern matched`);
  }

  if (isRerun) {
    reasons.push("rerun or replicate activity");
  }

  if (activity.hasStage === true) {
    reasons.push("has stage");
  }

  if (hasEventShop) {
    reasons.push("has event shop");
  }

  const isEventCatalogCandidate =
    category !== "other" && activity.hasStage === true;

  const isOperatorReleaseCandidate =
    isEventCatalogCandidate && isRerun === false;

  return {
    category,
    isRerun,
    hasEventShop,
    isEventCatalogCandidate,
    isOperatorReleaseCandidate,
    reasons,
  };
};
