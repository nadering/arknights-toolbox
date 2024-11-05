// 오퍼레이터 인터페이스 및 오퍼레이터 관련 설정

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

/** 모듈 인터페이스 */
interface ModuleInfo {
  /** 모듈 타입 (X, Y, 델타 등) */
  type: string;
  /** 모듈 이름 */
  name: string;
}

/** 모듈 업그레이드 시, 일반적으로 추천되는 모듈의 이름 및 레벨 인터페이스 */
interface PreferModuleInfo {
  module: ModuleInfo;
  level: number;
}

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
  rarity: number;
  /** 최대 가능한 정예화 */
  maxElite: number;
  /** 정예화 필요 재료 */
  eliteMaterials: MaterialsWithNumber;
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
  moduleList?: ModuleInfo[];
  /**
   * 모듈 업그레이드 시 일반적으로 추천되는 모듈들로,
   * 명일방주 채널의 청문회 기준 "필수" ~ "특성 강화" 항목의 합이 80% 이상을 만족해야 하며, 해당 투표에서 가장 높은 추천도를 선택할 예정이고,
   * 청문회에 모듈 투표가 존재하지 않을 경우 마찬가지로 여론을 감안하지만 주관적인 판단으로 추가할 예정
   */
  preferModuleList?: PreferModuleInfo[];
  /** 모듈 업그레이드 재료 */
  moduleMaterials?: MaterialsWithNumberAndName;
}

/** 레벨 상한 */
export const maxLevelTable = {
  6: {
    0: 50,
    1: 80,
    2: 90,
  },
  5: {
    0: 50,
    1: 70,
    2: 80,
  },
  4: {
    0: 45,
    1: 60,
    2: 70,
  },
  3: {
    0: 40,
    1: 55,
  },
  2: {
    0: 30,
  },
  1: {
    0: 30,
  },
};

/** 레벨 업에 필요한 경험치 및 용문폐 테이블 */
export const levelUpTable = {
  0: {
    2: {
      exp: 100,
      lmd: 30,
    },
  },
};

/** 모듈 레벨 조건 */
export const moduleLevelRequired = {
  6: 60,
  5: 50,
  4: 40,
};
