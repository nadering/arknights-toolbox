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
  defenderChip,
  defenderDualchip,
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
  polyesterLump,
  polyesterPack,
  polyketon,
  polymerizationPreparation,
  polymerizedGel,
  pseudocondensationNucleus,
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

// 디펜더

/** 디펜더 세부 직군 리스트 */
export const DefenderBranchList = [
  "Protector", // 프로텍터
  "Guardian", // 가디언
  "Juggernaut", // 저거너트
  "Arts-Protector", // 아츠 프로텍터
  "Duelist", // 결전자
  "Fortress", // 포트리스
  "Sentry-Protector", // 센트리 프로텍터
  "Primal-Protector", // 프라이멀 프로텍터
] as const;

/** 디펜더 세부 직군 */
export type DefenderBranch = (typeof DefenderBranchList)[number];

/** 디펜더 오퍼레이터 */
export interface Defender extends Operator {
  /** 세부 직군 */
  branch?: DefenderBranch;
}

// 6성
/** 호시구마 더 브리처 (수구마) */
export const HoshigumaTheBreacher: Defender = {
  id: 380,
  name: "호시구마 더 브리처",
  nicknameList: ["수구마"],
  imageFilename: "hoshiguma-the-breacher",
  class: "Defender",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: defenderChip!,
        count: 5,
      },
      {
        material: oriron,
        count: 7,
      },
      {
        material: sugar,
        count: 5,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: defenderDualchip,
        count: 4,
      },
      {
        material: biphasicEnantiomorphicMedium,
        count: 4,
      },
      {
        material: chiralRefractor,
        count: 2,
      },
    ],
  },
  skillList: ["악행의 말로", "시작이 없다면 빛도 없으리", "지옥변상"],
  preferSkillList: ["시작이 없다면 빛도 없으리", "지옥변상"],
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
          material: fuscousFiber,
          count: 5,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: orironCluster,
          count: 5,
        },
        {
          material: aketon,
          count: 3,
        },
      ],
    },
    "악행의 말로": {
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
          material: orironCluster,
          count: 6,
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
          material: biphasicEnantiomorphicMedium,
          count: 6,
        },
        {
          material: refinedSolvent,
          count: 1,
        },
      ],
    },
    "시작이 없다면 빛도 없으리": {
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
          material: orirockCluster,
          count: 6,
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
          material: cuttingFluidSolution,
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
          material: solidifiedFiberBoard,
          count: 6,
        },
      ],
    },
    지옥변상: {
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
          material: grindstone,
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
          material: D32Steel,
          count: 6,
        },
        {
          material: chiralRefractor,
          count: 6,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "AST-X",
      name: "무흔",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "AST-X",
        name: "무흔",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "AST-X": {
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
          material: nucleicCrystalSinter,
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

/** 산크타 믹사파라토 */
export const SanktaMiksaparato: Defender = {
  id: 369,
  name: "산크타 믹사파라토",
  imageFilename: "sankta-miksaparato",
  class: "Defender",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: defenderChip!,
        count: 5,
      },
      {
        material: orirockCube,
        count: 12,
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
        material: defenderDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: crystallineCircuit,
        count: 5,
      },
    ],
  },
  skillList: ["총기사 시험관", "여덟팔 전기톱맨", "은퇴 전 포교"],
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
          material: aggregateCyclicene,
          count: 5,
        },
        {
          material: semiSyntheticSolvent,
          count: 2,
        },
      ],
    },
    "총기사 시험관": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: cuttingFluidSolution,
          count: 4,
        },
        {
          material: aketon,
          count: 7,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: solidifiedFiberBoard,
          count: 4,
        },
        {
          material: RMA7024,
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
          material: incandescentAlloyBlock,
          count: 6,
        },
      ],
    },
    "여덟팔 전기톱맨": {
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
          material: coagulatingGel,
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
          material: D32Steel,
          count: 6,
        },
        {
          material: ketonColloid,
          count: 5,
        },
      ],
    },
    "은퇴 전 포교": {
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
          material: pseudocondensationNucleus,
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
          material: nucleicCrystalSinter,
          count: 6,
        },
        {
          material: cyclicenePrefab,
          count: 2,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "SPT-X",
      name: "갑옷 청소용 브러시 세트",
    },
  ],
  moduleMaterials: {
    "SPT-X": {
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
          material: nucleicCrystalSinter,
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

/** 위 */
export const Yu: Defender = {
  id: 357,
  name: "위",
  imageFilename: "yu",
  class: "Defender",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: defenderChip!,
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
        material: defenderDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: incandescentAlloyBlock,
        count: 5,
      },
    ],
  },
  skillList: ["오늘의 주인공", "귀빈 대접", "부엌 속 세상"],
  preferSkillList: ["귀빈 대접", "부엌 속 세상"],
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
          material: polyesterPack,
          count: 2,
        },
      ],
    },
    "오늘의 주인공": {
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
          material: RMA7012,
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
          material: grindstonePentahydrate,
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
    "귀빈 대접": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: cuttingFluidSolution,
          count: 4,
        },
        {
          material: semiSyntheticSolvent,
          count: 6,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: solidifiedFiberBoard,
          count: 4,
        },
        {
          material: RMA7024,
          count: 7,
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
          material: incandescentAlloyBlock,
          count: 2,
        },
      ],
    },
    "부엌 속 세상": {
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
          material: sugarPack,
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
          material: crystallineElectronicUnit,
          count: 6,
        },
        {
          material: ketonColloid,
          count: 1,
        },
      ],
    },
  },
  moduleList: [],
  moduleMaterials: null,
};

