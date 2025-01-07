import Operator from "./operator";
import {
  aggregateCyclicene,
  aketon,
  bipolarNanoflake,
  coagulatingGel,
  compoundCuttingFluid,
  crystallineCircuit,
  crystallineComponent,
  crystallineElectronicUnit,
  cuttingFluidSolution,
  cyclicenePrefab,
  D32Steel,
  damagedDevice,
  dataSupplementInstrument,
  dataSupplementStick,
  device,
  diketon,
  ester,
  fuscousFiber,
  grindstone,
  grindstonePentahydrate,
  guardChip,
  guardDualchip,
  incandescentAlloy,
  incandescentAlloyBlock,
  integratedDevice,
  ketonColloid,
  LMD,
  loxicKohl,
  manganeseOre,
  manganeseTrihydrate,
  moduleDataBlock,
  nucleicCrystalSinter,
  optimizedDevice,
  orirock,
  orirockCluster,
  orirockConcentration,
  orirockCube,
  oriron,
  orironBlock,
  orironCluster,
  orironShard,
  polyester,
  polyesterLump,
  polyesterPack,
  polyketon,
  polymerizationPreparation,
  polymerizedGel,
  refinedSolvent,
  RMA7012,
  RMA7024,
  semiSyntheticSolvent,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  solidifiedFiberBoard,
  sugar,
  sugarLump,
  sugarPack,
  sugarSubstitute,
  transmutedSalt,
  transmutedSaltAgglomerate,
  whiteHorseKohl,
} from "@/data/material";

// 가드

/** 가드 세부 직군 리스트 */
export const GuardBranchList = [
  "Dreadnought", // 드레드노트
  "Centurion", // 공격수
  "Lord", // 로드
  "Arts-Fighter", // 아츠 파이터
  "Instructor", // 교관
  "Fighter", // 파이터
  "Swordmaster", // 소드마스터
  "Soloblade", // 솔로블레이드
  "Liberator", // 해방자
  "Reaper", // 리퍼
  "Crusher", // 대검사
  "Earthshaker", // 어스셰이커
] as const;

/** 가드 세부 직군 */
export type GuardBranch = (typeof GuardBranchList)[number];

/** 가드 오퍼레이터 */
export interface Guard extends Operator {
  /** 세부 직군 */
  branch?: GuardBranch;
}

// 6성
/** 비나 빅토리아 */
export const VinaVictoria: Guard = {
  id: 345,
  name: "비나 빅토리아",
  imageFilename: "vina-victoria",
  class: "Guard",
  branch: "Arts-Fighter",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: orirockCube, count: 12 },
      { material: polyester, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 4 },
      { material: orirockConcentration, count: 2 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["다시금 내리쬐는 햇빛", "고향으로의 귀환", "나의 이름으로"],
  preferSkillList: ["나의 이름으로"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: ester, count: 6 },
        { material: orironShard, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: oriron, count: 4 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: polyketon, count: 4 },
        { material: orirockCube, count: 5 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: semiSyntheticSolvent, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: sugarPack, count: 5 },
        { material: fuscousFiber, count: 4 },
      ],
    },
    "다시금 내리쬐는 햇빛": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orirockConcentration, count: 4 },
        { material: crystallineComponent, count: 9 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: RMA7024, count: 4 },
        { material: cyclicenePrefab, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: orironBlock, count: 1 },
      ],
    },
    "고향으로의 귀환": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: aketon, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
        { material: refinedSolvent, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: cuttingFluidSolution, count: 6 },
      ],
    },
    "나의 이름으로": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: ketonColloid, count: 4 },
        { material: coagulatingGel, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: manganeseTrihydrate, count: 4 },
        { material: optimizedDevice, count: 5 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: solidifiedFiberBoard, count: 6 },
      ],
    },
  },
  moduleList: [],
  moduleMaterials: null,
};

