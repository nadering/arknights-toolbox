import Operator from "./operator";
import {
  aggregateCyclicene,
  aketon,
  biphasicEnantiomorphicMedium,
  bipolarNanoflake,
  chiralRefractor,
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
  specialistChip,
  specialistDualchip,
  sugar,
  sugarPack,
  sugarSubstitute,
  transmutedSalt,
  transmutedSaltAgglomerate,
  whiteHorseKohl,
} from "@/data/material";

// 스페셜리스트

/** 스페셜리스트 세부 직군 리스트 */
export const SpecialistBranchList = [
  "Push-Stroker", // 푸쉬마스터
  "Hookmaster", // 후크마스터
  "Executor", // 처형자
  "Ambusher", // 매복자
  "Geek", // 기인
  "Merchant", // 상인
  "Trapmaster", // 함정술사
  "Dollkeeper", // 인형사
  "Alchemist", // 연금술사
  "Skyranger", // 스카이레인저
] as const;

/** 스페셜리스트 세부 직군 */
export type SpecialistBranch = (typeof SpecialistBranchList)[number];

/** 스페셜리스트 오퍼레이터 */
export interface Specialist extends Operator {
  /** 세부 직군 */
  branch?: SpecialistBranch;
}

// 6성
/** 엑시아 더 뉴 커버넌트 (신시아) */
export const ExusiaiTheNewCovenant: Specialist = {
  id: 370,
  name: "엑시아 더 뉴 커버넌트",
  nicknameList: ["신시아"],
  imageFilename: "exusiai-the-new-covenant",
  class: "Specialist",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: specialistChip!,
        count: 5,
      },
      {
        material: polyketon,
        count: 7,
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
        material: specialistDualchip,
        count: 4,
      },
      {
        material: biphasicEnantiomorphicMedium,
        count: 4,
      },
      {
        material: RMA7024,
        count: 2,
      },
    ],
  },
  skillList: ["하늘 대청소", "트리거 해피", "사명은 반드시 완수한다!"],
  preferSkillList: ["트리거 해피", "사명은 반드시 완수한다!"],
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
          material: compoundCuttingFluid,
          count: 5,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: integratedDevice,
          count: 5,
        },
        {
          material: transmutedSalt,
          count: 1,
        },
      ],
    },
    "하늘 대청소": {
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
          material: polyesterPack,
          count: 10,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: grindstonePentahydrate,
          count: 4,
        },
        {
          material: crystallineCircuit,
          count: 7,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 15,
        },
        {
          material: biphasicEnantiomorphicMedium,
          count: 6,
        },
        {
          material: ketonColloid,
          count: 1,
        },
      ],
    },
    "트리거 해피": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: chiralRefractor,
          count: 4,
        },
        {
          material: transmutedSalt,
          count: 6,
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
          material: transmutedSaltAgglomerate,
          count: 10,
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
          material: cyclicenePrefab,
          count: 5,
        },
      ],
    },
    "사명은 반드시 완수한다!": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: RMA7024,
          count: 4,
        },
        {
          material: RMA7012,
          count: 4,
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
          material: orironBlock,
          count: 7,
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
          material: refinedSolvent,
          count: 6,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "GEE-X",
      name: "새 친구를 위한 성도 생활 세트",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "GEE-X",
        name: "새 친구를 위한 성도 생활 세트",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "GEE-X": {
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
          material: D32Steel,
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
          material: nucleicCrystalSinter,
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

/** 쏜즈 더 로드스타 (쏜별) */
export const ThornsTheLodestar: Specialist = {
  id: 354,
  name: "쏜즈 더 로드스타",
  nicknameList: ["쏜별"],
  imageFilename: "thorns-the-lodestar",
  class: "Specialist",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: specialistChip!,
        count: 5,
      },
      {
        material: polyketon,
        count: 7,
      },
      {
        material: orirockCube,
        count: 7,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: specialistDualchip,
        count: 4,
      },
      {
        material: polymerizationPreparation,
        count: 4,
      },
      {
        material: refinedSolvent,
        count: 7,
      },
    ],
  },
  skillList: ["조석 계산", "해일 분쇄", "'나의 바다'"],
  preferSkillList: ["조석 계산", "해일 분쇄", "'나의 바다'"],
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
          material: coagulatingGel,
          count: 5,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: compoundCuttingFluid,
          count: 6,
        },
        {
          material: incandescentAlloy,
          count: 3,
        },
      ],
    },
    "조석 계산": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: crystallineCircuit,
          count: 4,
        },
        {
          material: incandescentAlloy,
          count: 3,
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
          material: refinedSolvent,
          count: 8,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 15,
        },
        {
          material: nucleicCrystalSinter,
          count: 6,
        },
        {
          material: cuttingFluidSolution,
          count: 2,
        },
      ],
    },
    "해일 분쇄": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: manganeseTrihydrate,
          count: 4,
        },
        {
          material: polyesterPack,
          count: 7,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: transmutedSaltAgglomerate,
          count: 4,
        },
        {
          material: solidifiedFiberBoard,
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
          material: polymerizedGel,
          count: 1,
        },
      ],
    },
    "'나의 바다'": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: cyclicenePrefab,
          count: 4,
        },
        {
          material: transmutedSalt,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: orironBlock,
          count: 4,
        },
        {
          material: grindstonePentahydrate,
          count: 7,
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
          material: orirockConcentration,
          count: 7,
        },
      ],
    },
  },
  moduleList: [{ type: "ALC-X", name: "세 면의 금화" }],
  moduleMaterials: {
    "ALC-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: polymerizationPreparation, count: 2 },
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
        { material: nucleicCrystalSinter, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

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
  preferSkillList: ["봉화 처형장"],
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
  moduleList: [
    { type: "EXE-X", name: "시해의 칼" },
    { type: "EXE-Y", name: "목탄화" },
  ],
  preferModuleList: [{ module: { type: "EXE-Y", name: "목탄화" }, level: 3 }],
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
    "EXE-Y": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: crystallineElectronicUnit, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: biphasicEnantiomorphicMedium, count: 3 },
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
  moduleList: [
    { type: "AMB-X", name: "'히든 블레이드'" },
    { type: "AMB-Y", name: "'아스카론의 눈'" },
  ],
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
    "AMB-Y": {
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
        { material: biphasicEnantiomorphicMedium, count: 4 },
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

/** 스와이어 디 엘리건트 위트 (수와이어) */
export const SwireTheElegantWit: Specialist = {
  id: 287,
  name: "스와이어 디 엘리건트 위트",
  nicknameList: ["수와이어"],
  imageFilename: "swire-the-elegant-wit",
  class: "Specialist",
  branch: "Merchant",
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
      { material: whiteHorseKohl, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["재물보다 의리", "'웰컴 드링크'", "거금 쾌척"],
  preferSkillList: ["'웰컴 드링크'"],
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
        { material: crystallineComponent, count: 6 },
        { material: sugarPack, count: 4 },
      ],
    },
    "재물보다 의리": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: manganeseTrihydrate, count: 4 },
        { material: coagulatingGel, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: refinedSolvent, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: optimizedDevice, count: 4 },
      ],
    },
    "'웰컴 드링크'": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: grindstone, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: manganeseTrihydrate, count: 4 },
        { material: RMA7024, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: transmutedSaltAgglomerate, count: 4 },
      ],
    },
    "거금 쾌척": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: crystallineCircuit, count: 4 },
        { material: sugarPack, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: ketonColloid, count: 4 },
        { material: manganeseTrihydrate, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: polymerizedGel, count: 4 },
      ],
    },
  },
  moduleList: [
    { type: "MER-X", name: "'금화휘황'" },
    { type: "MER-Y", name: "스와이어의 용문 요리 가이드" },
  ],
  preferModuleList: [
    { module: { type: "MER-X", name: "'금화휘황'" }, level: 1 },
  ],
  moduleMaterials: {
    "MER-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: bipolarNanoflake, count: 2 },
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
    "MER-Y": {
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

/** 키린R 야토 (특토) */
export const KirinRYato: Specialist = {
  id: 272,
  name: "키린R 야토",
  nicknameList: ["특토"],
  imageFilename: "kirin-r-yato",
  class: "Specialist",
  branch: "Executor",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: specialistChip!, count: 5 },
      { material: device, count: 5 },
      { material: polyester, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: specialistDualchip, count: 4 },
      { material: nucleicCrystalSinter, count: 3 },
      { material: ketonColloid, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["귀인화", "난무", "공중 회전난무"],
  preferSkillList: ["난무", "공중 회전난무"],
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
        { material: compoundCuttingFluid, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloy, count: 5 },
        { material: grindstone, count: 3 },
      ],
    },
    귀인화: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: crystallineCircuit, count: 4 },
        { material: compoundCuttingFluid, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orironBlock, count: 4 },
        { material: grindstonePentahydrate, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: polymerizedGel, count: 6 },
      ],
    },
    난무: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orirockConcentration, count: 4 },
        { material: coagulatingGel, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: refinedSolvent, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: orirockConcentration, count: 4 },
      ],
    },
    "공중 회전난무": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: orirockCluster, count: 9 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: RMA7024, count: 4 },
        { material: incandescentAlloyBlock, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: optimizedDevice, count: 3 },
      ],
    },
  },
  moduleList: [{ type: "EXE-X", name: "훈련용 말뚝" }],
  preferModuleList: [
    { module: { type: "EXE-X", name: "훈련용 말뚝" }, level: 3 },
  ],
  moduleMaterials: {
    "EXE-X": {
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
  },
};

