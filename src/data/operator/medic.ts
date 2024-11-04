import Operator from "./operator";

// 메딕

/** 메딕 세부 직군 */
export type MedicBranch =
  | "Medic" // 메딕
  | "Multi-target" // 멀티 타겟 메딕
  | "Therapist" // 테라피스트
  | "Wandering" // 방랑 메딕
  | "Incantation" // 주술 메딕
  | "Chain"; // 체인 메딕

/** 메딕 오퍼레이터 */
export interface Medic extends Operator {
  /** 세부 직군 */
  branch: MedicBranch;
}
