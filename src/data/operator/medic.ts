import Operator from "./operator";
import {
  aggregateCyclicene,
  aketon,
  bipolarNanoflake,
  casterChip,
  casterDualchip,
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
  medicChip,
  medicDualchip,
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

// 메딕

/** 메딕 세부 직군 리스트 */
export const MedicBranchList = [
  "Medic", // 메딕
  "Multi-target", // 멀티 타겟 메딕
  "Therapist", // 테라피스트
  "Wandering", // 방랑 메딕
  "Incantation", // 주술 메딕
  "Chain", // 체인 메딕
] as const;

/** 메딕 세부 직군 */
export type MedicBranch = (typeof MedicBranchList)[number];

/** 메딕 오퍼레이터 */
export interface Medic extends Operator {
  /** 세부 직군 */
  branch?: MedicBranch;
}

// 6성
/** Mon3tr (몬삼터) */
export const Mon3tr: Medic = {
  id: 366,
  name: "Mon3tr",
  nicknameList: ["몬삼터"],
  imageFilename: "mon3tr",
  class: "Medic",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: medicChip!,
        count: 5,
      },
      {
        material: oriron,
        count: 8,
      },
      {
        material: polyketon,
        count: 3,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: medicDualchip,
        count: 4,
      },
      {
        material: crystallineElectronicUnit,
        count: 4,
      },
      {
        material: orirockConcentration,
        count: 2,
      },
    ],
  },
  skillList: ["책략: 초연결", "책략: 과부하", "책략: 용해"],
  preferSkillList: ["책략: 과부하", "책략: 용해"],
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
          count: 5,
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
          material: sugarPack,
          count: 7,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: compoundCuttingFluid,
          count: 5,
        },
        {
          material: polyesterPack,
          count: 3,
        },
      ],
    },
    "책략: 초연결": {
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
          material: orirockCluster,
          count: 10,
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
          material: D32Steel,
          count: 6,
        },
        {
          material: grindstonePentahydrate,
          count: 6,
        },
      ],
    },
    "책략: 과부하": {
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
          material: grindstone,
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
          material: nucleicCrystalSinter,
          count: 6,
        },
        {
          material: orirockConcentration,
          count: 2,
        },
      ],
    },
    "책략: 용해": {
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
          material: crystallineElectronicUnit,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 1,
        },
      ],
    },
  },
  moduleList: [],
  moduleMaterials: null,
};

