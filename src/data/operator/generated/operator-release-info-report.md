# Operator Release Info Report

> manual/operator-release-events.ts와 최신 character_table.json을 기반으로 생성한 출시 정보 보고서입니다.

- Manual release events: 110
- Total operators: 421
  - Global operators: 405
  - Future operators: 16
- Mapped operators: 421
- Unmapped future operators: 0
- Unknown manual operator mappings: 0
- Empty release events: 4
- Excluded operators: 58
- Server open operators: 83
- Duplicate operator mappings: 0
- Manual-included filtered operators: 1

## Order Rule

- operator-release-events.ts는 최신 이벤트 → 오래된 이벤트 순서로 유지합니다.
- order 1 = 서버 오픈
- 가장 오래된 manual 이벤트 = order 2
- 최신 manual 이벤트일수록 더 큰 order
- 출시 이벤트 미지정 future 오퍼레이터는 manual 이벤트보다 큰 order
- 사용자에게 보여주는 순서는 order 내림차순입니다.

## Unmapped Future Operators

> CN character_table에는 있지만 manual/operator-release-events.ts에서 출시 이벤트를 찾지 못한 future 오퍼레이터입니다. 가능하면 manual 파일에 출시 이벤트를 추가해 주세요.

- 없음

## Unknown Manual Operator Mappings

> manual/operator-release-events.ts에는 있지만, raw global/CN character_table 또는 필터 포함 목록에서 찾지 못한 charId입니다.
> 오타이거나, 현재 참조 중인 game data 버전에 아직 없는 오퍼레이터일 가능성이 있습니다.

- 없음

## Duplicate Operator Mappings

> 같은 charId가 여러 이벤트에 들어간 경우입니다. 첫 번째 매핑만 generated map에 반영됩니다.

- 없음

## Empty Release Events

> operatorIds가 비어 있는 이벤트입니다. 실제 출시 오퍼레이터가 있다면 manual 파일에서 채워주세요.

- #62 `act1sandbox` / 생존 연산: 모래 속의 불 / side_story
- #53 `act11mini` / 투 비 컨티뉴 / mini_event
- #37 `act8mini` / 비질로 / mini_event
- #24 `act12d6` / 케오베의 버섯 안개 미궁 / roguelike

## Excluded Operators

> 구조 기반 필터 또는 manual/operator-exclusions.ts에 의해 제외된 캐릭터입니다.
> manual/operator-release-events.ts에 들어간 charId는 raw character_table에 존재하는 경우 이 목록에서 제외하고 releaseInfo 생성 대상에 포함합니다.

- [cn] `char_504_rguard` / 预备干员-近战 / PIONEER / TIER_3
  - reasons: common skill level-up costs are missing
- [cn] `char_505_rcast` / 预备干员-术师 / CASTER / TIER_3
  - reasons: common skill level-up costs are missing
- [cn] `char_506_rmedic` / 预备干员-后勤 / MEDIC / TIER_3
  - reasons: common skill level-up costs are missing
- [cn] `char_507_rsnipe` / 预备干员-狙击 / SNIPER / TIER_3
  - reasons: common skill level-up costs are missing
- [cn] `char_508_aguard` / Sharp / WARRIOR / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_509_acast` / Pith / CASTER / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_510_amedic` / Touch / MEDIC / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_511_asnipe` / Stormeye / SNIPER / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_512_aprot` / 暮落 / TANK / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_513_apionr` / 郁金香 / PIONEER / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_514_rdfend` / 预备干员-重装 / TANK / TIER_3
  - reasons: common skill level-up costs are missing
