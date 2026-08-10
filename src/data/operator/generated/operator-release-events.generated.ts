import {
  type OperatorReleaseCategory,
  type OperatorReleaseSource,
  type Server,
} from "../manual/operator-release-types";

export type GeneratedOperatorReleaseEvent = {
  id: string;
  name: string;
  category: OperatorReleaseCategory;
  server: Server;
  source: OperatorReleaseSource;
  order: number;
  startTime: number | null;
  startDate: string | null;
  operatorIds: string[];
};

export type GeneratedLatestOperatorReleaseEvent = {
  id: string;
  name: string;
  server: Server;
  serverLabel: string;
  order: number;
  startTime: number | null;
  startDate: string | null;
};

/**
 * manual/operator-release-events.ts와 activity_table.json을 기반으로
 * 자동 생성된 출시 이벤트 목록입니다.
 *
 * - 이벤트명과 오퍼레이터 매핑은 manual/operator-release-events.ts를 따릅니다.
 * - startTime/startDate는 각 서버의 activity_table.json에서 가져옵니다.
 * - 배열 순서는 manual/operator-release-events.ts와 동일하게 최신 이벤트 → 오래된 이벤트입니다.
 *
 * 직접 수정하지 말고 `npm run generate:operator-release-info`로 재생성하세요.
 */
