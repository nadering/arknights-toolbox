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
  sugar,
  sugarPack,
  sugarSubstitute,
  transmutedSaltAgglomerate,
  vanguardChip,
  vanguardChipPack,
  vanguardDualchip,
  whiteHorseKohl,
} from "@/data/material";

// 뱅가드

/** 뱅가드 세부 직군 리스트 */
export const VanguardBranchList = [
  "Pioneer", // 척후병
  "Charger", // 돌격수
  "Standard-Bearer", // 기수
  "Tactician", // 전술가
  "Agent", // 에이전트
] as const;

/** 뱅가드 세부 직군 */
export type VanguardBranch = (typeof VanguardBranchList)[number];

/** 뱅가드 오퍼레이터 */
export interface Vanguard extends Operator {
  /** 세부 직군 */
  branch?: VanguardBranch;
}

// 6성
/** 불피스폴리아 */
export const Vulpisfoglia: Vanguard = {
  id: 351,
  name: "불피스폴리아",
  imageFilename: "vulpisfoglia",
  class: "Vanguard",
  branch: "Pioneer",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: vanguardChip!, count: 5 },
      { material: polyester, count: 10 },
      { material: polyketon, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: vanguardDualchip, count: 4 },
      { material: nucleicCrystalSinter, count: 4 },
      { material: cyclicenePrefab, count: 2 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["가벼운 징계", "단검 낙하 고문", "은밀한 여우의 기교"],
  preferSkillList: ["은밀한 여우의 기교"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 5 }],
      3: [
        { material: skillSummary1, count: 5 },
        { material: diketon, count: 6 },
        { material: orirock, count: 4 },
      ],
      4: [
        { material: skillSummary2, count: 8 },
        { material: device, count: 3 },
      ],
      5: [
        { material: skillSummary2, count: 8 },
        { material: orirockCube, count: 5 },
        { material: device, count: 3 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: crystallineComponent, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: aketon, count: 5 },
        { material: orirockCluster, count: 4 },
      ],
    },
    "가벼운 징계": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: manganeseTrihydrate, count: 4 },
        { material: aggregateCyclicene, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: solidifiedFiberBoard, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: polymerizedGel, count: 7 },
      ],
    },
    "단검 낙하 고문": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cyclicenePrefab, count: 4 },
        { material: manganeseOre, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orironBlock, count: 4 },
        { material: grindstonePentahydrate, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: orirockConcentration, count: 7 },
      ],
    },
    "은밀한 여우의 기교": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: fuscousFiber, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: RMA7024, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: incandescentAlloyBlock, count: 2 },
      ],
    },
  },
  moduleList: [{ type: "SOL-X", name: "히트맨에게도 필요한 휴가" }],
  preferModuleList: [
    {
      module: {
        type: "SOL-X",
        name: "히트맨에게도 필요한 휴가",
      },
      level: 1,
    },
  ],
  moduleMaterials: {
    "SOL-X": {
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

/** 뮤엘시스 */
export const Muelsyse: Vanguard = {
  id: 280,
  name: "뮤엘시스",
  imageFilename: "muelsyse",
  class: "Vanguard",
  branch: "Tactician",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: vanguardChip!, count: 5 },
      { material: sugar, count: 10 },
      { material: orirockCube, count: 6 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: vanguardDualchip, count: 4 },
      { material: bipolarNanoflake, count: 4 },
      { material: grindstonePentahydrate, count: 5 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["점진적 습윤화", "생태학적 상호작용", "표면적 비엔트로피 적응"],
  preferSkillList: ["생태학적 상호작용", "표면적 비엔트로피 적응"],
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
        { material: coagulatingGel, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: integratedDevice, count: 4 },
        { material: orirockCluster, count: 5 },
      ],
    },
    "점진적 습윤화": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orirockConcentration, count: 4 },
        { material: grindstone, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: cuttingFluidSolution, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: orironBlock, count: 3 },
      ],
    },
    "생태학적 상호작용": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: RMA7024, count: 4 },
        { material: polyesterPack, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: whiteHorseKohl, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: incandescentAlloyBlock, count: 4 },
      ],
    },
    "표면적 비엔트로피 적응": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: manganeseTrihydrate, count: 4 },
        { material: orirockCluster, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orironBlock, count: 4 },
        { material: grindstonePentahydrate, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: whiteHorseKohl, count: 7 },
      ],
    },
  },
  moduleList: [{ type: "TAC-X", name: "드레서 유동체" }],
  preferModuleList: [
    {
      module: {
        type: "TAC-X",
        name: "드레서 유동체",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "TAC-X": {
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
        { material: crystallineElectronicUnit, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 이네스 */
export const Ines: Vanguard = {
  id: 276,
  name: "이네스",
  imageFilename: "ines",
  class: "Vanguard",
  branch: "Agent",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: vanguardChip!, count: 5 },
      { material: orirockCube, count: 12 },
      { material: device, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: vanguardDualchip, count: 4 },
      { material: polymerizationPreparation, count: 4 },
      { material: crystallineCircuit, count: 4 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["그림자 습격", "어두운 밤", "고독한 귀환"],
  preferSkillList: ["어두운 밤"],
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
        { material: incandescentAlloy, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: coagulatingGel, count: 5 },
        { material: polyesterPack, count: 3 },
      ],
    },
    "그림자 습격": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: integratedDevice, count: 5 },
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
    "어두운 밤": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: crystallineComponent, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: polymerizedGel, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: ketonColloid, count: 5 },
      ],
    },
    "고독한 귀환": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: sugarPack, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: optimizedDevice, count: 4 },
        { material: orironBlock, count: 5 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: refinedSolvent, count: 6 },
      ],
    },
  },
  moduleList: [],
  moduleMaterials: null,
};