/** 페페 */
export const Pepe: Guard = {
  id: 338,
  name: "페페",
  imageFilename: "pepe",
  class: "Guard",
  branch: "Earthshaker",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: oriron, count: 7 },
      { material: polyester, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: solidifiedFiberBoard, count: 5 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["도장 쾅!", "혼돈을 다스리는 망치", "시간의 요동"],
  preferSkillList: ["시간의 요동"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: damagedDevice, count: 4 },
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
        { material: polyesterPack, count: 7 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: transmutedSalt, count: 5 },
        { material: loxicKohl, count: 2 },
      ],
    },
    "도장 쾅!": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: loxicKohl, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
        { material: refinedSolvent, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: cuttingFluidSolution, count: 1 },
      ],
    },
    "혼돈을 다스리는 망치": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: manganeseTrihydrate, count: 4 },
        { material: fuscousFiber, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: solidifiedFiberBoard, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: polymerizedGel, count: 6 },
      ],
    },
    "시간의 요동": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orironBlock, count: 4 },
        { material: grindstone, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: refinedSolvent, count: 4 },
        { material: orirockConcentration, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: RMA7024, count: 6 },
      ],
    },
  },
  moduleList: [],
  moduleMaterials: null,
};

/** 울피아누스 */
export const Ulpianus: Guard = {
  id: 331,
  name: "울피아누스",
  imageFilename: "ulpianus",
  class: "Guard",
  branch: "Crusher",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: sugar, count: 10 },
      { material: orirockCube, count: 6 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 4 },
      { material: cuttingFluidSolution, count: 2 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["이뤄져야 할 만남", "지켜야 할 선", "개척해야 할 길"],
  preferSkillList: ["지켜야 할 선", "개척해야 할 길"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: orironShard, count: 5 },
        { material: sugarSubstitute, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: polyketon, count: 4 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: device, count: 3 },
        { material: polyester, count: 3 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: grindstone, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloy, count: 5 },
        { material: compoundCuttingFluid, count: 3 },
      ],
    },
    "이뤄져야 할 만남": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: polymerizedGel, count: 4 },
        { material: orirockCluster, count: 11 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: grindstonePentahydrate, count: 4 },
        { material: manganeseTrihydrate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: transmutedSaltAgglomerate, count: 6 },
      ],
    },
    "지켜야 할 선": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: RMA7024, count: 4 },
        { material: polyesterPack, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: orironBlock, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: refinedSolvent, count: 2 },
      ],
    },
    "개척해야 할 길": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: ketonColloid, count: 4 },
        { material: semiSyntheticSolvent, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: manganeseTrihydrate, count: 4 },
        { material: optimizedDevice, count: 5 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: solidifiedFiberBoard, count: 6 },
      ],
    },
  },
  moduleList: [{ type: "CRU-X", name: "울피아누스의 옷장" }],
  preferModuleList: [
    {
      module: { type: "CRU-X", name: "울피아누스의 옷장" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "CRU-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: D32Steel, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: bipolarNanoflake, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: nucleicCrystalSinter, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 좌락 */
export const ZuoLe: Guard = {
  id: 313,
  name: "좌락",
  imageFilename: "zuo-le",
  class: "Guard",
  branch: "Soloblade",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: polyketon, count: 7 },
      { material: device, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: polymerizationPreparation, count: 4 },
      { material: whiteHorseKohl, count: 8 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["파로", "위험 감수", "염국 보우"],
  preferSkillList: ["위험 감수", "염국 보우"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: damagedDevice, count: 4 },
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
        { material: transmutedSalt, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: fuscousFiber, count: 4 },
        { material: aggregateCyclicene, count: 3 },
      ],
    },
    파로: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: solidifiedFiberBoard, count: 4 },
        { material: RMA7012, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
        { material: cuttingFluidSolution, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: RMA7024, count: 5 },
      ],
    },
    "위험 감수": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: orirockCluster, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: optimizedDevice, count: 5 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: cyclicenePrefab, count: 4 },
      ],
    },
    "염국 보우": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orironBlock, count: 4 },
        { material: aggregateCyclicene, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: cyclicenePrefab, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: cuttingFluidSolution, count: 6 },
      ],
    },
  },
  moduleList: [{ type: "SBL-X", name: "'어찌 밤이 길다 하리'" }],
  preferModuleList: [
    {
      module: { type: "SBL-X", name: "'어찌 밤이 길다 하리'" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "SBL-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: polymerizationPreparation, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: bipolarNanoflake, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: D32Steel, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 데겐블레허 */
export const Degenbrecher: Guard = {
  id: 308,
  name: "데겐블레허",
  imageFilename: "degenbrecher",
  class: "Guard",
  branch: "Swordmaster",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: sugar, count: 8 },
      { material: polyester, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: nucleicCrystalSinter, count: 3 },
      { material: grindstonePentahydrate, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["순수한 무력", "침묵의 비웃음", "조용한 마무리"],
  preferSkillList: ["조용한 마무리"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: ester, count: 6 },
        { material: orironShard, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: oriron, count: 4 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: polyketon, count: 4 },
        { material: orirockCube, count: 5 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: aggregateCyclicene, count: 4 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: aketon, count: 6 },
        { material: loxicKohl, count: 3 },
      ],
    },
    "순수한 무력": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: polyesterPack, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: whiteHorseKohl, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: optimizedDevice, count: 4 },
      ],
    },
    "침묵의 비웃음": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: solidifiedFiberBoard, count: 5 },
        { material: aketon, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orironBlock, count: 4 },
        { material: crystallineCircuit, count: 6 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: refinedSolvent, count: 5 },
      ],
    },
    "조용한 마무리": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: orironCluster, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: RMA7024, count: 4 },
        { material: incandescentAlloyBlock, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: crystallineCircuit, count: 5 },
      ],
    },
  },
  moduleList: [{ type: "SWO-X", name: "'과거에 대한 각주'" }],
  preferModuleList: [
    {
      module: { type: "SWO-X", name: "'과거에 대한 각주'" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "SWO-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: crystallineElectronicUnit, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: polymerizationPreparation, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: bipolarNanoflake, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 레싱 */
export const Lessing: Guard = {
  id: 304,
  name: "레싱",
  imageFilename: "lessing",
  class: "Guard",
  branch: "Dreadnought",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: orirockCube, count: 12 },
      { material: sugar, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 4 },
      { material: cyclicenePrefab, count: 5 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["강타 γ", "신념의 충돌", "서약 파기"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: sugarSubstitute, count: 5 },
        { material: diketon, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: polyester, count: 5 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: oriron, count: 4 },
        { material: sugar, count: 3 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: polyesterPack, count: 7 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: aggregateCyclicene, count: 4 },
        { material: coagulatingGel, count: 3 },
      ],
    },
    "강타 γ": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cyclicenePrefab, count: 4 },
        { material: sugarPack, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: ketonColloid, count: 4 },
        { material: polymerizedGel, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: manganeseTrihydrate, count: 6 },
      ],
    },
    "신념의 충돌": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: manganeseOre, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: manganeseTrihydrate, count: 4 },
        { material: refinedSolvent, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: polymerizedGel, count: 4 },
      ],
    },
    "서약 파기": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: ketonColloid, count: 4 },
        { material: transmutedSalt, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: solidifiedFiberBoard, count: 4 },
        { material: cyclicenePrefab, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: ketonColloid, count: 4 },
      ],
    },
  },
  moduleList: [{ type: "DRE-X", name: "봉인된 칼날" }],
  moduleMaterials: {
    "DRE-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: crystallineElectronicUnit, count: 2 },
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
        { material: polymerizationPreparation, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 비비아나 */
export const Viviana: Guard = {
  id: 303,
  name: "비비아나",
  imageFilename: "viviana",
  class: "Guard",
  branch: "Arts-Fighter",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: device, count: 6 },
      { material: sugar, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: polymerizedGel, count: 8 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["찰나의 그림자 칼날", "촛불의 그림자", "'명멸'"],
  preferSkillList: ["'명멸'"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: orirock, count: 6 },
        { material: damagedDevice, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: sugar, count: 5 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: polyester, count: 4 },
        { material: oriron, count: 4 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: loxicKohl, count: 7 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: polyesterPack, count: 6 },
        { material: orironCluster, count: 4 },
      ],
    },
    "찰나의 그림자 칼날": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: polyesterPack, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: whiteHorseKohl, count: 4 },
        { material: orirockConcentration, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: ketonColloid, count: 4 },
      ],
    },
    "촛불의 그림자": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orirockConcentration, count: 4 },
        { material: manganeseOre, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: polymerizedGel, count: 4 },
        { material: solidifiedFiberBoard, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: whiteHorseKohl, count: 7 },
      ],
    },
    "'명멸'": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: whiteHorseKohl, count: 4 },
        { material: orironCluster, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: grindstonePentahydrate, count: 4 },
        { material: ketonColloid, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: solidifiedFiberBoard, count: 5 },
      ],
    },
  },
  moduleList: [],
  moduleMaterials: null,
};

