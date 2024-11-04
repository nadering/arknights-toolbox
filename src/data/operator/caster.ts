import Operator from "./operator";

// 캐스터

/** 캐스터 세부 직군 */
export type CasterBranch =
  | "Core" // 코어 캐스터
  | "Splash" // 스플래시 캐스터
  | "Blast" // 블래스트 캐스터
  | "Chain" // 체인 캐스터
  | "Mech-Accord" // 메카 캐스터
  | "Phalanx" // 진법 캐스터
  | "Mystic" // 미스틱 캐스터
  | "Primal"; // 프라이멀 캐스터

/** 캐스터 오퍼레이터 */
export interface Caster extends Operator {
  /** 세부 직군 */
  branch: CasterBranch;
}