/** 텍사스 디 오메르토사 (특사스) */
export const TexasTheOmertosa: Specialist = {
  id: 257,
  name: "텍사스 디 오메르토사",
  nicknameList: ["특사스"],
  imageFilename: "texas-the-omertosa",
  class: "Specialist",
  branch: "Executor",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: specialistChip!, count: 5 },
      { material: polyketon, count: 6 },
      { material: polyester, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: specialistDualchip, count: 4 },
      { material: bipolarNanoflake, count: 4 },
      { material: orironBlock, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["고요한 이슬비", "끊임없는 소나기", "맹렬한 검의 비"],
  preferSkillList: ["끊임없는 소나기", "맹렬한 검의 비"],
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
        { material: crystallineComponent, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: grindstone, count: 5 },
        { material: transmutedSalt, count: 3 },
      ],
    },
    "고요한 이슬비": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: optimizedDevice, count: 3 },
        { material: transmutedSalt, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: whiteHorseKohl, count: 4 },
        { material: crystallineCircuit, count: 5 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: ketonColloid, count: 4 },
      ],
    },
    "끊임없는 소나기": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: whiteHorseKohl, count: 4 },
        { material: manganeseOre, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: ketonColloid, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: refinedSolvent, count: 6 },
      ],
    },
    "맹렬한 검의 비": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: integratedDevice, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
        { material: polymerizedGel, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: grindstonePentahydrate, count: 5 },
      ],
    },
  },
  moduleList: [{ type: "EXE-Y", name: "블루베리와 다크초콜릿" }],
  preferModuleList: [
    { module: { type: "EXE-Y", name: "블루베리와 다크초콜릿" }, level: 3 },
  ],
  moduleMaterials: {
    "EXE-Y": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: bipolarNanoflake, count: 2 },
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