/** 외드레르 */
export const Hoederer: Guard = {
  id: 299,
  name: "외드레르",
  imageFilename: "hoederer",
  class: "Guard",
  branch: "Crusher",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: polyester, count: 10 },
      { material: polyketon, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 4 },
      { material: transmutedSaltAgglomerate, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["꺼지지 않는 칼날의 불", "잿불의 중임", "죽음의 연기"],
  preferSkillList: ["죽음의 연기"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: orironShard, count: 5 },
        { material: sugarSubstitute, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: polyketon, count: 4 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: device, count: 3 },
        { material: polyester, count: 3 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: RMA7012, count: 4 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: compoundCuttingFluid, count: 5 },
        { material: polyesterPack, count: 3 },
      ],
    },
    "꺼지지 않는 칼날의 불": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: crystallineCircuit, count: 4 },
        { material: orirockCluster, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: manganeseTrihydrate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: refinedSolvent, count: 5 },
      ],
    },
    "잿불의 중임": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: loxicKohl, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: refinedSolvent, count: 4 },
        { material: incandescentAlloyBlock, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: cyclicenePrefab, count: 6 },
      ],
    },
    "죽음의 연기": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: crystallineCircuit, count: 4 },
        { material: coagulatingGel, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: solidifiedFiberBoard, count: 4 },
        { material: refinedSolvent, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: polymerizedGel, count: 4 },
      ],
    },
  },
  moduleList: [{ type: "CRU-X", name: "새로운 삶" }],
  preferModuleList: [
    {
      module: { type: "CRU-X", name: "새로운 삶" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "CRU-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: nucleicCrystalSinter, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: crystallineElectronicUnit, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: polymerizationPreparation, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 이그제큐터 디 엑스 포에데레 (십게이) */
export const ExecutorTheExFoedere: Guard = {
  id: 284,
  name: "이그제큐터 디 엑스 포에데레",
  nicknameList: ["십게이"],
  imageFilename: "executor-the-ex-foedere",
  class: "Guard",
  branch: "Reaper",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: polyketon, count: 7 },
      { material: oriron, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: nucleicCrystalSinter, count: 3 },
      { material: polymerizedGel, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["유언 집행", "근접 전투", "언약 심판"],
  preferSkillList: ["언약 심판"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: damagedDevice, count: 4 },
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
        { material: polyesterPack, count: 7 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: sugarPack, count: 6 },
        { material: manganeseOre, count: 4 },
      ],
    },
    "유언 집행": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: ketonColloid, count: 4 },
        { material: orironCluster, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
        { material: orirockConcentration, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: RMA7024, count: 4 },
      ],
    },
    "근접 전투": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: incandescentAlloy, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: RMA7024, count: 4 },
        { material: refinedSolvent, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: optimizedDevice, count: 3 },
      ],
    },
    "언약 심판": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: loxicKohl, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orironBlock, count: 4 },
        { material: grindstonePentahydrate, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: incandescentAlloyBlock, count: 6 },
      ],
    },
  },
  moduleList: [{ type: "REA-X", name: "답을 기다리며" }],
  preferModuleList: [
    {
      module: { type: "REA-X", name: "답을 기다리며" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "REA-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: bipolarNanoflake, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: polymerizationPreparation, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: D32Steel, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 치우바이 (구백) */
export const Qiubai: Guard = {
  id: 269,
  name: "치우바이",
  nicknameList: ["구백"],
  imageFilename: "qiubai",
  class: "Guard",
  branch: "Lord",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: polyketon, count: 7 },
      { material: sugar, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 3 },
      { material: manganeseTrihydrate, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["깃털을 남기다", "그림자를 잡다", "눈에 묻다"],
  preferSkillList: ["눈에 묻다"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: damagedDevice, count: 4 },
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
        { material: compoundCuttingFluid, count: 5 },
        { material: coagulatingGel, count: 3 },
      ],
    },
    "깃털을 남기다": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: ketonColloid, count: 4 },
        { material: RMA7012, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
        { material: whiteHorseKohl, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: grindstonePentahydrate, count: 4 },
      ],
    },
    "그림자를 잡다": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: loxicKohl, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: polymerizedGel, count: 4 },
        { material: ketonColloid, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: orironBlock, count: 4 },
      ],
    },
    "눈에 묻다": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 3 },
        { material: aketon, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: optimizedDevice, count: 4 },
        { material: cuttingFluidSolution, count: 6 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: crystallineCircuit, count: 5 },
      ],
    },
  },
  moduleList: [{ type: "LOR-X", name: "눈에 침식된 삿갓" }],
  preferModuleList: [
    {
      module: { type: "LOR-X", name: "눈에 침식된 삿갓" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "LOR-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: D32Steel, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: polymerizationPreparation, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: nucleicCrystalSinter, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 총웨 */
export const Chongyue: Guard = {
  id: 267,
  name: "총웨",
  imageFilename: "chongyue",
  class: "Guard",
  branch: "Fighter",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: polyester, count: 8 },
      { material: device, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: polymerizationPreparation, count: 4 },
      { material: incandescentAlloyBlock, count: 5 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["가득 차오르다", "먼지를 털어내다", "나는 '무'일지어다"],
  preferSkillList: ["나는 '무'일지어다"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: orironShard, count: 5 },
        { material: sugarSubstitute, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: polyketon, count: 4 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: device, count: 3 },
        { material: polyester, count: 3 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: orironCluster, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: transmutedSalt, count: 6 },
        { material: crystallineComponent, count: 3 },
      ],
    },
    "가득 차오르다": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: polymerizedGel, count: 4 },
        { material: sugarPack, count: 9 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: manganeseTrihydrate, count: 4 },
        { material: crystallineCircuit, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: cuttingFluidSolution, count: 6 },
      ],
    },
    "먼지를 털어내다": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: RMA7024, count: 4 },
        { material: incandescentAlloy, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: whiteHorseKohl, count: 4 },
        { material: orironBlock, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: transmutedSaltAgglomerate, count: 4 },
      ],
    },
    "나는 '무'일지어다": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: grindstone, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: optimizedDevice, count: 6 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: RMA7024, count: 4 },
      ],
    },
  },
  moduleList: [{ type: "FGT-X", name: "'어둠에서부터 빛까지'" }],
  preferModuleList: [
    {
      module: { type: "FGT-X", name: "'어둠에서부터 빛까지'" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "FGT-X": {
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

/** 무에나 */
export const Młynar: Guard = {
  id: 248,
  name: "무에나",
  imageFilename: "młynar",
  class: "Guard",
  branch: "Liberator",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: polyester, count: 8 },
      { material: orirockCube, count: 8 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: incandescentAlloyBlock, count: 5 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["표출하지 않은 분노", "해소하지 않은 슬픔", "눈부시지 않은 영광"],
  preferSkillList: ["눈부시지 않은 영광"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: orironShard, count: 5 },
        { material: sugarSubstitute, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: polyketon, count: 4 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: device, count: 3 },
        { material: polyester, count: 3 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: crystallineComponent, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: semiSyntheticSolvent, count: 3 },
        { material: RMA7012, count: 4 },
      ],
    },
    "표출하지 않은 분노": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: RMA7024, count: 3 },
        { material: manganeseOre, count: 9 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: optimizedDevice, count: 3 },
        { material: orironBlock, count: 6 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: whiteHorseKohl, count: 7 },
      ],
    },
    "해소하지 않은 슬픔": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: crystallineCircuit, count: 4 },
        { material: coagulatingGel, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: whiteHorseKohl, count: 4 },
        { material: ketonColloid, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: RMA7024, count: 5 },
      ],
    },
    "눈부시지 않은 영광": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: integratedDevice, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: manganeseTrihydrate, count: 4 },
        { material: refinedSolvent, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: crystallineCircuit, count: 4 },
      ],
    },
  },
  moduleList: [],
  moduleMaterials: null,
};

