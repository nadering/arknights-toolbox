import Material from "./material";

// 작전기록 계열

/** 기초작전기록 */
export const drillBattleRecord: Material = {
  id: "2001",
  name: "기초작전기록",
  imageFilename: "drill-battle-record",
  type: "Battle-Record",
  tier: 2,
};

/** 초급작전기록 */
export const frontlineBattleRecord: Material = {
  id: "2002",
  name: "초급작전기록",
  imageFilename: "frontline-battle-record",
  type: "Battle-Record",
  tier: 3,
};

/** 중급작전기록 */
export const tacticalBattleRecord: Material = {
  id: "2003",
  name: "중급작전기록",
  imageFilename: "tactical-battle-record",
  type: "Battle-Record",
  tier: 4,
};

/** 고급작전기록 */
export const strategicBattleRecord: Material = {
  id: "2004",
  name: "고급작전기록",
  imageFilename: "strategic-battle-record",
  type: "Battle-Record",
  tier: 5,
};

/** 작전기록 리스트 */
export const battleRecordList: Material[] = [
  strategicBattleRecord,
  tacticalBattleRecord,
  frontlineBattleRecord,
  drillBattleRecord,
];