/** 도로시 */
export const Dorothy: Specialist = {
  id: 246,
  name: "도로시",
  imageFilename: "dorothy",
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
      { material: polymerizationPreparation, count: 4 },
      { material: cuttingFluidSolution, count: 8 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["위험 목표 제거", "유사 지형 생성", "고속 공진 제거"],
  preferSkillList: ["고속 공진 제거"],
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
        { material: manganeseOre, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: grindstone, count: 4 },
        { material: orirockCluster, count: 5 },
      ],
    },
    "위험 목표 제거": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orirockConcentration, count: 4 },
        { material: grindstone, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: RMA7024, count: 4 },
        { material: manganeseTrihydrate, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: cuttingFluidSolution, count: 5 },
      ],
    },
    "유사 지형 생성": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: polymerizedGel, count: 4 },
        { material: orirockCluster, count: 11 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
        { material: RMA7024, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: incandescentAlloyBlock, count: 6 },
      ],
    },
    "고속 공진 제거": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: RMA7012, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: optimizedDevice, count: 6 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: polymerizedGel, count: 6 },
      ],
    },
  },
  moduleList: [
    { type: "TRP-X", name: "꿈 속의 사람" },
    { type: "TRP-Y", name: "동화책" },
  ],
  preferModuleList: [{ module: { type: "TRP-Y", name: "동화책" }, level: 3 }],
  moduleMaterials: {
    "TRP-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: crystallineElectronicUnit, count: 2 },
        { material: LMD, count: 80000 },
      ],
      2: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementStick, count: 60 },
        { material: biphasicEnantiomorphicMedium, count: 3 },
        { material: LMD, count: 100000 },
      ],
      3: [
        { material: moduleDataBlock, count: 4 },
        { material: dataSupplementInstrument, count: 20 },
        { material: polymerizationPreparation, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
    "TRP-Y": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: crystallineElectronicUnit, count: 2 },
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

/** 스펙터 디 언체인드 (언펙터) */
export const SpecterTheUnchained: Specialist = {
  id: 233,
  name: "스펙터 디 언체인드",
  nicknameList: ["언펙터"],
  imageFilename: "specter-the-unchained",
  class: "Specialist",
  branch: "Dollkeeper",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: specialistChip!, count: 5 },
      { material: sugar, count: 8 },
      { material: polyester, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: specialistDualchip, count: 4 },
      { material: polymerizationPreparation, count: 4 },
      { material: ketonColloid, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["생존의 기교", "생존의 열망", "생존의 중압"],
  preferSkillList: ["생존의 열망", "생존의 중압"],
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
        { material: orironCluster, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: aketon, count: 3 },
        { material: loxicKohl, count: 6 },
      ],
    },
    "생존의 기교": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: polymerizedGel, count: 4 },
        { material: orirockCluster, count: 11 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
        { material: incandescentAlloyBlock, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: refinedSolvent, count: 4 },
      ],
    },
    "생존의 열망": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: RMA7012, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: optimizedDevice, count: 6 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: incandescentAlloyBlock, count: 6 },
      ],
    },
    "생존의 중압": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orironBlock, count: 4 },
        { material: coagulatingGel, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: refinedSolvent, count: 4 },
        { material: crystallineCircuit, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: incandescentAlloyBlock, count: 6 },
      ],
    },
  },
  moduleList: [
    { type: "PUM-X", name: "'음반' 수집 상자" },
    { type: "PUM-Y", name: "미완성의 아름다움" },
  ],
  preferModuleList: [
    { module: { type: "PUM-X", name: "'음반' 수집 상자" }, level: 3 },
    { module: { type: "PUM-Y", name: "미완성의 아름다움" }, level: 3 },
  ],
  moduleMaterials: {
    "PUM-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: crystallineElectronicUnit, count: 2 },
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
    "PUM-Y": {
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

/** 리 */
export const Lee: Specialist = {
  id: 222,
  name: "리",
  imageFilename: "lee",
  branch: "Merchant",
  class: "Specialist",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: specialistChip!,
        count: 5,
      },
      {
        material: oriron,
        count: 8,
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
        material: specialistDualchip,
        count: 4,
      },
      {
        material: polymerizationPreparation,
        count: 4,
      },
      {
        material: whiteHorseKohl,
        count: 9,
      },
    ],
  },
  skillList: ["일벌백계", "축귀벽사", "귀빈내방"],
  preferSkillList: ["귀빈내방"],
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
          material: orironShard,
          count: 5,
        },
        {
          material: sugarSubstitute,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: polyketon,
          count: 4,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: device,
          count: 3,
        },
        {
          material: polyester,
          count: 3,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: semiSyntheticSolvent,
          count: 5,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: compoundCuttingFluid,
          count: 4,
        },
        {
          material: grindstone,
          count: 3,
        },
      ],
    },
    일벌백계: {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: refinedSolvent,
          count: 4,
        },
        {
          material: incandescentAlloy,
          count: 7,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: grindstonePentahydrate,
          count: 4,
        },
        {
          material: whiteHorseKohl,
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
          material: RMA7024,
          count: 5,
        },
      ],
    },
    축귀벽사: {
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
          material: RMA7024,
          count: 4,
        },
        {
          material: manganeseTrihydrate,
          count: 7,
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
          material: refinedSolvent,
          count: 4,
        },
      ],
    },
    귀빈내방: {
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
          material: crystallineCircuit,
          count: 4,
        },
        {
          material: polymerizedGel,
          count: 8,
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
          material: cuttingFluidSolution,
          count: 5,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "MER-X",
      name: "'길흉불문'",
    },
    {
      type: "MER-Y",
      name: "'단사선악'",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "MER-X",
        name: "'길흉불문'",
      },
      level: 1,
    },
  ],
  moduleMaterials: {
    "MER-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: D32Steel,
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
          material: polymerizationPreparation,
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
    "MER-Y": {
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
          material: polymerizationPreparation,
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

/** 미즈키 */
export const Mizuki: Specialist = {
  id: 201,
  name: "미즈키",
  imageFilename: "mizuki",
  class: "Specialist",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: specialistChip!,
        count: 5,
      },
      {
        material: sugar,
        count: 10,
      },
      {
        material: orirockCube,
        count: 6,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: specialistDualchip,
        count: 4,
      },
      {
        material: polymerizationPreparation,
        count: 4,
      },
      {
        material: crystallineCircuit,
        count: 6,
      },
    ],
  },
  skillList: ["일깨움", "죄수의 딜레마", "경화수월"],
  preferSkillList: ["일깨움"],
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
          material: ester,
          count: 6,
        },
        {
          material: orironShard,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: oriron,
          count: 4,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: polyketon,
          count: 4,
        },
        {
          material: orirockCube,
          count: 5,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: loxicKohl,
          count: 7,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: manganeseOre,
          count: 3,
        },
        {
          material: RMA7012,
          count: 4,
        },
      ],
    },
    일깨움: {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: incandescentAlloyBlock,
          count: 4,
        },
        {
          material: RMA7012,
          count: 5,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: whiteHorseKohl,
          count: 4,
        },
        {
          material: ketonColloid,
          count: 8,
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
          material: orirockConcentration,
          count: 7,
        },
      ],
    },
    "죄수의 딜레마": {
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
          material: incandescentAlloy,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: manganeseTrihydrate,
          count: 4,
        },
        {
          material: optimizedDevice,
          count: 5,
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
          material: whiteHorseKohl,
          count: 4,
        },
      ],
    },
    경화수월: {
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
          material: grindstonePentahydrate,
          count: 4,
        },
        {
          material: whiteHorseKohl,
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
          material: orironBlock,
          count: 4,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "AMB-X",
      name: "사도의 약속",
    },
    {
      type: "AMB-Y",
      name: "검푸른 씨앗",
    },
    {
      type: "ISW-α",
      name: "미즈키의 특별 한정 배지",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "AMB-X",
        name: "사도의 약속",
      },
      level: 2,
    },
    {
      module: {
        type: "ISW-α",
        name: "미즈키의 특별 한정 배지",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "AMB-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: D32Steel,
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
          material: polymerizationPreparation,
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
    "AMB-Y": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: D32Steel,
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
    "ISW-α": {
      "1": [
        {
          material: moduleDataBlock,
          count: 1,
        },
      ],
      "2": [
        {
          material: moduleDataBlock,
          count: 1,
        },
      ],
      "3": [
        {
          material: moduleDataBlock,
          count: 1,
        },
      ],
    },
  },
};

