# Arknights-Toolbox
## 프론트엔드 스택
- React 19 RC, Next.js 15, TypeScript, TailwindCSS 3+, Jotai

## 초기 설정
```bash
# 저장소 클론
git clone https://github.com/nadering/arknights-toolbox

# 패키지 설치
npm install

# 개발 환경으로 실행
npm run dev
```
- GitHub 저장소 클론 후 `src/data/operator`에서 클래스 별 오퍼레이터 데이터를, `src/data/material`에서 재료 종류를 확인할 수 있습니다.

## 재료
- `material.ts` 재료 클래스
- `upgradel.ts` 정예화 및 스킬 업그레이드 재료
- `battle-record.ts` 작전개론
- `exp.ts` 경험치 (작전개론과 별개)
- `lmd.ts` 용문폐
- `skill-summary.ts` 스킬개론
- `module.ts` 모듈 (모듈 데이터 칩, 데이터 메모리, 데이터 리더기)
- `memory-chip.ts` 메모리 칩

## 오퍼레이터 및 오퍼레이터 추가 방법
- 모든 오퍼레이터는 [JavaScript의 Object 타입](https://ko.javascript.info/object)으로 만들어져 있습니다.
- 원하는 클래스의 파일에서 하단의 작성 예시를 참고해 오퍼레이터를 추가한 후 (레어도 및 ID 내림차순을 추천), 파일 최하단의 오퍼레이터 리스트 중 추가한 오퍼레이터의 레어도와 일치하는 곳에 추가하면 됩니다.
- 데이터를 추가 후, GitHub 저장소에 Pull Request 해주시면 확인 후 반영하겠습니다.

## 오퍼레이터 데이터 작성 예시
```TypeScript
// src/data/operator/guard.ts

/** 스카디 */
export const Skadi: Guard = {
  // 오퍼레이터 ID (https://hx3n.github.io/gachaplanner/oper 링크의 ID를 사용)
  id: 89, 

  // 오퍼레이터 한글 이름
  name: "스카디",

  // 오퍼레이터 이미지 이름, 영어 소문자를 사용하며 공백은 "-" (hyphen)으로 대체
  // 예를 들어 Lappland the Decadenza = lappland-the-decadenza
  imageFilename: "skadi", 

  // 포지션
  class: "Guard", 

  // 세부 직군 (클래스 별 오퍼레이터 파일 최상단에서 확인 가능)
  branch: "Dreadnought", 

  // 레어도
  rarity: 6, 

  // 정예화 재료
  eliteMaterials: { 
    // 0정예화 재료는 존재하지 않음
    0: [], 
    // 1정예화 재료
    // 이하 모든 재료는 { material: (Material 타입의 객체), count: (필요 수량) } 형태로 작성
    1: [ 
      { material: guardChip!, count: 5 },
      { material: device, count: 5 },
      { material: polyester, count: 5 },
      { material: LMD, count: 30000 },
    ],
    // 2정예화 재료
    2: [ 
      { material: guardDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: orirockConcentration, count: 9 },
      { material: LMD, count: 180000 },
    ],
  },

  // 스킬 목록
  skillList: ["신속공격γ", "파도타기", "파도의 만가"], 

  // 스킬 업그레이드 선호 스킬 목록 (자동으로 10레벨로 설정됨)
  preferSkillList: ["파도타기", "파도의 만가"], 

  // 스킬 업그레이드 재료
  skillUpgradeMaterials: {
    // 2레벨 ~ 7레벨 업그레이드 재료
    common: { 
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: damagedDivice, count: 4 },
        { material: ester, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: orirockCube, count: 7 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: sugar, count: 4 },
        { material: polyketon, count: 4 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: aketon, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: integratedDevice, count: 3 },
        { material: sugarPack, count: 5 },
      ],
    },
    // 1스킬 8레벨 ~ 10레벨 업그레이드 재료 (스킬 이름으로 작성)
    신속공격γ: { 
      8: [
        { material: skillSummary3, count: 6 },
        { material: whiteHorseKohl, count: 4 },
        { material: aketon, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: RMA7024, count: 4 },
        { material: manganeseTrihydrate, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: orirockConcentration, count: 7 },
      ],
    },
    // 2스킬 8레벨 ~ 10레벨 업그레이드 재료
    파도타기: { 
      8: [
        { material: skillSummary3, count: 6 },
        { material: manganeseTrihydrate, count: 4 },
        { material: integratedDevice, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: grindstonePentahydrate, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: orirockConcentration, count: 6 },
      ],
    },
    // 3스킬 8레벨 ~ 10레벨 업그레이드 재료
    "파도의 만가": {
      8: [
        { material: skillSummary3, count: 6 },
        { material: grindstonePentahydrate, count: 4 },
        { material: loxicKohl, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: sugarLump, count: 4 },
        { material: RMA7024, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: polyesterLump, count: 5 },
      ],
    },
  },

  // 모듈 목록
  moduleList: [ 
    { type: "DRE-X", name: "지난 날의 불완전한 꿈" },
    { type: "DRE-Y", name: "축축한 대검 케이스" },
  ],

  // 선호 모듈 목록 (자동으로 지정된 레벨로 설정됨)
  preferModuleList: [ 
    {
      module: { type: "DRE-X", name: "지난 날의 불완전한 꿈" },
      level: 3,
    },
    {
      module: { type: "DRE-Y", name: "축축한 대검 케이스" },
      level: 3,
    },
  ],

  // 모듈 재료
  moduleMaterials: { 
    // 모듈 종류 (DRE-X)
    "DRE-X": { 
      // 모듈 업그레이드 1레벨 재료
      1: [ 
        { material: moduleDataBlock, count: 4 },
        { material: D32Steel, count: 2 },
        { material: LMD, count: 80000 },
      ],
      // 모듈 업그레이드 2레벨 재료
      2: [ 
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: bipolarNanoflake, count: 3 },
        { material: LMD, count: 100000 },
      ],
      // 모듈 업그레이드 3레벨 재료
      3: [ 
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: crystallineElectronicUnit, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
    // 이하 생략
    "DRE-Y": { 
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: bipolarNanoflake, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: D32Steel, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: crystallineElectronicUnit, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

// 레어도에 맞게 오퍼레이터를 추가
const sixStarGuardList: Guard[] = [ ..., Skadi ];
// ...
```