- [cn] `char_600_cpione` / 预备干员-先锋 / PIONEER / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_601_cguard` / 预备干员-近卫 / WARRIOR / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_602_cdfend` / 预备干员-重装 / TANK / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_603_csnipe` / 预备干员-狙击 / SNIPER / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_604_ccast` / 预备干员-术师 / CASTER / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_605_cmedic` / 预备干员-医疗 / MEDIC / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_606_csuppo` / 预备干员-辅助 / SUPPORT / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_607_cspec` / 预备干员-特种 / SPECIAL / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_608_acpion` / 郁金香 / PIONEER / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_609_acguad` / Sharp / WARRIOR / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_610_acfend` / Mechanist / TANK / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_611_acnipe` / Stormeye / SNIPER / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_612_accast` / Pith / CASTER / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_613_acmedc` / Touch / MEDIC / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_614_acsupo` / Raidian / SUPPORT / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_615_acspec` / Misery / SPECIAL / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_616_pithst` / 盟约·辅助干员 / SUPPORT / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [cn] `char_617_sharp2` / 领主·Sharp / WARRIOR / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_504_rguard` / 예비 인원 - 근거리 / PIONEER / TIER_3
  - reasons: common skill level-up costs are missing
- [global] `char_505_rcast` / 예비 인원 - 캐스터 / CASTER / TIER_3
  - reasons: common skill level-up costs are missing
- [global] `char_506_rmedic` / 예비 인원 - 지원 / MEDIC / TIER_3
  - reasons: common skill level-up costs are missing
- [global] `char_507_rsnipe` / 예비 인원 - 스나이퍼 / SNIPER / TIER_3
  - reasons: common skill level-up costs are missing
- [global] `char_508_aguard` / 샤프 / WARRIOR / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_509_acast` / 피스 / CASTER / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_510_amedic` / 터치 / MEDIC / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_511_asnipe` / 스톰아이 / SNIPER / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_512_aprot` / 샬렘 / TANK / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_513_apionr` / 튤립 / PIONEER / TIER_5
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_514_rdfend` / 예비 인원 - 디펜더 / TANK / TIER_3
  - reasons: common skill level-up costs are missing
- [global] `char_600_cpione` / 예비 오퍼레이터 - 뱅가드 / PIONEER / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_601_cguard` / 예비 오퍼레이터 - 가드 / WARRIOR / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_602_cdfend` / 예비 인원 - 디펜더 / TANK / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_603_csnipe` / 예비 인원 - 스나이퍼 / SNIPER / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_604_ccast` / 예비 인원 - 캐스터 / CASTER / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_605_cmedic` / 예비 오퍼레이터 - 메딕 / MEDIC / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_606_csuppo` / 예비 오퍼레이터 - 서포터 / SUPPORT / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_607_cspec` / 예비 오퍼레이터 - 스페셜리스트 / SPECIAL / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_608_acpion` / 튤립 / PIONEER / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_609_acguad` / 샤프 / WARRIOR / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_610_acfend` / 메커니스트 / TANK / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_611_acnipe` / 스톰아이 / SNIPER / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_612_accast` / 피스 / CASTER / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_613_acmedc` / 터치 / MEDIC / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_614_acsupo` / 라이디언 / SUPPORT / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_615_acspec` / 미저리 / SPECIAL / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_616_pithst` / 맹약·서포터 오퍼레이터 / SUPPORT / TIER_4
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing
- [global] `char_617_sharp2` / 로드·샤프 / WARRIOR / TIER_6
  - reasons: elite phase 1 evolveCost is missing or empty, elite phase 2 evolveCost is missing or empty, common skill level-up costs are missing, skill mastery costs are missing

## Server Open Operators

> manual/operator-release-events.ts에 없어서 server_open으로 자동 분류된 글로벌 오퍼레이터입니다.

- `char_009_12fce` / 12F / CASTER / global
- `char_187_ccheal` / 가비알 / MEDIC / global
- `char_196_sunbr` / 굼 / TANK / global
- `char_237_gravel` / 그라벨 / SPECIAL / global
- `char_109_fmout` / 기타노 / CASTER / global
- `char_179_cgbird` / 나이팅게일 / MEDIC / global
- `char_500_noirc` / 느와르 코르네 / TANK / global
- `char_148_nearl` / 니어 / TANK / global
- `char_130_doberm` / 도베르만 / WARRIOR / global
- `char_501_durin` / 두린 / CASTER / global
- `char_110_deepcl` / 딥컬러 / SUPPORT / global
- `char_121_lava` / 라바 / CASTER / global
- `char_140_whitew` / 라플란드 / WARRIOR / global
- `char_144_red` / 레드 / SPECIAL / global
- `char_503_rang` / 레인저 / SNIPER / global
- `char_236_rope` / 로프 / SPECIAL / global
- `char_107_liskam` / 리스캄 / TANK / global
- `char_199_yak` / 마터호른 / TANK / global
- `char_289_gyuki` / 마토이마루 / WARRIOR / global
- `char_215_mantic` / 맨티코어 / SPECIAL / global
- `char_242_otter` / 메이어 / SUPPORT / global
- `char_126_shotst` / 메테오 / SNIPER / global
- `char_219_meteo` / 메테오라이트 / SNIPER / global
- `char_208_melan` / 멜란사 / WARRIOR / global
- `char_185_frncat` / 무스 / WARRIOR / global
- `char_117_myrrh` / 미르 / MEDIC / global
- `char_240_wyvern` / 바닐라 / PIONEER / global
- `char_163_hpsts` / 벌컨 / TANK / global
- `char_129_bluep` / 블루포이즌 / SNIPER / global
- `char_290_vigna` / 비그나 / PIONEER / global
- `char_122_beagle` / 비글 / TANK / global
- `char_202_demkni` / 사리아 / TANK / global
- `char_108_silent` / 사일런스 / MEDIC / global
- `char_230_savage` / 새비지 / WARRIOR / global
- `char_147_shining` / 샤이닝 / MEDIC / global
- `char_101_sora` / 소라 / SUPPORT / global
- `char_277_sqrrel` / 쇼 / SPECIAL / global
- `char_166_skfire` / 스카이파이어 / CASTER / global
- `char_149_scave` / 스캐빈저 / PIONEER / global
- `char_210_stward` / 스튜어드 / CASTER / global
- `char_143_ghost` / 스펙터 / WARRIOR / global
- `char_118_yuki` / 시라유키 / SNIPER / global
- `char_112_siege` / 시즈 / PIONEER / global
- `char_172_svrash` / 실버애쉬 / WARRIOR / global
- `char_211_adnach` / 아드나키엘 / SNIPER / global
- `char_002_amiya` / 아미야 / CASTER / global
- `char_212_ansel` / 안셀 / MEDIC / global
- `char_291_aglina` / 안젤리나 / SUPPORT / global
- `char_502_nblade` / 야토 / PIONEER / global
- `char_183_skgoat` / 어스스피릿 / SUPPORT / global
- `char_127_estell` / 에스텔 / WARRIOR / global
- `char_180_amgoat` / 에이야퍄들라 / CASTER / global
- `char_241_panda` / 에프이터 / SPECIAL / global
- `char_103_angel` / 엑시아 / SNIPER / global
- `char_278_orchid` / 오키드 / SUPPORT / global
- `char_171_bldsk` / 와파린 / MEDIC / global
- `char_195_glassb` / 이스티나 / SUPPORT / global
- `char_134_ifrit` / 이프리트 / CASTER / global
- `char_155_tiger` / 인드라 / WARRIOR / global
- `char_235_jesica` / 제시카 / SNIPER / global
- `char_115_headbr` / 지마 / PIONEER / global
- `char_209_ardign` / 카디건 / TANK / global
- `char_198_blackd` / 쿠리어 / PIONEER / global
- `char_150_snakek` / 쿠오라 / TANK / global
- `char_124_kroos` / 크루스 / SNIPER / global
- `char_201_moeshd` / 크루아상 / TANK / global
- `char_173_slchan` / 클리프하트 / SPECIAL / global
- `char_102_texas` / 텍사스 / PIONEER / global
- `char_158_milu` / 파이어워치 / SNIPER / global
- `char_123_fang` / 팽 / PIONEER / global
- `char_181_flower` / 퍼퓨머 / MEDIC / global
- `char_174_slbell` / 프라마닉스 / SUPPORT / global
- `char_106_franka` / 프란카 / WARRIOR / global
- `char_145_prove` / 프로방스 / SNIPER / global
- `char_193_frostl` / 프로스트리프 / WARRIOR / global
- `char_128_plosis` / 프틸롭시스 / MEDIC / global
- `char_204_platnm` / 플래티넘 / SNIPER / global
- `char_192_falco` / 플룸 / PIONEER / global
- `char_141_nights` / 헤이즈 / CASTER / global
- `char_136_hsguma` / 호시구마 / TANK / global
- `char_120_hibisc` / 히비스커스 / MEDIC / global
- `char_286_cast3` / Castle-3 / WARRIOR / global
- `char_285_medic2` / Lancet-2 / MEDIC / global

