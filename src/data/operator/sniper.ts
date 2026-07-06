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
  sniperChip,
  sniperChipPack,
  sniperDualchip,
  solidifiedFiberBoard,
  sugar,
  sugarLump,
  sugarPack,
  sugarSubstitute,
  transmutedSalt,
  transmutedSaltAgglomerate,
  whiteHorseKohl,
} from "@/data/material";

// 스나이퍼

/** 스나이퍼 세부 직군 리스트 */
export const SniperBranchList = [
  "Marksman", // 명사수
  "Artilleryman", // 포격사수
  "Deadeye", // 저격수
  "Heavyshooter", // 헤비슈터
  "Spreadshooter", // 산탄사수
  "Besieger", // 공성사수
  "Flinger", // 투척수
  "Hunter", // 사냥꾼
  "Loopshooter", // 루프슈터
] as const;

/** 스나이퍼 세부 직군 */
export type SniperBranch = (typeof SniperBranchList)[number];

/** 스나이퍼 오퍼레이터 */
export interface Sniper extends Operator {
  /** 세부 직군 */
  branch?: SniperBranch;
}

// 6성
/** 음양인 오키드 (활키드) */
export const VioletMizutsuneOrchid: Sniper = {
  id: 418,
  name: "음양인 오키드",
  nicknameList: ["활키드"],
  imageFilename: "violet-mizutsune-orchid",
  class: "Sniper",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
        count: 5,
      },
      {
        material: polyester,
        count: 8,
      },
      {
        material: sugar,
        count: 6,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: sniperDualchip,
        count: 4,
      },
      {
        material: crystallineElectronicUnit,
        count: 4,
      },
      {
        material: cyclicenePrefab,
        count: 5,
      },
    ],
  },
  skillList: ["강사", "비상 노려쏘기", "용화살"],
  preferSkillList: ["비상 노려쏘기"],
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
          material: coagulatingGel,
          count: 5,
        },
        {
          material: grindstone,
          count: 2,
        },
      ],
    },
    강사: {
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
          material: chiralRefractor,
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
          material: refinedSolvent,
          count: 1,
        },
      ],
    },
    "비상 노려쏘기": {
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
          material: incandescentAlloy,
          count: 9,
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
          material: transmutedSaltAgglomerate,
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
    용화살: {
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
          material: polyesterPack,
          count: 4,
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
          material: nucleicCrystalSinter,
          count: 6,
        },
        {
          material: chiralRefractor,
          count: 2,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "ARC-X",
      name: "오키드의 특제 과녁",
    },
  ],
  preferModuleList: [
    { module: { type: "ARC-X", name: "오키드의 특제 과녁" }, level: 3 },
  ],
  moduleMaterials: {
    "ARC-X": {
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

/** 르무엔 */
export const Lemuen: Sniper = {
  id: 371,
  name: "르무엔",
  imageFilename: "lemuen",
  class: "Sniper",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
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
        material: sniperDualchip,
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
  skillList: ["재회 인사", "귀향의 약속", "예포 - 강제적인 추모"],
  preferSkillList: ["귀향의 약속", "예포 - 강제적인 추모"],
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
          material: RMA7012,
          count: 3,
        },
      ],
    },
    "재회 인사": {
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
          material: nucleicCrystalSinter,
          count: 6,
        },
        {
          material: solidifiedFiberBoard,
          count: 2,
        },
      ],
    },
    "귀향의 약속": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: transmutedSaltAgglomerate,
          count: 4,
        },
        {
          material: sugarPack,
          count: 9,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 12,
        },
        {
          material: cyclicenePrefab,
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
          material: crystallineElectronicUnit,
          count: 6,
        },
        {
          material: grindstonePentahydrate,
          count: 1,
        },
      ],
    },
    "예포 - 강제적인 추모": {
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
          material: crystallineComponent,
          count: 4,
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
          material: chiralRefractor,
          count: 9,
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
          material: orirockConcentration,
          count: 1,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "DEA-Y",
      name: "'탄창과 색유리 창'",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "DEA-Y",
        name: "'탄창과 색유리 창'",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "DEA-Y": {
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
          material: biphasicEnantiomorphicMedium,
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

/** 나란투야 */
export const Narantuya: Sniper = {
  id: 334,
  name: "나란투야",
  imageFilename: "narantuya",
  class: "Sniper",
  branch: "Loopshooter",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: sniperChip!, count: 5 },
      { material: polyketon, count: 7 },
      { material: oriron, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: sniperDualchip, count: 4 },
      { material: bipolarNanoflake, count: 4 },
      { material: polymerizedGel, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["회전 칼날", "악몽", "탄일"],
  preferSkillList: ["탄일"],
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
        { material: transmutedSalt, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: RMA7012, count: 5 },
        { material: aggregateCyclicene, count: 1 },
      ],
    },
    "회전 칼날": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: optimizedDevice, count: 4 },
        { material: transmutedSalt, count: 1 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: solidifiedFiberBoard, count: 4 },
        { material: crystallineCircuit, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: ketonColloid, count: 2 },
      ],
    },
    악몽: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: sugarPack, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: transmutedSaltAgglomerate, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: cyclicenePrefab, count: 5 },
      ],
    },
    탄일: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: coagulatingGel, count: 6 },
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
  },
  moduleList: [
    {
      type: "LPS-X",
      name: "'모래에 묻힌 것'",
    },
    {
      type: "LPS-Y",
      name: "'우리의 대장에게'",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "LPS-X",
        name: "'모래에 묻힌 것'",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "LPS-X": {
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
    "LPS-Y": {
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

/** 위셔델 */
export const Wisadel: Sniper = {
  id: 328,
  name: "위셔델",
  imageFilename: "wisadel",
  class: "Sniper",
  branch: "Flinger",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: sniperChip!, count: 5 },
      { material: sugar, count: 9 },
      { material: device, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: sniperDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 3 },
      { material: optimizedDevice, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["국부적 청산", "가득한 복수심", "작열하는 여명"],
  preferSkillList: ["작열하는 여명"],
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
        { material: sugarPack, count: 7 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: semiSyntheticSolvent, count: 5 },
        { material: transmutedSalt, count: 3 },
      ],
    },
    "국부적 청산": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: ketonColloid, count: 4 },
        { material: compoundCuttingFluid, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: whiteHorseKohl, count: 4 },
        { material: manganeseTrihydrate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: polymerizedGel, count: 6 },
      ],
    },
    "가득한 복수심": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: orironCluster, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: solidifiedFiberBoard, count: 4 },
        { material: orirockConcentration, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: transmutedSaltAgglomerate, count: 4 },
      ],
    },
    "작열하는 여명": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: solidifiedFiberBoard, count: 4 },
        { material: crystallineComponent, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
        { material: cuttingFluidSolution, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: ketonColloid, count: 4 },
      ],
    },
  },
  moduleList: [{ type: "BOM-X", name: "'조상 발사기'" }],
  preferModuleList: [
    {
      module: {
        type: "BOM-X",
        name: "'조상 발사기'",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "BOM-X": {
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

/** 레이 */
export const Ray: Sniper = {
  id: 310,
  name: "레이",
  imageFilename: "ray",
  class: "Sniper",
  branch: "Hunter",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: sniperChip!, count: 5 },
      { material: polyester, count: 8 },
      { material: oriron, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: sniperDualchip, count: 4 },
      { material: bipolarNanoflake, count: 4 },
      { material: orirockConcentration, count: 8 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["쏜살", "광역 경계", "'빛을 보았다'"],
  preferSkillList: ["'빛을 보았다'"],
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
        { material: crystallineComponent, count: 6 },
        { material: manganeseOre, count: 3 },
      ],
    },
    쏜살: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: optimizedDevice, count: 3 },
        { material: coagulatingGel, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: refinedSolvent, count: 4 },
        { material: grindstonePentahydrate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: transmutedSaltAgglomerate, count: 4 },
      ],
    },
    "광역 경계": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: RMA7024, count: 4 },
        { material: semiSyntheticSolvent, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: optimizedDevice, count: 4 },
        { material: manganeseTrihydrate, count: 6 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: orirockConcentration, count: 5 },
      ],
    },
    "'빛을 보았다'": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: whiteHorseKohl, count: 4 },
        { material: integratedDevice, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cyclicenePrefab, count: 4 },
        { material: RMA7024, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: incandescentAlloyBlock, count: 6 },
      ],
    },
  },
  moduleList: [
    { type: "HUN-X", name: "《춤추는 달빛》" },
    { type: "HUN-Y", name: "무슨 증명?" },
  ],
  preferModuleList: [
    {
      module: {
        type: "HUN-X",
        name: "《춤추는 달빛》",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "HUN-X": {
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
        { material: bipolarNanoflake, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
    "HUN-Y": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: biphasicEnantiomorphicMedium, count: 2 },
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

/** 티폰 */
export const Typhon: Sniper = {
  id: 290,
  name: "티폰",
  imageFilename: "typhon",
  class: "Sniper",
  branch: "Besieger",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: sniperChip!, count: 5 },
      { material: device, count: 5 },
      { material: polyketon, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: sniperDualchip, count: 4 },
      { material: polymerizationPreparation, count: 4 },
      { material: refinedSolvent, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["신속 공격 γ", "빙원의 질서", "'영원한 사냥'"],
  preferSkillList: ["빙원의 질서", "'영원한 사냥'"],
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
        { material: sugarPack, count: 7 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: orirockCluster, count: 6 },
        { material: RMA7012, count: 3 },
      ],
    },
    "신속 공격 γ": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: integratedDevice, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: refinedSolvent, count: 4 },
        { material: manganeseTrihydrate, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: orirockConcentration, count: 6 },
      ],
    },
    "빙원의 질서": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: whiteHorseKohl, count: 4 },
        { material: manganeseOre, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: polymerizedGel, count: 4 },
        { material: incandescentAlloyBlock, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: whiteHorseKohl, count: 7 },
      ],
    },
    "'영원한 사냥'": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: polymerizedGel, count: 4 },
        { material: compoundCuttingFluid, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: grindstonePentahydrate, count: 4 },
        { material: orirockConcentration, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: cuttingFluidSolution, count: 4 },
      ],
    },
  },
  moduleList: [
    { type: "SIE-X", name: "자연의 포용" },
    { type: "SIE-Y", name: "빙원의 그림자" },
    { type: "ISW-α", name: "티폰의 특별 한정 배지" },
  ],
  preferModuleList: [
    {
      module: { type: "SIE-Y", name: "빙원의 그림자" },
      level: 3,
    },
    {
      module: { type: "ISW-α", name: "티폰의 특별 한정 배지" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "SIE-X": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: polymerizationPreparation, count: 2 },
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
        { material: bipolarNanoflake, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
    "SIE-Y": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: biphasicEnantiomorphicMedium, count: 2 },
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
    "ISW-α": {
      "1": [{ material: moduleDataBlock, count: 1 }],
      "2": [{ material: moduleDataBlock, count: 1 }],
      "3": [{ material: moduleDataBlock, count: 1 }],
    },
  },
};

