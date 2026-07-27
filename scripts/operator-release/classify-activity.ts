import { OperatorReleaseCategory } from "../../src/data/operator/manual/operator-release-types";
import { ActivityBasicInfo, ActivityClassification } from "./activity-types";

const getStringValue = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return "";
};

const getActivityId = (activity: ActivityBasicInfo) => {
  return getStringValue(activity.id);
};

const getActivityType = (activity: ActivityBasicInfo) => {
  return getStringValue(activity.type);
};

const getActivityDisplayType = (activity: ActivityBasicInfo) => {
  return getStringValue(activity.displayType);
};

const getActivityName = (activity: ActivityBasicInfo) => {
  return getStringValue(activity.name);
};

const isSideStoryActivity = (activity: ActivityBasicInfo) => {
  const id = getActivityId(activity);
  const type = getActivityType(activity);
  const displayType = getActivityDisplayType(activity);
  const templateShopId = activity.templateShopId ?? "";

  if (displayType === "SIDESTORY") {
    return true;
  }

  if (/^act\d+side$/.test(id)) {
    return true;
  }

  if (/^act\d+sre$/.test(id)) {
    return true;
  }

  if (type.endsWith("SIDE")) {
    return true;
  }

  if (templateShopId.includes("side")) {
    return true;
  }

  return false;
};

const isMainStoryActivity = (activity: ActivityBasicInfo) => {
  const id = getActivityId(activity);
  const type = getActivityType(activity);
  const templateShopId = activity.templateShopId ?? "";

  if (/^act\d+mainss$/.test(id)) {
    return true;
  }

  if (type === "TYPE_MAINSS") {
    return true;
  }

  if (templateShopId.includes("mainss")) {
    return true;
  }

  return false;
};

const isMiniEventActivity = (activity: ActivityBasicInfo) => {
  const lowerId = getActivityId(activity).toLowerCase();
  const lowerType = getActivityType(activity).toLowerCase();
  const lowerDisplayType = getActivityDisplayType(activity).toLowerCase();

  return (
    lowerDisplayType.includes("mini") ||
    lowerId.includes("mini") ||
    lowerId.includes("ministory") ||
    lowerType.includes("mini")
  );
};

const isRoguelikeActivity = (activity: ActivityBasicInfo) => {
  const lowerId = getActivityId(activity).toLowerCase();
  const lowerType = getActivityType(activity).toLowerCase();
  const lowerDisplayType = getActivityDisplayType(activity).toLowerCase();

  return (
    lowerDisplayType.includes("rogue") ||
    lowerId.includes("rogue") ||
    lowerType.includes("rogue")
  );
};

const isRerunActivity = (activity: ActivityBasicInfo) => {
  const id = getActivityId(activity);
  const name = getActivityName(activity);

  if (activity.isReplicate === true) {
    return true;
  }

  if (name.includes("재개방")) {
    return true;
  }

  if (/re$/.test(id)) {
    return true;
  }

  if (/sre$/.test(id)) {
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