/** 가비알 디 인빈서블 (수비알) */
export const GavialTheInvincible: Guard = {
  id: 242,
  name: "가비알 디 인빈서블",
  nicknameList: ["수비알"],
  imageFilename: "gavial-the-invincible",
  class: "Guard",
  branch: "Centurion",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: orirockCube, count: 12 },
      { material: polyketon, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: bipolarNanoflake, count: 4 },
      { material: polymerizedGel, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["정밀 통격", "체인톱 강습", "정글의 영혼"],
  preferSkillList: ["체인톱 강습"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: sugarSubstitute, count: 5 },
        { material: diketon, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: polyester, count: 5 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: oriron, count: 4 },
        { material: sugar, count: 3 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: grindstone, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: RMA7012, count: 3 },
        { material: incandescentAlloy, count: 5 },
      ],
    },
    "정밀 통격": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orironBlock, count: 4 },
        { material: semiSyntheticSolvent, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: refinedSolvent, count: 4 },
        { material: polymerizedGel, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: orirockConcentration, count: 4 },
      ],
    },
    "체인톱 강습": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: ketonColloid, count: 4 },
        { material: coagulatingGel, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: grindstonePentahydrate, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: optimizedDevice, count: 4 },
      ],
    },
    "정글의 영혼": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: optimizedDevice, count: 3 },
        { material: orironCluster, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: polymerizedGel, count: 4 },
        { material: orirockConcentration, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: orironBlock, count: 5 },
      ],
    },
  },
  moduleList: [{ type: "CEN-X", name: "가비알의 괴로움" }],
  preferModuleList: [
    {
      module: { type: "CEN-X", name: "가비알의 괴로움" },
      level: 1,
    },
  ],
  moduleMaterials: {
    "CEN-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: crystallineElectronicUnit, count: 2 },
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
        { material: polymerizationPreparation, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 아이린 */
export const Irene: Guard = {
  id: 235,
  name: "아이린",
  imageFilename: "irene",
  class: "Guard",
  branch: "Swordmaster",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: polyester, count: 8 },
      { material: oriron, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: bipolarNanoflake, count: 4 },
      { material: RMA7024, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["불어오는 바람", "갈라지는 파도", "판결"],
  preferSkillList: ["판결"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: orironShard, count: 5 },
        { material: sugarSubstitute, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: polyketon, count: 4 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: device, count: 3 },
        { material: polyester, count: 3 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: aketon, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: integratedDevice, count: 3 },
        { material: coagulatingGel, count: 4 },
      ],
    },
    "불어오는 바람": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: ketonColloid, count: 4 },
        { material: coagulatingGel, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: grindstonePentahydrate, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: orironBlock, count: 4 },
      ],
    },
    "갈라지는 파도": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: optimizedDevice, count: 3 },
        { material: orironCluster, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: polymerizedGel, count: 4 },
        { material: orirockConcentration, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: optimizedDevice, count: 4 },
      ],
    },
    판결: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: whiteHorseKohl, count: 4 },
        { material: aketon, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: RMA7024, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: orironBlock, count: 5 },
      ],
    },
  },
  moduleList: [
    { type: "SWO-X", name: "재판관의 식량" },
    { type: "SWO-Y", name: "두껍고 무거운 경전" },
  ],
  preferModuleList: [
    {
      module: { type: "SWO-Y", name: "두껍고 무거운 경전" },
      level: 1,
    },
  ],
  moduleMaterials: {
    "SWO-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: bipolarNanoflake, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: nucleicCrystalSinter, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: crystallineElectronicUnit, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
    "SWO-Y": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: D32Steel, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: polymerizationPreparation, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: bipolarNanoflake, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 니어 더 래디언트 나이트 (창니어) */
export const NearlTheRadiantKnight: Guard = {
  id: 212,
  name: "니어 더 래디언트 나이트",
  nicknameList: ["창니어"],
  imageFilename: "nearl-the-radiant-knight",
  class: "Guard",
  branch: "Dreadnought",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: guardChip!,
        count: 5,
      },
      {
        material: device,
        count: 5,
      },
      {
        material: polyketon,
        count: 4,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: guardDualchip,
        count: 4,
      },
      {
        material: polymerizationPreparation,
        count: 4,
      },
      {
        material: polymerizedGel,
        count: 8,
      },
    ],
  },
  skillList: ["찬란한 불꽃의 장검", "밤의 광채", "눈부신 태양의 승인"],
  preferSkillList: ["밤의 광채", "눈부신 태양의 승인"],
  skillUpgradeMaterials: {
    common: {
      "2": [
        {
          material: skillSummary1,
          count: 5,
        },
      ],
      "3": [
        {
          material: skillSummary1,
          count: 5,
        },
        {
          material: orirock,
          count: 6,
        },
        {
          material: damagedDevice,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: sugar,
          count: 5,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: polyester,
          count: 4,
        },
        {
          material: oriron,
          count: 4,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: grindstone,
          count: 5,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: RMA7012,
          count: 3,
        },
        {
          material: incandescentAlloy,
          count: 5,
        },
      ],
    },
    "찬란한 불꽃의 장검": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: orironBlock,
          count: 4,
        },
        {
          material: semiSyntheticSolvent,
          count: 3,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: refinedSolvent,
          count: 4,
        },
        {
          material: polymerizedGel,
          count: 9,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 15,
        },
        {
          material: polymerizationPreparation,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 6,
        },
      ],
    },
    "밤의 광채": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: ketonColloid,
          count: 4,
        },
        {
          material: coagulatingGel,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: orirockConcentration,
          count: 4,
        },
        {
          material: grindstonePentahydrate,
          count: 9,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 15,
        },
        {
          material: D32Steel,
          count: 6,
        },
        {
          material: polymerizedGel,
          count: 6,
        },
      ],
    },
    "눈부신 태양의 승인": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: optimizedDevice,
          count: 3,
        },
        {
          material: orironCluster,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: polymerizedGel,
          count: 4,
        },
        {
          material: orirockConcentration,
          count: 10,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 15,
        },
        {
          material: crystallineElectronicUnit,
          count: 6,
        },
        {
          material: orirockConcentration,
          count: 4,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "DRE-X",
      name: "눈부신 태양의 칼날",
    },
    {
      type: "DRE-Y",
      name: "'기사 가문'",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "DRE-X",
        name: "눈부신 태양의 칼날",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "DRE-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: polymerizationPreparation,
          count: 2,
        },
        {
          material: LMD,
          count: 80000,
        },
      ],
      "2": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: dataSupplementStick,
          count: 60,
        },
        {
          material: crystallineElectronicUnit,
          count: 3,
        },
        {
          material: LMD,
          count: 100000,
        },
      ],
      "3": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: dataSupplementInstrument,
          count: 20,
        },
        {
          material: bipolarNanoflake,
          count: 4,
        },
        {
          material: LMD,
          count: 120000,
        },
      ],
    },
    "DRE-Y": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: bipolarNanoflake,
          count: 2,
        },
        {
          material: LMD,
          count: 80000,
        },
      ],
      "2": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: dataSupplementStick,
          count: 60,
        },
        {
          material: crystallineElectronicUnit,
          count: 3,
        },
        {
          material: LMD,
          count: 100000,
        },
      ],
      "3": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: dataSupplementInstrument,
          count: 20,
        },
        {
          material: polymerizationPreparation,
          count: 4,
        },
        {
          material: LMD,
          count: 120000,
        },
      ],
    },
  },
};

