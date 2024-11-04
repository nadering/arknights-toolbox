import Operator from "./operator";

// 스페셜리스트

/** 스페셜리스트 세부 직군 */
export type SpecialistBranch =
  | "Push-Stroker" // 푸쉬마스터
  | "Hookmaster" // 후크마스터
  | "Executor" // 처형자
  | "Ambusher" // 매복자
  | "Geek" // 기인
  | "Merchant" // 상인
  | "Trapmaster" // 함정술사
  | "Dollkeeper" // 인형사
  | "Alchemist" // 연금술사
  | "Skyranger"; // 스카이레인저

/** 스페셜리스트 오퍼레이터 */
export interface Specialist extends Operator {
  /** 세부 직군 */
  branch: SpecialistBranch;
}
