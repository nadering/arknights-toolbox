// 오퍼레이터 인터페이스 및 오퍼레이터 관련 설정

import { MaterialsWithElite,MaterialsWithNumberAndName, ModuleInfo, PreferModuleInfo, RarityNumber } from "./table";

/** 오퍼레이터 포지션(클래스) */
export type OperatorClass =
  | "Vanguard"
  | "Guard"
  | "Defender"
  | "Sniper"
  | "Caster"
  | "Medic"
  | "Supporter"
  | "Specialist";

/** 오퍼레이터 인터페이스 */
export default interface Operator {
  /** 아이디 (출시 순서) */
  id: number;
  /** 이름 */
  name: string;
  /** 별명 목록 */
  nicknameList?: string[];
  /** 이미지 파일 이름 */
  imageFilename?: string;
  /** 포지션 */
  class: OperatorClass;
  /** 레어도 (1성 ~ 6성) */
  rarity: RarityNumber;
  /** 정예화 필요 재료 */
  eliteMaterials: MaterialsWithElite;
  /** 스킬 목록 */
  skillList: string[];
  /**
   * 스킬 업그레이드 시 일반적으로 추천되는 스킬들로,
   * 명일방주 채널의 청문회 기준 스킬 마스터리 추천도 65% 이상을 만족해야 하며,
   * 청문회에 스킬 마스터리 투표가 존재하지 않을 경우 여론을 감안하지만 주관적인 판단으로 추가할 예정
   */
  preferSkillList?: string[];
  /** 스킬 업그레이드 재료 */
  skillUpgradeMaterials: MaterialsWithNumberAndName;
  /** 모듈 목록 */
  moduleList: ModuleInfo[];
  /**
   * 모듈 업그레이드 시 일반적으로 추천되는 모듈들로,
   * 명일방주 채널의 청문회 기준 "필수" ~ "특성 강화" 항목의 합이 80% 이상을 만족해야 하며, 해당 투표에서 가장 높은 추천도를 선택할 예정이고,
   * 청문회에 모듈 투표가 존재하지 않을 경우 마찬가지로 여론을 감안하지만 주관적인 판단으로 추가할 예정
   */
  preferModuleList?: PreferModuleInfo[];
  /** 모듈 업그레이드 재료 */
  moduleMaterials: MaterialsWithNumberAndName | null;
}