/** 글래디아 */
export const Gladiia: Specialist = {
  id: 191,
  name: "글래디아",
  imageFilename: "gladiia",
  class: "Specialist",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: specialistChip!,
        count: 5,
      },
      {
        material: polyketon,
        count: 7,
      },
      {
        material: sugar,
        count: 4,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: specialistDualchip,
        count: 4,
      },
      {
        material: crystallineElectronicUnit,
        count: 4,
      },
      {
        material: polymerizedGel,
        count: 6,
      },
    ],
  },
  skillList: ["갈증의 대양 절단", "갈증의 노해 장악", "갈증의 소용돌이"],
  preferSkillList: ["갈증의 대양 절단"],
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
          material: diketon,
          count: 6,
        },
        {
          material: orirock,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: device,
          count: 3,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: orirockCube,
          count: 5,
        },
        {
          material: device,
          count: 3,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: incandescentAlloy,
          count: 6,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: orironCluster,
          count: 3,
        },
        {
          material: grindstone,
          count: 5,
        },
      ],
    },
    "갈증의 대양 절단": {
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
          material: D32Steel,
          count: 6,
        },
        {
          material: polymerizedGel,
          count: 5,
        },
      ],
    },
    "갈증의 노해 장악": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: incandescentAlloyBlock,
          count: 4,
        },
        {
          material: RMA7012,
          count: 5,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: whiteHorseKohl,
          count: 4,
        },
        {
          material: ketonColloid,
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
          material: orirockConcentration,
          count: 4,
        },
      ],
    },
    "갈증의 소용돌이": {
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
          material: incandescentAlloy,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: manganeseTrihydrate,
          count: 4,
        },
        {
          material: ketonColloid,
          count: 5,
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
          material: optimizedDevice,
          count: 4,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "HOK-X",
      name: "집정관의 손거울",
    },
    {
      type: "HOK-Y",
      name: "페일 골드 헤어 팬던트",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "HOK-X",
        name: "집정관의 손거울",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "HOK-X": {
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
          material: D32Steel,
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
          material: crystallineElectronicUnit,
          count: 4,
        },
        {
          material: LMD,
          count: 120000,
        },
      ],
    },
    "HOK-Y": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: D32Steel,
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
          material: nucleicCrystalSinter,
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

