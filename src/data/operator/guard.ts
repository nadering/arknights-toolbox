import Operator from "./operator";
import {
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
  damagedDivice,
  dataSupplementInstrument,
  dataSupplementStick,
  device,
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
  manganeseTrihydrate,
  moduleDataBlock,
  nucleicCrystalSinter,
  optimizedDevice,
  orirockCluster,
  orirockConcentration,
  orirockCube,
  oriron,
  orironBlock,
  orironShard,
  polyester,
  polyesterLump,
  polyesterPack,
  polyketon,
  polymerizationPreparation,
  polymerizedGel,
  refinedSolvent,
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
} from "../material";

// 가드

/** 가드 세부 직군 */
export type GuardBranch =
  | "Dreadnought" // 드레드노트
  | "Centurion" // 공격수
  | "Lord" // 로드
  | "Arts-Fighter" // 아츠 파이터
  | "Instructor" // 교관
  | "Fighter" // 파이터
  | "Swordmaster" // 소드마스터
  | "Soloblade" // 솔로블레이드
  | "Liberator" // 해방자
  | "Reaper" // 리퍼
  | "Crusher" // 대검사
  | "Earthshaker"; // 어스셰이커

/** 가드 오퍼레이터 */
export interface Guard extends Operator {
  /** 세부 직군 */
  branch: GuardBranch;
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
  skillList: ["성사시켜야 할 접촉", "유지되어야 할 경계", "개척해야 할 길"],
  preferSkillList: ["유지되어야 할 경계", "개척해야 할 길"],
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
    "성사시켜야 할 접촉": {
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
    "유지되어야 할 경계": {
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
  moduleList: [
    { type: "CRU-X", name: "울피아누스의 옷장" },
  ],
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

/** 가드 오퍼레이터 리스트 */
export const guardList: Guard[] = [VinaVictoria, Pepe, Ulpianus, Skadi];