/** 에이야퍄들라 더 크비트 아스카 (힐이야) */
export const EyjafjallaTheHvítAska: Medic = {
  id: 288,
  name: "에이야퍄들라 더 크비트 아스카",
  nicknameList: ["힐이야"],
  imageFilename: "eyjafjalla-the-hvít-aska",
  class: "Medic",
  branch: "Wandering",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: medicChip!, count: 5 },
      { material: orirockCube, count: 12 },
      { material: polyester, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: medicDualchip, count: 4 },
      { material: bipolarNanoflake, count: 4 },
      { material: orironBlock, count: 5 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["소리 없는 윤택", "구름 안개의 보우", "화산의 메아리"],
  preferSkillList: ["소리 없는 윤택", "화산의 메아리"],
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
        { material: semiSyntheticSolvent, count: 5 },
        { material: orironCluster, count: 3 },
      ],
    },
    "소리 없는 윤택": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orirockConcentration, count: 4 },
        { material: aketon, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: optimizedDevice, count: 4 },
        { material: crystallineCircuit, count: 5 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: ketonColloid, count: 4 },
      ],
    },
    "구름 안개의 보우": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: polyesterPack, count: 7 },
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
    "화산의 메아리": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: orirockCluster, count: 9 },
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
  moduleList: [{ type: "WDM-X", name: "간직하고 싶은 소리" }],
  preferModuleList: [
    { module: { type: "WDM-X", name: "간직하고 싶은 소리" }, level: 3 },
  ],
  moduleMaterials: {
    "WDM-X": {
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

/** 리드 더 플레임 섀도우 (힐리드) */
export const ReedTheFlameShadow: Medic = {
  id: 263,
  name: "리드 더 플레임 섀도우",
  nicknameList: ["힐리드"],
  imageFilename: "reed-the-flame-shadow",
  class: "Medic",
  branch: "Incantation",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: medicChip!, count: 5 },
      { material: sugar, count: 8 },
      { material: polyketon, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: medicDualchip, count: 4 },
      { material: nucleicCrystalSinter, count: 3 },
      { material: orirockConcentration, count: 9 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["신속 공격 γ", "번성과 쇠약", "생명의 불씨"],
  preferSkillList: ["번성과 쇠약", "생명의 불씨"],
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
        { material: orironCluster, count: 5 },
        { material: integratedDevice, count: 3 },
      ],
    },
    "신속 공격 γ": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: semiSyntheticSolvent, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: grindstonePentahydrate, count: 4 },
        { material: orirockConcentration, count: 10 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: RMA7024, count: 4 },
      ],
    },
    "번성과 쇠약": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orironBlock, count: 4 },
        { material: transmutedSalt, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: polymerizedGel, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: manganeseTrihydrate, count: 6 },
      ],
    },
    "생명의 불씨": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: whiteHorseKohl, count: 4 },
        { material: manganeseOre, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: optimizedDevice, count: 6 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: refinedSolvent, count: 5 },
      ],
    },
  },
  moduleList: [{ type: "INC-X", name: "'붉은 용에게 주는 화관'" }],
  preferModuleList: [
    { module: { type: "INC-X", name: "'붉은 용에게 주는 화관'" }, level: 1 },
  ],
  moduleMaterials: {
    "INC-X": {
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

/** 루멘 */
export const Lumen: Medic = {
  id: 234,
  name: "루멘",
  imageFilename: "lumen",
  class: "Medic",
  branch: "Therapist",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: medicChip!, count: 5 },
      { material: oriron, count: 8 },
      { material: polyketon, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: medicDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 4 },
      { material: optimizedDevice, count: 5 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["가랑비", "장맛비", "꺼지지 않는 등불"],
  preferSkillList: ["꺼지지 않는 등불"],
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
        { material: integratedDevice, count: 4 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: loxicKohl, count: 5 },
        { material: aketon, count: 4 },
      ],
    },
    가랑비: {
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
        { material: D32Steel, count: 6 },
        { material: ketonColloid, count: 5 },
      ],
    },
    장맛비: {
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
    "꺼지지 않는 등불": {
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
        { material: manganeseTrihydrate, count: 5 },
      ],
    },
  },
  moduleList: [
    { type: "WAH-X", name: "순동 단안망원경" },
    { type: "WAH-Y", name: "'행운'" },
  ],
  preferModuleList: [{ module: { type: "WAH-Y", name: "'행운'" }, level: 1 }],
  moduleMaterials: {
    "WAH-X": {
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
    "WAH-Y": {
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

/** 켈시 */
export const Kaltsit: Medic = {
  id: 192,
  name: "켈시",
  imageFilename: "kal'tsit",
  class: "Medic",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: medicChip!,
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
        material: medicDualchip,
        count: 4,
      },
      {
        material: crystallineElectronicUnit,
        count: 4,
      },
      {
        material: optimizedDevice,
        count: 4,
      },
    ],
  },
  skillList: ["명령: 구조 보강", "명령: 전술 협동", "명령: 용해"],
  preferSkillList: ["명령: 용해"],
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
    "명령: 구조 보강": {
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
          material: polymerizationPreparation,
          count: 6,
        },
        {
          material: orironBlock,
          count: 5,
        },
      ],
    },
    "명령: 전술 협동": {
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
          material: D32Steel,
          count: 6,
        },
        {
          material: ketonColloid,
          count: 5,
        },
      ],
    },
    "명령: 용해": {
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
      type: "PHY-X",
      name: "Mon2tr",
    },
    {
      type: "PHY-Y",
      name: "의사",
    },
    {
      type: "ISW-α",
      name: "켈시의 특별 한정 배지",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "PHY-Y",
        name: "의사",
      },
      level: 3,
    },
    {
      module: {
        type: "ISW-α",
        name: "켈시의 특별 한정 배지",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "PHY-X": {
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
    "PHY-Y": {
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

/** 샤이닝 */
export const Shining: Medic = {
  id: 81,
  name: "샤이닝",
  imageFilename: "shining",
  class: "Medic",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: medicChip!,
        count: 5,
      },
      {
        material: polyketon,
        count: 6,
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
        material: medicDualchip,
        count: 4,
      },
      {
        material: bipolarNanoflake,
        count: 4,
      },
      {
        material: orironBlock,
        count: 5,
      },
    ],
  },
  skillList: ["신조", "자동 엄호", "신조의 역장"],
  preferSkillList: ["신조의 역장"],
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
          material: orirock,
          count: 6,
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
    신조: {
      "8": [
        {
          material: skillSummary3,
          count: 6,
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: orironBlock,
          count: 4,
        },
      ],
    },
    "자동 엄호": {
      "8": [
        {
          material: skillSummary3,
          count: 6,
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: grindstonePentahydrate,
          count: 5,
        },
      ],
    },
    "신조의 역장": {
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
  },
  moduleList: [
    {
      type: "PHY-X",
      name: "'사도'",
    },
    {
      type: "PHY-Y",
      name: "바싹 마른 검집",
    },
  ],
  moduleMaterials: {
    "PHY-X": {
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
    "PHY-Y": {
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

/** 나이팅게일 (팅게) */
export const Nightingale: Medic = {
  id: 79,
  name: "나이팅게일",
  nicknameList: ["팅게"],
  imageFilename: "nightingale",
  class: "Medic",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: medicChip!,
        count: 5,
      },
      {
        material: device,
        count: 6,
      },
      {
        material: oriron,
        count: 3,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 180000,
      },
      {
        material: medicDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: ketonColloid,
        count: 6,
      },
    ],
  },
  skillList: ["치료 강화γ", "아츠 실드", "성역"],
  preferSkillList: ["성역"],
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
          material: polyesterPack,
          count: 5,
        },
      ],
    },
    "치료 강화γ": {
      "8": [
        {
          material: skillSummary3,
          count: 6,
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
          material: D32Steel,
          count: 6,
        },
        {
          material: ketonColloid,
          count: 5,
        },
      ],
    },
    "아츠 실드": {
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
          material: D32Steel,
          count: 6,
        },
        {
          material: optimizedDevice,
          count: 4,
        },
      ],
    },
    성역: {
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
  },
  moduleList: [
    {
      type: "RIN-X",
      name: "'갇혀버린 희망'",
    },
    {
      type: "RIN-Y",
      name: "'밤의 노래'",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "RIN-X",
        name: "'갇혀버린 희망'",
      },
      level: 1,
    },
  ],
  moduleMaterials: {
    "RIN-X": {
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
    "RIN-Y": {
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

// 5성
/** 파피루스 */
export const Papyrus: Medic = {
  id: 333,
  name: "파피루스",
  imageFilename: "papyrus",
  class: "Medic",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: medicChip!,
        count: 4,
      },
      {
        material: device,
        count: 3,
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
        material: medicDualchip,
        count: 3,
      },
      {
        material: manganeseTrihydrate,
        count: 7,
      },
      {
        material: grindstone,
        count: 13,
      },
    ],
  },
  skillList: ["번뜩이는 생각", "벼락치기"],
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
          material: sugarSubstitute,
          count: 7,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: polyester,
          count: 3,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: oriron,
          count: 4,
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
          material: crystallineComponent,
          count: 3,
        },
        {
          material: RMA7012,
          count: 2,
        },
      ],
    },
    "번뜩이는 생각": {
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
          material: incandescentAlloyBlock,
          count: 3,
        },
        {
          material: orironBlock,
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
          material: cuttingFluidSolution,
          count: 4,
        },
      ],
    },
    벼락치기: {
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
          material: aketon,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: manganeseTrihydrate,
          count: 3,
        },
        {
          material: optimizedDevice,
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
          material: polymerizedGel,
          count: 1,
        },
      ],
    },
  },
  moduleList: [],
  moduleMaterials: null,
};

