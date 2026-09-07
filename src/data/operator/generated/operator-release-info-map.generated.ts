import { type OperatorReleaseCategory } from "../manual/operator-release-types";

export type GeneratedOperatorReleaseInfo = {
  eventId: string;
  eventName: string;
  category: OperatorReleaseCategory;
  order: number;
};

export type GeneratedReleaseOperatorInfo = {
  charId: string;
  name: string;
  profession: string;
  server: "global" | "future";
};

/**
 * manual/operator-release-events.ts와 최신 character_table.json을 기반으로
 * 자동 생성된 출시 정보 맵입니다.
 *
 * order는 다음 기준을 따릅니다. (시간 오름차순)
 * - 서버 오픈: 1
 * - 가장 오래된 manual 이벤트: 2
 * - 최신 manual 이벤트일수록 더 큰 order
 * - 출시 이벤트 미지정 future 오퍼레이터는 manual 이벤트보다 큰 order
 *
 * 표시 순서는 order 내림차순입니다.
 *
 * 직접 수정하지 말고 `npm run generate:operator-release-info`로 재생성하세요.
 */
export const operatorReleaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo> = {
  "char_4217_makoto": {
    "eventId": "act54side",
    "eventName": "물 위를 걷는 달",
    "category": "side_story",
    "order": 113
  },
  "char_4218_aigis": {
    "eventId": "act54side",
    "eventName": "물 위를 걷는 달",
    "category": "side_story",
    "order": 113
  },
  "char_4219_yukari": {
    "eventId": "act54side",
    "eventName": "물 위를 걷는 달",
    "category": "side_story",
    "order": 113
  },
  "char_4220_kormr": {
    "eventId": "act54side",
    "eventName": "물 위를 걷는 달",
    "category": "side_story",
    "order": 113
  },
  "char_1015_aglna2": {
    "eventId": "act53side",
    "eventName": "대지가 오렌지 한 알이 될 때까지",
    "category": "side_story",
    "order": 112
  },
  "char_4235_thumpy": {
    "eventId": "act53side",
    "eventName": "대지가 오렌지 한 알이 될 때까지",
    "category": "side_story",
    "order": 112
  },
  "char_4236_tmslot": {
    "eventId": "act53side",
    "eventName": "대지가 오렌지 한 알이 될 때까지",
    "category": "side_story",
    "order": 112
  },
  "char_4237_jcinta": {
    "eventId": "act53side",
    "eventName": "대지가 오렌지 한 알이 될 때까지",
    "category": "side_story",
    "order": 112
  },
  "char_4230_mcnist": {
    "eventId": "dis_rogue_6",
    "eventName": "침몰자의 블랙 플로우",
    "category": "roguelike",
    "order": 111
  },
  "char_4229_aphris": {
    "eventId": "act21mini",
    "eventName": "정글의 병폐",
    "category": "mini_event",
    "order": 110
  },
  "char_4234_pedro": {
    "eventId": "act21mini",
    "eventName": "정글의 병폐",
    "category": "mini_event",
    "order": 110
  },
  "char_1048_orchd2": {
    "eventId": "act50side",
    "eventName": "물거품에 담긴 번개",
    "category": "side_story",
    "order": 109
  },
  "char_1049_catap2": {
    "eventId": "act50side",
    "eventName": "물거품에 담긴 번개",
    "category": "side_story",
    "order": 109
  },
  "char_4215_buddy": {
    "eventId": "act50side",
    "eventName": "물거품에 담긴 번개",
    "category": "side_story",
    "order": 109
  },
  "char_1052_kalts2": {
    "eventId": "act4mainss",
    "eventName": "임계 상전이",
    "category": "main_story",
    "order": 108
  },
  "char_4225_tanya": {
    "eventId": "act4mainss",
    "eventName": "임계 상전이",
    "category": "main_story",
    "order": 108
  },
  "char_4226_veen": {
    "eventId": "act4mainss",
    "eventName": "임계 상전이",
    "category": "main_story",
    "order": 108
  },
  "char_4227_gallus": {
    "eventId": "act4mainss",
    "eventName": "임계 상전이",
    "category": "main_story",
    "order": 108
  },
  "char_4228_closur": {
    "eventId": "act4mainss",
    "eventName": "임계 상전이",
    "category": "main_story",
    "order": 108
  },
  "char_1051_headb2": {
    "eventId": "act51side",
    "eventName": "사람들, 우리들",
    "category": "side_story",
    "order": 107
  },
  "char_4223_botany": {
    "eventId": "act51side",
    "eventName": "사람들, 우리들",
    "category": "side_story",
    "order": 107
  },
  "char_4224_turdus": {
    "eventId": "act51side",
    "eventName": "사람들, 우리들",
    "category": "side_story",
    "order": 107
  },
  "char_4031_liesel": {
    "eventId": "act20mini",
    "eventName": "교차지점",
    "category": "mini_event",
    "order": 106
  },
  "char_4037_demetr": {
    "eventId": "act20mini",
    "eventName": "교차지점",
    "category": "mini_event",
    "order": 106
  },
  "char_1050_chen3": {
    "eventId": "act49side",
    "eventName": "사세행",
    "category": "side_story",
    "order": 105
  },
  "char_2027_wang": {
    "eventId": "act49side",
    "eventName": "사세행",
    "category": "side_story",
    "order": 105
  },
  "char_4221_ju": {
    "eventId": "act49side",
    "eventName": "사세행",
    "category": "side_story",
    "order": 105
  },
  "char_4222_taraxa": {
    "eventId": "act49side",
    "eventName": "사세행",
    "category": "side_story",
    "order": 105
  },
  "char_1022_flwr2": {
    "eventId": "act48side",
    "eventName": "아테누스 복수록",
    "category": "side_story",
    "order": 104
  },
  "char_4056_titi": {
    "eventId": "act48side",
    "eventName": "아테누스 복수록",
    "category": "side_story",
    "order": 104
  },
  "char_4166_varkis": {
    "eventId": "act48side",
    "eventName": "아테누스 복수록",
    "category": "side_story",
    "order": 104
  },
  "char_4212_nasti": {
    "eventId": "act47side",
    "eventName": "허락받지 못한 땅",
    "category": "side_story",
    "order": 103
  },
  "char_4213_skybx": {
    "eventId": "act47side",
    "eventName": "허락받지 못한 땅",
    "category": "side_story",
    "order": 103
  },
  "char_4214_cairn": {
    "eventId": "act47side",
    "eventName": "허락받지 못한 땅",
    "category": "side_story",
    "order": 103
  },
  "char_1045_svash2": {
    "eventId": "act46side",
    "eventName": "설산 강림 1101",
    "category": "side_story",
    "order": 102
  },
  "char_1046_sbell2": {
    "eventId": "act46side",
    "eventName": "설산 강림 1101",
    "category": "side_story",
    "order": 102
  },
  "char_1047_halo2": {
    "eventId": "act46side",
    "eventName": "설산 강림 1101",
    "category": "side_story",
    "order": 102
  },
  "char_394_hadiya": {
    "eventId": "act46side",
    "eventName": "설산 강림 1101",
    "category": "side_story",
    "order": 102
  },
  "char_4051_akkord": {
    "eventId": "act46side",
    "eventName": "설산 강림 1101",
    "category": "side_story",
    "order": 102
  },
  "char_4211_snhunt": {
    "eventId": "act46side",
    "eventName": "설산 강림 1101",
    "category": "side_story",
    "order": 102
  },
  "char_4204_mantra": {
    "eventId": "act3mainss",
    "eventName": "비정상 스펙트럼",
    "category": "main_story",
    "order": 101
  },
  "char_4207_branch": {
    "eventId": "act3mainss",
    "eventName": "비정상 스펙트럼",
    "category": "main_story",
    "order": 101
  },
  "char_4208_wintim": {
    "eventId": "act3mainss",
    "eventName": "비정상 스펙트럼",
    "category": "main_story",
    "order": 101
  },
  "char_4182_oblvns": {
    "eventId": "act45side",
    "eventName": "편안한 잠꼬대",
    "category": "side_story",
    "order": 100
  },
  "char_4183_mortis": {
    "eventId": "act45side",
    "eventName": "편안한 잠꼬대",
    "category": "side_story",
    "order": 100
  },
  "char_4184_dolris": {
    "eventId": "act45side",
    "eventName": "편안한 잠꼬대",
    "category": "side_story",
    "order": 100
  },
  "char_4185_amoris": {
    "eventId": "act45side",
    "eventName": "편안한 잠꼬대",
    "category": "side_story",
    "order": 100
  },
  "char_4186_tmoris": {
    "eventId": "act45side",
    "eventName": "편안한 잠꼬대",
    "category": "side_story",
    "order": 100
  },
  "char_1044_hsgma2": {
    "eventId": "act44side",
    "eventName": "폐허",
    "category": "side_story",
    "order": 99
  },
  "char_4199_makiri": {
    "eventId": "act44side",
    "eventName": "폐허",
    "category": "side_story",
    "order": 99
  },
  "char_4202_haruka": {
    "eventId": "act44side",
    "eventName": "폐허",
    "category": "side_story",
    "order": 99
  },
  "char_4203_kichi": {
    "eventId": "act44side",
    "eventName": "폐허",
    "category": "side_story",
    "order": 99
  },
  "char_4195_radian": {
    "eventId": "dis_rogue_5",
    "eventName": "쉐이의 기이한 계원",
    "category": "roguelike",
    "order": 98
  },
  "char_1043_leizi2": {
    "eventId": "act19mini",
    "eventName": "경중집",
    "category": "mini_event",
    "order": 97
  },
  "char_4196_reckpr": {
    "eventId": "act19mini",
    "eventName": "경중집",
    "category": "mini_event",
    "order": 97
  },
  "char_1042_phatm2": {
    "eventId": "act43side",
    "eventName": "붉게 물든 벨벳",
    "category": "side_story",
    "order": 96
  },
  "char_4191_tippi": {
    "eventId": "act43side",
    "eventName": "붉게 물든 벨벳",
    "category": "side_story",
    "order": 96
  },
  "char_4198_christ": {
    "eventId": "act43side",
    "eventName": "붉게 물든 벨벳",
    "category": "side_story",
    "order": 96
  },
  "char_1041_angel2": {
    "eventId": "act42side",
    "eventName": "중생의 여정",
    "category": "side_story",
    "order": 95
  },
  "char_4187_graceb": {
    "eventId": "act42side",
    "eventName": "중생의 여정",
    "category": "side_story",
    "order": 95
  },
  "char_4188_confes": {
    "eventId": "act42side",
    "eventName": "중생의 여정",
    "category": "side_story",
    "order": 95
  },
  "char_4193_lemuen": {
    "eventId": "act42side",
    "eventName": "중생의 여정",
    "category": "side_story",
    "order": 95
  },
  "char_4194_rmixer": {
    "eventId": "act42side",
    "eventName": "중생의 여정",
    "category": "side_story",
    "order": 95
  },
  "char_4178_alanna": {
    "eventId": "act2mainss",
    "eventName": "해리성 결합",
    "category": "main_story",
    "order": 94
  },
  "char_4179_monstr": {
    "eventId": "act2mainss",
    "eventName": "해리성 결합",
    "category": "main_story",
    "order": 94
  },
  "char_445_wscoot": {
    "eventId": "act2mainss",
    "eventName": "해리성 결합",
    "category": "main_story",
    "order": 94
  },
  "char_4171_wulfen": {
    "eventId": "act41side",
    "eventName": "불타버린 엘레지여",
    "category": "side_story",
    "order": 93
  },
  "char_4177_brigid": {
    "eventId": "act41side",
    "eventName": "불타버린 엘레지여",
    "category": "side_story",
    "order": 93
  },
  "char_450_necras": {
    "eventId": "act41side",
    "eventName": "불타버린 엘레지여",
    "category": "side_story",
    "order": 93
  },
  "char_4010_etlchi": {
    "eventId": "act18mini",
    "eventName": "다시 만나자",
    "category": "mini_event",
    "order": 92
  },
  "char_4173_nowell": {
    "eventId": "act18mini",
    "eventName": "다시 만나자",
    "category": "mini_event",
    "order": 92
  },
  "char_1040_blaze2": {
    "eventId": "act40side",
    "eventName": "상견환",
    "category": "side_story",
    "order": 91
  },
  "char_2026_yu": {
    "eventId": "act40side",
    "eventName": "상견환",
    "category": "side_story",
    "order": 91
  },
  "char_4052_surfer": {
    "eventId": "act40side",
    "eventName": "상견환",
    "category": "side_story",
    "order": 91
  },
  "char_4172_xingzh": {
    "eventId": "act40side",
    "eventName": "상견환",
    "category": "side_story",
    "order": 91
  },
  "char_1039_thorn2": {
    "eventId": "act39side",
    "eventName": "창백한 바다로부터의 탈출",
    "category": "side_story",
    "order": 90
  },
  "char_4163_rosesa": {
    "eventId": "act39side",
    "eventName": "창백한 바다로부터의 탈출",
    "category": "side_story",
    "order": 90
  },
  "char_4164_tecno": {
    "eventId": "act39side",
    "eventName": "창백한 바다로부터의 탈출",
    "category": "side_story",
    "order": 90
  },
  "char_1038_whitw2": {
    "eventId": "act38side",
    "eventName": "막을 여는 자들",
    "category": "side_story",
    "order": 89
  },
  "char_1502_crosly": {
    "eventId": "act38side",
    "eventName": "막을 여는 자들",
    "category": "side_story",
    "order": 89
  },
  "char_4026_vulpis": {
    "eventId": "act38side",
    "eventName": "막을 여는 자들",
    "category": "side_story",
    "order": 89
  },
  "char_4148_philae": {
    "eventId": "act38side",
    "eventName": "막을 여는 자들",
    "category": "side_story",
    "order": 89
  },
  "char_4155_talr": {
    "eventId": "act38side",
    "eventName": "막을 여는 자들",
    "category": "side_story",
    "order": 89
  },
  "char_4165_ctrail": {
    "eventId": "act38side",
    "eventName": "막을 여는 자들",
    "category": "side_story",
    "order": 89
  },
  "char_1019_siege2": {
    "eventId": "act37side",
    "eventName": "위대한 서곡의 끝",
    "category": "side_story",
    "order": 88
  },
  "char_4162_cathy": {
    "eventId": "act37side",
    "eventName": "위대한 서곡의 끝",
    "category": "side_story",
    "order": 88
  },
  "char_487_bobb": {
    "eventId": "act37side",
    "eventName": "위대한 서곡의 끝",
    "category": "side_story",
    "order": 88
  },
  "char_4141_marcil": {
    "eventId": "act36side",
    "eventName": "테라밥",
    "category": "side_story",
    "order": 87
  },
  "char_4142_laios": {
    "eventId": "act36side",
    "eventName": "테라밥",
    "category": "side_story",
    "order": 87
  },
  "char_4143_sensi": {
    "eventId": "act36side",
    "eventName": "테라밥",
    "category": "side_story",
    "order": 87
  },
  "char_4144_chilc": {
    "eventId": "act36side",
    "eventName": "테라밥",
    "category": "side_story",
    "order": 87
  },
  "char_4058_pepe": {
    "eventId": "act35side",
    "eventName": "태양을 뿌리쳐라",
    "category": "side_story",
    "order": 86
  },
  "char_4138_narant": {
    "eventId": "act35side",
    "eventName": "태양을 뿌리쳐라",
    "category": "side_story",
    "order": 86
  },
  "char_4139_papyrs": {
    "eventId": "act35side",
    "eventName": "태양을 뿌리쳐라",
    "category": "side_story",
    "order": 86
  },
  "char_4140_lasher": {
    "eventId": "act35side",
    "eventName": "태양을 뿌리쳐라",
    "category": "side_story",
    "order": 86
  },
  "char_4151_tinman": {
    "eventId": "dis_rogue_4",
    "eventName": "살카즈의 영겁 기담",
    "category": "roguelike",
    "order": 85
  },
  "char_4146_nymph": {
    "eventId": "act17mini",
    "eventName": "카즈델리안 레스큐",
    "category": "mini_event",
    "order": 84
  },
  "char_4147_mitm": {
    "eventId": "act17mini",
    "eventName": "카즈델리안 레스큐",
    "category": "mini_event",
    "order": 84
  },
  "char_4079_haini": {
    "eventId": "act34side",
    "eventName": "삶의 길",
    "category": "side_story",
    "order": 83
  },
  "char_4137_udflow": {
    "eventId": "act34side",
    "eventName": "삶의 길",
    "category": "side_story",
    "order": 83
  },
  "char_4145_ulpia": {
    "eventId": "act34side",
    "eventName": "삶의 길",
    "category": "side_story",
    "order": 83
  },
  "char_1035_wisdel": {
    "eventId": "act1mainss",
    "eventName": "자비의 등대",
    "category": "main_story",
    "order": 82
  },
  "char_1036_fang2": {
    "eventId": "act1mainss",
    "eventName": "자비의 등대",
    "category": "main_story",
    "order": 82
  },
  "char_4133_logos": {
    "eventId": "act1mainss",
    "eventName": "자비의 등대",
    "category": "main_story",
    "order": 82
  },
  "char_4134_cetsyr": {
    "eventId": "act1mainss",
    "eventName": "자비의 등대",
    "category": "main_story",
    "order": 82
  },
  "char_4136_phonor": {
    "eventId": "act1mainss",
    "eventName": "자비의 등대",
    "category": "main_story",
    "order": 82
  },
  "char_4130_luton": {
    "eventId": "act33side",
    "eventName": "바벨",
    "category": "side_story",
    "order": 81
  },
  "char_4131_odda": {
    "eventId": "act33side",
    "eventName": "바벨",
    "category": "side_story",
    "order": 81
  },
  "char_4132_ascln": {
    "eventId": "act33side",
    "eventName": "바벨",
    "category": "side_story",
    "order": 81
  },
  "char_446_aroma": {
    "eventId": "act33side",
    "eventName": "바벨",
    "category": "side_story",
    "order": 81
  },
  "char_4123_ela": {
    "eventId": "act32side",
    "eventName": "루센트 애로우헤드",
    "category": "side_story",
    "order": 80
  },
  "char_4124_iana": {
    "eventId": "act32side",
    "eventName": "루센트 애로우헤드",
    "category": "side_story",
    "order": 80
  },
  "char_4125_rdoc": {
    "eventId": "act32side",
    "eventName": "루센트 애로우헤드",
    "category": "side_story",
    "order": 80
  },
  "char_4126_fuze": {
    "eventId": "act32side",
    "eventName": "루센트 애로우헤드",
    "category": "side_story",
    "order": 80
  },
  "char_4023_rfalcn": {
    "eventId": "dis_perm_sandbox_1",
    "eventName": "사막 이야기",
    "category": "other",
    "order": 79
  },
  "char_2025_shu": {
    "eventId": "act31side",
    "eventName": "회서리",
    "category": "side_story",
    "order": 78
  },
  "char_4119_wanqin": {
    "eventId": "act31side",
    "eventName": "회서리",
    "category": "side_story",
    "order": 78
  },
  "char_4121_zuole": {
    "eventId": "act31side",
    "eventName": "회서리",
    "category": "side_story",
    "order": 78
  },
  "char_4122_grabds": {
    "eventId": "act31side",
    "eventName": "회서리",
    "category": "side_story",
    "order": 78
  },
  "char_4081_warmy": {
    "eventId": "act16mini",
    "eventName": "그리닝 밸리를 향해",
    "category": "mini_event",
    "order": 77
  },
  "char_4117_ray": {
    "eventId": "act16mini",
    "eventName": "그리닝 밸리를 향해",
    "category": "mini_event",
    "order": 77
  },
  "char_194_leto": {
    "eventId": "act30side",
    "eventName": "은심호 열차",
    "category": "side_story",
    "order": 76
  },
  "char_4114_harold": {
    "eventId": "act30side",
    "eventName": "은심호 열차",
    "category": "side_story",
    "order": 76
  },
  "char_4116_blkkgt": {
    "eventId": "act30side",
    "eventName": "은심호 열차",
    "category": "side_story",
    "order": 76
  },
  "char_245_cello": {
    "eventId": "act29side",
    "eventName": "츠빌링슈튀르메의 가을",
    "category": "side_story",
    "order": 75
  },
  "char_4011_lessng": {
    "eventId": "act29side",
    "eventName": "츠빌링슈튀르메의 가을",
    "category": "side_story",
    "order": 75
  },
  "char_4098_vvana": {
    "eventId": "act29side",
    "eventName": "츠빌링슈튀르메의 가을",
    "category": "side_story",
    "order": 75
  },
  "char_4100_caper": {
    "eventId": "act29side",
    "eventName": "츠빌링슈튀르메의 가을",
    "category": "side_story",
    "order": 75
  },
  "char_4109_baslin": {
    "eventId": "act29side",
    "eventName": "츠빌링슈튀르메의 가을",
    "category": "side_story",
    "order": 75
  },
  "char_499_kaitou": {
    "eventId": "act29side",
    "eventName": "츠빌링슈튀르메의 가을",
    "category": "side_story",
    "order": 75
  },
  "char_4088_hodrer": {
    "eventId": "dis_main_13",
    "eventName": "흉조의 소용돌이",
    "category": "main_story",
    "order": 74
  },
  "char_4107_vrdant": {
    "eventId": "dis_main_13",
    "eventName": "흉조의 소용돌이",
    "category": "main_story",
    "order": 74
  },
  "char_4110_delphn": {
    "eventId": "dis_main_13",
    "eventName": "흉조의 소용돌이",
    "category": "main_story",
    "order": 74
  },
  "char_494_vendla": {
    "eventId": "dis_main_13",
    "eventName": "흉조의 소용돌이",
    "category": "main_story",
    "order": 74
  },
  "char_1034_jesca2": {
    "eventId": "act28side",
    "eventName": "부정축재",
    "category": "side_story",
    "order": 73
  },
  "char_4104_coldst": {
    "eventId": "act28side",
    "eventName": "부정축재",
    "category": "side_story",
    "order": 73
  },
  "char_4105_almond": {
    "eventId": "act28side",
    "eventName": "부정축재",
    "category": "side_story",
    "order": 73
  },
  "char_1016_agoat2": {
    "eventId": "act27side",
    "eventName": "화산의 꿈 여행",
    "category": "side_story",
    "order": 72
  },
  "char_1033_swire2": {
    "eventId": "act27side",
    "eventName": "화산의 꿈 여행",
    "category": "side_story",
    "order": 72
  },
  "char_4106_bryota": {
    "eventId": "act27side",
    "eventName": "화산의 꿈 여행",
    "category": "side_story",
    "order": 72
  },
  "char_488_buildr": {
    "eventId": "act27side",
    "eventName": "화산의 꿈 여행",
    "category": "side_story",
    "order": 72
  },
  "char_4102_threye": {
    "eventId": "dis_rogue_3",
    "eventName": "탐험가의 은빛 서리 끝자락",
    "category": "roguelike",
    "order": 71
  },
  "char_2012_typhon": {
    "eventId": "act15mini",
    "eventName": "나무 그늘 속에 잠들다",
    "category": "mini_event",
    "order": 70
  },
  "char_341_sntlla": {
    "eventId": "act15mini",
    "eventName": "나무 그늘 속에 잠들다",
    "category": "mini_event",
    "order": 70
  },
  "char_1032_excu2": {
    "eventId": "act26side",
    "eventName": "공상의 정원",
    "category": "side_story",
    "order": 69
  },
  "char_4015_spuria": {
    "eventId": "act26side",
    "eventName": "공상의 정원",
    "category": "side_story",
    "order": 69
  },
  "char_498_inside": {
    "eventId": "act26side",
    "eventName": "공상의 정원",
    "category": "side_story",
    "order": 69
  },
  "char_4093_frston": {
    "eventId": "act38d1",
    "eventName": "첨멸 실험 작전",
    "category": "side_story",
    "order": 68
  },
  "char_1031_slent2": {
    "eventId": "act25side",
    "eventName": "론 트레일",
    "category": "side_story",
    "order": 67
  },
  "char_249_mlyss": {
    "eventId": "act25side",
    "eventName": "론 트레일",
    "category": "side_story",
    "order": 67
  },
  "char_4006_melnte": {
    "eventId": "act25side",
    "eventName": "론 트레일",
    "category": "side_story",
    "order": 67
  },
  "char_4027_heyak": {
    "eventId": "act25side",
    "eventName": "론 트레일",
    "category": "side_story",
    "order": 67
  },
  "char_154_morgan": {
    "eventId": "dis_main_12",
    "eventName": "천둥 속의 고요",
    "category": "main_story",
    "order": 66
  },
  "char_4087_ines": {
    "eventId": "dis_main_12",
    "eventName": "천둥 속의 고요",
    "category": "main_story",
    "order": 66
  },
  "char_464_cement": {
    "eventId": "dis_main_12",
    "eventName": "천둥 속의 고요",
    "category": "main_story",
    "order": 66
  },
  "char_491_humus": {
    "eventId": "dis_main_12",
    "eventName": "천둥 속의 고요",
    "category": "main_story",
    "order": 66
  },
  "char_4091_ulika": {
    "eventId": "act4fun",
    "eventName": "만우절 이벤트",
    "category": "other",
    "order": 65
  },
  "char_1029_yato2": {
    "eventId": "act24side",
    "eventName": "불을 쫓는 낙엽",
    "category": "side_story",
    "order": 64
  },
  "char_1030_noirc2": {
    "eventId": "act24side",
    "eventName": "불을 쫓는 낙엽",
    "category": "side_story",
    "order": 64
  },
  "char_4077_palico": {
    "eventId": "act24side",
    "eventName": "불을 쫓는 낙엽",
    "category": "side_story",
    "order": 64
  },
  "char_4082_qiubai": {
    "eventId": "act14mini",
    "eventName": "숙명",
    "category": "mini_event",
    "order": 63
  },
  "char_4083_chimes": {
    "eventId": "act14mini",
    "eventName": "숙명",
    "category": "mini_event",
    "order": 63
  },
  "char_2024_chyue": {
    "eventId": "act23side",
    "eventName": "등림의",
    "category": "side_story",
    "order": 61
  },
  "char_4078_bdhkgt": {
    "eventId": "act23side",
    "eventName": "등림의",
    "category": "side_story",
    "order": 61
  },
  "char_4080_lin": {
    "eventId": "act23side",
    "eventName": "등림의",
    "category": "side_story",
    "order": 61
  },
  "char_493_firwhl": {
    "eventId": "act23side",
    "eventName": "등림의",
    "category": "side_story",
    "order": 61
  },
  "char_1020_reed2": {
    "eventId": "act22side",
    "eventName": "불로 비춰주소서",
    "category": "side_story",
    "order": 60
  },
  "char_297_hamoni": {
    "eventId": "act22side",
    "eventName": "불로 비춰주소서",
    "category": "side_story",
    "order": 60
  },
  "char_4017_puzzle": {
    "eventId": "act22side",
    "eventName": "불로 비춰주소서",
    "category": "side_story",
    "order": 60
  },
  "char_1028_texas2": {
    "eventId": "act21side",
    "eventName": "시라쿠사인",
    "category": "side_story",
    "order": 59
  },
  "char_4014_lunacu": {
    "eventId": "act21side",
    "eventName": "시라쿠사인",
    "category": "side_story",
    "order": 59
  },
  "char_4063_quartz": {
    "eventId": "act21side",
    "eventName": "시라쿠사인",
    "category": "side_story",
    "order": 59
  },
  "char_4065_judge": {
    "eventId": "act21side",
    "eventName": "시라쿠사인",
    "category": "side_story",
    "order": 59
  },
  "char_427_vigil": {
    "eventId": "act21side",
    "eventName": "시라쿠사인",
    "category": "side_story",
    "order": 59
  },
  "char_466_qanik": {
    "eventId": "act21side",
    "eventName": "시라쿠사인",
    "category": "side_story",
    "order": 59
  },
  "char_157_dagda": {
    "eventId": "dis_main_11",
    "eventName": "리턴 투 미스트",
    "category": "main_story",
    "order": 58
  },
  "char_4062_totter": {
    "eventId": "dis_main_11",
    "eventName": "리턴 투 미스트",
    "category": "main_story",
    "order": 58
  },
  "char_4071_peper": {
    "eventId": "dis_main_11",
    "eventName": "리턴 투 미스트",
    "category": "main_story",
    "order": 58
  },
  "char_4072_ironmn": {
    "eventId": "dis_main_11",
    "eventName": "리턴 투 미스트",
    "category": "main_story",
    "order": 58
  },
  "char_4066_highmo": {
    "eventId": "dis_rogue_2",
    "eventName": "미즈키 & 카이룰라 아버",
    "category": "roguelike",
    "order": 57
  },
  "char_4067_lolxh": {
    "eventId": "act13mini",
    "eventName": "오랜만",
    "category": "mini_event",
    "order": 56
  },
  "char_4032_provs": {
    "eventId": "act12mini",
    "eventName": "무명의 방랑자",
    "category": "mini_event",
    "order": 55
  },
  "char_4064_mlynar": {
    "eventId": "act12mini",
    "eventName": "무명의 방랑자",
    "category": "mini_event",
    "order": 55
  },
  "char_1026_gvial2": {
    "eventId": "act20side",
    "eventName": "이상적인 도시: 엔드리스 카니발",
    "category": "side_story",
    "order": 54
  },
  "char_4054_malist": {
    "eventId": "act20side",
    "eventName": "이상적인 도시: 엔드리스 카니발",
    "category": "side_story",
    "order": 54
  },
  "char_4055_bgsnow": {
    "eventId": "act20side",
    "eventName": "이상적인 도시: 엔드리스 카니발",
    "category": "side_story",
    "order": 54
  },
  "char_497_ctable": {
    "eventId": "act20side",
    "eventName": "이상적인 도시: 엔드리스 카니발",
    "category": "side_story",
    "order": 54
  },
  "char_1027_greyy2": {
    "eventId": "act19side",
    "eventName": "도로시의 비전",
    "category": "side_story",
    "order": 52
  },
  "char_135_halo": {
    "eventId": "act19side",
    "eventName": "도로시의 비전",
    "category": "side_story",
    "order": 52
  },
  "char_4048_doroth": {
    "eventId": "act19side",
    "eventName": "도로시의 비전",
    "category": "side_story",
    "order": 52
  },
  "char_1024_hbisc2": {
    "eventId": "act18side",
    "eventName": "링거링 에코스",
    "category": "side_story",
    "order": 51
  },
  "char_4046_ebnhlz": {
    "eventId": "act18side",
    "eventName": "링거링 에코스",
    "category": "side_story",
    "order": 51
  },
  "char_4047_pianst": {
    "eventId": "act18side",
    "eventName": "링거링 에코스",
    "category": "side_story",
    "order": 51
  },
  "char_4043_erato": {
    "eventId": "dis_rune_9",
    "eventName": "딥니스 작전",
    "category": "crisis",
    "order": 50
  },
  "char_1023_ghost2": {
    "eventId": "act17side",
    "eventName": "스툴티페라 나비스",
    "category": "side_story",
    "order": 49
  },
  "char_4009_irene": {
    "eventId": "act17side",
    "eventName": "스툴티페라 나비스",
    "category": "side_story",
    "order": 49
  },
  "char_4042_lumen": {
    "eventId": "act17side",
    "eventName": "스툴티페라 나비스",
    "category": "side_story",
    "order": 49
  },
  "char_433_windft": {
    "eventId": "act17side",
    "eventName": "스툴티페라 나비스",
    "category": "side_story",
    "order": 49
  },
  "char_4039_horn": {
    "eventId": "dis_main_10",
    "eventName": "섀터 포인트",
    "category": "main_story",
    "order": 48
  },
  "char_4040_rockr": {
    "eventId": "dis_main_10",
    "eventName": "섀터 포인트",
    "category": "main_story",
    "order": 48
  },
  "char_4041_chnut": {
    "eventId": "dis_main_10",
    "eventName": "섀터 포인트",
    "category": "main_story",
    "order": 48
  },
  "char_4045_heidi": {
    "eventId": "dis_main_10",
    "eventName": "섀터 포인트",
    "category": "main_story",
    "order": 48
  },
  "char_300_phenxi": {
    "eventId": "act16side",
    "eventName": "가이딩 어헤드",
    "category": "side_story",
    "order": 47
  },
  "char_4016_kazema": {
    "eventId": "act16side",
    "eventName": "가이딩 어헤드",
    "category": "side_story",
    "order": 47
  },
  "char_4036_forcer": {
    "eventId": "act16side",
    "eventName": "가이딩 어헤드",
    "category": "side_story",
    "order": 47
  },
  "char_377_gdglow": {
    "eventId": "act10mini",
    "eventName": "어 라이트 스파크 인 다크니스",
    "category": "mini_event",
    "order": 46
  },
  "char_492_quercu": {
    "eventId": "act10mini",
    "eventName": "어 라이트 스파크 인 다크니스",
    "category": "mini_event",
    "order": 46
  },
  "char_1021_kroos2": {
    "eventId": "act15side",
    "eventName": "장진주",
    "category": "side_story",
    "order": 45
  },
  "char_2023_ling": {
    "eventId": "act15side",
    "eventName": "장진주",
    "category": "side_story",
    "order": 45
  },
  "char_322_lmlee": {
    "eventId": "act15side",
    "eventName": "장진주",
    "category": "side_story",
    "order": 45
  },
  "char_476_blkngt": {
    "eventId": "act15side",
    "eventName": "장진주",
    "category": "side_story",
    "order": 45
  },
  "char_4019_ncdeer": {
    "eventId": "act24sign",
    "eventName": "한정 누적 출석 체크",
    "category": "other",
    "order": 44
  },
  "char_4025_aprot2": {
    "eventId": "dis_rogue_1",
    "eventName": "팬텀 & 크림슨 솔리테어",
    "category": "roguelike",
    "order": 43
  },
  "char_206_gnosis": {
    "eventId": "act14side",
    "eventName": "브레이크 디 아이스",
    "category": "side_story",
    "order": 42
  },
  "char_4013_kjera": {
    "eventId": "act14side",
    "eventName": "브레이크 디 아이스",
    "category": "side_story",
    "order": 42
  },
  "char_422_aurora": {
    "eventId": "act14side",
    "eventName": "브레이크 디 아이스",
    "category": "side_story",
    "order": 42
  },
  "char_1014_nearl2": {
    "eventId": "act13side",
    "eventName": "니어 라이트",
    "category": "side_story",
    "order": 41
  },
  "char_4000_jnight": {
    "eventId": "act13side",
    "eventName": "니어 라이트",
    "category": "side_story",
    "order": 41
  },
  "char_4004_pudd": {
    "eventId": "act13side",
    "eventName": "니어 라이트",
    "category": "side_story",
    "order": 41
  },
  "char_420_flamtl": {
    "eventId": "act13side",
    "eventName": "니어 라이트",
    "category": "side_story",
    "order": 41
  },
  "char_449_glider": {
    "eventId": "act13side",
    "eventName": "니어 라이트",
    "category": "side_story",
    "order": 41
  },
  "char_489_serum": {
    "eventId": "act13side",
    "eventName": "니어 라이트",
    "category": "side_story",
    "order": 41
  },
  "char_496_wildmn": {
    "eventId": "act13side",
    "eventName": "니어 라이트",
    "category": "side_story",
    "order": 41
  },
  "char_430_fartth": {
    "eventId": "act9mini",
    "eventName": "피누스 실베스트리스",
    "category": "mini_event",
    "order": 40
  },
  "char_431_ashlok": {
    "eventId": "act9mini",
    "eventName": "피누스 실베스트리스",
    "category": "mini_event",
    "order": 40
  },
  "char_473_mberry": {
    "eventId": "dis_main_9",
    "eventName": "스톰워치",
    "category": "main_story",
    "order": 39
  },
  "char_479_sleach": {
    "eventId": "dis_main_9",
    "eventName": "스톰워치",
    "category": "main_story",
    "order": 39
  },
  "char_484_robrta": {
    "eventId": "dis_main_9",
    "eventName": "스톰워치",
    "category": "main_story",
    "order": 39
  },
  "char_1013_chen2": {
    "eventId": "act12side",
    "eventName": "도솔레스 홀리데이",
    "category": "side_story",
    "order": 38
  },
  "char_421_crow": {
    "eventId": "act12side",
    "eventName": "도솔레스 홀리데이",
    "category": "side_story",
    "order": 38
  },
  "char_437_mizuki": {
    "eventId": "act12side",
    "eventName": "도솔레스 홀리데이",
    "category": "side_story",
    "order": 38
  },
  "char_486_takila": {
    "eventId": "act12side",
    "eventName": "도솔레스 홀리데이",
    "category": "side_story",
    "order": 38
  },
  "char_485_pallas": {
    "eventId": "act1lock",
    "eventName": "힘노이의 지혜",
    "category": "other",
    "order": 36
  },
  "char_369_bena": {
    "eventId": "act7mini",
    "eventName": "프렐류딩 라이츠",
    "category": "mini_event",
    "order": 35
  },
  "char_426_billro": {
    "eventId": "act7mini",
    "eventName": "프렐류딩 라이츠",
    "category": "mini_event",
    "order": 35
  },
  "char_469_indigo": {
    "eventId": "act7mini",
    "eventName": "프렐류딩 라이츠",
    "category": "mini_event",
    "order": 35
  },
  "char_478_kirara": {
    "eventId": "act7mini",
    "eventName": "프렐류딩 라이츠",
    "category": "mini_event",
    "order": 35
  },
  "char_003_kalts": {
    "eventId": "act18d3",
    "eventName": "언더 타이즈",
    "category": "side_story",
    "order": 34
  },
  "char_1012_skadi2": {
    "eventId": "act18d3",
    "eventName": "언더 타이즈",
    "category": "side_story",
    "order": 34
  },
  "char_474_glady": {
    "eventId": "act18d3",
    "eventName": "언더 타이즈",
    "category": "side_story",
    "order": 34
  },
  "char_475_akafyu": {
    "eventId": "act18d3",
    "eventName": "언더 타이즈",
    "category": "side_story",
    "order": 34
  },
  "char_304_zebra": {
    "eventId": "act18d0",
    "eventName": "워크 인 더 더스트",
    "category": "side_story",
    "order": 33
  },
  "char_363_toddi": {
    "eventId": "act18d0",
    "eventName": "워크 인 더 더스트",
    "category": "side_story",
    "order": 33
  },
  "char_472_pasngr": {
    "eventId": "act18d0",
    "eventName": "워크 인 더 더스트",
    "category": "side_story",
    "order": 33
  },
  "char_456_ash": {
    "eventId": "act17d0",
    "eventName": "오리지늄 더스트",
    "category": "side_story",
    "order": 32
  },
  "char_457_blitz": {
    "eventId": "act17d0",
    "eventName": "오리지늄 더스트",
    "category": "side_story",
    "order": 32
  },
  "char_458_rfrost": {
    "eventId": "act17d0",
    "eventName": "오리지늄 더스트",
    "category": "side_story",
    "order": 32
  },
  "char_459_tachak": {
    "eventId": "act17d0",
    "eventName": "오리지늄 더스트",
    "category": "side_story",
    "order": 32
  },
  "char_1011_lava2": {
    "eventId": "act16d5",
    "eventName": "화중인",
    "category": "side_story",
    "order": 31
  },
  "char_2015_dusk": {
    "eventId": "act16d5",
    "eventName": "화중인",
    "category": "side_story",
    "order": 31
  },
  "char_362_saga": {
    "eventId": "act16d5",
    "eventName": "화중인",
    "category": "side_story",
    "order": 31
  },
  "char_455_nothin": {
    "eventId": "act16d5",
    "eventName": "화중인",
    "category": "side_story",
    "order": 31
  },
  "char_402_tuye": {
    "eventId": "dis_rune_4",
    "eventName": "리드씰 작전",
    "category": "crisis",
    "order": 30
  },
  "char_332_archet": {
    "eventId": "act15d5",
    "eventName": "비욘드 히어",
    "category": "mini_event",
    "order": 29
  },
  "char_338_iris": {
    "eventId": "act15d5",
    "eventName": "비욘드 히어",
    "category": "mini_event",
    "order": 29
  },
  "char_452_bstalk": {
    "eventId": "act15d5",
    "eventName": "비욘드 히어",
    "category": "mini_event",
    "order": 29
  },
  "char_214_kafka": {
    "eventId": "act15d0",
    "eventName": "맨스필드 브레이크",
    "category": "side_story",
    "order": 28
  },
  "char_264_f12yin": {
    "eventId": "act15d0",
    "eventName": "맨스필드 브레이크",
    "category": "side_story",
    "order": 28
  },
  "char_440_pinecn": {
    "eventId": "act15d0",
    "eventName": "맨스필드 브레이크",
    "category": "side_story",
    "order": 28
  },
  "char_451_robin": {
    "eventId": "act15d0",
    "eventName": "맨스필드 브레이크",
    "category": "side_story",
    "order": 28
  },
  "char_311_mudrok": {
    "eventId": "dis_main_8",
    "eventName": "울부짖는 광명",
    "category": "main_story",
    "order": 27
  },
  "char_347_jaksel": {
    "eventId": "dis_main_8",
    "eventName": "울부짖는 광명",
    "category": "main_story",
    "order": 27
  },
  "char_391_rosmon": {
    "eventId": "dis_main_8",
    "eventName": "울부짖는 광명",
    "category": "main_story",
    "order": 27
  },
  "char_436_whispr": {
    "eventId": "dis_main_8",
    "eventName": "울부짖는 광명",
    "category": "main_story",
    "order": 27
  },
  "char_265_sophia": {
    "eventId": "act13d5",
    "eventName": "마리아 니어",
    "category": "side_story",
    "order": 26
  },
  "char_346_aosta": {
    "eventId": "act13d5",
    "eventName": "마리아 니어",
    "category": "side_story",
    "order": 26
  },
  "char_381_bubble": {
    "eventId": "act13d5",
    "eventName": "마리아 니어",
    "category": "side_story",
    "order": 26
  },
  "char_423_blemsh": {
    "eventId": "act13d5",
    "eventName": "마리아 니어",
    "category": "side_story",
    "order": 26
  },
  "char_271_spikes": {
    "eventId": "act13d0",
    "eventName": "리와인딩 브리즈",
    "category": "mini_event",
    "order": 25
  },
  "char_350_surtr": {
    "eventId": "act13d0",
    "eventName": "리와인딩 브리즈",
    "category": "mini_event",
    "order": 25
  },
  "char_365_aprl": {
    "eventId": "act13d0",
    "eventName": "리와인딩 브리즈",
    "category": "mini_event",
    "order": 25
  },
  "char_388_mint": {
    "eventId": "act13d0",
    "eventName": "리와인딩 브리즈",
    "category": "mini_event",
    "order": 25
  },
  "char_366_acdrop": {
    "eventId": "act12d0",
    "eventName": "위대한 족장 가비알 리턴즈",
    "category": "side_story",
    "order": 23
  },
  "char_411_tomimi": {
    "eventId": "act12d0",
    "eventName": "위대한 족장 가비알 리턴즈",
    "category": "side_story",
    "order": 23
  },
  "char_415_flint": {
    "eventId": "act12d0",
    "eventName": "위대한 족장 가비알 리턴즈",
    "category": "side_story",
    "order": 23
  },
  "char_416_zumama": {
    "eventId": "act12d0",
    "eventName": "위대한 족장 가비알 리턴즈",
    "category": "side_story",
    "order": 23
  },
  "char_218_cuttle": {
    "eventId": "act11d7",
    "eventName": "파란 불꽃의 마음 (재개방)",
    "category": "side_story",
    "order": 22
  },
  "char_272_strong": {
    "eventId": "act11d7",
    "eventName": "파란 불꽃의 마음 (재개방)",
    "category": "side_story",
    "order": 22
  },
  "char_293_thorns": {
    "eventId": "act11d7",
    "eventName": "파란 불꽃의 마음 (재개방)",
    "category": "side_story",
    "order": 22
  },
  "char_336_folivo": {
    "eventId": "dis_rune_2",
    "eventName": "칼날 작전",
    "category": "crisis",
    "order": 21
  },
  "char_344_beewax": {
    "eventId": "dis_rune_2",
    "eventName": "칼날 작전",
    "category": "crisis",
    "order": 21
  },
  "char_349_chiave": {
    "eventId": "dis_rune_2",
    "eventName": "칼날 작전",
    "category": "crisis",
    "order": 21
  },
  "char_294_ayer": {
    "eventId": "act11d0",
    "eventName": "월루몽드의 황혼",
    "category": "side_story",
    "order": 20
  },
  "char_328_cammou": {
    "eventId": "act11d0",
    "eventName": "월루몽드의 황혼",
    "category": "side_story",
    "order": 20
  },
  "char_345_folnic": {
    "eventId": "act11d0",
    "eventName": "월루몽드의 황혼",
    "category": "side_story",
    "order": 20
  },
  "char_358_lisa": {
    "eventId": "act11d0",
    "eventName": "월루몽드의 황혼",
    "category": "side_story",
    "order": 20
  },
  "char_197_poca": {
    "eventId": "act10d5",
    "eventName": "우르수스의 아이들",
    "category": "mini_event",
    "order": 19
  },
  "char_258_podego": {
    "eventId": "act10d5",
    "eventName": "우르수스의 아이들",
    "category": "mini_event",
    "order": 19
  },
  "char_373_lionhd": {
    "eventId": "act10d5",
    "eventName": "우르수스의 아이들",
    "category": "mini_event",
    "order": 19
  },
  "char_405_absin": {
    "eventId": "act10d5",
    "eventName": "우르수스의 아이들",
    "category": "mini_event",
    "order": 19
  },
  "char_343_tknogi": {
    "eventId": "dis_rune_1",
    "eventName": "파이라이트 작전",
    "category": "crisis",
    "order": 18
  },
  "char_378_asbest": {
    "eventId": "dis_rune_1",
    "eventName": "파이라이트 작전",
    "category": "crisis",
    "order": 18
  },
  "char_113_cqbw": {
    "eventId": "dis_main_7",
    "eventName": "고난의 요람",
    "category": "main_story",
    "order": 17
  },
  "char_376_therex": {
    "eventId": "dis_main_7",
    "eventName": "고난의 요람",
    "category": "main_story",
    "order": 17
  },
  "char_400_weedy": {
    "eventId": "dis_main_7",
    "eventName": "고난의 요람",
    "category": "main_story",
    "order": 17
  },
  "char_401_elysm": {
    "eventId": "dis_main_7",
    "eventName": "고난의 요람",
    "category": "main_story",
    "order": 17
  },
  "char_250_phatom": {
    "eventId": "act9d0",
    "eventName": "흑야의 회고록",
    "category": "side_story",
    "order": 16
  },
  "char_254_vodfox": {
    "eventId": "act9d0",
    "eventName": "흑야의 회고록",
    "category": "side_story",
    "order": 16
  },
  "char_301_cutter": {
    "eventId": "act9d0",
    "eventName": "흑야의 회고록",
    "category": "side_story",
    "order": 16
  },
  "char_333_sidero": {
    "eventId": "act9d0",
    "eventName": "흑야의 회고록",
    "category": "side_story",
    "order": 16
  },
  "char_159_peacok": {
    "eventId": "act1fun",
    "eventName": "2020 만우절",
    "category": "other",
    "order": 15
  },
  "char_222_bpipe": {
    "eventId": "dis_rune_0",
    "eventName": "황무지 작전",
    "category": "crisis",
    "order": 14
  },
  "char_252_bibeak": {
    "eventId": "dis_rune_0",
    "eventName": "황무지 작전",
    "category": "crisis",
    "order": 14
  },
  "char_337_utage": {
    "eventId": "dis_rune_0",
    "eventName": "황무지 작전",
    "category": "crisis",
    "order": 14
  },
  "char_379_sesa": {
    "eventId": "dis_rune_0",
    "eventName": "황무지 작전",
    "category": "crisis",
    "order": 14
  },
  "char_385_finlpp": {
    "eventId": "act7d1",
    "eventName": "한정 누적 출석 체크",
    "category": "other",
    "order": 13
  },
  "char_2013_cerber": {
    "eventId": "act7d5",
    "eventName": "오후의 일화",
    "category": "mini_event",
    "order": 12
  },
  "char_306_leizi": {
    "eventId": "act7d5",
    "eventName": "오후의 일화",
    "category": "mini_event",
    "order": 12
  },
  "char_2014_nian": {
    "eventId": "act6d5",
    "eventName": "에인션트 포지",
    "category": "mini_event",
    "order": 11
  },
  "char_225_haak": {
    "eventId": "act6d5",
    "eventName": "에인션트 포지",
    "category": "mini_event",
    "order": 11
  },
  "char_226_hmau": {
    "eventId": "act6d5",
    "eventName": "에인션트 포지",
    "category": "mini_event",
    "order": 11
  },
  "char_383_snsant": {
    "eventId": "act6d5",
    "eventName": "에인션트 포지",
    "category": "mini_event",
    "order": 11
  },
  "char_017_huang": {
    "eventId": "dis_main_6",
    "eventName": "부분괴사",
    "category": "main_story",
    "order": 10
  },
  "char_302_glaze": {
    "eventId": "dis_main_6",
    "eventName": "부분괴사",
    "category": "main_story",
    "order": 10
  },
  "char_367_swllow": {
    "eventId": "dis_main_6",
    "eventName": "부분괴사",
    "category": "main_story",
    "order": 10
  },
  "char_261_sddrag": {
    "eventId": "act2sign",
    "eventName": "부분괴사 오픈 전 & 하프 애니버서리",
    "category": "other",
    "order": 9
  },
  "char_356_broca": {
    "eventId": "act2sign",
    "eventName": "부분괴사 오픈 전 & 하프 애니버서리",
    "category": "other",
    "order": 9
  },
  "char_133_mm": {
    "eventId": "act5d0",
    "eventName": "소란의 법칙",
    "category": "side_story",
    "order": 8
  },
  "char_213_mostma": {
    "eventId": "act5d0",
    "eventName": "소란의 법칙",
    "category": "side_story",
    "order": 8
  },
  "char_243_waaifu": {
    "eventId": "act5d0",
    "eventName": "소란의 법칙",
    "category": "side_story",
    "order": 8
  },
  "char_325_bison": {
    "eventId": "act5d0",
    "eventName": "소란의 법칙",
    "category": "side_story",
    "order": 8
  },
  "char_131_flameb": {
    "eventId": "act4d0",
    "eventName": "전장의 비화",
    "category": "mini_event",
    "order": 7
  },
  "char_190_clour": {
    "eventId": "act4d0",
    "eventName": "전장의 비화",
    "category": "mini_event",
    "order": 7
  },
  "char_248_mgllan": {
    "eventId": "act4d0",
    "eventName": "전장의 비화",
    "category": "mini_event",
    "order": 7
  },
  "char_279_excu": {
    "eventId": "act4d0",
    "eventName": "전장의 비화",
    "category": "mini_event",
    "order": 7
  },
  "char_260_durnar": {
    "eventId": "act1sign",
    "eventName": "출석 이벤트 & 구매센터 업데이트",
    "category": "other",
    "order": 6
  },
  "char_275_breeze": {
    "eventId": "act1sign",
    "eventName": "출석 이벤트 & 구매센터 업데이트",
    "category": "other",
    "order": 6
  },
  "char_355_ethan": {
    "eventId": "act1sign",
    "eventName": "출석 이벤트 & 구매센터 업데이트",
    "category": "other",
    "order": 6
  },
  "char_151_myrtle": {
    "eventId": "act3d1",
    "eventName": "파란 불꽃의 마음 Part.2",
    "category": "side_story",
    "order": 5
  },
  "char_188_helage": {
    "eventId": "act3d1",
    "eventName": "파란 불꽃의 마음 Part.2",
    "category": "side_story",
    "order": 5
  },
  "char_274_astesi": {
    "eventId": "act3d1",
    "eventName": "파란 불꽃의 마음 Part.2",
    "category": "side_story",
    "order": 5
  },
  "char_298_susuro": {
    "eventId": "act3d0",
    "eventName": "파란 불꽃의 마음",
    "category": "side_story",
    "order": 4
  },
  "char_326_glacus": {
    "eventId": "act3d0",
    "eventName": "파란 불꽃의 마음",
    "category": "side_story",
    "order": 4
  },
  "char_340_shwaz": {
    "eventId": "act3d0",
    "eventName": "파란 불꽃의 마음",
    "category": "side_story",
    "order": 4
  },
  "char_348_ceylon": {
    "eventId": "act3d0",
    "eventName": "파란 불꽃의 마음",
    "category": "side_story",
    "order": 4
  },
  "char_010_chen": {
    "eventId": "dis_main_5",
    "eventName": "표적치료",
    "category": "main_story",
    "order": 3
  },
  "char_253_greyy": {
    "eventId": "dis_main_5",
    "eventName": "표적치료",
    "category": "main_story",
    "order": 3
  },
  "char_281_popka": {
    "eventId": "dis_main_5",
    "eventName": "표적치료",
    "category": "main_story",
    "order": 3
  },
  "char_284_spot": {
    "eventId": "dis_main_5",
    "eventName": "표적치료",
    "category": "main_story",
    "order": 3
  },
  "char_308_swire": {
    "eventId": "dis_main_5",
    "eventName": "표적치료",
    "category": "main_story",
    "order": 3
  },
  "char_137_brownb": {
    "eventId": "1stact",
    "eventName": "기병과 사냥꾼",
    "category": "side_story",
    "order": 2
  },
  "char_164_nightm": {
    "eventId": "1stact",
    "eventName": "기병과 사냥꾼",
    "category": "side_story",
    "order": 2
  },
  "char_220_grani": {
    "eventId": "1stact",
    "eventName": "기병과 사냥꾼",
    "category": "side_story",
    "order": 2
  },
  "char_263_skadi": {
    "eventId": "1stact",
    "eventName": "기병과 사냥꾼",
    "category": "side_story",
    "order": 2
  },
  "char_282_catap": {
    "eventId": "1stact",
    "eventName": "기병과 사냥꾼",
    "category": "side_story",
    "order": 2
  },
  "char_283_midn": {
    "eventId": "1stact",
    "eventName": "기병과 사냥꾼",
    "category": "side_story",
    "order": 2
  },
  "char_002_amiya": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_009_12fce": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_101_sora": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_102_texas": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_103_angel": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_106_franka": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_107_liskam": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_108_silent": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_109_fmout": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_110_deepcl": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_112_siege": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_115_headbr": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_117_myrrh": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_118_yuki": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_120_hibisc": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_121_lava": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_122_beagle": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_123_fang": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_124_kroos": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_126_shotst": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_127_estell": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_128_plosis": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_129_bluep": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_130_doberm": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_134_ifrit": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_136_hsguma": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_140_whitew": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_141_nights": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_143_ghost": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_144_red": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_145_prove": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_147_shining": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_148_nearl": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_149_scave": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_150_snakek": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_155_tiger": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_158_milu": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_163_hpsts": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_166_skfire": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_171_bldsk": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_172_svrash": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_173_slchan": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_174_slbell": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_179_cgbird": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_180_amgoat": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_181_flower": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_183_skgoat": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_185_frncat": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_187_ccheal": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_192_falco": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_193_frostl": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_195_glassb": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_196_sunbr": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_198_blackd": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_199_yak": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_201_moeshd": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_202_demkni": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_204_platnm": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_208_melan": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_209_ardign": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_210_stward": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_211_adnach": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_212_ansel": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_215_mantic": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_219_meteo": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_230_savage": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_235_jesica": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_236_rope": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_237_gravel": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_240_wyvern": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_241_panda": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_242_otter": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_277_sqrrel": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_278_orchid": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_285_medic2": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_286_cast3": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_289_gyuki": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_290_vigna": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_291_aglina": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_500_noirc": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_501_durin": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_502_nblade": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  },
  "char_503_rang": {
    "eventId": "server_open",
    "eventName": "서버 오픈",
    "category": "server_open",
    "order": 1
  }
};