/** 슈 */
export const Shu: Defender = {
  id: 314,
  name: "슈",
  imageFilename: "shu",
  class: "Defender",
  branch: "Guardian",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: defenderChip!, count: 5 },
      { material: oriron, count: 8 },
      { material: polyketon, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: defenderDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 3 },
      { material: cuttingFluidSolution, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["은택 받은 초목", "가득 쌓인 곡식", "우거진 성쇠"],
  preferSkillList: ["우거진 성쇠"],
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
        { material: transmutedSalt, count: 5 },
        { material: RMA7012, count: 3 },
      ],
    },
    "은택 받은 초목": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: compoundCuttingFluid, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: transmutedSaltAgglomerate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: cuttingFluidSolution, count: 6 },
      ],
    },
    "가득 쌓인 곡식": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: loxicKohl, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: whiteHorseKohl, count: 4 },
        { material: orironBlock, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: orironBlock, count: 3 },
      ],
    },
    "우거진 성쇠": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orirockConcentration, count: 4 },
        { material: incandescentAlloy, count: 9 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: orirockConcentration, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: grindstonePentahydrate, count: 4 },
      ],
    },
  },
  moduleList: [{ type: "GUA-X", name: "'시간 제정에 관해'" }],
  preferModuleList: [
    {
      module: { type: "GUA-X", name: "'시간 제정에 관해'" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "GUA-X": {
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

/** 제시카 더 리버레이티드 (빵시카) */
export const JessicaTheLiberated: Defender = {
  id: 294,
  name: "제시카 더 리버레이티드",
  nicknameList: ["빵시카"],
  imageFilename: "jessica-the-liberated",
  class: "Defender",
  branch: "Sentry-Protector",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: defenderChip!, count: 5 },
      { material: polyester, count: 10 },
      { material: polyketon, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: defenderDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 4 },
      { material: optimizedDevice, count: 4 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["전선 고수", "엄폐 호위", "집중 사격"],
  preferSkillList: ["집중 사격"],
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
        { material: grindstone, count: 5 },
        { material: transmutedSalt, count: 3 },
      ],
    },
    "전선 고수": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: optimizedDevice, count: 3 },
        { material: transmutedSalt, count: 4 },
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
    "엄폐 호위": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: whiteHorseKohl, count: 4 },
        { material: manganeseOre, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: orironBlock, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: manganeseTrihydrate, count: 5 },
      ],
    },
    "집중 사격": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: integratedDevice, count: 4 },
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
  moduleList: [{ type: "SPT-X", name: "'나만의 영웅'" }],
  preferModuleList: [
    {
      module: { type: "SPT-X", name: "'나만의 영웅'" },
      level: 1,
    },
  ],
  moduleMaterials: {
    "SPT-X": {
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

/** 페넌스 */
export const Penance: Defender = {
  id: 258,
  name: "페넌스",
  imageFilename: "penance",
  class: "Defender",
  branch: "Juggernaut",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: defenderChip!, count: 5 },
      { material: device, count: 6 },
      { material: oriron, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: defenderDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: whiteHorseKohl, count: 8 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["최종 판결", "결의에 찬 고행", "고난 극복"],
  preferSkillList: ["고난 극복"],
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
        { material: grindstone, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: manganeseOre, count: 5 },
        { material: aketon, count: 3 },
      ],
    },
    "최종 판결": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: orironCluster, count: 6 },
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
    "결의에 찬 고행": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: polymerizedGel, count: 4 },
        { material: RMA7012, count: 6 },
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
    "고난 극복": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orironBlock, count: 4 },
        { material: loxicKohl, count: 4 },
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
    { type: "UNY-X", name: "계속되는 가시밭길" },
    { type: "UNY-Y", name: "'무죄'" },
  ],
  preferModuleList: [
    {
      module: { type: "UNY-X", name: "계속되는 가시밭길" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "UNY-X": {
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
    "UNY-Y": {
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

/** 혼 */
export const Horn: Defender = {
  id: 231,
  name: "혼",
  imageFilename: "horn",
  class: "Defender",
  branch: "Fortress",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: defenderChip!, count: 5 },
      { material: orirockCube, count: 12 },
      { material: sugar, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: defenderDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: orironBlock, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["조명 유탄", "폭풍의 호령", "최종 방어선"],
  preferSkillList: ["조명 유탄"],
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
        { material: orironCluster, count: 3 },
        { material: compoundCuttingFluid, count: 5 },
      ],
    },
    "조명 유탄": {
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
        { material: D32Steel, count: 6 },
        { material: RMA7024, count: 5 },
      ],
    },
    "폭풍의 호령": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: incandescentAlloy, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: grindstonePentahydrate, count: 4 },
        { material: whiteHorseKohl, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: polymerizedGel, count: 4 },
      ],
    },
    "최종 방어선": {
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
        { material: polymerizationPreparation, count: 6 },
        { material: cuttingFluidSolution, count: 6 },
      ],
    },
  },
  moduleList: [
    { type: "FOR-X", name: "'모범적인 사람'" },
    { type: "FOR-Y", name: "오래된 옷, 새로운 날" },
  ],
  preferModuleList: [
    { module: { type: "FOR-X", name: "'모범적인 사람'" }, level: 1 },
  ],
  moduleMaterials: {
    "FOR-X": {
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
    "FOR-Y": {
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

/** 머드락 */
export const Mudrock: Defender = {
  id: 168,
  name: "머드락",
  imageFilename: "mudrock",
  class: "Defender",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: defenderChip!,
        count: 5,
      },
      {
        material: orirockCube,
        count: 12,
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
        material: defenderDualchip,
        count: 4,
      },
      {
        material: crystallineElectronicUnit,
        count: 4,
      },
      {
        material: incandescentAlloyBlock,
        count: 5,
      },
    ],
  },
  skillList: ["방어 강화γ", "바위를 깨는 망치", "더러운 대지의 핏줄"],
  preferSkillList: ["바위를 깨는 망치"],
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
          material: aketon,
          count: 6,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: integratedDevice,
          count: 3,
        },
        {
          material: coagulatingGel,
          count: 4,
        },
      ],
    },
    "방어 강화γ": {
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
          material: crystallineCircuit,
          count: 4,
        },
      ],
    },
    "바위를 깨는 망치": {
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
          material: coagulatingGel,
          count: 3,
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
          material: polymerizationPreparation,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 6,
        },
      ],
    },
    "더러운 대지의 핏줄": {
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
      type: "UNY-X",
      name: "흙과 돌의 뿌리",
    },
    {
      type: "UNY-Y",
      name: "비옥한 땅의 전망",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "UNY-X",
        name: "흙과 돌의 뿌리",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "UNY-X": {
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
    "UNY-Y": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: biphasicEnantiomorphicMedium,
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

/** 블레미샤인 */
export const Blemishine: Defender = {
  id: 164,
  name: "블레미샤인",
  imageFilename: "blemishine",
  class: "Defender",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: defenderChip!,
        count: 5,
      },
      {
        material: device,
        count: 5,
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
        material: defenderDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: RMA7024,
        count: 7,
      },
    ],
  },
  skillList: ["용솟음치는 빛", "압도적인 빛", "선현의 화신"],
  preferSkillList: ["압도적인 빛"],
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
          material: aketon,
          count: 6,
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
    "용솟음치는 빛": {
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
          material: ketonColloid,
          count: 5,
        },
      ],
    },
    "압도적인 빛": {
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
    "선현의 화신": {
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
      type: "GUA-X",
      name: "'기사장'",
    },
    {
      type: "GUA-Y",
      name: "장인들의 메아리",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "GUA-Y",
        name: "장인들의 메아리",
      },
      level: 1,
    },
  ],
  moduleMaterials: {
    "GUA-X": {
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
    "GUA-Y": {
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

/** 유넥티스 */
export const Eunectes: Defender = {
  id: 155,
  name: "유넥티스",
  imageFilename: "eunectes",
  class: "Defender",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: defenderChip!,
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
        material: defenderDualchip,
        count: 4,
      },
      {
        material: bipolarNanoflake,
        count: 4,
      },
      {
        material: polymerizedGel,
        count: 7,
      },
    ],
  },
  skillList: ["경량형 도끼", "위압적인 내려찍기", "강철의 의지"],
  preferSkillList: ["강철의 의지"],
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
          material: integratedDevice,
          count: 3,
        },
        {
          material: coagulatingGel,
          count: 4,
        },
      ],
    },
    "경량형 도끼": {
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: grindstonePentahydrate,
          count: 5,
        },
      ],
    },
    "위압적인 내려찍기": {
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
          material: ketonColloid,
          count: 5,
        },
      ],
    },
    "강철의 의지": {
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
  },
  moduleList: [
    {
      type: "HES-X",
      name: "주마마의 공구함",
    },
    {
      type: "HES-Y",
      name: "'작고 못생긴 것'",
    },
    {
      type: "RA-α",
      name: "유넥티스의 특별 한정 배지",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "HES-X",
        name: "주마마의 공구함",
      },
      level: 1,
    },
    {
      module: {
        type: "RA-α",
        name: "유넥티스의 특별 한정 배지",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "HES-X": {
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
    "HES-Y": {
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
    "RA-α": {
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

/** 니엔 */
export const Nian: Defender = {
  id: 120,
  name: "니엔",
  imageFilename: "nian",
  class: "Defender",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: defenderChip!,
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
        material: defenderDualchip,
        count: 4,
      },
      {
        material: polymerizationPreparation,
        count: 4,
      },
      {
        material: incandescentAlloyBlock,
        count: 7,
      },
    ],
  },
  skillList: ["달아오른 주석", "동의 인장", "철의 방어"],
  preferSkillList: ["동의 인장"],
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
          material: orironCluster,
          count: 3,
        },
        {
          material: grindstone,
          count: 5,
        },
      ],
    },
    "달아오른 주석": {
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: polymerizedGel,
          count: 6,
        },
      ],
    },
    "동의 인장": {
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
          material: polymerizedGel,
          count: 7,
        },
      ],
    },
    "철의 방어": {
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
          material: D32Steel,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 6,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "PRO-X",
      name: "혼돈의 진열",
    },
    {
      type: "PRO-Y",
      name: "'노크 금지'",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "PRO-X",
        name: "혼돈의 진열",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "PRO-X": {
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
    "PRO-Y": {
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

/** 호시구마 */
export const Hoshiguma: Defender = {
  id: 82,
  name: "호시구마",
  imageFilename: "hoshiguma",
  class: "Defender",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: defenderChip!,
        count: 5,
      },
      {
        material: orirockCube,
        count: 11,
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
        material: defenderDualchip,
        count: 4,
      },
      {
        material: polymerizationPreparation,
        count: 4,
      },
      {
        material: grindstonePentahydrate,
        count: 5,
      },
    ],
  },
  skillList: ["전의 고양", "가시덤불", "반야회전참"],
  preferSkillList: ["가시덤불"],
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
          material: RMA7012,
          count: 6,
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
    "전의 고양": {
      "8": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: sugarLump,
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
          material: ketonColloid,
          count: 4,
        },
        {
          material: polyesterLump,
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
          material: grindstonePentahydrate,
          count: 6,
        },
      ],
    },
    가시덤불: {
      "8": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: polyesterLump,
          count: 4,
        },
        {
          material: orirockCluster,
          count: 8,
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
          material: polyesterLump,
          count: 6,
        },
      ],
    },
    반야회전참: {
      "8": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: orironBlock,
          count: 4,
        },
        {
          material: sugarPack,
          count: 4,
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
          material: whiteHorseKohl,
          count: 7,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "PRO-X",
      name: "호신 부적",
    },
    {
      type: "PRO-Y",
      name: "친구들의 선물",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "PRO-X",
        name: "호신 부적",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "PRO-X": {
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
          material: crystallineElectronicUnit,
          count: 4,
        },
        {
          material: LMD,
          count: 120000,
        },
      ],
    },
    "PRO-Y": {
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

/** 사리아 */
export const Saria: Defender = {
  id: 77,
  name: "사리아",
  imageFilename: "saria",
  class: "Defender",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: defenderChip!,
        count: 5,
      },
      {
        material: sugar,
        count: 8,
      },
      {
        material: polyketon,
        count: 5,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: defenderDualchip,
        count: 4,
      },
      {
        material: bipolarNanoflake,
        count: 4,
      },
      {
        material: manganeseTrihydrate,
        count: 5,
      },
    ],
  },
  skillList: ["응급처치", "약제 배급", "칼슘화"],
  preferSkillList: ["응급처치", "약제 배급", "칼슘화"],
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
          material: orirockCluster,
          count: 8,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: sugarPack,
          count: 4,
        },
        {
          material: orironCluster,
          count: 5,
        },
      ],
    },
    응급처치: {
      "8": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: polyesterLump,
          count: 4,
        },
        {
          material: orirockCluster,
          count: 8,
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
          material: manganeseTrihydrate,
          count: 5,
        },
      ],
    },
    "약제 배급": {
      "8": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: orironBlock,
          count: 4,
        },
        {
          material: sugarPack,
          count: 4,
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: ketonColloid,
          count: 5,
        },
      ],
    },
    칼슘화: {
      "8": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: ketonColloid,
          count: 4,
        },
        {
          material: polyesterPack,
          count: 6,
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
          material: RMA7024,
          count: 6,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "GUA-X",
      name: "방치된 복싱 글러브",
    },
    {
      type: "GUA-Y",
      name: "과학계 신성",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "GUA-X",
        name: "방치된 복싱 글러브",
      },
      level: 2,
    },
  ],
  moduleMaterials: {
    "GUA-X": {
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
    "GUA-Y": {
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
  },
};

// 5성
/** 센시 */
export const Senshi: Defender = {
  id: 340,
  name: "센시",
  imageFilename: "senshi",
  class: "Defender",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: defenderChip!,
        count: 4,
      },
      {
        material: sugar,
        count: 4,
      },
      {
        material: polyester,
        count: 3,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: defenderDualchip,
        count: 3,
      },
      {
        material: cyclicenePrefab,
        count: 7,
      },
      {
        material: polyesterPack,
        count: 14,
      },
    ],
  },
  skillList: ["1인분 요리", "연회용 마물 요리"],
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
          material: orironShard,
          count: 5,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: polyketon,
          count: 3,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: device,
          count: 3,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: fuscousFiber,
          count: 3,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: coagulatingGel,
          count: 3,
        },
        {
          material: sugarPack,
          count: 3,
        },
      ],
    },
    "1인분 요리": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: transmutedSaltAgglomerate,
          count: 3,
        },
        {
          material: incandescentAlloy,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: RMA7024,
          count: 3,
        },
        {
          material: cyclicenePrefab,
          count: 5,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: polymerizationPreparation,
          count: 4,
        },
        {
          material: refinedSolvent,
          count: 4,
        },
      ],
    },
    "연회용 마물 요리": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: orironBlock,
          count: 3,
        },
        {
          material: polyesterPack,
          count: 1,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: crystallineCircuit,
          count: 3,
        },
        {
          material: refinedSolvent,
          count: 5,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: D32Steel,
          count: 4,
        },
        {
          material: optimizedDevice,
          count: 3,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "GUA-Y",
      name: "마법과는 연이 없는 조리 기술",
    },
  ],
  moduleMaterials: {
    "GUA-Y": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: refinedSolvent,
          count: 3,
        },
        {
          material: LMD,
          count: 40000,
        },
      ],
      "2": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: dataSupplementStick,
          count: 20,
        },
        {
          material: cuttingFluidSolution,
          count: 4,
        },
        {
          material: LMD,
          count: 50000,
        },
      ],
      "3": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: dataSupplementInstrument,
          count: 8,
        },
        {
          material: optimizedDevice,
          count: 5,
        },
        {
          material: LMD,
          count: 60000,
        },
      ],
    },
  },
};