/** 위디 */
export const Weedy: Specialist = {
  id: 144,
  name: "위디",
  imageFilename: "weedy",
  class: "Specialist",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: specialistChip!,
        count: 5,
      },
      {
        material: device,
        count: 6,
      },
      {
        material: sugar,
        count: 4,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: specialistDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: manganeseTrihydrate,
        count: 6,
      },
    ],
  },
  skillList: ["포관 타격", "물대포 모드", "액체 질소 대포"],
  preferSkillList: ["물대포 모드", "액체 질소 대포"],
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
          material: damagedDevice,
          count: 4,
        },
        {
          material: ester,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: orirockCube,
          count: 7,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: sugar,
          count: 4,
        },
        {
          material: polyketon,
          count: 4,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 8,
        },
        {
          material: loxicKohl,
          count: 7,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: orirockCluster,
          count: 5,
        },
        {
          material: integratedDevice,
          count: 4,
        },
      ],
    },
    "포관 타격": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: manganeseTrihydrate,
          count: 4,
        },
        {
          material: integratedDevice,
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 5,
        },
      ],
    },
    "물대포 모드": {
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: polymerizedGel,
          count: 6,
        },
      ],
    },
    "액체 질소 대포": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: RMA7024,
          count: 4,
        },
        {
          material: manganeseOre,
          count: 5,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: whiteHorseKohl,
          count: 4,
        },
        {
          material: ketonColloid,
          count: 8,
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
      type: "PUS-X",
      name: "시드래곤 개량형",
    },
    {
      type: "PUS-Y",
      name: "신형 바이오닉 프로토타입",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "PUS-X",
        name: "시드래곤 개량형",
      },
      level: 1,
    },
  ],
  moduleMaterials: {
    "PUS-X": {
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
    "PUS-Y": {
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
  },
};

/** 팬텀 */
export const Phantom: Specialist = {
  id: 141,
  name: "팬텀",
  imageFilename: "phantom",
  class: "Specialist",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: specialistChip!,
        count: 5,
      },
      {
        material: polyketon,
        count: 7,
      },
      {
        material: orirockCube,
        count: 7,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: specialistDualchip,
        count: 4,
      },
      {
        material: polymerizationPreparation,
        count: 4,
      },
      {
        material: polymerizedGel,
        count: 9,
      },
    ],
  },
  skillList: ["어두운 밤의 유령", "핏빛 악장", "밤의 장막의 기습"],
  preferSkillList: ["핏빛 악장"],
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
          material: manganeseOre,
          count: 6,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: coagulatingGel,
          count: 4,
        },
        {
          material: orironCluster,
          count: 4,
        },
      ],
    },
    "어두운 밤의 유령": {
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
          material: whiteHorseKohl,
          count: 4,
        },
        {
          material: ketonColloid,
          count: 8,
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
          material: incandescentAlloyBlock,
          count: 6,
        },
      ],
    },
    "핏빛 악장": {
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
          material: manganeseTrihydrate,
          count: 4,
        },
        {
          material: optimizedDevice,
          count: 5,
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
    "밤의 장막의 기습": {
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
          material: grindstonePentahydrate,
          count: 4,
        },
        {
          material: whiteHorseKohl,
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
  },
  moduleList: [
    {
      type: "EXE-X",
      name: "미스 크리스틴의 펠트",
    },
    {
      type: "EXE-Y",
      name: "'그림자처럼'",
    },
    {
      type: "ISW-α",
      name: "팬텀의 특별 한정 배지",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "ISW-α",
        name: "팬텀의 특별 한정 배지",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "EXE-X": {
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
          material: D32Steel,
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
          material: crystallineElectronicUnit,
          count: 4,
        },
        {
          material: LMD,
          count: 120000,
        },
      ],
    },
    "EXE-Y": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: D32Steel,
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
          material: polymerizationPreparation,
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
    "ISW-α": {
      "1": [
        {
          material: moduleDataBlock,
          count: 1,
        },
      ],
      "2": [
        {
          material: moduleDataBlock,
          count: 1,
        },
      ],
      "3": [
        {
          material: moduleDataBlock,
          count: 1,
        },
      ],
    },
  },
};