/** 파죰카 */
export const Pozëmka: Sniper = {
  id: 243,
  name: "파죰카",
  imageFilename: "pozëmka",
  class: "Sniper",
  branch: "Heavyshooter",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: sniperChip!, count: 5 },
      { material: sugar, count: 9 },
      { material: device, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: sniperDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 3 },
      { material: orirockConcentration, count: 9 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["약강격", "요약", "날카로운 스케치"],
  preferSkillList: ["날카로운 스케치"],
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
        { material: RMA7012, count: 4 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: crystallineComponent, count: 4 },
        { material: coagulatingGel, count: 4 },
      ],
    },
    약강격: {
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
        { material: D32Steel, count: 6 },
        { material: ketonColloid, count: 5 },
      ],
    },
    요약: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: manganeseTrihydrate, count: 4 },
        { material: compoundCuttingFluid, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orironBlock, count: 4 },
        { material: incandescentAlloyBlock, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: grindstonePentahydrate, count: 4 },
      ],
    },
    "날카로운 스케치": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: loxicKohl, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: ketonColloid, count: 4 },
        { material: cuttingFluidSolution, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: manganeseTrihydrate, count: 5 },
      ],
    },
  },
  moduleList: [
    { type: "ARC-X", name: "의식감" },
    { type: "ARC-Y", name: "타자기 리본" },
  ],
  preferModuleList: [
    {
      module: {
        type: "ARC-Y",
        name: "타자기 리본",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "ARC-X": {
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
    "ARC-Y": {
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

/** 피아메타 */
export const Fiammetta: Sniper = {
  id: 227,
  name: "피아메타",
  imageFilename: "fiammetta",
  class: "Sniper",
  branch: "Artilleryman",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: sniperChip!, count: 5 },
      { material: device, count: 6 },
      { material: sugar, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: sniperDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 3 },
      { material: grindstonePentahydrate, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: [
    "'너는 직면해야 한다'",
    "'너는 후회해야 한다'",
    "'너는 갚아야 한다'",
  ],
  preferSkillList: ["'너는 갚아야 한다'"],
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
        { material: coagulatingGel, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloy, count: 4 },
        { material: manganeseOre, count: 5 },
      ],
    },
    "'너는 직면해야 한다'": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: loxicKohl, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: ketonColloid, count: 4 },
        { material: cuttingFluidSolution, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: grindstonePentahydrate, count: 4 },
      ],
    },
    "'너는 후회해야 한다'": {
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
        { material: bipolarNanoflake, count: 6 },
        { material: whiteHorseKohl, count: 5 },
      ],
    },
    "'너는 갚아야 한다'": {
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
        { material: polymerizationPreparation, count: 6 },
        { material: manganeseTrihydrate, count: 7 },
      ],
    },
  },
  moduleList: [
    { type: "ART-X", name: "기나긴 여정" },
    { type: "ART-Y", name: "'무법' 특수탄약 배급 세트" },
  ],
  preferModuleList: [
    {
      module: { type: "ART-Y", name: "'무법' 특수탄약 배급 세트" },
      level: 2,
    },
  ],
  moduleMaterials: {
    "ART-X": {
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
    "ART-Y": {
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

/** 파투스 */
export const Fartooth: Sniper = {
  id: 206,
  name: "파투스",
  imageFilename: "fartooth",
  class: "Sniper",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
        count: 5,
      },
      {
        material: polyketon,
        count: 7,
      },
      {
        material: oriron,
        count: 4,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: sniperDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: cuttingFluidSolution,
        count: 7,
      },
    ],
  },
  skillList: ["신속공격γ", "동맹 지원", "페더샤인 애로우"],
  preferSkillList: ["페더샤인 애로우"],
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
          material: grindstone,
          count: 4,
        },
        {
          material: orirockCluster,
          count: 5,
        },
      ],
    },
    신속공격γ: {
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
          material: manganeseTrihydrate,
          count: 5,
        },
      ],
    },
    "동맹 지원": {
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
          material: integratedDevice,
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
          material: polymerizationPreparation,
          count: 6,
        },
        {
          material: whiteHorseKohl,
          count: 7,
        },
      ],
    },
    "페더샤인 애로우": {
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
  },
  moduleList: [
    {
      type: "DEA-X",
      name: "첫 경기 지원 세트",
    },
    {
      type: "DEA-Y",
      name: "팬으로부터 온 편지",
    },
  ],
  moduleMaterials: {
    "DEA-X": {
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
    "DEA-Y": {
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

/** 첸 더 홀룽데이 (수첸) */
export const ChenTheHolungday: Sniper = {
  id: 200,
  name: "첸 더 홀룽데이",
  nicknameList: ["수첸"],
  imageFilename: "ch'en-the-holungday",
  class: "Sniper",
  branch: "Spreadshooter",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
        count: 5,
      },
      {
        material: polyester,
        count: 8,
      },
      {
        material: sugar,
        count: 6,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: sniperDualchip,
        count: 4,
      },
      {
        material: bipolarNanoflake,
        count: 4,
      },
      {
        material: incandescentAlloyBlock,
        count: 6,
      },
    ],
  },
  skillList: ["고압 충격", "'나이트 오브 바이올렛'", "'홀리데이 스톰'"],
  preferSkillList: ["'홀리데이 스톰'"],
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
          material: grindstone,
          count: 4,
        },
        {
          material: orirockCluster,
          count: 5,
        },
      ],
    },
    "고압 충격": {
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
          material: RMA7024,
          count: 4,
        },
        {
          material: whiteHorseKohl,
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
          material: manganeseTrihydrate,
          count: 6,
        },
      ],
    },
    "'나이트 오브 바이올렛'": {
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
          material: D32Steel,
          count: 6,
        },
        {
          material: grindstonePentahydrate,
          count: 6,
        },
      ],
    },
    "'홀리데이 스톰'": {
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
          material: crystallineElectronicUnit,
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
      type: "RPR-X",
      name: "해변 전투 세트",
    },
    {
      type: "RPR-Y",
      name: "휴가 마지막 날",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "RPR-Y",
        name: "휴가 마지막 날",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "RPR-X": {
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
    "RPR-Y": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: nucleicCrystalSinter,
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
          material: biphasicEnantiomorphicMedium,
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

/** Ash (애쉬) */
export const Ash: Sniper = {
  id: 185,
  name: "Ash",
  nicknameList: ["애쉬"],
  imageFilename: "ash",
  class: "Sniper",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
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
        material: sniperDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: polymerizedGel,
        count: 6,
      },
    ],
  },
  skillList: ["지원 사격", "강습 전술", "파괴탄"],
  preferSkillList: ["강습 전술"],
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
          material: crystallineComponent,
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
    "지원 사격": {
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
          material: D32Steel,
          count: 6,
        },
        {
          material: grindstonePentahydrate,
          count: 6,
        },
      ],
    },
    "강습 전술": {
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
          material: crystallineElectronicUnit,
          count: 6,
        },
        {
          material: optimizedDevice,
          count: 4,
        },
      ],
    },
    파괴탄: {
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
          material: ketonColloid,
          count: 5,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "MAR-X",
      name: "M120 CREM 파괴탄",
    },
    {
      type: "MAR-Y",
      name: "장갑탄 전술 파우치",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "MAR-X",
        name: "M120 CREM 파괴탄",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "MAR-X": {
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
          material: nucleicCrystalSinter,
          count: 4,
        },
        {
          material: LMD,
          count: 120000,
        },
      ],
    },
    "MAR-Y": {
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

/** 아르케토 (알게또) */
export const Archetto: Sniper = {
  id: 176,
  name: "아르케토",
  nicknameList: ["알게또"],
  imageFilename: "archetto",
  class: "Sniper",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
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
        material: sniperDualchip,
        count: 4,
      },
      {
        material: polymerizationPreparation,
        count: 4,
      },
      {
        material: orirockConcentration,
        count: 8,
      },
    ],
  },
  skillList: ["화살·산개", "화살·추적 사냥", "화살·폭풍"],
  preferSkillList: ["화살·폭풍"],
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
          material: grindstone,
          count: 4,
        },
        {
          material: orirockCluster,
          count: 5,
        },
      ],
    },
    "화살·산개": {
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
          material: polymerizationPreparation,
          count: 6,
        },
        {
          material: whiteHorseKohl,
          count: 7,
        },
      ],
    },
    "화살·추적 사냥": {
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
          material: D32Steel,
          count: 6,
        },
        {
          material: RMA7024,
          count: 5,
        },
      ],
    },
    "화살·폭풍": {
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
          material: crystallineElectronicUnit,
          count: 6,
        },
        {
          material: RMA7024,
          count: 4,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "MAR-X",
      name: "옛날의 재현",
    },
    {
      type: "MAR-Y",
      name: "'내일의 씨앗'",
    },
    {
      type: "ISW-α",
      name: "아르케토의 특별 한정 배지",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "ISW-α",
        name: "아르케토의 특별 한정 배지",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "MAR-X": {
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
    "MAR-Y": {
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

/** 로즈몬티스 (쪽냥이) */
export const Rosmontis: Sniper = {
  id: 167,
  name: "로즈몬티스",
  nicknameList: ["쪽냥이"],
  imageFilename: "rosmontis",
  class: "Sniper",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
        count: 5,
      },
      {
        material: sugar,
        count: 9,
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
        material: sniperDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: ketonColloid,
        count: 5,
      },
    ],
  },
  skillList: ["사고 팽창", "말초 차단", "'네가 원하는 대로'"],
  preferSkillList: ["말초 차단"],
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
    "사고 팽창": {
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
          material: crystallineElectronicUnit,
          count: 6,
        },
        {
          material: orirockConcentration,
          count: 4,
        },
      ],
    },
    "말초 차단": {
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
          material: optimizedDevice,
          count: 4,
        },
      ],
    },
    "'네가 원하는 대로'": {
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
          material: crystallineElectronicUnit,
          count: 6,
        },
        {
          material: grindstonePentahydrate,
          count: 4,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "BOM-X",
      name: "'기록'",
    },
    {
      type: "ISW-α",
      name: "로즈몬티스의 특별 한정 배지",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "ISW-α",
        name: "로즈몬티스의 특별 한정 배지",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "BOM-X": {
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

/** W */
export const W: Sniper = {
  id: 145,
  name: "W",
  imageFilename: "w",
  class: "Sniper",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
        count: 5,
      },
      {
        material: orirockCube,
        count: 12,
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
        material: sniperDualchip,
        count: 4,
      },
      {
        material: bipolarNanoflake,
        count: 4,
      },
      {
        material: ketonColloid,
        count: 7,
      },
    ],
  },
  skillList: ["하트K", "깜짝 상자", "D12"],
  preferSkillList: ["깜짝 상자"],
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
          material: manganeseOre,
          count: 3,
        },
        {
          material: RMA7012,
          count: 4,
        },
      ],
    },
    하트K: {
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
    "깜짝 상자": {
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 5,
        },
      ],
    },
    D12: {
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
          material: polymerizedGel,
          count: 6,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "ART-X",
      name: "용병의 자루",
    },
    {
      type: "ART-Y",
      name: "빠르고 무딘 칼날",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "ART-Y",
        name: "빠르고 무딘 칼날",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "ART-X": {
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
    "ART-Y": {
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

/** 로사 */
export const Rosa: Sniper = {
  id: 131,
  name: "로사",
  imageFilename: "rosa",
  class: "Sniper",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
        count: 5,
      },
      {
        material: sugar,
        count: 8,
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
        material: sniperDualchip,
        count: 4,
      },
      {
        material: bipolarNanoflake,
        count: 4,
      },
      {
        material: optimizedDevice,
        count: 6,
      },
    ],
  },
  skillList: ["공격 강화γ", "분열 사격", "눈사태 사격"],
  preferSkillList: ["분열 사격", "눈사태 사격"],
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
          material: incandescentAlloy,
          count: 4,
        },
        {
          material: manganeseOre,
          count: 5,
        },
      ],
    },
    "공격 강화γ": {
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
          material: polymerizationPreparation,
          count: 6,
        },
        {
          material: manganeseTrihydrate,
          count: 6,
        },
      ],
    },
    "분열 사격": {
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
          material: optimizedDevice,
          count: 4,
        },
      ],
    },
    "눈사태 사격": {
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
          material: RMA7024,
          count: 5,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "SIE-X",
      name: "공성기계 훈련장치",
    },
    {
      type: "SIE-Y",
      name: "'마음'",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "SIE-X",
        name: "공성기계 훈련장치",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "SIE-X": {
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
    "SIE-Y": {
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

/** 슈바르츠 */
export const Schwarz: Sniper = {
  id: 105,
  name: "슈바르츠",
  imageFilename: "schwarz",
  class: "Sniper",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
        count: 5,
      },
      {
        material: polyester,
        count: 8,
      },
      {
        material: sugar,
        count: 6,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: sniperDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: orironBlock,
        count: 5,
      },
    ],
  },
  skillList: ["강노", "황혼의 눈동자", "최후의 전술"],
  preferSkillList: ["최후의 전술"],
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
    강노: {
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
          material: sugarLump,
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
          material: polyesterLump,
          count: 5,
        },
      ],
    },
    "황혼의 눈동자": {
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
          material: polyesterLump,
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
          material: optimizedDevice,
          count: 4,
        },
      ],
    },
    "최후의 전술": {
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
          material: orironBlock,
          count: 4,
        },
        {
          material: sugarLump,
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
          material: manganeseTrihydrate,
          count: 6,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "ARC-X",
      name: "커스텀 석궁 부품 세트",
    },
    {
      type: "ARC-Y",
      name: "오래된 면도칼",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "ARC-Y",
        name: "오래된 면도칼",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "ARC-X": {
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
    "ARC-Y": {
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
  },
};

/** 엑시아 */
export const Exusiai: Sniper = {
  id: 85,
  name: "엑시아",
  imageFilename: "exusiai",
  class: "Sniper",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: sniperChip!,
        count: 5,
      },
      {
        material: polyketon,
        count: 4,
      },
      {
        material: orirockCube,
        count: 12,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: sniperDualchip,
        count: 4,
      },
      {
        material: polymerizationPreparation,
        count: 4,
      },
      {
        material: sugarLump,
        count: 5,
      },
    ],
  },
  skillList: ["어설트 모드", "슈팅 모드", "과부하 모드"],
  preferSkillList: ["과부하 모드"],
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
          material: orironCluster,
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
    "어설트 모드": {
      "8": [
        {
          material: skillSummary3,
          count: 6,
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
          material: polymerizationPreparation,
          count: 6,
        },
        {
          material: sugarLump,
          count: 6,
        },
      ],
    },
    "슈팅 모드": {
      "8": [
        {
          material: skillSummary3,
          count: 6,
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
          material: polymerizationPreparation,
          count: 6,
        },
        {
          material: whiteHorseKohl,
          count: 7,
        },
      ],
    },
    "과부하 모드": {
      "8": [
        {
          material: skillSummary3,
          count: 6,
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
          material: D32Steel,
          count: 6,
        },
        {
          material: polyesterLump,
          count: 6,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "MAR-X",
      name: "엑시아의 걸작",
    },
    {
      type: "MAR-Y",
      name: "웰컴 투 펭귄 로지스틱스",
    },
  ],
  moduleMaterials: {
    "MAR-X": {
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
    "MAR-Y": {
      "1": [
        {
          material: moduleDataBlock,
          count: 4,
        },
        {
          material: nucleicCrystalSinter,
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

// 5성
/** 구 */
export const Ju: Sniper = {
  id: 402,
  name: "구",
  imageFilename: "ju",
  class: "Sniper",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: sniperChip!,
        count: 4,
      },
      {
        material: oriron,
        count: 4,
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
        material: sniperDualchip,
        count: 3,
      },
      {
        material: solidifiedFiberBoard,
        count: 8,
      },
      {
        material: loxicKohl,
        count: 13,
      },
    ],
  },
  skillList: ["다루기 힘든 명궁", "거스르기 힘든 날개"],
  preferSkillList: [],
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
          material: damagedDevice,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: orirockCube,
          count: 4,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: sugar,
          count: 5,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: aketon,
          count: 4,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: polyesterPack,
          count: 3,
        },
        {
          material: orironCluster,
          count: 3,
        },
      ],
    },
    "다루기 힘든 명궁": {
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
          material: transmutedSalt,
          count: 2,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 3,
        },
        {
          material: transmutedSaltAgglomerate,
          count: 6,
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
          material: cuttingFluidSolution,
          count: 1,
        },
      ],
    },
    "거스르기 힘든 날개": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: cyclicenePrefab,
          count: 3,
        },
        {
          material: RMA7012,
          count: 2,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: ketonColloid,
          count: 3,
        },
        {
          material: orironBlock,
          count: 4,
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
          material: chiralRefractor,
          count: 1,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "SIE-X",
      name: "논밭의 허수아비",
    },
  ],
  preferModuleList: [],
  moduleMaterials: {
    "SIE-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: cyclicenePrefab,
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
          material: orironBlock,
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
          material: refinedSolvent,
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

/** 스카이박스 */
export const Skybox: Sniper = {
  id: 396,
  name: "스카이박스",
  imageFilename: "skybox",
  class: "Sniper",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: sniperChip!,
        count: 4,
      },
      {
        material: orirockCube,
        count: 8,
      },
      {
        material: sugar,
        count: 2,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: sniperDualchip,
        count: 3,
      },
      {
        material: RMA7024,
        count: 7,
      },
      {
        material: pseudocondensationNucleus,
        count: 13,
      },
    ],
  },
  skillList: ["오리지늄 화약의 행차", "전자 펄스의 은총"],
  preferSkillList: [],
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
          material: ester,
          count: 7,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: oriron,
          count: 3,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: polyketon,
          count: 4,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: semiSyntheticSolvent,
          count: 4,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: orirockCluster,
          count: 3,
        },
        {
          material: aggregateCyclicene,
          count: 3,
        },
      ],
    },
    "오리지늄 화약의 행차": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: polymerizedGel,
          count: 3,
        },
        {
          material: loxicKohl,
          count: 5,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: refinedSolvent,
          count: 3,
        },
        {
          material: chiralRefractor,
          count: 6,
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
          material: RMA7024,
          count: 1,
        },
      ],
    },
    "전자 펄스의 은총": {
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
          material: aggregateCyclicene,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: solidifiedFiberBoard,
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
  },
  moduleList: [],
  preferModuleList: [],
  moduleMaterials: {},
};