/** 팔라스 */
export const Pallas: Guard = {
  id: 197,
  name: "팔라스",
  imageFilename: "pallas",
  class: "Guard",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: guardChip!,
        count: 5,
      },
      {
        material: orirockCube,
        count: 12,
      },
      {
        material: device,
        count: 3,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: guardDualchip,
        count: 4,
      },
      {
        material: crystallineElectronicUnit,
        count: 4,
      },
      {
        material: whiteHorseKohl,
        count: 6,
      },
    ],
  },
  skillList: ["승리의 연타", "신념의 채찍", "용감의 축복"],
  preferSkillList: ["승리의 연타"],
  skillUpgradeMaterials: {
    common: {
      "2": [
        {
          material: skillSummary1,
          count: 5,
        },
      ],
      "3": [
        {
          material: skillSummary1,
          count: 5,
        },
        {
          material: sugarSubstitute,
          count: 4,
        },
        {
          material: diketon,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: polyester,
          count: 5,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: oriron,
          count: 4,
        },
        {
          material: sugar,
          count: 3,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: integratedDevice,
          count: 4,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: loxicKohl,
          count: 5,
        },
        {
          material: aketon,
          count: 4,
        },
      ],
    },
    "승리의 연타": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: grindstonePentahydrate,
          count: 4,
        },
        {
          material: loxicKohl,
          count: 7,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: incandescentAlloyBlock,
          count: 4,
        },
        {
          material: RMA7024,
          count: 8,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 15,
        },
        {
          material: crystallineElectronicUnit,
          count: 6,
        },
        {
          material: orironBlock,
          count: 4,
        },
      ],
    },
    "신념의 채찍": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: orirockConcentration,
          count: 4,
        },
        {
          material: grindstone,
          count: 7,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: ketonColloid,
          count: 4,
        },
        {
          material: polymerizedGel,
          count: 9,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 15,
        },
        {
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 5,
        },
      ],
    },
    "용감의 축복": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: polymerizedGel,
          count: 4,
        },
        {
          material: orirockCluster,
          count: 11,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: optimizedDevice,
          count: 3,
        },
        {
          material: orironBlock,
          count: 6,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 15,
        },
        {
          material: polymerizationPreparation,
          count: 6,
        },
        {
          material: polymerizedGel,
          count: 7,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "INS-X",
      name: "'고향의 바위'",
    },
    {
      type: "INS-Y",
      name: "'헬리아의 빛'",
    },
  ],
  moduleMaterials: {
    "INS-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: bipolarNanoflake,
          count: 2,
        },
        {
          material: LMD,
          count: 80000,
        },
      ],
      "2": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: dataSupplementStick,
          count: 60,
        },
        {
          material: crystallineElectronicUnit,
          count: 3,
        },
        {
          material: LMD,
          count: 100000,
        },
      ],
      "3": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: dataSupplementInstrument,
          count: 20,
        },
        {
          material: polymerizationPreparation,
          count: 4,
        },
        {
          material: LMD,
          count: 120000,
        },
      ],
    },
    "INS-Y": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: crystallineElectronicUnit,
          count: 2,
        },
        {
          material: LMD,
          count: 80000,
        },
      ],
      "2": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: dataSupplementStick,
          count: 60,
        },
        {
          material: bipolarNanoflake,
          count: 3,
        },
        {
          material: LMD,
          count: 100000,
        },
      ],
      "3": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: dataSupplementInstrument,
          count: 20,
        },
        {
          material: D32Steel,
          count: 4,
        },
        {
          material: LMD,
          count: 120000,
        },
      ],
    },
  },
};