/**
 * manual/operator-release-events.ts에 없어서 server_open으로 자동 분류된
 * 글로벌 오퍼레이터 목록입니다.
 */
export const serverOpenOperatorList: GeneratedReleaseOperatorInfo[] = [
  {
    "charId": "char_009_12fce",
    "name": "12F",
    "profession": "CASTER",
    "server": "global"
  },
  {
    "charId": "char_187_ccheal",
    "name": "가비알",
    "profession": "MEDIC",
    "server": "global"
  },
  {
    "charId": "char_196_sunbr",
    "name": "굼",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_237_gravel",
    "name": "그라벨",
    "profession": "SPECIAL",
    "server": "global"
  },
  {
    "charId": "char_109_fmout",
    "name": "기타노",
    "profession": "CASTER",
    "server": "global"
  },
  {
    "charId": "char_179_cgbird",
    "name": "나이팅게일",
    "profession": "MEDIC",
    "server": "global"
  },
  {
    "charId": "char_500_noirc",
    "name": "느와르 코르네",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_148_nearl",
    "name": "니어",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_130_doberm",
    "name": "도베르만",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_501_durin",
    "name": "두린",
    "profession": "CASTER",
    "server": "global"
  },
  {
    "charId": "char_110_deepcl",
    "name": "딥컬러",
    "profession": "SUPPORT",
    "server": "global"
  },
  {
    "charId": "char_121_lava",
    "name": "라바",
    "profession": "CASTER",
    "server": "global"
  },
  {
    "charId": "char_140_whitew",
    "name": "라플란드",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_144_red",
    "name": "레드",
    "profession": "SPECIAL",
    "server": "global"
  },
  {
    "charId": "char_503_rang",
    "name": "레인저",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_236_rope",
    "name": "로프",
    "profession": "SPECIAL",
    "server": "global"
  },
  {
    "charId": "char_107_liskam",
    "name": "리스캄",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_199_yak",
    "name": "마터호른",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_289_gyuki",
    "name": "마토이마루",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_215_mantic",
    "name": "맨티코어",
    "profession": "SPECIAL",
    "server": "global"
  },
  {
    "charId": "char_242_otter",
    "name": "메이어",
    "profession": "SUPPORT",
    "server": "global"
  },
  {
    "charId": "char_126_shotst",
    "name": "메테오",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_219_meteo",
    "name": "메테오라이트",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_208_melan",
    "name": "멜란사",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_185_frncat",
    "name": "무스",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_117_myrrh",
    "name": "미르",
    "profession": "MEDIC",
    "server": "global"
  },
  {
    "charId": "char_240_wyvern",
    "name": "바닐라",
    "profession": "PIONEER",
    "server": "global"
  },
  {
    "charId": "char_163_hpsts",
    "name": "벌컨",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_129_bluep",
    "name": "블루포이즌",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_290_vigna",
    "name": "비그나",
    "profession": "PIONEER",
    "server": "global"
  },
  {
    "charId": "char_122_beagle",
    "name": "비글",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_202_demkni",
    "name": "사리아",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_108_silent",
    "name": "사일런스",
    "profession": "MEDIC",
    "server": "global"
  },
  {
    "charId": "char_230_savage",
    "name": "새비지",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_147_shining",
    "name": "샤이닝",
    "profession": "MEDIC",
    "server": "global"
  },
  {
    "charId": "char_101_sora",
    "name": "소라",
    "profession": "SUPPORT",
    "server": "global"
  },
  {
    "charId": "char_277_sqrrel",
    "name": "쇼",
    "profession": "SPECIAL",
    "server": "global"
  },
  {
    "charId": "char_166_skfire",
    "name": "스카이파이어",
    "profession": "CASTER",
    "server": "global"
  },
  {
    "charId": "char_149_scave",
    "name": "스캐빈저",
    "profession": "PIONEER",
    "server": "global"
  },
  {
    "charId": "char_210_stward",
    "name": "스튜어드",
    "profession": "CASTER",
    "server": "global"
  },
  {
    "charId": "char_143_ghost",
    "name": "스펙터",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_118_yuki",
    "name": "시라유키",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_112_siege",
    "name": "시즈",
    "profession": "PIONEER",
    "server": "global"
  },
  {
    "charId": "char_172_svrash",
    "name": "실버애쉬",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_211_adnach",
    "name": "아드나키엘",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_002_amiya",
    "name": "아미야",
    "profession": "CASTER",
    "server": "global"
  },
  {
    "charId": "char_212_ansel",
    "name": "안셀",
    "profession": "MEDIC",
    "server": "global"
  },
  {
    "charId": "char_291_aglina",
    "name": "안젤리나",
    "profession": "SUPPORT",
    "server": "global"
  },
  {
    "charId": "char_502_nblade",
    "name": "야토",
    "profession": "PIONEER",
    "server": "global"
  },
  {
    "charId": "char_183_skgoat",
    "name": "어스스피릿",
    "profession": "SUPPORT",
    "server": "global"
  },
  {
    "charId": "char_127_estell",
    "name": "에스텔",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_180_amgoat",
    "name": "에이야퍄들라",
    "profession": "CASTER",
    "server": "global"
  },
  {
    "charId": "char_241_panda",
    "name": "에프이터",
    "profession": "SPECIAL",
    "server": "global"
  },
  {
    "charId": "char_103_angel",
    "name": "엑시아",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_278_orchid",
    "name": "오키드",
    "profession": "SUPPORT",
    "server": "global"
  },
  {
    "charId": "char_171_bldsk",
    "name": "와파린",
    "profession": "MEDIC",
    "server": "global"
  },
  {
    "charId": "char_195_glassb",
    "name": "이스티나",
    "profession": "SUPPORT",
    "server": "global"
  },
  {
    "charId": "char_134_ifrit",
    "name": "이프리트",
    "profession": "CASTER",
    "server": "global"
  },
  {
    "charId": "char_155_tiger",
    "name": "인드라",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_235_jesica",
    "name": "제시카",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_115_headbr",
    "name": "지마",
    "profession": "PIONEER",
    "server": "global"
  },
  {
    "charId": "char_209_ardign",
    "name": "카디건",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_198_blackd",
    "name": "쿠리어",
    "profession": "PIONEER",
    "server": "global"
  },
  {
    "charId": "char_150_snakek",
    "name": "쿠오라",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_124_kroos",
    "name": "크루스",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_201_moeshd",
    "name": "크루아상",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_173_slchan",
    "name": "클리프하트",
    "profession": "SPECIAL",
    "server": "global"
  },
  {
    "charId": "char_102_texas",
    "name": "텍사스",
    "profession": "PIONEER",
    "server": "global"
  },
  {
    "charId": "char_158_milu",
    "name": "파이어워치",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_123_fang",
    "name": "팽",
    "profession": "PIONEER",
    "server": "global"
  },
  {
    "charId": "char_181_flower",
    "name": "퍼퓨머",
    "profession": "MEDIC",
    "server": "global"
  },
  {
    "charId": "char_174_slbell",
    "name": "프라마닉스",
    "profession": "SUPPORT",
    "server": "global"
  },
  {
    "charId": "char_106_franka",
    "name": "프란카",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_145_prove",
    "name": "프로방스",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_193_frostl",
    "name": "프로스트리프",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_128_plosis",
    "name": "프틸롭시스",
    "profession": "MEDIC",
    "server": "global"
  },
  {
    "charId": "char_204_platnm",
    "name": "플래티넘",
    "profession": "SNIPER",
    "server": "global"
  },
  {
    "charId": "char_192_falco",
    "name": "플룸",
    "profession": "PIONEER",
    "server": "global"
  },
  {
    "charId": "char_141_nights",
    "name": "헤이즈",
    "profession": "CASTER",
    "server": "global"
  },
  {
    "charId": "char_136_hsguma",
    "name": "호시구마",
    "profession": "TANK",
    "server": "global"
  },
  {
    "charId": "char_120_hibisc",
    "name": "히비스커스",
    "profession": "MEDIC",
    "server": "global"
  },
  {
    "charId": "char_286_cast3",
    "name": "Castle-3",
    "profession": "WARRIOR",
    "server": "global"
  },
  {
    "charId": "char_285_medic2",
    "name": "Lancet-2",
    "profession": "MEDIC",
    "server": "global"
  }
];

/**
 * CN character_table에는 있지만 manual/operator-release-events.ts에서
 * 출시 이벤트를 찾지 못한 future 오퍼레이터 목록입니다.
 *
 * 가능하면 manual/operator-release-events.ts에 출시 이벤트를 추가해 주세요.
 */
export const unmappedFutureOperatorList: GeneratedReleaseOperatorInfo[] = [];