/** 아 */
export const Aak: Specialist = {
  id: 121,
  name: "아",
  imageFilename: "aak",
  class: "Specialist",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: specialistChip!,
        count: 5,
      },
      {
        material: sugar,
        count: 8,
      },
      {
        material: oriron,
        count: 5,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: specialistDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: polymerizedGel,
        count: 7,
      },
    ],
  },
  skillList: ["쾌속사격", "폭발제γ", "폭발제 (두리안맛)"],
  preferSkillList: ["폭발제 (두리안맛)"],
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
          count: 5,
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
          material: incandescentAlloy,
          count: 6,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: aketon,
          count: 3,
        },
        {
          material: loxicKohl,
          count: 6,
        },
      ],
    },
    쾌속사격: {
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
          material: grindstonePentahydrate,
          count: 4,
        },
        {
          material: whiteHorseKohl,
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
    폭발제γ: {
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
          material: incandescentAlloy,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: RMA7024,
          count: 4,
        },
        {
          material: manganeseTrihydrate,
          count: 7,
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
    "폭발제 (두리안맛)": {
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 5,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "GEE-X",
      name: "모듬 과일맛 의료 상자",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "GEE-X",
        name: "모듬 과일맛 의료 상자",
      },
      level: 1,
    },
  ],
  moduleMaterials: {
    "GEE-X": {
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
          material: D32Steel,
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
          material: crystallineElectronicUnit,
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

// 5성
/** 틴맨 */
export const TinMan: Specialist = {
  id: 338,
  name: "틴맨",
  imageFilename: "tin-man",
  class: "Specialist",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: specialistChip!,
        count: 4,
      },
      {
        material: polyketon,
        count: 4,
      },
      {
        material: orirockCube,
        count: 4,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: specialistDualchip,
        count: 3,
      },
      {
        material: ketonColloid,
        count: 7,
      },
      {
        material: orirockCluster,
        count: 18,
      },
    ],
  },
  skillList: ["'올드 켈리'", "'빅 래리'"],
  preferSkillList: ["'빅 래리'"],
  skillUpgradeMaterials: {
    common: {
      "2": [
        {
          material: skillSummary1,
          count: 4,
        },
      ],
      "3": [
        {
          material: skillSummary1,
          count: 4,
        },
        {
          material: orirock,
          count: 10,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: sugar,
          count: 3,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: polyester,
          count: 5,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: loxicKohl,
          count: 4,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: sugarPack,
          count: 3,
        },
        {
          material: transmutedSalt,
          count: 3,
        },
      ],
    },
    "'올드 켈리'": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: orirockConcentration,
          count: 3,
        },
        {
          material: orironCluster,
          count: 5,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: cuttingFluidSolution,
          count: 3,
        },
        {
          material: RMA7024,
          count: 5,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: crystallineElectronicUnit,
          count: 4,
        },
        {
          material: crystallineCircuit,
          count: 1,
        },
      ],
    },
    "'빅 래리'": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: crystallineCircuit,
          count: 3,
        },
        {
          material: incandescentAlloy,
          count: 1,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: polymerizedGel,
          count: 3,
        },
        {
          material: ketonColloid,
          count: 5,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: bipolarNanoflake,
          count: 4,
        },
        {
          material: transmutedSaltAgglomerate,
          count: 4,
        },
      ],
    },
  },
  moduleList: [{ type: "ALC-X", name: "'골상학'" }],
  moduleMaterials: {
    "ALC-X": {
      1: [
        { material: moduleDataBlock, count: 2 },
        { material: cuttingFluidSolution, count: 3 },
        { material: LMD, count: 40000 },
      ],
      2: [
        { material: moduleDataBlock, count: 2 },
        { material: dataSupplementStick, count: 20 },
        { material: solidifiedFiberBoard, count: 4 },
        { material: LMD, count: 50000 },
      ],
      3: [
        { material: moduleDataBlock, count: 2 },
        { material: dataSupplementInstrument, count: 8 },
        { material: polymerizedGel, count: 5 },
        { material: LMD, count: 60000 },
      ],
    },
  },
};

// 스페셜리스트 오퍼레이터 리스트 계열
const sixStarSpecialistList: Specialist[] = [
  ExusiaiTheNewCovenant,
  ThornsTheLodestar,
  Crownslayer,
  Ascalon,
  Ela,
  SwireTheElegantWit,
  KirinRYato,
  TexasTheOmertosa,
  Dorothy,
  SpecterTheUnchained,
  Lee,
  Mizuki,
  Gladiia,
  Weedy,
  Phantom,
  Aak,
];
const fiveStarSpecialistList: Specialist[] = [TinMan];
const fourStarSpecialistList: Specialist[] = [];
const threeStarSpecialistList: Specialist[] = [];
const twoStarSpecialistList: Specialist[] = [];
const oneStarSpecialistList: Specialist[] = [];

/** 스페셜리스트 오퍼레이터 리스트 */
export const specialistList: Specialist[] = [
  ...sixStarSpecialistList,
  ...fiveStarSpecialistList,
  ...fourStarSpecialistList,
  ...threeStarSpecialistList,
  ...twoStarSpecialistList,
  ...oneStarSpecialistList,
];
