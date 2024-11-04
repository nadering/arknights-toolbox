import Operator from "./operator";

// 스나이퍼

/** 스나이퍼 세부 직군 */
export type SniperBranch =
  | "Marksman" // 명사수
  | "Artilleryman" // 포격사수
  | "Deadeye" // 저격수
  | "Heavyshooter" // 헤비슈터
  | "Spreadshooter" // 산탄사수
  | "Besieger" // 공성사수
  | "Flinger" // 투척수
  | "Hunter" // 사냥꾼
  | "Loopshooter"; // 루프슈터

/** 스나이퍼 오퍼레이터 */
export interface Sniper extends Operator {
  /** 세부 직군 */
  branch: SniperBranch;
}
