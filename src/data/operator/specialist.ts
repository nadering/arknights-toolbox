import {
  aggregateCyclicene,
  aketon,
  bipolarNanoflake,
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
  diketon,
  fuscousFiber,
  grindstone,
  grindstonePentahydrate,
  incandescentAlloyBlock,
  integratedDevice,
  ketonColloid,
  LMD,
  loxicKohl,
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
  polyketon,
  polymerizationPreparation,
  polymerizedGel,
  refinedSolvent,
  RMA7024,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  solidifiedFiberBoard,
  specialistChip,
  specialistDualchip,
  sugar,
  sugarPack,
  sugarSubstitute,
  transmutedSalt,
  transmutedSaltAgglomerate,
} from "../material";
import Operator from "./operator";

// 스페셜리스트

/** 스페셜리스트 세부 직군 */
export type SpecialistBranch =
  | "Push-Stroker" // 푸쉬마스터
  | "Hookmaster" // 후크마스터
  | "Executor" // 처형자
  | "Ambusher" // 매복자
  | "Geek" // 기인
  | "Merchant" // 상인
  | "Trapmaster" // 함정술사
  | "Dollkeeper" // 인형사
  | "Alchemist" // 연금술사
  | "Skyranger"; // 스카이레인저

/** 스페셜리스트 오퍼레이터 */
export interface Specialist extends Operator {
  /** 세부 직군 */
  branch: SpecialistBranch;
}

// 6성
/** 크라운슬레이어 */
export const Crownslayer: Specialist = {
  id: 349,
  name: "크라운슬레이어",
  imageFilename: "crownslayer",
  class: "Specialist",
  branch: "Executor",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: specialistChip!, count: 5 },
      { material: sugar, count: 8 },
      { material: oriron, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: specialistDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: transmutedSaltAgglomerate, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["시야 차단 연막탄", "포연 진폭", "봉화 처형장"],
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
        { material: polyester, count: 3 },
        { material: device, count: 3 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: sugarPack, count: 7 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: crystallineComponent, count: 5 },
        { material: orironCluster, count: 4 },
      ],
    },
    "시야 차단 연막탄": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: compoundCuttingFluid, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: manganeseTrihydrate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: transmutedSaltAgglomerate, count: 6 },
      ],
    },
    "포연 진폭": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: RMA7024, count: 4 },
        { material: integratedDevice, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: cyclicenePrefab, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: orironBlock, count: 2 },
      ],
    },
    "봉화 처형장": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: crystallineCircuit, count: 4 },
        { material: loxicKohl, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: ketonColloid, count: 4 },
        { material: refinedSolvent, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: cuttingFluidSolution, count: 1 },
      ],
    },
  },
  moduleList: [{ type: "EXE-X", name: "왕을 시해하는 칼날" }],
  moduleMaterials: {
    "EXE-X": {
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
        { material: D32Steel, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 아스카론 */
export const Ascalon: Specialist = {
  id: 323,
  name: "아스카론",
  imageFilename: "ascalon",
  class: "Specialist",
  branch: "Ambusher",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: specialistChip!, count: 5 },
      { material: orirockCube, count: 12 },
      { material: polyketon, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: specialistDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: ketonColloid, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["추격", "은총", "강림"],
  preferSkillList: ["은총"],
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
        { material: orirockCluster, count: 8 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: sugarPack, count: 6 },
        { material: compoundCuttingFluid, count: 3 },
      ],
    },
    추격: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: integratedDevice, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: solidifiedFiberBoard, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: orirockConcentration, count: 5 },
      ],
    },
    은총: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: transmutedSalt, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: optimizedDevice, count: 6 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: incandescentAlloyBlock, count: 6 },
      ],
    },
    강림: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orironBlock, count: 4 },
        { material: aggregateCyclicene, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orironBlock, count: 4 },
        { material: crystallineCircuit, count: 6 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: RMA7024, count: 5 },
      ],
    },
  },
  moduleList: [{ type: "AMB-X", name: "'히든 블레이드'" }],
  preferModuleList: [
    { module: { type: "AMB-X", name: "'히든 블레이드'" }, level: 3 },
  ],
  moduleMaterials: {
    "AMB-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: D32Steel, count: 2 },
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

/** Ela (엘라) */
export const Ela: Specialist = {
  id: 319,
  name: "Ela",
  nicknameList: ["엘라"],
  imageFilename: "ela",
  class: "Specialist",
  branch: "Trapmaster",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: specialistChip!, count: 5 },
      { material: device, count: 5 },
      { material: orirockCube, count: 7 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: specialistDualchip, count: 4 },
      { material: bipolarNanoflake, count: 4 },
      { material: orironBlock, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["옵티컬 인터퍼런스", "쇼크 디펜스", "'보삭 템페스트'"],
  preferSkillList: ["'보삭 템페스트'"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: orirock, count: 6 },
        { material: damagedDivice, count: 4 },
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
        { material: fuscousFiber, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: orirockCluster, count: 6 },
        { material: aketon, count: 4 },
      ],
    },
    "옵티컬 인터퍼런스": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: polymerizedGel, count: 4 },
        { material: crystallineComponent, count: 9 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: ketonColloid, count: 4 },
        { material: refinedSolvent, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: crystallineCircuit, count: 4 },
      ],
    },
    "쇼크 디펜스": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: fuscousFiber, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cyclicenePrefab, count: 4 },
        { material: incandescentAlloyBlock, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: refinedSolvent, count: 6 },
      ],
    },
    "'보삭 템페스트'": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: manganeseTrihydrate, count: 4 },
        { material: grindstone, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: manganeseTrihydrate, count: 4 },
        { material: polymerizedGel, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: grindstonePentahydrate, count: 4 },
      ],
    },
  },
  moduleList: [{ type: "TRP-Δ", name: "사회적 기대 전술배낭" }],
  preferModuleList: [
    { module: { type: "TRP-Δ", name: "사회적 기대 전술배낭" }, level: 3 },
  ],
  moduleMaterials: {
    "TRP-Δ": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: D32Steel, count: 2 },
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
  },
};

/** 스페셜리스트 오퍼레이터 리스트 */
export const specialistList: Specialist[] = [Crownslayer, Ascalon, Ela];
