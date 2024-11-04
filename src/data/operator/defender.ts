import Operator from "./operator";

// 디펜더

/** 디펜더 세부 직군 */
export type DefenderBranch =
  | "Protector" // 프로텍터
  | "Guardian" // 가디언
  | "Juggernaut" // 저거너트
  | "Arts-Protector" // 아츠 프로텍터
  | "Duelist" // 결전자
  | "Fortress" // 포트리스
  | "Sentry-Protector" // 센트리 프로텍터
  | "Primal-Protector"; // 프라이멀 프로텍터

/** 디펜더 오퍼레이터 */
export interface Defender extends Operator {
  /** 세부 직군 */
  branch: DefenderBranch;
}
