import Material from "./material";

// 스킬개론 계열

/** 스킬개론 제1권 */
export const skillSummary1: Material = {
  id: "3301",
  name: "스킬개론 제1권",
  objectName: "skillSummary1",
  imageFilename: "skill-summary-1",
  type: "Skill-Summary",
  tier: 2,
};

/** 스킬개론 제2권 */
export const skillSummary2: Material = {
  id: "3302",
  name: "스킬개론 제2권",
  objectName: "skillSummary2",
  imageFilename: "skill-summary-2",
  type: "Skill-Summary",
  tier: 3,
  recipe: [{ material: skillSummary1, count: 3 }],
};

/** 스킬개론 제3권 */
export const skillSummary3: Material = {
  id: "3303",
  name: "스킬개론 제3권",
  objectName: "skillSummary3",
  imageFilename: "skill-summary-3",
  type: "Skill-Summary",
  tier: 4,
  recipe: [{ material: skillSummary2, count: 3 }],
};

/** 스킬개론 리스트 */
export const skillSummaryList: Material[] = [
  skillSummary3,
  skillSummary2,
  skillSummary1,
]