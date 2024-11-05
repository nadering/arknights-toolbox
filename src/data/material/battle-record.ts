import Material from "./material";

// 작전기록 계열

/** 작전기록 인터페이스 */
export interface BattleRecord extends Material {
  /** 경험치량 */
  exp: number;
}

/** 기초작전기록 */
export const drillBattleRecord: BattleRecord = {
  id: "2001",
  name: "기초작전기록",
  imageFilename: "drill-battle-record",
  type: "Battle-Record",
  tier: 2,
  exp: 200,
};

/** 초급작전기록 */
export const frontlineBattleRecord: BattleRecord = {
  id: "2002",
  name: "초급작전기록",
  imageFilename: "frontline-battle-record",
  type: "Battle-Record",
  tier: 3,
  exp: 400,
};

/** 중급작전기록 */
export const tacticalBattleRecord: BattleRecord = {
  id: "2003",
  name: "중급작전기록",
  imageFilename: "tactical-battle-record",
  type: "Battle-Record",
  tier: 4,
  exp: 1000,
};

/** 고급작전기록 */
export const strategicBattleRecord: BattleRecord = {
  id: "2004",
  name: "고급작전기록",
  imageFilename: "strategic-battle-record",
  type: "Battle-Record",
  tier: 5,
  exp: 2000,
};

/** 작전기록 리스트 */
export const battleRecordList: BattleRecord[] = [
  strategicBattleRecord,
  tacticalBattleRecord,
  frontlineBattleRecord,
  drillBattleRecord,
];
