import Operator from "./operator";

// 가드

/** 가드 세부 직군 */
export type GuardBranch =
  | "Dreadnought" // 드레드노트
  | "Centurion" // 공격수
  | "Lord" // 로드
  | "Arts-Fighter" // 아츠 파이터
  | "Instructor" // 교관
  | "Fighter" // 파이터
  | "Swordmaster" // 소드마스터
  | "Soloblade" // 솔로블레이드
  | "Liberator" // 해방자
  | "Reaper" // 리퍼
  | "Crusher" // 대검사
  | "Earthshaker"; // 어스셰이커

/** 가드 오퍼레이터 */
export interface Guard extends Operator {
  /** 세부 직군 */
  branch: GuardBranch;
}

/** 가드 오퍼레이터 리스트 */
export const guardList: Guard[] = [];