/** 아미야 (메딕) */
export const AmiyaMedic: Medic = {
  id: 75.2,
  name: "아미야 (메딕)",
  nicknameList: ["힐미야", "힐당끼"],
  imageFilename: "amiya-medic",
  class: "Medic",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: casterChip!,
        count: 3,
      },
      {
        material: device,
        count: 4,
      },
      {
        material: oriron,
        count: 4,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: casterDualchip,
        count: 3,
      },
      {
        material: orirockConcentration,
        count: 10,
      },
      {
        material: loxicKohl,
        count: 10,
      },
    ],
  },
  skillList: ["슬픔의 공감", "자비의 비전"],
  preferSkillList: ["자비의 비전"],
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
          material: integratedDevice,
          count: 2,
        },
        {
          material: sugarPack,
          count: 3,
        },
      ],
    },
    "슬픔의 공감": {
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
          material: fuscousFiber,
          count: 1,
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
          material: polymerizationPreparation,
          count: 4,
        },
        {
          material: cuttingFluidSolution,
          count: 4,
        },
      ],
    },
    "자비의 비전": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: whiteHorseKohl,
          count: 3,
        },
        {
          material: polyesterPack,
          count: 6,
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
          material: crystallineCircuit,
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
          material: incandescentAlloyBlock,
          count: 4,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "INC-X",
      name: "그을림 자국의 치마",
    },
  ],
  moduleMaterials: {
    "INC-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: optimizedDevice,
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
          material: incandescentAlloyBlock,
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
          material: polyesterLump,
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

// 3성
/** 히비스커스 */
export const Hibiscus: Medic = {
  id: 22,
  name: "히비스커스",
  imageFilename: "hibiscus",
  class: "Medic",
  branch: "Medic",
  rarity: 3,
  eliteMaterials: {
    0: [],
    1: [{ material: LMD, count: 10000 }],
    2: [],
  },
  skillList: ["치료 강화α"],
  preferSkillList: ["치료 강화α"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 1 }],
      3: [
        { material: skillSummary1, count: 2 },
        { material: ester, count: 1 },
      ],
      4: [
        { material: skillSummary2, count: 1 },
        { material: oriron, count: 1 },
      ],
      5: [
        { material: skillSummary2, count: 1 },
        { material: polyketon, count: 2 },
      ],
      6: [
        { material: skillSummary2, count: 1 },
        { material: sugarPack, count: 2 },
      ],
      7: [
        { material: skillSummary3, count: 2 },
        { material: polyesterPack, count: 2 },
      ],
    },
  },
  moduleList: [],
  moduleMaterials: null,
};

// 메딕 오퍼레이터 리스트 계열
const sixStarMedicList: Medic[] = [
  Mon3tr,
  EyjafjallaTheHvítAska,
  ReedTheFlameShadow,
  Lumen,
  Kaltsit,
  Shining,
  Nightingale,
];
const fiveStarMedicList: Medic[] = [Papyrus, AmiyaMedic];
const fourStarMedicList: Medic[] = [];
const threeStarMedicList: Medic[] = [Hibiscus];
const twoStarMedicList: Medic[] = [];
const oneStarMedicList: Medic[] = [];

/** 메딕 오퍼레이터 리스트 */
export const medicList: Medic[] = [
  ...sixStarMedicList,
  ...fiveStarMedicList,
  ...fourStarMedicList,
  ...threeStarMedicList,
  ...twoStarMedicList,
  ...oneStarMedicList,
];