export const generatedOperatorReleaseEventList: readonly GeneratedOperatorReleaseEvent[] = [
  {
    "id": "act53side",
    "name": "대지가 오렌지 한 알이 될 때까지",
    "category": "side_story",
    "server": "future",
    "source": "cn_git_history",
    "order": 112,
    "startTime": 1785538800,
    "startDate": "2026-08-01",
    "operatorIds": [
      "char_4237_jcinta",
      "char_4236_tmslot",
      "char_1015_aglna2",
      "char_4235_thumpy"
    ]
  },
  {
    "id": "dis_rogue_6",
    "name": "침몰자의 블랙 플로우",
    "category": "roguelike",
    "server": "future",
    "source": "cn_git_history",
    "order": 111,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4230_mcnist"
    ]
  },
  {
    "id": "act21mini",
    "name": "정글의 병폐",
    "category": "mini_event",
    "server": "future",
    "source": "cn_git_history",
    "order": 110,
    "startTime": 1783638000,
    "startDate": "2026-07-10",
    "operatorIds": [
      "char_4234_pedro",
      "char_4229_aphris"
    ]
  },
  {
    "id": "act50side",
    "name": "물거품에 담긴 번개",
    "category": "side_story",
    "server": "future",
    "source": "cn_git_history",
    "order": 109,
    "startTime": 1780268400,
    "startDate": "2026-06-01",
    "operatorIds": [
      "char_4215_buddy",
      "char_1049_catap2",
      "char_1048_orchd2"
    ]
  },
  {
    "id": "act4mainss",
    "name": "임계 상전이",
    "category": "main_story",
    "server": "future",
    "source": "cn_git_history",
    "order": 108,
    "startTime": 1777590000,
    "startDate": "2026-05-01",
    "operatorIds": [
      "char_4227_gallus",
      "char_4225_tanya",
      "char_4228_closur",
      "char_4226_veen",
      "char_1052_kalts2"
    ]
  },
  {
    "id": "act51side",
    "name": "사람들, 우리들",
    "category": "side_story",
    "server": "future",
    "source": "cn_git_history",
    "order": 107,
    "startTime": 1775516400,
    "startDate": "2026-04-07",
    "operatorIds": [
      "char_4224_turdus",
      "char_4223_botany",
      "char_1051_headb2"
    ]
  },
  {
    "id": "act20mini",
    "name": "교차로",
    "category": "mini_event",
    "server": "future",
    "source": "cn_git_history",
    "order": 106,
    "startTime": 1773097200,
    "startDate": "2026-03-10",
    "operatorIds": [
      "char_4031_liesel",
      "char_4037_demetr"
    ]
  },
  {
    "id": "act49side",
    "name": "사세행",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 105,
    "startTime": 1784185200,
    "startDate": "2026-07-16",
    "operatorIds": [
      "char_4222_taraxa",
      "char_4221_ju",
      "char_2027_wang",
      "char_1050_chen3"
    ]
  },
  {
    "id": "act48side",
    "name": "아테누스 복수록",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 104,
    "startTime": 1782093600,
    "startDate": "2026-06-22",
    "operatorIds": [
      "char_4166_varkis",
      "char_1022_flwr2",
      "char_4056_titi"
    ]
  },
  {
    "id": "act47side",
    "name": "허락받지 못한 땅",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 103,
    "startTime": 1779346800,
    "startDate": "2026-05-21",
    "operatorIds": [
      "char_4213_skybx",
      "char_4212_nasti",
      "char_4214_cairn"
    ]
  },
  {
    "id": "act46side",
    "name": "설산 강림 1101",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 102,
    "startTime": 1776132000,
    "startDate": "2026-04-14",
    "operatorIds": [
      "char_4051_akkord",
      "char_394_hadiya",
      "char_4211_snhunt",
      "char_1045_svash2",
      "char_1046_sbell2",
      "char_1047_halo2"
    ]
  },
  {
    "id": "act3mainss",
    "name": "비정상 스펙트럼",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 101,
    "startTime": 1773903600,
    "startDate": "2026-03-19",
    "operatorIds": [
      "char_4208_wintim",
      "char_4207_branch",
      "char_4204_mantra"
    ]
  },
  {
    "id": "act45side",
    "name": "편안한 잠꼬대",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 100,
    "startTime": 1770688800,
    "startDate": "2026-02-10",
    "operatorIds": [
      "char_4185_amoris",
      "char_4184_dolris",
      "char_4186_tmoris",
      "char_4183_mortis",
      "char_4182_oblvns"
    ]
  },
  {
    "id": "act44side",
    "name": "폐허",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 99,
    "startTime": 1768546800,
    "startDate": "2026-01-16",
    "operatorIds": [
      "char_4199_makiri",
      "char_4203_kichi",
      "char_4202_haruka",
      "char_1044_hsgma2"
    ]
  },
  {
    "id": "dis_rogue_5",
    "name": "쉐이의 기이한 계원",
    "category": "roguelike",
    "server": "global",
    "source": "cn_git_history",
    "order": 98,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4195_radian"
    ]
  },
  {
    "id": "act19mini",
    "name": "경중집",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 97,
    "startTime": 1765418400,
    "startDate": "2025-12-11",
    "operatorIds": [
      "char_4196_reckpr",
      "char_1043_leizi2"
    ]
  },
  {
    "id": "act43side",
    "name": "붉게 물든 벨벳",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 96,
    "startTime": 1763017200,
    "startDate": "2025-11-13",
    "operatorIds": [
      "char_4198_christ",
      "char_4191_tippi",
      "char_1042_phatm2"
    ]
  },
  {
    "id": "act42side",
    "name": "중생의 여정",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 95,
    "startTime": 1760407200,
    "startDate": "2025-10-14",
    "operatorIds": [
      "char_4188_confes",
      "char_4187_graceb",
      "char_4193_lemuen",
      "char_1041_angel2",
      "char_4194_rmixer"
    ]
  },
  {
    "id": "act2mainss",
    "name": "해리성 결합",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 94,
    "startTime": 1758006000,
    "startDate": "2025-09-16",
    "operatorIds": [
      "char_445_wscoot",
      "char_4178_alanna",
      "char_4179_monstr"
    ]
  },
  {
    "id": "act41side",
    "name": "불타버린 엘레지여",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 93,
    "startTime": 1756346400,
    "startDate": "2025-08-28",
    "operatorIds": [
      "char_4177_brigid",
      "char_4171_wulfen",
      "char_450_necras"
    ]
  },
  {
    "id": "act18mini",
    "name": "다시 만나자",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 92,
    "startTime": 1754550000,
    "startDate": "2025-08-07",
    "operatorIds": [
      "char_4173_nowell",
      "char_4010_etlchi"
    ]
  },
  {
    "id": "act40side",
    "name": "상견환",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 91,
    "startTime": 1752735600,
    "startDate": "2025-07-17",
    "operatorIds": [
      "char_4052_surfer",
      "char_4172_xingzh",
      "char_1040_blaze2",
      "char_2026_yu"
    ]
  },
  {
    "id": "act39side",
    "name": "창백한 바다로부터의 탈출",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 90,
    "startTime": 1749088800,
    "startDate": "2025-06-05",
    "operatorIds": [
      "char_4163_rosesa",
      "char_4164_tecno",
      "char_1039_thorn2"
    ]
  },
  {
    "id": "act38side",
    "name": "막을 여는 자들",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 89,
    "startTime": 1745478000,
    "startDate": "2025-04-24",
    "operatorIds": [
      "char_4165_ctrail",
      "char_4155_talr",
      "char_4148_philae",
      "char_4026_vulpis",
      "char_1038_whitw2",
      "char_1502_crosly"
    ]
  },
  {
    "id": "act37side",
    "name": "위대한 서곡의 끝",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 88,
    "startTime": 1744077600,
    "startDate": "2025-04-08",
    "operatorIds": [
      "char_4162_cathy",
      "char_487_bobb",
      "char_1019_siege2"
    ]
  },
  {
    "id": "act36side",
    "name": "테라밥",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 87,
    "startTime": 1741590000,
    "startDate": "2025-03-10",
    "operatorIds": [
      "char_4144_chilc",
      "char_4142_laios",
      "char_4143_sensi",
      "char_4141_marcil"
    ]
  },
  {
    "id": "act35side",
    "name": "태양을 뿌리쳐라",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 86,
    "startTime": 1737010800,
    "startDate": "2025-01-16",
    "operatorIds": [
      "char_4140_lasher",
      "char_4139_papyrs",
      "char_4138_narant",
      "char_4058_pepe"
    ]
  },
  {
    "id": "dis_rogue_4",
    "name": "살카즈의 영겁 기담",
    "category": "roguelike",
    "server": "global",
    "source": "cn_git_history",
    "order": 85,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4151_tinman"
    ]
  },
  {
    "id": "act17mini",
    "name": "카즈델리안 레스큐",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 84,
    "startTime": 1738893600,
    "startDate": "2025-02-07",
    "operatorIds": [
      "char_4147_mitm",
      "char_4146_nymph"
    ]
  },
  {
    "id": "act34side",
    "name": "삶의 길",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 83,
    "startTime": 1733191200,
    "startDate": "2024-12-03",
    "operatorIds": [
      "char_4137_udflow",
      "char_4079_haini",
      "char_4145_ulpia"
    ]
  },
  {
    "id": "act1mainss",
    "name": "자비의 등대",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 82,
    "startTime": 1730358000,
    "startDate": "2024-10-31",
    "operatorIds": [
      "char_4136_phonor",
      "char_1036_fang2",
      "char_1035_wisdel",
      "char_4133_logos",
      "char_4134_cetsyr"
    ]
  },
  {
    "id": "act33side",
    "name": "바벨",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 81,
    "startTime": 1728525600,
    "startDate": "2024-10-10",
    "operatorIds": [
      "char_4130_luton",
      "char_4131_odda",
      "char_446_aroma",
      "char_4132_ascln"
    ]
  },
  {
    "id": "act32side",
    "name": "루센트 애로우헤드",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 80,
    "startTime": 1725519600,
    "startDate": "2024-09-05",
    "operatorIds": [
      "char_4125_rdoc",
      "char_4126_fuze",
      "char_4124_iana",
      "char_4123_ela"
    ]
  },
  {
    "id": "dis_perm_sandbox_1",
    "name": "사막 이야기",
    "category": "other",
    "server": "global",
    "source": "cn_git_history",
    "order": 79,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4023_rfalcn"
    ]
  },
  {
    "id": "act31side",
    "name": "회서리",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 78,
    "startTime": 1722391200,
    "startDate": "2024-07-31",
    "operatorIds": [
      "char_4119_wanqin",
      "char_4122_grabds",
      "char_2025_shu",
      "char_4121_zuole"
    ]
  },
  {
    "id": "act16mini",
    "name": "그리닝 밸리를 향해",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 77,
    "startTime": 1720508400,
    "startDate": "2024-07-09",
    "operatorIds": [
      "char_4081_warmy",
      "char_4117_ray"
    ]
  },
  {
    "id": "act30side",
    "name": "은심호 열차",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 76,
    "startTime": 1718935200,
    "startDate": "2024-06-21",
    "operatorIds": [
      "char_194_leto",
      "char_4114_harold",
      "char_4116_blkkgt"
    ]
  },
  {
    "id": "act29side",
    "name": "츠빌링슈튀르메의 가을",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 75,
    "startTime": 1714460400,
    "startDate": "2024-04-30",
    "operatorIds": [
      "char_4100_caper",
      "char_499_kaitou",
      "char_4109_baslin",
      "char_245_cello",
      "char_4098_vvana",
      "char_4011_lessng"
    ]
  },
  {
    "id": "dis_main_13",
    "name": "흉조의 소용돌이",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 74,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4107_vrdant",
      "char_4110_delphn",
      "char_494_vendla",
      "char_4088_hodrer"
    ]
  },
  {
    "id": "act28side",
    "name": "부정축재",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 73,
    "startTime": 1710831600,
    "startDate": "2024-03-19",
    "operatorIds": [
      "char_4104_coldst",
      "char_4105_almond",
      "char_1034_jesca2"
    ]
  },
  {
    "id": "act27side",
    "name": "화산의 꿈 여행",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 72,
    "startTime": 1705388400,
    "startDate": "2024-01-16",
    "operatorIds": [
      "char_488_buildr",
      "char_4106_bryota",
      "char_1033_swire2",
      "char_1016_agoat2"
    ]
  },
  {
    "id": "dis_rogue_3",
    "name": "탐험가의 은빛 서리 끝자락",
    "category": "roguelike",
    "server": "global",
    "source": "cn_git_history",
    "order": 71,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4102_threye"
    ]
  },
  {
    "id": "act15mini",
    "name": "나무 그늘 속에 잠들다",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 70,
    "startTime": 1708999200,
    "startDate": "2024-02-27",
    "operatorIds": [
      "char_341_sntlla",
      "char_2012_typhon"
    ]
  },
  {
    "id": "act26side",
    "name": "공상의 정원",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 69,
    "startTime": 1703124000,
    "startDate": "2023-12-21",
    "operatorIds": [
      "char_498_inside",
      "char_4015_spuria",
      "char_1032_excu2"
    ]
  },
  {
    "id": "act38d1",
    "name": "첨멸 실험 작전",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 68,
    "startTime": 1701759600,
    "startDate": "2023-12-05",
    "operatorIds": [
      "char_4093_frston"
    ]
  },
  {
    "id": "act25side",
    "name": "론 트레일",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 67,
    "startTime": 1699340400,
    "startDate": "2023-11-07",
    "operatorIds": [
      "char_4006_melnte",
      "char_249_mlyss",
      "char_4027_heyak",
      "char_1031_slent2"
    ]
  },
  {
    "id": "dis_main_12",
    "name": "천둥 속의 고요",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 66,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_491_humus",
      "char_154_morgan",
      "char_464_cement",
      "char_4087_ines"
    ]
  },
  {
    "id": "act4fun",
    "name": "2023 만우절",
    "category": "other",
    "server": "global",
    "source": "cn_git_history",
    "order": 65,
    "startTime": 1711954800,
    "startDate": "2024-04-01",
    "operatorIds": [
      "char_4091_ulika"
    ]
  },
  {
    "id": "act24side",
    "name": "불을 쫓는 낙엽",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 64,
    "startTime": 1694052000,
    "startDate": "2023-09-07",
    "operatorIds": [
      "char_4077_palico",
      "char_1030_noirc2",
      "char_1029_yato2"
    ]
  },
  {
    "id": "act14mini",
    "name": "숙명",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 63,
    "startTime": 1692687600,
    "startDate": "2023-08-22",
    "operatorIds": [
      "char_4083_chimes",
      "char_4082_qiubai"
    ]
  },
  {
    "id": "act1sandbox",
    "name": "생존 연산: 모래 속의 불",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 62,
    "startTime": 1694052000,
    "startDate": "2023-09-07",
    "operatorIds": []
  },
  {
    "id": "act23side",
    "name": "등림의",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 61,
    "startTime": 1690527600,
    "startDate": "2023-07-28",
    "operatorIds": [
      "char_4078_bdhkgt",
      "char_493_firwhl",
      "char_4080_lin",
      "char_2024_chyue"
    ]
  },
  {
    "id": "act22side",
    "name": "불로 비춰주소서",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 60,
    "startTime": 1689213600,
    "startDate": "2023-07-13",
    "operatorIds": [
      "char_4017_puzzle",
      "char_297_hamoni",
      "char_1020_reed2"
    ]
  },
  {
    "id": "act21side",
    "name": "시라쿠사인",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 59,
    "startTime": 1684807200,
    "startDate": "2023-05-23",
    "operatorIds": [
      "char_4063_quartz",
      "char_466_qanik",
      "char_4014_lunacu",
      "char_427_vigil",
      "char_1028_texas2",
      "char_4065_judge"
    ]
  },
  {
    "id": "dis_main_11",
    "name": "리턴 투 미스트",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 58,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4062_totter",
      "char_157_dagda",
      "char_4071_peper",
      "char_4072_ironmn"
    ]
  },
  {
    "id": "dis_rogue_2",
    "name": "미즈키 & 카이룰라 아버",
    "category": "roguelike",
    "server": "global",
    "source": "cn_git_history",
    "order": 57,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4066_highmo"
    ]
  },
  {
    "id": "act13mini",
    "name": "오랜만",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 56,
    "startTime": 1680850800,
    "startDate": "2023-04-07",
    "operatorIds": [
      "char_4067_lolxh"
    ]
  },
  {
    "id": "act12mini",
    "name": "무명의 방랑자",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 55,
    "startTime": 1680246000,
    "startDate": "2023-03-31",
    "operatorIds": [
      "char_4032_provs",
      "char_4064_mlynar"
    ]
  },
  {
    "id": "act20side",
    "name": "이상적인 도시: 엔드리스 카니발",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 54,
    "startTime": 1673575200,
    "startDate": "2023-01-13",
    "operatorIds": [
      "char_497_ctable",
      "char_4054_malist",
      "char_4055_bgsnow",
      "char_1026_gvial2"
    ]
  },
  {
    "id": "act11mini",
    "name": "투 비 컨티뉴",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 53,
    "startTime": 1676617200,
    "startDate": "2023-02-17",
    "operatorIds": []
  },
  {
    "id": "act19side",
    "name": "도로시의 비전",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 52,
    "startTime": 1678759200,
    "startDate": "2023-03-14",
    "operatorIds": [
      "char_135_halo",
      "char_1027_greyy2",
      "char_4048_doroth"
    ]
  },
  {
    "id": "act18side",
    "name": "링거링 에코스",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 51,
    "startTime": 1672106400,
    "startDate": "2022-12-27",
    "operatorIds": [
      "char_1024_hbisc2",
      "char_4047_pianst",
      "char_4046_ebnhlz"
    ]
  },
  {
    "id": "dis_rune_9",
    "name": "딥니스 작전",
    "category": "crisis",
    "server": "global",
    "source": "cn_git_history",
    "order": 50,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4043_erato"
    ]
  },
  {
    "id": "act17side",
    "name": "스툴티페라 나비스",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 49,
    "startTime": 1667449800,
    "startDate": "2022-11-03",
    "operatorIds": [
      "char_433_windft",
      "char_1023_ghost2",
      "char_4042_lumen",
      "char_4009_irene"
    ]
  },
  {
    "id": "dis_main_10",
    "name": "섀터 포인트",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 48,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4041_chnut",
      "char_4040_rockr",
      "char_4045_heidi",
      "char_4039_horn"
    ]
  },
  {
    "id": "act16side",
    "name": "가이딩 어헤드",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 47,
    "startTime": 1663302600,
    "startDate": "2022-09-16",
    "operatorIds": [
      "char_4036_forcer",
      "char_4016_kazema",
      "char_300_phenxi"
    ]
  },
  {
    "id": "act10mini",
    "name": "어 라이트 스파크 인 다크니스",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 46,
    "startTime": 1660788000,
    "startDate": "2022-08-18",
    "operatorIds": [
      "char_492_quercu",
      "char_377_gdglow"
    ]
  },
  {
    "id": "act15side",
    "name": "장진주",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 45,
    "startTime": 1659069000,
    "startDate": "2022-07-29",
    "operatorIds": [
      "char_476_blkngt",
      "char_1021_kroos2",
      "char_2023_ling",
      "char_322_lmlee"
    ]
  },
  {
    "id": "act24sign",
    "name": "상서로운 길조",
    "category": "other",
    "server": "global",
    "source": "cn_git_history",
    "order": 44,
    "startTime": 1657782000,
    "startDate": "2022-07-14",
    "operatorIds": [
      "char_4019_ncdeer"
    ]
  },
  {
    "id": "dis_rogue_1",
    "name": "팬텀 & 크림슨 솔리테어",
    "category": "roguelike",
    "server": "global",
    "source": "cn_git_history",
    "order": 43,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_4025_aprot2"
    ]
  },
  {
    "id": "act14side",
    "name": "브레이크 디 아이스",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 42,
    "startTime": 1656554400,
    "startDate": "2022-06-30",
    "operatorIds": [
      "char_4013_kjera",
      "char_422_aurora",
      "char_206_gnosis"
    ]
  },
  {
    "id": "act13side",
    "name": "니어 라이트",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 41,
    "startTime": 1651111200,
    "startDate": "2022-04-28",
    "operatorIds": [
      "char_4000_jnight",
      "char_4004_pudd",
      "char_496_wildmn",
      "char_489_serum",
      "char_449_glider",
      "char_420_flamtl",
      "char_1014_nearl2"
    ]
  },
  {
    "id": "act9mini",
    "name": "피누스 실베스트리스",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 40,
    "startTime": 1649910600,
    "startDate": "2022-04-14",
    "operatorIds": [
      "char_431_ashlok",
      "char_430_fartth"
    ]
  },
  {
    "id": "dis_main_9",
    "name": "스톰워치",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 39,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_484_robrta",
      "char_473_mberry",
      "char_479_sleach"
    ]
  },
  {
    "id": "act12side",
    "name": "도솔레스 홀리데이",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 38,
    "startTime": 1642125600,
    "startDate": "2022-01-14",
    "operatorIds": [
      "char_421_crow",
      "char_486_takila",
      "char_1013_chen2",
      "char_437_mizuki"
    ]
  },
  {
    "id": "act8mini",
    "name": "비질로",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 37,
    "startTime": 1645074000,
    "startDate": "2022-02-17",
    "operatorIds": []
  },
  {
    "id": "act1lock",
    "name": "힘노이의 지혜",
    "category": "other",
    "server": "global",
    "source": "cn_git_history",
    "order": 36,
    "startTime": 1640754000,
    "startDate": "2021-12-29",
    "operatorIds": [
      "char_485_pallas"
    ]
  },
  {
    "id": "act7mini",
    "name": "프렐류딩 라이츠",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 35,
    "startTime": 1639015200,
    "startDate": "2021-12-09",
    "operatorIds": [
      "char_469_indigo",
      "char_478_kirara",
      "char_369_bena",
      "char_426_billro"
    ]
  },
  {
    "id": "act18d3",
    "name": "언더 타이즈",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 34,
    "startTime": 1634792400,
    "startDate": "2021-10-21",
    "operatorIds": [
      "char_475_akafyu",
      "char_1012_skadi2",
      "char_474_glady",
      "char_003_kalts"
    ]
  },
  {
    "id": "act18d0",
    "name": "워크 인 더 더스트",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 33,
    "startTime": 1632967200,
    "startDate": "2021-09-30",
    "operatorIds": [
      "char_304_zebra",
      "char_363_toddi",
      "char_472_pasngr"
    ]
  },
  {
    "id": "act17d0",
    "name": "오리지늄 더스트",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 32,
    "startTime": 1629262800,
    "startDate": "2021-08-18",
    "operatorIds": [
      "char_459_tachak",
      "char_457_blitz",
      "char_458_rfrost",
      "char_456_ash"
    ]
  },
  {
    "id": "act16d5",
    "name": "화중인",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 31,
    "startTime": 1627610400,
    "startDate": "2021-07-30",
    "operatorIds": [
      "char_1011_lava2",
      "char_455_nothin",
      "char_362_saga",
      "char_2015_dusk"
    ]
  },
  {
    "id": "dis_rune_4",
    "name": "리드씰 작전",
    "category": "crisis",
    "server": "global",
    "source": "cn_git_history",
    "order": 30,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_402_tuye"
    ]
  },
  {
    "id": "act15d5",
    "name": "비욘드 히어",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 29,
    "startTime": 1625547600,
    "startDate": "2021-07-06",
    "operatorIds": [
      "char_452_bstalk",
      "char_338_iris",
      "char_332_archet"
    ]
  },
  {
    "id": "act15d0",
    "name": "맨스필드 브레이크",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 28,
    "startTime": 1624327200,
    "startDate": "2021-06-22",
    "operatorIds": [
      "char_440_pinecn",
      "char_214_kafka",
      "char_451_robin",
      "char_264_f12yin"
    ]
  },
  {
    "id": "dis_main_8",
    "name": "울부짖는 광명",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 27,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_436_whispr",
      "char_391_rosmon",
      "char_311_mudrok",
      "char_347_jaksel"
    ]
  },
  {
    "id": "act13d5",
    "name": "마리아 니어",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 26,
    "startTime": 1617858000,
    "startDate": "2021-04-08",
    "operatorIds": [
      "char_381_bubble",
      "char_265_sophia",
      "char_346_aosta",
      "char_423_blemsh"
    ]
  },
  {
    "id": "act13d0",
    "name": "리와인딩 브리즈",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 25,
    "startTime": 1616637600,
    "startDate": "2021-03-25",
    "operatorIds": [
      "char_271_spikes",
      "char_365_aprl",
      "char_388_mint",
      "char_350_surtr"
    ]
  },
  {
    "id": "act12d6",
    "name": "케오베의 버섯 안개 미궁",
    "category": "roguelike",
    "server": "global",
    "source": "cn_git_history",
    "order": 24,
    "startTime": 1614229200,
    "startDate": "2021-02-25",
    "operatorIds": []
  },
  {
    "id": "act12d0",
    "name": "위대한 족장 가비알 리턴즈",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 23,
    "startTime": 1614229200,
    "startDate": "2021-02-25",
    "operatorIds": [
      "char_366_acdrop",
      "char_411_tomimi",
      "char_415_flint",
      "char_416_zumama"
    ]
  },
  {
    "id": "act11d7",
    "name": "파란 불꽃의 마음 (재개방)",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 22,
    "startTime": 1611118800,
    "startDate": "2021-01-20",
    "operatorIds": [
      "char_272_strong",
      "char_218_cuttle",
      "char_293_thorns"
    ]
  },
  {
    "id": "dis_rune_2",
    "name": "칼날 작전",
    "category": "crisis",
    "server": "global",
    "source": "cn_git_history",
    "order": 21,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_349_chiave",
      "char_344_beewax",
      "char_336_folivo"
    ]
  },
  {
    "id": "act11d0",
    "name": "월루몽드의 황혼",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 20,
    "startTime": 1603861200,
    "startDate": "2020-10-28",
    "operatorIds": [
      "char_328_cammou",
      "char_294_ayer",
      "char_345_folnic",
      "char_358_lisa"
    ]
  },
  {
    "id": "act10d5",
    "name": "우르수스의 아이들",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 19,
    "startTime": 1601344800,
    "startDate": "2020-09-29",
    "operatorIds": [
      "char_258_podego",
      "char_405_absin",
      "char_373_lionhd",
      "char_197_poca"
    ]
  },
  {
    "id": "dis_rune_1",
    "name": "파이라이트 작전",
    "category": "crisis",
    "server": "global",
    "source": "cn_git_history",
    "order": 18,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_378_asbest",
      "char_343_tknogi"
    ]
  },
  {
    "id": "dis_main_7",
    "name": "고난의 요람",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 17,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_376_therex",
      "char_401_elysm",
      "char_113_cqbw",
      "char_400_weedy"
    ]
  },
  {
    "id": "act9d0",
    "name": "흑야의 회고록",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 16,
    "startTime": 1607576400,
    "startDate": "2020-12-10",
    "operatorIds": [
      "char_301_cutter",
      "char_254_vodfox",
      "char_333_sidero",
      "char_250_phatom"
    ]
  },
  {
    "id": "act1fun",
    "name": "2020 만우절",
    "category": "other",
    "server": "global",
    "source": "cn_git_history",
    "order": 15,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_159_peacok"
    ]
  },
  {
    "id": "dis_rune_0",
    "name": "황무지 작전",
    "category": "crisis",
    "server": "global",
    "source": "cn_git_history",
    "order": 14,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_337_utage",
      "char_252_bibeak",
      "char_379_sesa",
      "char_222_bpipe"
    ]
  },
  {
    "id": "act7d1",
    "name": "만물과 함께",
    "category": "other",
    "server": "global",
    "source": "cn_git_history",
    "order": 13,
    "startTime": 1621364400,
    "startDate": "2021-05-19",
    "operatorIds": [
      "char_385_finlpp"
    ]
  },
  {
    "id": "act7d5",
    "name": "오후의 일화",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 12,
    "startTime": 1598416200,
    "startDate": "2020-08-26",
    "operatorIds": [
      "char_306_leizi",
      "char_2013_cerber"
    ]
  },
  {
    "id": "act6d5",
    "name": "에인션트 포지",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 11,
    "startTime": 1595998800,
    "startDate": "2020-07-29",
    "operatorIds": [
      "char_383_snsant",
      "char_226_hmau",
      "char_225_haak",
      "char_2014_nian"
    ]
  },
  {
    "id": "dis_main_6",
    "name": "부분괴사",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 10,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_302_glaze",
      "char_367_swllow",
      "char_017_huang"
    ]
  },
  {
    "id": "act2sign",
    "name": "부분괴사 오픈 전 & 하프 애니버서리",
    "category": "other",
    "server": "global",
    "source": "cn_git_history",
    "order": 9,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_356_broca",
      "char_261_sddrag"
    ]
  },
  {
    "id": "act5d0",
    "name": "소란의 법칙",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 8,
    "startTime": 1590544800,
    "startDate": "2020-05-27",
    "operatorIds": [
      "char_133_mm",
      "char_325_bison",
      "char_243_waaifu",
      "char_213_mostma"
    ]
  },
  {
    "id": "act4d0",
    "name": "전장의 비화",
    "category": "mini_event",
    "server": "global",
    "source": "cn_git_history",
    "order": 7,
    "startTime": 1585119600,
    "startDate": "2020-03-25",
    "operatorIds": [
      "char_190_clour",
      "char_279_excu",
      "char_131_flameb",
      "char_248_mgllan"
    ]
  },
  {
    "id": "act1sign",
    "name": "출석 이벤트 & 구매센터 업데이트",
    "category": "other",
    "server": "global",
    "source": "cn_git_history",
    "order": 6,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_260_durnar",
      "char_355_ethan",
      "char_275_breeze"
    ]
  },
  {
    "id": "act3d1",
    "name": "파란 불꽃의 마음 Part.2",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 5,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_151_myrtle",
      "char_274_astesi",
      "char_188_helage"
    ]
  },
  {
    "id": "act3d0",
    "name": "파란 불꽃의 마음 Part.1",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 4,
    "startTime": 1588136400,
    "startDate": "2020-04-29",
    "operatorIds": [
      "char_298_susuro",
      "char_348_ceylon",
      "char_326_glacus",
      "char_340_shwaz"
    ]
  },
  {
    "id": "dis_main_5",
    "name": "표적치료",
    "category": "main_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 3,
    "startTime": null,
    "startDate": null,
    "operatorIds": [
      "char_284_spot",
      "char_281_popka",
      "char_253_greyy",
      "char_308_swire",
      "char_010_chen"
    ]
  },
  {
    "id": "1stact",
    "name": "기병과 사냥꾼",
    "category": "side_story",
    "server": "global",
    "source": "cn_git_history",
    "order": 2,
    "startTime": 1580886000,
    "startDate": "2020-02-05",
    "operatorIds": [
      "char_282_catap",
      "char_283_midn",
      "char_137_brownb",
      "char_220_grani",
      "char_164_nightm",
      "char_263_skadi"
    ]
  }
];

/**
 * 각 서버의 최신 출시 이벤트입니다.
 *
 * generatedOperatorReleaseEventList를 서버별로 처음 발견한 값입니다.
 */
export const latestOperatorReleaseEventByServer: Record<Server, GeneratedLatestOperatorReleaseEvent> = {
  "future": {
    "id": "act53side",
    "name": "대지가 오렌지 한 알이 될 때까지",
    "server": "future",
    "serverLabel": "중국 서버",
    "order": 112,
    "startTime": 1785538800,
    "startDate": "2026-08-01"
  },
  "global": {
    "id": "act49side",
    "name": "사세행",
    "server": "global",
    "serverLabel": "글로벌 서버",
    "order": 105,
    "startTime": 1784185200,
    "startDate": "2026-07-16"
  }
};
