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

/** 정예화 타입 숫자와 필요한 재료 매핑 */
export type MaterialsWithElite = {
  [key in EliteNumber]: CountableMaterial[];
};

/**
 * 스킬 혹은 모듈 같이 이름이 있고 업그레이드가 가능한 경우, 이름과 "숫자와 필요한 재료 매핑"된 부분을 매핑하여,
 * 이름으로 접근한 후 숫자로 추가로 접근할 수 있도록 함
 */
export interface MaterialsWithNumberAndName {
  [key: string]: MaterialsWithNumber;
}

/** 스킬 레벨 타입 */
export interface SkillLevel {
  name: string;
  current: number;
  target: number;
}

/** 모듈 활성화 정예화 */
export const moduleActiveElite = 2;

/** 모듈 최대 레벨 */
export const moduleMaxLevel = 3;

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

/** 모듈 레벨 타입 */
export interface ModuleLevel {
  type: string;
  name: string;
  current: number;
  target: number;
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

/** 레벨 업 테이블 타입 */
type LevelUpTable = {
  [key in EliteNumber]: {
    [key: number]: {
      exp: number;
      lmd: number;
    };
  };
};


/** 레벨 업에 필요한 경험치 및 용문폐, 정예화별 누적 테이블 */
export const levelUpStackedTable: LevelUpTable = {
  0: {
    0: {
      exp: 0,
      lmd: 0,
    },
    1: {
      exp: 0,
      lmd: 0,
    },
    2: {
      exp: 100,
      lmd: 30,
    },
    3: {
      exp: 217,
      lmd: 66,
    },
    4: {
      exp: 351,
      lmd: 109,
    },
    5: {
      exp: 502,
      lmd: 159,
    },
    6: {
      exp: 670,
      lmd: 216,
    },
    7: {
      exp: 855,
      lmd: 281,
    },
    8: {
      exp: 1057,
      lmd: 354,
    },
    9: {
      exp: 1276,
      lmd: 435,
    },
    10: {
      exp: 1512,
      lmd: 525,
    },
    11: {
      exp: 1765,
      lmd: 624,
    },
    12: {
      exp: 2035,
      lmd: 732,
    },
    13: {
      exp: 2322,
      lmd: 850,
    },
    14: {
      exp: 2626,
      lmd: 978,
    },
    15: {
      exp: 2947,
      lmd: 1116,
    },
    16: {
      exp: 3285,
      lmd: 1265,
    },
    17: {
      exp: 3640,
      lmd: 1425,
    },
    18: {
      exp: 4012,
      lmd: 1607,
    },
    19: {
      exp: 4401,
      lmd: 1813,
    },
    20: {
      exp: 4807,
      lmd: 2044,
    },
    21: {
      exp: 5230,
      lmd: 2302,
    },
    22: {
      exp: 5670,
      lmd: 2588,
    },
    23: {
      exp: 6127,
      lmd: 2903,
    },
    24: {
      exp: 6601,
      lmd: 3249,
    },
    25: {
      exp: 7092,
      lmd: 3627,
    },
    26: {
      exp: 7600,
      lmd: 4038,
    },
    27: {
      exp: 8125,
      lmd: 4484,
    },
    28: {
      exp: 8667,
      lmd: 4966,
    },
    29: {
      exp: 9226,
      lmd: 5486,
    },
    30: {
      exp: 9800,
      lmd: 6043,
    },
    31: {
      exp: 10389,
      lmd: 6638,
    },
    32: {
      exp: 10994,
      lmd: 7273,
    },
    33: {
      exp: 11615,
      lmd: 7950,
    },
    34: {
      exp: 12252,
      lmd: 8670,
    },
    35: {
      exp: 12905,
      lmd: 9434,
    },
    36: {
      exp: 13574,
      lmd: 10243,
    },
    37: {
      exp: 14259,
      lmd: 11099,
    },
    38: {
      exp: 14960,
      lmd: 12003,
    },
    39: {
      exp: 15676,
      lmd: 12955,
    },
    40: {
      exp: 16400,
      lmd: 13947,
    },
    41: {
      exp: 17139,
      lmd: 14989,
    },
    42: {
      exp: 17888,
      lmd: 16075,
    },
    43: {
      exp: 18647,
      lmd: 17206,
    },
    44: {
      exp: 19417,
      lmd: 18384,
    },
    45: {
      exp: 20200,
      lmd: 19613,
    },
    46: {
      exp: 21004,
      lmd: 20907,
    },
    47: {
      exp: 21824,
      lmd: 22260,
    },
    48: {
      exp: 22660,
      lmd: 23673,
    },
    49: {
      exp: 23512,
      lmd: 25147,
    },
    50: {
      exp: 24400,
      lmd: 26719,
    },
  },
  1: {
    0: {
      exp: 0,
      lmd: 0,
    },
    1: {
      exp: 0,
      lmd: 0,
    },
    2: {
      exp: 120,
      lmd: 48,
    },
    3: {
      exp: 292,
      lmd: 119,
    },
    4: {
      exp: 516,
      lmd: 214,
    },
    5: {
      exp: 792,
      lmd: 334,
    },
    6: {
      exp: 1120,
      lmd: 480,
    },
    7: {
      exp: 1500,
      lmd: 653,
    },
    8: {
      exp: 1932,
      lmd: 854,
    },
    9: {
      exp: 2416,
      lmd: 1085,
    },
    10: {
      exp: 2952,
      lmd: 1347,
    },
    11: {
      exp: 3540,
      lmd: 1640,
    },
    12: {
      exp: 4180,
      lmd: 1966,
    },
    13: {
      exp: 4872,
      lmd: 2327,
    },
    14: {
      exp: 5616,
      lmd: 2723,
    },
    15: {
      exp: 6412,
      lmd: 3155,
    },
    16: {
      exp: 7260,
      lmd: 3625,
    },
    17: {
      exp: 8160,
      lmd: 4133,
    },
    18: {
      exp: 9112,
      lmd: 4681,
    },
    19: {
      exp: 10116,
      lmd: 5270,
    },
    20: {
      exp: 11172,
      lmd: 5901,
    },
    21: {
      exp: 12280,
      lmd: 6576,
    },
    22: {
      exp: 13440,
      lmd: 7295,
    },
    23: {
      exp: 14652,
      lmd: 8060,
    },
    24: {
      exp: 15916,
      lmd: 8871,
    },
    25: {
      exp: 17232,
      lmd: 9730,
    },
    26: {
      exp: 18600,
      lmd: 10638,
    },
    27: {
      exp: 20020,
      lmd: 11596,
    },
    28: {
      exp: 21492,
      lmd: 12606,
    },
    29: {
      exp: 23016,
      lmd: 13668,
    },
    30: {
      exp: 24592,
      lmd: 14784,
    },
    31: {
      exp: 26220,
      lmd: 15955,
    },
    32: {
      exp: 27926,
      lmd: 17200,
    },
    33: {
      exp: 29710,
      lmd: 18522,
    },
    34: {
      exp: 31572,
      lmd: 19922,
    },
    35: {
      exp: 33512,
      lmd: 21402,
    },
    36: {
      exp: 35530,
      lmd: 22964,
    },
    37: {
      exp: 37626,
      lmd: 24609,
    },
    38: {
      exp: 39800,
      lmd: 26340,
    },
    39: {
      exp: 42052,
      lmd: 28157,
    },
    40: {
      exp: 44382,
      lmd: 30063,
    },
    41: {
      exp: 46790,
      lmd: 32059,
    },
    42: {
      exp: 49374,
      lmd: 34230,
    },
    43: {
      exp: 52134,
      lmd: 36579,
    },
    44: {
      exp: 55070,
      lmd: 39110,
    },
    45: {
      exp: 58182,
      lmd: 41827,
    },
    46: {
      exp: 61470,
      lmd: 44734,
    },
    47: {
      exp: 64934,
      lmd: 47834,
    },
    48: {
      exp: 68574,
      lmd: 51132,
    },
    49: {
      exp: 72390,
      lmd: 54631,
    },
    50: {
      exp: 76382,
      lmd: 58336,
    },
    51: {
      exp: 80550,
      lmd: 62550,
    },
    52: {
      exp: 84894,
      lmd: 66377,
    },
    53: {
      exp: 89414,
      lmd: 70721,
    },
    54: {
      exp: 94110,
      lmd: 75286,
    },
    55: {
      exp: 99000,
      lmd: 80093,
    },
    56: {
      exp: 104326,
      lmd: 85387,
    },
    57: {
      exp: 110345,
      lmd: 91436,
    },
    58: {
      exp: 116657,
      lmd: 97849,
    },
    59: {
      exp: 123162,
      lmd: 104530,
    },
    60: {
      exp: 130000,
      lmd: 111628,
    },
    61: {
      exp: 137391,
      lmd: 119381,
    },
    62: {
      exp: 145048,
      lmd: 127497,
    },
    63: {
      exp: 152871,
      lmd: 135875,
    },
    64: {
      exp: 160960,
      lmd: 144627,
    },
    65: {
      exp: 169315,
      lmd: 153759,
    },
    66: {
      exp: 177936,
      lmd: 163277,
    },
    67: {
      exp: 186823,
      lmd: 173186,
    },
    68: {
      exp: 195976,
      lmd: 183492,
    },
    69: {
      exp: 205395,
      lmd: 194201,
    },
    70: {
      exp: 215000,
      lmd: 205228,
    },
    71: {
      exp: 224951,
      lmd: 216761,
    },
    72: {
      exp: 235399,
      lmd: 228985,
    },
    73: {
      exp: 246344,
      lmd: 241911,
    },
    74: {
      exp: 257786,
      lmd: 255550,
    },
    75: {
      exp: 269725,
      lmd: 269913,
    },
    76: {
      exp: 282161,
      lmd: 285010,
    },
    77: {
      exp: 295094,
      lmd: 300853,
    },
    78: {
      exp: 308524,
      lmd: 317452,
    },
    79: {
      exp: 322451,
      lmd: 334819,
    },
    80: {
      exp: 337000,
      lmd: 353122,
    },
  },
  2: {
    0: {
      exp: 0,
      lmd: 0,
    },
    1: {
      exp: 0,
      lmd: 0,
    },
    2: {
      exp: 191,
      lmd: 76,
    },
    3: {
      exp: 494,
      lmd: 200,
    },
    4: {
      exp: 909,
      lmd: 373,
    },
    5: {
      exp: 1436,
      lmd: 598,
    },
    6: {
      exp: 2075,
      lmd: 877,
    },
    7: {
      exp: 2826,
      lmd: 1211,
    },
    8: {
      exp: 3689,
      lmd: 1603,
    },
    9: {
      exp: 4664,
      lmd: 2054,
    },
    10: {
      exp: 5751,
      lmd: 2567,
    },
    11: {
      exp: 6950,
      lmd: 3144,
    },
    12: {
      exp: 8261,
      lmd: 3786,
    },
    13: {
      exp: 9684,
      lmd: 4496,
    },
    14: {
      exp: 11219,
      lmd: 5276,
    },
    15: {
      exp: 12866,
      lmd: 6127,
    },
    16: {
      exp: 14625,
      lmd: 7052,
    },
    17: {
      exp: 16496,
      lmd: 8053,
    },
    18: {
      exp: 18479,
      lmd: 9132,
    },
    19: {
      exp: 20574,
      lmd: 10291,
    },
    20: {
      exp: 22781,
      lmd: 11531,
    },
    21: {
      exp: 25100,
      lmd: 12855,
    },
    22: {
      exp: 27531,
      lmd: 14265,
    },
    23: {
      exp: 30074,
      lmd: 15763,
    },
    24: {
      exp: 32729,
      lmd: 17351,
    },
    25: {
      exp: 35496,
      lmd: 19031,
    },
    26: {
      exp: 38375,
      lmd: 20804,
    },
    27: {
      exp: 41366,
      lmd: 22673,
    },
    28: {
      exp: 44469,
      lmd: 24640,
    },
    29: {
      exp: 47684,
      lmd: 26707,
    },
    30: {
      exp: 51011,
      lmd: 28876,
    },
    31: {
      exp: 54450,
      lmd: 31149,
    },
    32: {
      exp: 58052,
      lmd: 33562,
    },
    33: {
      exp: 61817,
      lmd: 36118,
    },
    34: {
      exp: 65745,
      lmd: 38820,
    },
    35: {
      exp: 69836,
      lmd: 41671,
    },
    36: {
      exp: 74090,
      lmd: 44674,
    },
    37: {
      exp: 78507,
      lmd: 47832,
    },
    38: {
      exp: 83087,
      lmd: 51148,
    },
    39: {
      exp: 87830,
      lmd: 54625,
    },
    40: {
      exp: 92736,
      lmd: 58265,
    },
    41: {
      exp: 97805,
      lmd: 62072,
    },
    42: {
      exp: 103037,
      lmd: 66048,
    },
    43: {
      exp: 108432,
      lmd: 70197,
    },
    44: {
      exp: 113990,
      lmd: 74521,
    },
    45: {
      exp: 119711,
      lmd: 79023,
    },
    46: {
      exp: 125595,
      lmd: 83707,
    },
    47: {
      exp: 131642,
      lmd: 88575,
    },
    48: {
      exp: 137852,
      lmd: 93630,
    },
    49: {
      exp: 144225,
      lmd: 98875,
    },
    50: {
      exp: 150761,
      lmd: 104313,
    },
    51: {
      exp: 157460,
      lmd: 109947,
    },
    52: {
      exp: 164362,
      lmd: 115814,
    },
    53: {
      exp: 171467,
      lmd: 121917,
    },
    54: {
      exp: 178775,
      lmd: 128260,
    },
    55: {
      exp: 186286,
      lmd: 134847,
    },
    56: {
      exp: 194000,
      lmd: 141682,
    },
    57: {
      exp: 201917,
      lmd: 148768,
    },
    58: {
      exp: 210037,
      lmd: 156108,
    },
    59: {
      exp: 218360,
      lmd: 163707,
    },
    60: {
      exp: 226886,
      lmd: 171568,
    },
    61: {
      exp: 235615,
      lmd: 179695,
    },
    62: {
      exp: 244778,
      lmd: 188308,
    },
    63: {
      exp: 254375,
      lmd: 197416,
    },
    64: {
      exp: 264406,
      lmd: 207026,
    },
    65: {
      exp: 274871,
      lmd: 217146,
    },
    66: {
      exp: 285770,
      lmd: 227783,
    },
    67: {
      exp: 297103,
      lmd: 238946,
    },
    68: {
      exp: 308870,
      lmd: 250642,
    },
    69: {
      exp: 321071,
      lmd: 262880,
    },
    70: {
      exp: 333800,
      lmd: 275762,
    },
    71: {
      exp: 346869,
      lmd: 289105,
    },
    72: {
      exp: 360616,
      lmd: 303264,
    },
    73: {
      exp: 375041,
      lmd: 318252,
    },
    74: {
      exp: 390144,
      lmd: 334080,
    },
    75: {
      exp: 405925,
      lmd: 350761,
    },
    76: {
      exp: 422384,
      lmd: 368306,
    },
    77: {
      exp: 439521,
      lmd: 386728,
    },
    78: {
      exp: 457336,
      lmd: 406039,
    },
    79: {
      exp: 475829,
      lmd: 426252,
    },
    80: {
      exp: 495000,
      lmd: 447378,
    },
    81: {
      exp: 514849,
      lmd: 469470,
    },
    82: {
      exp: 535954,
      lmd: 493192,
    },
    83: {
      exp: 558315,
      lmd: 518572,
    },
    84: {
      exp: 581932,
      lmd: 545637,
    },
    85: {
      exp: 606805,
      lmd: 574415,
    },
    86: {
      exp: 632934,
      lmd: 604934,
    },
    87: {
      exp: 660319,
      lmd: 637221,
    },
    88: {
      exp: 688960,
      lmd: 671304,
    },
    89: {
      exp: 718857,
      lmd: 707210,
    },
    90: {
      exp: 750000,
      lmd: 744955,
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
