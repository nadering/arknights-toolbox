export type SkillIndex = 0 | 1 | 2;

export type OperatorGrowthType = "normal" | "roguelike";

export type PreferModuleInfo = {
  type: string;
  level: 1 | 2 | 3;
};

export type OperatorOverride = {
  /** 인게임 character_table.json의 char key */
  charId: string;

  /** 기존 number id. localStorage / Firestore migration용 */
  legacyId?: number;

  /** 검색/별명용 */
  nicknameList?: string[];

  /** 0 = 1스킬, 1 = 2스킬, 2 = 3스킬 */
  preferSkillIndexes?: SkillIndex[];

  /** 추천 모듈은 moduleIndex가 아니라 type 기반으로 보관 */
  preferModules?: PreferModuleInfo[];

  /** future 오퍼레이터 이름 번역 보정 */
  translatedName?: string;

  /** key는 skillId 권장 */
  translatedSkillNames?: Record<string, string>;

  /** key는 module type 권장 */
  translatedModuleNames?: Record<string, string>;

  /** 로그라이크 특수 오퍼레이터 등 일반 육성과 다른 경우 */
  growthType?: OperatorGrowthType;
};

/** 오퍼레이터의 선호 스킬, 모듈 등 인게임 JSON 파일에 없는 개인화 정보 */
export const operatorOverrideList: OperatorOverride[] = [
  {
    charId: "char_003_kalts",
    legacyId: 192,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_010_chen",
    legacyId: 94,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_017_huang",
    legacyId: 115,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_1012_skadi2",
    legacyId: 190,
    nicknameList: ["보카디"],
    preferSkillIndexes: [1],
  },
  {
    charId: "char_1013_chen2",
    legacyId: 200,
    nicknameList: ["수첸"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1014_nearl2",
    legacyId: 212,
    nicknameList: ["창니어"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_1016_agoat2",
    legacyId: 288,
    nicknameList: ["힐이야"],
    preferSkillIndexes: [0, 2],
  },
  {
    charId: "char_1019_siege2",
    legacyId: 345,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1020_reed2",
    legacyId: 263,
    nicknameList: ["힐리드"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_1022_flwr2",
    legacyId: 400,
  },
  {
    charId: "char_1023_ghost2",
    legacyId: 233,
    nicknameList: ["언펙터"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_1026_gvial2",
    legacyId: 242,
    nicknameList: ["수비알"],
    preferSkillIndexes: [1],
  },
  {
    charId: "char_1028_texas2",
    legacyId: 257,
    nicknameList: ["특사스"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_1029_yato2",
    legacyId: 272,
    nicknameList: ["특토"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_103_angel",
    legacyId: 85,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1031_slent2",
    legacyId: 278,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1032_excu2",
    legacyId: 284,
    nicknameList: ["십게이"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1033_swire2",
    legacyId: 287,
    nicknameList: ["수와이어"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_1034_jesca2",
    legacyId: 294,
    nicknameList: ["빵시카"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1035_wisdel",
    legacyId: 328,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1036_fang2",
    legacyId: 325,
  },
  {
    charId: "char_1038_whitw2",
    legacyId: 350,
    nicknameList: ["꼬술이"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1039_thorn2",
    legacyId: 354,
    nicknameList: ["쏜별"],
    preferSkillIndexes: [0, 1, 2],
  },
  {
    charId: "char_1040_blaze2",
    legacyId: 358,
    nicknameList: ["술무라"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1041_angel2",
    legacyId: 370,
    nicknameList: ["신시아"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_1042_phatm2",
    legacyId: 374,
    nicknameList: ["보텀"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_1043_leizi2",
    legacyId: 376,
    nicknameList: ["근첩"],
    preferSkillIndexes: [0, 1, 2],
  },
  {
    charId: "char_1044_hsgma2",
    legacyId: 380,
    nicknameList: ["수구마"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_1045_svash2",
    legacyId: 395,
    nicknameList: ["레재"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_1046_sbell2",
    legacyId: 394,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_1047_halo2",
    legacyId: 393,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1048_orchd2",
    legacyId: 418,
    nicknameList: ["활키드"],
    preferSkillIndexes: [1],
    translatedSkillNames: {
      skchr_orchd2_1: "강사",
      skchr_orchd2_2: "비상 노려쏘기",
      skchr_orchd2_3: "용화살",
    },
  },
  {
    charId: "char_1049_catap2",
    legacyId: 417,
    translatedSkillNames: {
      skchr_catap2_1: "고압회전베기",
      skchr_catap2_2: "초고출력 속성해방베기",
    },
  },
  {
    charId: "char_1050_chen3",
    legacyId: 404,
    nicknameList: ["삼첸"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1051_headb2",
    legacyId: 410,
    preferSkillIndexes: [1, 2],
    translatedSkillNames: {
      skchr_headb2_1: "고개 숙이지 않으리",
      skchr_headb2_2: "결코 멈추지 않으리",
      skchr_headb2_3: "막을 수 없는 행진",
    },
  },
  {
    charId: "char_112_siege",
    legacyId: 84,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_113_cqbw",
    legacyId: 145,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_120_hibisc",
    legacyId: 22,
    preferSkillIndexes: [0],
  },
  {
    charId: "char_134_ifrit",
    legacyId: 83,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_136_hsguma",
    legacyId: 82,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_147_shining",
    legacyId: 81,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_1502_crosly",
    legacyId: 349,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_151_myrtle",
    legacyId: 101,
    preferSkillIndexes: [0],
  },
  {
    charId: "char_154_morgan",
    legacyId: 273,
  },
  {
    charId: "char_172_svrash",
    legacyId: 80,
    nicknameList: ["은재"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_179_cgbird",
    legacyId: 79,
    nicknameList: ["팅게"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_180_amgoat",
    legacyId: 78,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_188_helage",
    legacyId: 106,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_194_leto",
    legacyId: 307,
  },
  {
    charId: "char_197_poca",
    legacyId: 131,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_2012_typhon",
    legacyId: 290,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_2013_cerber",
    legacyId: 123,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_2014_nian",
    legacyId: 120,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_2015_dusk",
    legacyId: 180,
    preferSkillIndexes: [0, 2],
  },
  {
    charId: "char_202_demkni",
    legacyId: 77,
    preferSkillIndexes: [0, 1, 2],
  },
  {
    charId: "char_2023_ling",
    legacyId: 221,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_2024_chyue",
    legacyId: 267,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_2025_shu",
    legacyId: 314,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_2026_yu",
    legacyId: 357,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_2027_wang",
    legacyId: 405,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_206_gnosis",
    legacyId: 216,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_213_mostma",
    legacyId: 112,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_222_bpipe",
    legacyId: 127,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_225_haak",
    legacyId: 121,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_245_cello",
    legacyId: 305,
    nicknameList: ["아르투리아"],
    preferSkillIndexes: [0, 2],
  },
  {
    charId: "char_248_mgllan",
    legacyId: 99,
    preferSkillIndexes: [0, 2],
  },
  {
    charId: "char_249_mlyss",
    legacyId: 280,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_250_phatom",
    legacyId: 141,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_263_skadi",
    legacyId: 89,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_264_f12yin",
    legacyId: 173,
    nicknameList: ["산"],
    preferSkillIndexes: [1],
  },
  {
    charId: "char_291_aglina",
    legacyId: 76,
    nicknameList: ["젤리"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_293_thorns",
    legacyId: 148,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_300_phenxi",
    legacyId: 227,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_311_mudrok",
    legacyId: 168,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_322_lmlee",
    legacyId: 222,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_332_archet",
    legacyId: 176,
    nicknameList: ["알게또"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_340_shwaz",
    legacyId: 105,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_341_sntlla",
    legacyId: 289,
  },
  {
    charId: "char_350_surtr",
    legacyId: 159,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_358_lisa",
    legacyId: 135,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_362_saga",
    legacyId: 181,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_377_gdglow",
    legacyId: 224,
    nicknameList: ["핑댕이"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_391_rosmon",
    legacyId: 167,
    nicknameList: ["쪽냥이"],
    preferSkillIndexes: [1],
  },
  {
    charId: "char_394_hadiya",
    legacyId: 391,
  },
  {
    charId: "char_400_weedy",
    legacyId: 144,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_4006_melnte",
    legacyId: 277,
  },
  {
    charId: "char_4009_irene",
    legacyId: 235,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4010_etlchi",
    legacyId: 360,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_4011_lessng",
    legacyId: 304,
  },
  {
    charId: "char_4015_spuria",
    legacyId: 283,
  },
  {
    charId: "char_4023_rfalcn",
    legacyId: 315,
  },
  {
    charId: "char_4026_vulpis",
    legacyId: 351,
    nicknameList: ["스즈맘"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4027_heyak",
    legacyId: 279,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4031_liesel",
    legacyId: 406,
    translatedSkillNames: {
      skchr_liesel_1: "합주의 시작",
      skchr_liesel_2: "피날레까지",
    },
  },
  {
    charId: "char_4037_demetr",
    legacyId: 407,
    preferSkillIndexes: [2],
    translatedSkillNames: {
      skchr_demetr_1: "가주의 여유",
      skchr_demetr_2: "군사의 수단",
      skchr_demetr_3: "청산",
    },
  },
  {
    charId: "char_4039_horn",
    legacyId: 231,
    preferSkillIndexes: [0],
  },
  {
    charId: "char_4042_lumen",
    legacyId: 234,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4046_ebnhlz",
    legacyId: 239,
    nicknameList: ["흑건"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4048_doroth",
    legacyId: 246,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4051_akkord",
    legacyId: 390,
  },
  {
    charId: "char_4052_surfer",
    legacyId: 356,
    preferSkillIndexes: [0],
  },
  {
    charId: "char_4055_bgsnow",
    legacyId: 243,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4056_titi",
    legacyId: 401,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4058_pepe",
    legacyId: 335,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4064_mlynar",
    legacyId: 248,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4065_judge",
    legacyId: 258,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4072_ironmn",
    legacyId: 253,
    nicknameList: ["스뎅"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4079_haini",
    legacyId: 330,
  },
  {
    charId: "char_4080_lin",
    legacyId: 266,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4081_warmy",
    legacyId: 309,
  },
  {
    charId: "char_4082_qiubai",
    legacyId: 269,
    nicknameList: ["구백"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4087_ines",
    legacyId: 276,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4088_hodrer",
    legacyId: 299,
    preferSkillIndexes: [0, 2],
  },
  {
    charId: "char_4098_vvana",
    legacyId: 303,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4100_caper",
    legacyId: 300,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4102_threye",
    legacyId: 291,
  },
  {
    charId: "char_4104_coldst",
    legacyId: 292,
  },
  {
    charId: "char_4105_almond",
    legacyId: 293,
  },
  {
    charId: "char_4106_bryota",
    legacyId: 285,
  },
  {
    charId: "char_4107_vrdant",
    legacyId: 297,
  },
  {
    charId: "char_4109_baslin",
    legacyId: 302,
  },
  {
    charId: "char_4110_delphn",
    legacyId: 296,
  },
  {
    charId: "char_4114_harold",
    legacyId: 306,
  },
  {
    charId: "char_4116_blkkgt",
    legacyId: 308,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4117_ray",
    legacyId: 310,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4119_wanqin",
    legacyId: 311,
  },
  {
    charId: "char_4121_zuole",
    legacyId: 313,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_4122_grabds",
    legacyId: 312,
  },
  {
    charId: "char_4123_ela",
    legacyId: 319,
    nicknameList: ["엘라"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4124_iana",
    legacyId: 317,
    nicknameList: ["야나"],
  },
  {
    charId: "char_4125_rdoc",
    legacyId: 318,
    nicknameList: ["닥"],
  },
  {
    charId: "char_4126_fuze",
    legacyId: 316,
    nicknameList: ["퓨즈"],
  },
  {
    charId: "char_4130_luton",
    legacyId: 321,
  },
  {
    charId: "char_4131_odda",
    legacyId: 320,
  },
  {
    charId: "char_4132_ascln",
    legacyId: 323,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4133_logos",
    legacyId: 327,
    preferSkillIndexes: [0, 2],
  },
  {
    charId: "char_4134_cetsyr",
    legacyId: 326,
    nicknameList: ["마왕"],
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4137_udflow",
    legacyId: 329,
  },
  {
    charId: "char_4138_narant",
    legacyId: 334,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4139_papyrs",
    legacyId: 333,
  },
  {
    charId: "char_4140_lasher",
    legacyId: 332,
  },
  {
    charId: "char_4141_marcil",
    legacyId: 342,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4142_laios",
    legacyId: 341,
  },
  {
    charId: "char_4143_sensi",
    legacyId: 340,
  },
  {
    charId: "char_4144_chilc",
    legacyId: 339,
    preferSkillIndexes: [0],
  },
  {
    charId: "char_4145_ulpia",
    legacyId: 331,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_4146_nymph",
    legacyId: 337,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_4147_mitm",
    legacyId: 336,
  },
  {
    charId: "char_4148_philae",
    legacyId: 347,
  },
  {
    charId: "char_4151_tinman",
    legacyId: 338,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4155_talr",
    legacyId: 348,
  },
  {
    charId: "char_416_zumama",
    legacyId: 155,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4162_cathy",
    legacyId: 343,
  },
  {
    charId: "char_4163_rosesa",
    legacyId: 352,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4164_tecno",
    legacyId: 353,
  },
  {
    charId: "char_4165_ctrail",
    legacyId: 346,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4166_varkis",
    legacyId: 399,
  },
  {
    charId: "char_4171_wulfen",
    legacyId: 362,
  },
  {
    charId: "char_4172_xingzh",
    legacyId: 355,
  },
  {
    charId: "char_4173_nowell",
    legacyId: 359,
  },
  {
    charId: "char_4177_brigid",
    legacyId: 361,
  },
  {
    charId: "char_4178_alanna",
    legacyId: 365,
  },
  {
    charId: "char_4179_monstr",
    legacyId: 366,
    nicknameList: ["몬삼터"],
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_4182_oblvns",
    legacyId: 386,
    nicknameList: ["사키코"],
    preferSkillIndexes: [0, 1, 2],
  },
  {
    charId: "char_4183_mortis",
    legacyId: 382,
    nicknameList: ["무츠미"],
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4184_dolris",
    legacyId: 384,
    nicknameList: ["우이카"],
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4185_amoris",
    legacyId: 385,
    nicknameList: ["냐무"],
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4186_tmoris",
    legacyId: 383,
    nicknameList: ["우미리"],
    preferSkillIndexes: [0],
  },
  {
    charId: "char_4187_graceb",
    legacyId: 368,
  },
  {
    charId: "char_4191_tippi",
    legacyId: 373,
  },
  {
    charId: "char_4193_lemuen",
    legacyId: 371,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_4194_rmixer",
    legacyId: 369,
  },
  {
    charId: "char_4196_reckpr",
    legacyId: 375,
  },
  {
    charId: "char_4198_christ",
    legacyId: 372,
  },
  {
    charId: "char_4199_makiri",
    legacyId: 378,
  },
  {
    charId: "char_420_flamtl",
    legacyId: 213,
    nicknameList: ["불꼬리"],
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4202_haruka",
    legacyId: 381,
    preferSkillIndexes: [1, 2],
  },
  {
    charId: "char_4203_kichi",
    legacyId: 379,
  },
  {
    charId: "char_4204_mantra",
    legacyId: 389,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4207_branch",
    legacyId: 388,
  },
  {
    charId: "char_4208_wintim",
    legacyId: 387,
  },
  {
    charId: "char_4211_snhunt",
    legacyId: 392,
  },
  {
    charId: "char_4212_nasti",
    legacyId: 398,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_4213_skybx",
    legacyId: 396,
  },
  {
    charId: "char_4214_cairn",
    legacyId: 397,
  },
  {
    charId: "char_4221_ju",
    legacyId: 402,
  },
  {
    charId: "char_4222_taraxa",
    legacyId: 403,
  },
  {
    charId: "char_4223_botany",
    legacyId: 408,
    translatedSkillNames: {
      skchr_botany_1: "고조파 파괴",
      skchr_botany_2: "정역의 메아리",
    },
  },
  {
    charId: "char_4224_turdus",
    legacyId: 409,
    translatedSkillNames: {
      skchr_turdus_1: "화검의 비주",
      skchr_turdus_2: "'숨바꼭질!'",
    },
  },
  {
    charId: "char_4225_tanya",
    legacyId: 412,
    translatedSkillNames: {
      skchr_tanya_1: "세척",
      skchr_tanya_2: "붕괴",
    },
  },
  {
    charId: "char_4226_veen",
    legacyId: 414,
    translatedSkillNames: {
      skchr_veen_1: "'스스로 외쳐 피어나리라'",
      skchr_veen_2: "'선혈로 씻어내리라'",
      skchr_veen_3: "'붉은 철로 새기리라'",
    },
  },
  {
    charId: "char_4228_closur",
    legacyId: 415,
    preferSkillIndexes: [1, 2],
    translatedSkillNames: {
      skchr_closur_1: "재귀함수",
      skchr_closur_2: "모델 확장",
      skchr_closur_3: "Q.E.D.",
    },
  },
  {
    charId: "char_4229_aphris",
    legacyId: 420,
    preferSkillIndexes: [2],
    translatedSkillNames: {
      skchr_aphris_1: "연속 투영",
      skchr_aphris_2: "임계 순폭",
      skchr_aphris_3: "혼돈의 본질",
    },
  },
  {
    charId: "char_423_blemsh",
    legacyId: 164,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_4234_pedro",
    legacyId: 419,
    translatedSkillNames: {
      skchr_pedro_1: "표식 사격",
      skchr_pedro_2: "교대 철수",
    },
  },
  {
    charId: "char_426_billro",
    legacyId: 196,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_427_vigil",
    legacyId: 259,
  },
  {
    charId: "char_430_fartth",
    legacyId: 206,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_437_mizuki",
    legacyId: 201,
    preferSkillIndexes: [1],
  },
  {
    charId: "char_445_wscoot",
    legacyId: 364,
  },
  {
    charId: "char_446_aroma",
    legacyId: 322,
  },
  {
    charId: "char_450_necras",
    legacyId: 363,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_456_ash",
    legacyId: 185,
    nicknameList: ["애쉬"],
    preferSkillIndexes: [1],
  },
  {
    charId: "char_464_cement",
    legacyId: 275,
  },
  {
    charId: "char_472_pasngr",
    legacyId: 188,
    preferSkillIndexes: [2],
  },
  {
    charId: "char_474_glady",
    legacyId: 191,
    preferSkillIndexes: [0],
  },
  {
    charId: "char_479_sleach",
    legacyId: 204,
    nicknameList: ["젖틀"],
    preferSkillIndexes: [0, 2],
  },
  {
    charId: "char_485_pallas",
    legacyId: 197,
    preferSkillIndexes: [0],
  },
  {
    charId: "char_487_bobb",
    legacyId: 344,
  },
  {
    charId: "char_488_buildr",
    legacyId: 286,
  },
  {
    charId: "char_491_humus",
    legacyId: 274,
  },
  {
    charId: "char_494_vendla",
    legacyId: 298,
  },
  {
    charId: "char_498_inside",
    legacyId: 282,
  },
  {
    charId: "char_499_kaitou",
    legacyId: 301,
  },
];
