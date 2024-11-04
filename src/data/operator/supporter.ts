import Operator from "./operator";

// 서포터

/** 서포터 세부 직군 */
export type SupporterBranch =
  | "Decel-Binder" // 감속자
  | "Summoner" // 소환사
  | "Hexer" // 약화자
  | "Bard" // 음유시인
  | "Abjurer" // 비호자
  | "Artificer" // 기능공
  | "Ritualist"; // 의식술사

/** 서포터 오퍼레이터 */
export interface Supporter extends Operator {
  /** 세부 직군 */
  branch: SupporterBranch;
}