/** 스카디 */
export const Skadi: Guard = {
  id: 89,
  name: "스카디",
  imageFilename: "skadi",
  class: "Guard",
  branch: "Dreadnought",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: device, count: 5 },
      { material: polyester, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: orirockConcentration, count: 9 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["신속공격γ", "파도타기", "파도의 만가"],
  preferSkillList: ["파도타기", "파도의 만가"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: damagedDevice, count: 4 },
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
  moduleList: [
    { type: "DRE-X", name: "지난 날의 불완전한 꿈" },
    { type: "DRE-Y", name: "축축한 대검 케이스" },
  ],
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
  moduleMaterials: {
    "DRE-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: D32Steel, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: bipolarNanoflake, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: crystallineElectronicUnit, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
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

// 가드 오퍼레이터 리스트 계열
const sixStarGuardList: Guard[] = [
  VinaVictoria,
  Pepe,
  Ulpianus,
  ZuoLe,
  Degenbrecher,
  Lessing,
  Viviana,
  Hoederer,
  ExecutorTheExFoedere,
  Qiubai,
  Chongyue,
  Młynar,
  GavialTheInvincible,
  Irene,
  NearlTheRadiantKnight,
  Pallas,
  Skadi,
];
const fiveStarGuardList: Guard[] = [];
const fourStarGuardList: Guard[] = [];
const threeStarGuardList: Guard[] = [];
const twoStarGuardList: Guard[] = [];
const oneStarGuardList: Guard[] = [];

/** 가드 오퍼레이터 리스트 */
export const guardList: Guard[] = [
  ...sixStarGuardList,
  ...fiveStarGuardList,
  ...fourStarGuardList,
  ...threeStarGuardList,
  ...twoStarGuardList,
  ...oneStarGuardList,
];
