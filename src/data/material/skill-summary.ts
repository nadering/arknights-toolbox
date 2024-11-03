import Material from "./material";

// 스킬개론 계열

/** 스킬개론 제1권 */
export const skillSummary1: Material = {
  id: "3301",
  name: "스킬개론 제1권",
  type: "SkillSummary",
  tier: 2,
};

/** 스킬개론 제2권 */
export const skillSummary2: Material = {
  id: "3302",
  name: "스킬개론 제2권",
  type: "SkillSummary",
  tier: 3,
  recipe: [{ material: skillSummary1, count: 3 }],
};

/** 스킬개론 제3권 */
export const skillSummary3: Material = {
  id: "3303",
  name: "스킬개론 제3권",
  type: "SkillSummary",
  tier: 4,
  recipe: [{ material: skillSummary2, count: 3 }],
};

/** 스킬개론 리스트 */
export const skillSummaryList: Material[] = [
  skillSummary3,
  skillSummary2,
  skillSummary1,
]