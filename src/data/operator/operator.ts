// 오퍼레이터 인터페이스 및 오퍼레이터 관련 설정

import {
  MaterialsWithElite,
  MaterialsWithNumberAndName,
  ModuleInfo,
  PreferModuleInfo,
  RarityNumber,
} from "./table";

/** 오퍼레이터 포지션(클래스) 리스트 */
export const OperatorClassList = [
  "Vanguard",
  "Guard",
  "Defender",
  "Sniper",
  "Caster",
  "Medic",
  "Supporter",
  "Specialist",
] as const;

/** 오퍼레이터 포지션(클래스) */
export type OperatorClass = (typeof OperatorClassList)[number];

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
  /** 스킬 업그레이드 시 일반적으로 추천되는 스킬들 */
  preferSkillList?: string[];
  /** 스킬 업그레이드 재료 */
  skillUpgradeMaterials: MaterialsWithNumberAndName;
  /** 모듈 목록 */
  moduleList: ModuleInfo[];
  /** 모듈 업그레이드 시 일반적으로 추천되는 모듈들 */
  preferModuleList?: PreferModuleInfo[];
  /** 모듈 업그레이드 재료 */
  moduleMaterials: MaterialsWithNumberAndName | null;
}