/** 스노우헌터 */
export const SnowHunter: Sniper = {
  id: 392,
  name: "스노우헌터",
  imageFilename: "snow-hunter",
  class: "Sniper",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: sniperChip!,
        count: 4,
      },
      {
        material: oriron,
        count: 4,
      },
      {
        material: device,
        count: 2,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: sniperDualchip,
        count: 3,
      },
      {
        material: polymerizedGel,
        count: 8,
      },
      {
        material: crystallineComponent,
        count: 17,
      },
    ],
  },
  skillList: ["강타 β", "눈보라 쇠뇌"],
  preferSkillList: [],
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
          material: damagedDevice,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: orirockCube,
          count: 4,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: sugar,
          count: 5,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: polyesterPack,
          count: 5,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: manganeseOre,
          count: 3,
        },
        {
          material: compoundCuttingFluid,
          count: 2,
        },
      ],
    },
    "강타 β": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: cuttingFluidSolution,
          count: 3,
        },
        {
          material: RMA7012,
          count: 3,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: cyclicenePrefab,
          count: 3,
        },
        {
          material: solidifiedFiberBoard,
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
          material: chiralRefractor,
          count: 1,
        },
      ],
    },
    "눈보라 쇠뇌": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: polymerizedGel,
          count: 3,
        },
        {
          material: semiSyntheticSolvent,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: refinedSolvent,
          count: 3,
        },
        {
          material: chiralRefractor,
          count: 6,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: biphasicEnantiomorphicMedium,
          count: 4,
        },
        {
          material: RMA7024,
          count: 1,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "HUN-X",
      name: "과거의 사냥",
    },
  ],
  preferModuleList: [],
  moduleMaterials: {
    "HUN-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: cuttingFluidSolution,
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
          material: solidifiedFiberBoard,
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
          material: polymerizedGel,
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

/** 키치세이 */
export const Kichisei: Sniper = {
  id: 379,
  name: "키치세이",
  imageFilename: "kichisei",
  class: "Sniper",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: sniperChip!,
        count: 4,
      },
      {
        material: polyester,
        count: 4,
      },
      {
        material: sugar,
        count: 3,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: sniperDualchip,
        count: 3,
      },
      {
        material: ketonColloid,
        count: 6,
      },
      {
        material: grindstone,
        count: 14,
      },
    ],
  },
  skillList: ["어서 오세요!", "운수대통!"],
  preferSkillList: [],
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
          material: aggregateCyclicene,
          count: 3,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: aketon,
          count: 3,
        },
        {
          material: RMA7012,
          count: 2,
        },
      ],
    },
    "어서 오세요!": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: cyclicenePrefab,
          count: 3,
        },
        {
          material: aketon,
          count: 2,
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
          material: orironBlock,
          count: 4,
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
          material: cuttingFluidSolution,
          count: 1,
        },
      ],
    },
    "운수대통!": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: refinedSolvent,
          count: 3,
        },
        {
          material: coagulatingGel,
          count: 3,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: transmutedSaltAgglomerate,
          count: 3,
        },
        {
          material: cuttingFluidSolution,
          count: 6,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: biphasicEnantiomorphicMedium,
          count: 4,
        },
        {
          material: polymerizedGel,
          count: 1,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "RPR-X",
      name: "수상한 전단지",
    },
  ],
  preferModuleList: [],
  moduleMaterials: {
    "RPR-X": {
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

/** 브리지드 */
export const Brigid: Sniper = {
  id: 361,
  name: "브리지드",
  imageFilename: "brigid",
  class: "Sniper",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: sniperChip!,
        count: 4,
      },
      {
        material: sugar,
        count: 4,
      },
      {
        material: polyketon,
        count: 3,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: sniperDualchip,
        count: 3,
      },
      {
        material: solidifiedFiberBoard,
        count: 8,
      },
      {
        material: manganeseOre,
        count: 12,
      },
    ],
  },
  skillList: ["익숙한 것", "조련 가능한 것"],
  preferSkillList: [],
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
          material: coagulatingGel,
          count: 4,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: transmutedSalt,
          count: 3,
        },
        {
          material: grindstone,
          count: 2,
        },
      ],
    },
    "익숙한 것": {
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
          material: crystallineComponent,
          count: 2,
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
          material: transmutedSaltAgglomerate,
          count: 6,
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
          material: orironBlock,
          count: 1,
        },
      ],
    },
    "조련 가능한 것": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: cyclicenePrefab,
          count: 3,
        },
        {
          material: aketon,
          count: 2,
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
          material: orironBlock,
          count: 4,
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
          material: cuttingFluidSolution,
          count: 1,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "LPS-X",
      name: "바람의 색깔",
    },
  ],
  preferModuleList: [],
  moduleMaterials: {
    "LPS-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: orironBlock,
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
          material: refinedSolvent,
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
          material: cuttingFluidSolution,
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

/** 콜드샷 */
export const Coldshot: Sniper = {
  id: 292,
  name: "콜드샷",
  imageFilename: "coldshot",
  class: "Sniper",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: sniperChip!,
        count: 4,
      },
      {
        material: oriron,
        count: 4,
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
        material: sniperDualchip,
        count: 3,
      },
      {
        material: RMA7024,
        count: 8,
      },
      {
        material: orironCluster,
        count: 10,
      },
    ],
  },
  skillList: ["공격 강화 γ", "파티 나이트"],
  preferSkillList: [],
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
          material: damagedDevice,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: orirockCube,
          count: 4,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: sugar,
          count: 5,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: sugarPack,
          count: 5,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: orironCluster,
          count: 3,
        },
        {
          material: incandescentAlloy,
          count: 3,
        },
      ],
    },
    "공격 강화 γ": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: grindstonePentahydrate,
          count: 3,
        },
        {
          material: orirockCluster,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: transmutedSaltAgglomerate,
          count: 3,
        },
        {
          material: whiteHorseKohl,
          count: 6,
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
          material: incandescentAlloyBlock,
          count: 4,
        },
      ],
    },
    "파티 나이트": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: refinedSolvent,
          count: 3,
        },
        {
          material: RMA7012,
          count: 3,
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
          material: orirockConcentration,
          count: 6,
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
          material: transmutedSaltAgglomerate,
          count: 3,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "HUN-X",
      name: "'난폭'",
    },
  ],
  preferModuleList: [],
  moduleMaterials: {
    "HUN-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: orirockConcentration,
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
          material: RMA7024,
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
          material: incandescentAlloyBlock,
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

/** 인사이더 */
export const Insider: Sniper = {
  id: 282,
  name: "인사이더",
  imageFilename: "insider",
  class: "Sniper",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: sniperChip!,
        count: 4,
      },
      {
        material: oriron,
        count: 4,
      },
      {
        material: device,
        count: 2,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: sniperDualchip,
        count: 3,
      },
      {
        material: polymerizedGel,
        count: 9,
      },
      {
        material: sugarPack,
        count: 15,
      },
    ],
  },
  skillList: ["'트러블 차단'", "'트러블 해결'"],
  preferSkillList: [],
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
          material: damagedDevice,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: orirockCube,
          count: 4,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: sugar,
          count: 5,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: integratedDevice,
          count: 3,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: RMA7012,
          count: 2,
        },
        {
          material: semiSyntheticSolvent,
          count: 3,
        },
      ],
    },
    "'트러블 차단'": {
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
          material: crystallineComponent,
          count: 1,
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
          material: refinedSolvent,
          count: 4,
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
          material: grindstonePentahydrate,
          count: 3,
        },
      ],
    },
    "'트러블 해결'": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: refinedSolvent,
          count: 3,
        },
        {
          material: RMA7012,
          count: 3,
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
          material: orirockConcentration,
          count: 6,
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
          material: whiteHorseKohl,
          count: 5,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "MAR-X",
      name: "'최초의 기쁨'",
    },
  ],
  preferModuleList: [],
  moduleMaterials: {
    "MAR-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: RMA7024,
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
          material: ketonColloid,
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
          material: polymerizedGel,
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

/** 멜라나이트 */
export const Melanite: Sniper = {
  id: 277,
  name: "멜라나이트",
  imageFilename: "melanite",
  class: "Sniper",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: sniperChip!,
        count: 4,
      },
      {
        material: sugar,
        count: 4,
      },
      {
        material: oriron,
        count: 3,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: sniperDualchip,
        count: 3,
      },
      {
        material: refinedSolvent,
        count: 8,
      },
      {
        material: loxicKohl,
        count: 15,
      },
    ],
  },
  skillList: ["포화 펄스", "임계 폭발"],
  preferSkillList: [],
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
          material: coagulatingGel,
          count: 4,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: polyesterPack,
          count: 3,
        },
        {
          material: integratedDevice,
          count: 2,
        },
      ],
    },
    "포화 펄스": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: incandescentAlloyBlock,
          count: 3,
        },
        {
          material: loxicKohl,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: transmutedSaltAgglomerate,
          count: 3,
        },
        {
          material: orironBlock,
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
          material: polymerizedGel,
          count: 5,
        },
      ],
    },
    "임계 폭발": {
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
          material: orirockConcentration,
          count: 3,
        },
        {
          material: refinedSolvent,
          count: 6,
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
          count: 3,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "ARC-Y",
      name: "향기 나는 귀걸이",
    },
  ],
  preferModuleList: [],
  moduleMaterials: {
    "ARC-Y": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: whiteHorseKohl,
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
          material: orirockConcentration,
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
          material: ketonColloid,
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

// 4성
/** 케이퍼 */
export const Caper: Sniper = {
  id: 300,
  name: "케이퍼",
  imageFilename: "caper",
  class: "Sniper",
  rarity: 4,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 15000,
      },
      {
        material: sniperChip!,
        count: 3,
      },
      {
        material: polyester,
        count: 1,
      },
      {
        material: sugar,
        count: 1,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 60000,
      },
      {
        material: sniperChipPack!,
        count: 5,
      },
      {
        material: integratedDevice,
        count: 11,
      },
      {
        material: aggregateCyclicene,
        count: 7,
      },
    ],
  },
  skillList: ["강타 β", "두 배의 즐거움"],
  preferSkillList: ["두 배의 즐거움"],
  skillUpgradeMaterials: {
    common: {
      "2": [
        {
          material: skillSummary1,
          count: 2,
        },
      ],
      "3": [
        {
          material: skillSummary1,
          count: 2,
        },
        {
          material: sugarSubstitute,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 3,
        },
        {
          material: polyester,
          count: 2,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 3,
        },
        {
          material: oriron,
          count: 2,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 3,
        },
        {
          material: transmutedSalt,
          count: 2,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 4,
        },
        {
          material: grindstone,
          count: 2,
        },
      ],
    },
    "강타 β": {
      "8": [
        {
          material: skillSummary3,
          count: 2,
        },
        {
          material: RMA7024,
          count: 1,
        },
        {
          material: sugarPack,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 4,
        },
        {
          material: refinedSolvent,
          count: 2,
        },
        {
          material: crystallineCircuit,
          count: 2,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: crystallineElectronicUnit,
          count: 2,
        },
        {
          material: whiteHorseKohl,
          count: 2,
        },
      ],
    },
    "두 배의 즐거움": {
      "8": [
        {
          material: skillSummary3,
          count: 2,
        },
        {
          material: cuttingFluidSolution,
          count: 1,
        },
        {
          material: grindstone,
          count: 3,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 4,
        },
        {
          material: manganeseTrihydrate,
          count: 2,
        },
        {
          material: orirockConcentration,
          count: 3,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: nucleicCrystalSinter,
          count: 2,
        },
        {
          material: crystallineCircuit,
          count: 1,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "LPS-X",
      name: "따스함이 있는 곳",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "LPS-X",
        name: "따스함이 있는 곳",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "LPS-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 1,
        },
        {
          material: orironCluster,
          count: 4,
        },
        {
          material: LMD,
          count: 20000,
        },
      ],
      "2": [
        {
          material: moduleDataBlock,
          count: 1,
        },
        {
          material: dataSupplementStick,
          count: 15,
        },
        {
          material: orirockCluster,
          count: 5,
        },
        {
          material: LMD,
          count: 25000,
        },
      ],
      "3": [
        {
          material: moduleDataBlock,
          count: 1,
        },
        {
          material: dataSupplementInstrument,
          count: 5,
        },
        {
          material: grindstone,
          count: 6,
        },
        {
          material: LMD,
          count: 30000,
        },
      ],
    },
  },
};

// 스나이퍼 오퍼레이터 리스트 계열
const sixStarSniperList: Sniper[] = [
  VioletMizutsuneOrchid,
  Lemuen,
  Narantuya,
  Wisadel,
  Ray,
  Typhon,
  Pozëmka,
  Fiammetta,
  Fartooth,
  ChenTheHolungday,
  Ash,
  Archetto,
  Rosmontis,
  W,
  Rosa,
  Schwarz,
  Exusiai,
];
const fiveStarSniperList: Sniper[] = [
  Ju,
  Skybox,
  SnowHunter,
  Kichisei,
  Brigid,
  Coldshot,
  Insider,
  Melanite,
];
const fourStarSniperList: Sniper[] = [Caper];
const threeStarSniperList: Sniper[] = [];
const twoStarSniperList: Sniper[] = [];
const oneStarSniperList: Sniper[] = [];

/** 스나이퍼 오퍼레이터 리스트 */
export const sniperList: Sniper[] = [
  ...sixStarSniperList,
  ...fiveStarSniperList,
  ...fourStarSniperList,
  ...threeStarSniperList,
  ...twoStarSniperList,
  ...oneStarSniperList,
];