/** 비질 */
export const Vigil: Vanguard = {
  id: 259,
  name: "비질",
  imageFilename: "vigil",
  class: "Vanguard",
  branch: "Tactician",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: vanguardChip!, count: 5 },
      { material: orirockCube, count: 11 },
      { material: oriron, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: vanguardDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 3 },
      { material: optimizedDevice, count: 4 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["두목의 부름", "두목의 선물", "두목의 위엄"],
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
        { material: manganeseOre, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: RMA7012, count: 4 },
        { material: loxicKohl, count: 3 },
      ],
    },
    "두목의 부름": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: RMA7024, count: 4 },
        { material: crystallineComponent, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: whiteHorseKohl, count: 4 },
        { material: transmutedSaltAgglomerate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: crystallineCircuit, count: 5 },
      ],
    },
    "두목의 선물": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: ketonColloid, count: 4 },
        { material: compoundCuttingFluid, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: optimizedDevice, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: orironBlock, count: 5 },
      ],
    },
    "두목의 위엄": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: incandescentAlloy, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: RMA7024, count: 4 },
        { material: whiteHorseKohl, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: manganeseTrihydrate, count: 4 },
      ],
    },
  },
  moduleList: [{ type: "TAC-X", name: "시라쿠사 입문 의식" }],
  moduleMaterials: {
    "TAC-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: nucleicCrystalSinter, count: 2 },
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

/** 플레임테일 (불꼬리) */
export const Flametail: Vanguard = {
  id: 213,
  name: "플레임테일",
  nicknameList: ["불꼬리"],
  imageFilename: "flametail",
  class: "Vanguard",
  branch: "Pioneer",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: vanguardChip!,
        count: 5,
      },
      {
        material: orirockCube,
        count: 12,
      },
      {
        material: polyester,
        count: 5,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: vanguardDualchip,
        count: 4,
      },
      {
        material: bipolarNanoflake,
        count: 4,
      },
      {
        material: orirockConcentration,
        count: 9,
      },
    ],
  },
  skillList: ["예리한 직감", "'피누스 실베스트리스'", "불꽃의 마음"],
  preferSkillList: ["불꽃의 마음"],
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
          material: RMA7012,
          count: 4,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: crystallineComponent,
          count: 4,
        },
        {
          material: coagulatingGel,
          count: 4,
        },
      ],
    },
    "예리한 직감": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: whiteHorseKohl,
          count: 4,
        },
        {
          material: aketon,
          count: 8,
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
          material: optimizedDevice,
          count: 4,
        },
      ],
    },
    "'피누스 실베스트리스'": {
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
          material: compoundCuttingFluid,
          count: 5,
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
          material: incandescentAlloyBlock,
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
          material: orironBlock,
          count: 5,
        },
      ],
    },
    "불꽃의 마음": {
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
          material: ketonColloid,
          count: 4,
        },
        {
          material: cuttingFluidSolution,
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
          material: ketonColloid,
          count: 5,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "SOL-X",
      name: "그녀들의 미래",
    },
    {
      type: "SOL-Y",
      name: "피누스 실베스트리스의 출발점",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "SOL-Y",
        name: "피누스 실베스트리스의 출발점",
      },
      level: 1,
    },
  ],
  moduleMaterials: {
    "SOL-X": {
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
    "SOL-Y": {
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

/** 사일라흐 (젖틀) */
export const Saileach: Vanguard = {
  id: 204,
  name: "사일라흐",
  nicknameList: ["젖틀"],
  imageFilename: "saileach",
  class: "Vanguard",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: vanguardChip!,
        count: 5,
      },
      {
        material: oriron,
        count: 7,
      },
      {
        material: polyester,
        count: 4,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: vanguardDualchip,
        count: 4,
      },
      {
        material: crystallineElectronicUnit,
        count: 4,
      },
      {
        material: refinedSolvent,
        count: 6,
      },
    ],
  },
  skillList: ["지원지령γ", "신앙의 전승", "찬란한 깃발"],
  preferSkillList: ["지원지령γ", "찬란한 깃발"],
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
          material: semiSyntheticSolvent,
          count: 5,
        },
      ],
    },
    지원지령γ: {
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
    "신앙의 전승": {
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
          material: cuttingFluidSolution,
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
          count: 6,
        },
      ],
    },
    "찬란한 깃발": {
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
          material: cuttingFluidSolution,
          count: 4,
        },
        {
          material: optimizedDevice,
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
          material: crystallineCircuit,
          count: 4,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "BEA-X",
      name: "목동의 노래",
    },
  ],
  moduleMaterials: {
    "BEA-X": {
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

// 4성
/** 머틀 */
export const Myrtle: Vanguard = {
  id: 101,
  name: "머틀",
  imageFilename: "myrtle",
  class: "Vanguard",
  branch: "Standard-Bearer",
  rarity: 4,
  eliteMaterials: {
    0: [],
    1: [
      { material: vanguardChip!, count: 3 },
      { material: polyketon, count: 1 },
      { material: oriron, count: 1 },
      { material: LMD, count: 15000 },
    ],
    2: [
      { material: vanguardChipPack!, count: 5 },
      { material: grindstone, count: 12 },
      { material: integratedDevice, count: 8 },
      { material: LMD, count: 60000 },
    ],
  },
  skillList: ["지원지령β", "치유의 날개"],
  preferSkillList: ["지원지령β"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 2 }],
      3: [
        { material: skillSummary1, count: 2 },
        { material: diketon, count: 3 },
      ],
      4: [
        { material: skillSummary2, count: 3 },
        { material: device, count: 1 },
      ],
      5: [
        { material: skillSummary2, count: 3 },
        { material: orirockCube, count: 4 },
      ],
      6: [
        { material: skillSummary2, count: 3 },
        { material: sugarPack, count: 3 },
      ],
      7: [
        { material: skillSummary3, count: 4 },
        { material: polyesterPack, count: 3 },
      ],
    },
    지원지령β: {
      8: [
        { material: skillSummary3, count: 2 },
        { material: orironBlock, count: 1 },
        { material: sugarPack, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 4 },
        { material: optimizedDevice, count: 1 },
        { material: orironBlock, count: 2 },
      ],
      10: [
        { material: skillSummary3, count: 6 },
        { material: polymerizationPreparation, count: 2 },
        { material: grindstonePentahydrate, count: 2 },
      ],
    },
    "치유의 날개": {
      8: [
        { material: skillSummary3, count: 2 },
        { material: ketonColloid, count: 1 },
        { material: polyesterPack, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 4 },
        { material: whiteHorseKohl, count: 2 },
        { material: ketonColloid, count: 2 },
      ],
      10: [
        { material: skillSummary3, count: 6 },
        { material: bipolarNanoflake, count: 2 },
        { material: manganeseTrihydrate, count: 2 },
      ],
    },
  },
  moduleList: [{ type: "BEA-X", name: `'개인소장'` }],
  moduleMaterials: {
    "BEA-X": {
      1: [
        { material: moduleDataBlock, count: 1 },
        { material: RMA7012, count: 4 },
        { material: LMD, count: 20000 },
      ],
      2: [
        { material: moduleDataBlock, count: 1 },
        { material: dataSupplementStick, count: 15 },
        { material: polyesterPack, count: 5 },
        { material: LMD, count: 25000 },
      ],
      3: [
        { material: moduleDataBlock, count: 1 },
        { material: dataSupplementInstrument, count: 5 },
        { material: compoundCuttingFluid, count: 6 },
        { material: LMD, count: 30000 },
      ],
    },
  },
};

// 뱅가드 오퍼레이터 리스트 계열
const sixStarVanguardList: Vanguard[] = [
  Vulpisfoglia,
  Muelsyse,
  Ines,
  Vigil,
  Flametail,
  Saileach,
];
const fiveStarVanguardList: Vanguard[] = [];
const fourStarVanguardList: Vanguard[] = [Myrtle];
const threeStarVanguardList: Vanguard[] = [];
const twoStarVanguardList: Vanguard[] = [];
const oneStarVanguardList: Vanguard[] = [];

/** 뱅가드 오퍼레이터 리스트 */
export const vanguardList: Vanguard[] = [
  ...sixStarVanguardList,
  ...fiveStarVanguardList,
  ...fourStarVanguardList,
  ...threeStarVanguardList,
  ...twoStarVanguardList,
  ...oneStarVanguardList,
];