/** 언더플로우 */
export const Underflow: Defender = {
  id: 329,
  name: "언더플로우",
  imageFilename: "underflow",
  class: "Defender",
  branch: "Sentry-Protector",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: defenderChip!,
        count: 4,
      },
      {
        material: polyester,
        count: 5,
      },
      {
        material: polyketon,
        count: 2,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: defenderDualchip,
        count: 3,
      },
      {
        material: incandescentAlloyBlock,
        count: 8,
      },
      {
        material: fuscousFiber,
        count: 9,
      },
    ],
  },
  skillList: ["침입파괴 대응", "행동능력 박탈"],
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
          material: diketon,
          count: 5,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: device,
          count: 2,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: orirockCube,
          count: 8,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: compoundCuttingFluid,
          count: 4,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: RMA7012,
          count: 3,
        },
        {
          material: incandescentAlloy,
          count: 2,
        },
      ],
    },
    "침입파괴 대응": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: RMA7024,
          count: 3,
        },
        {
          material: polyesterPack,
          count: 3,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: optimizedDevice,
          count: 3,
        },
        {
          material: incandescentAlloyBlock,
          count: 4,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: polymerizationPreparation,
          count: 4,
        },
        {
          material: ketonColloid,
          count: 4,
        },
      ],
    },
    "행동능력 박탈": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: ketonColloid,
          count: 3,
        },
        {
          material: semiSyntheticSolvent,
          count: 2,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: grindstonePentahydrate,
          count: 3,
        },
        {
          material: manganeseTrihydrate,
          count: 5,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: nucleicCrystalSinter,
          count: 4,
        },
        {
          material: cyclicenePrefab,
          count: 1,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "SPT-X",
      name: "커피 소재의 신경 활성제",
    },
  ],
  moduleMaterials: {
    "SPT-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: transmutedSaltAgglomerate,
          count: 3,
        },
        {
          material: LMD,
          count: 40000,
        },
      ],
      "2": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: dataSupplementStick,
          count: 20,
        },
        {
          material: cyclicenePrefab,
          count: 4,
        },
        {
          material: LMD,
          count: 50000,
        },
      ],
      "3": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: dataSupplementInstrument,
          count: 8,
        },
        {
          material: orironBlock,
          count: 5,
        },
        {
          material: LMD,
          count: 60000,
        },
      ],
    },
  },
};

// 디펜더 오퍼레이터 리스트 계열
const sixStarDefenderList: Defender[] = [
  HoshigumaTheBreacher,
  SanktaMiksaparato,
  Yu,
  Shu,
  JessicaTheLiberated,
  Penance,
  Horn,
  Mudrock,
  Blemishine,
  Eunectes,
  Nian,
  Hoshiguma,
  Saria,
];
const fiveStarDefenderList: Defender[] = [Senshi, Underflow];
const fourStarDefenderList: Defender[] = [];
const threeStarDefenderList: Defender[] = [];
const twoStarDefenderList: Defender[] = [];
const oneStarDefenderList: Defender[] = [];

/** 디펜더 오퍼레이터 리스트 */
export const defenderList: Defender[] = [
  ...sixStarDefenderList,
  ...fiveStarDefenderList,
  ...fourStarDefenderList,
  ...threeStarDefenderList,
  ...twoStarDefenderList,
  ...oneStarDefenderList,
];
