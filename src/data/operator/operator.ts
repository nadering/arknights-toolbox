// 오퍼레이터 인터페이스

import { CountableMaterial } from "@/data/material";

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

/** 숫자와 필요한 재료 매핑 */
interface MaterialsWithNumber {
  [key: string]: CountableMaterial[];
}

/**
 * 스킬 혹은 모듈 같이 이름이 있고 업그레이드가 가능한 경우, 이름과 "숫자와 필요한 재료 매핑"된 부분을 매핑하여,
 * 이름으로 접근한 후 숫자로 추가로 접근할 수 있도록 함
 */
interface MaterialsWithNumberAndName {
  [key: string]: MaterialsWithNumber;
}

/** 오퍼레이터 인터페이스 */
export default interface Operator {
  /** 아이디 (출시 순서) */
  id: number;
  /** 이름 */
  name: string;
  /** 이미지 파일 이름 */
  imageFilename?: string;
  /** 포지션 */
  class: OperatorClass;
  /** 레어도 (1성 ~ 6성) */
  rarity: number;
  /** 최대 가능한 정예화 */
  maxElite: number;
  /** 정예화 필요 재료 */
  eliteMaterials: MaterialsWithNumber;
  /** 스킬 목록 */
  skillList: string[];
  /** 스킬 업그레이드 시, 일반적으로 추천되는 스킬들 */
  preferSkillList?: string[];
  /** 스킬 업그레이드 재료 */
  skillUpgradeMaterials: MaterialsWithNumberAndName;
  /** 모듈 목록 */
  moduleList?: string[];
  /** 모듈 업그레이드 시, 일반적으로 추천되는 모듈들 */
  preferModuleList?: string[];
  /** 모듈 업그레이드 재료 */
  moduleMaterials?: MaterialsWithNumberAndName;
}
