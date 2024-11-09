import { CountableMaterial } from "@/data/material";

// 오퍼레이터 관련 타입 및 테이블

/** 레어도(별) 타입 */
export type RarityNumber = 1 | 2 | 3 | 4 | 5 | 6;

/** 정예화 타입 */
export type EliteNumber = 0 | 1 | 2;

/** 숫자와 필요한 재료 매핑 */
export interface MaterialsWithNumber {
  [key: string]: CountableMaterial[];
}

/**
 * 스킬 혹은 모듈 같이 이름이 있고 업그레이드가 가능한 경우, 이름과 "숫자와 필요한 재료 매핑"된 부분을 매핑하여,
 * 이름으로 접근한 후 숫자로 추가로 접근할 수 있도록 함
 */
export interface MaterialsWithNumberAndName {
  [key: string]: MaterialsWithNumber;
}

/** 모듈 인터페이스 */
export interface ModuleInfo {
  /** 모듈 타입 (X, Y, 델타 등) */
  type: string;
  /** 모듈 이름 */
  name: string;
}

/** 모듈 업그레이드 시, 일반적으로 추천되는 모듈의 이름 및 레벨 인터페이스 */
export interface PreferModuleInfo {
  module: ModuleInfo;
  level: number;
}

/** 레벨 상한 타입 */
type MaxLevelTableType = {
  [key in RarityNumber]: { [key: number]: number };
};

/** 레벨 상한 */
export const maxLevelTable: MaxLevelTableType = {
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

/** [레어도: 숫자] 타입 */
type NumberByRarity = {
  [key in RarityNumber]: number;
};

/** 모듈 레벨 조건 */
export const moduleLevelRequired: NumberByRarity = {
  6: 60,
  5: 50,
  4: 40,
  3: 99,
  2: 99,
  1: 99,
};

/** [레어도: 정예화] 타입 */
type EliteByRarity = {
  [key in RarityNumber]: EliteNumber;
};

/** 최대 정예화 */
export const maxEliteTable: EliteByRarity = {
  6: 2,
  5: 2,
  4: 2,
  3: 1,
  2: 0,
  1: 0,
};

/** [정예화: 숫자] 타입 */
type NumberByElite = {
  [key in EliteNumber]: number;
};

/** 현재 정예화에 따른 스킬 최대 레벨 */
export const skillMaxLevelTable: NumberByElite = {
  0: 4,
  1: 7,
  2: 10,
};
