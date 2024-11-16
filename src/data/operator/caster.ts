import Operator from "./operator";
import {
  aketon,
  bipolarNanoflake,
  casterChip,
  casterDualchip,
  coagulatingGel,
  compoundCuttingFluid,
  crystallineCircuit,
  crystallineElectronicUnit,
  cuttingFluidSolution,
  cyclicenePrefab,
  D32Steel,
  damagedDivice,
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
  sugar,
  sugarPack,
  sugarSubstitute,
  transmutedSalt,
  transmutedSaltAgglomerate,
  whiteHorseKohl,
} from "@/data/material";

// 캐스터

/** 캐스터 세부 직군 */
export type CasterBranch =
  | "Core" // 코어 캐스터
  | "Splash" // 스플래시 캐스터
  | "Blast" // 블래스트 캐스터
  | "Chain" // 체인 캐스터
  | "Mech-Accord" // 메카 캐스터
  | "Phalanx" // 진법 캐스터
  | "Mystic" // 미스틱 캐스터
  | "Primal"; // 프라이멀 캐스터

/** 캐스터 오퍼레이터 */
export interface Caster extends Operator {
  /** 세부 직군 */
  branch: CasterBranch;
}

// 6성
/** 라플란드 더 데카덴차 */
export const LapplandTheDecadenza: Caster = {
  id: 350,
  name: "라플란드 더 데카덴차",
  imageFilename: "lappland-the-decadenza",
  class: "Caster",
  branch: "Mech-Accord",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: casterChip!, count: 5 },
      { material: oriron, count: 8 },
      { material: device, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: casterDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 4 },
      { material: orironBlock, count: 2 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["나태한 자의 비명", "맹렬한 사냥", "종막 - 대단원"],
  preferSkillList: ["종막 - 대단원"],
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
        { material: polyketon, count: 4 },
        { material: sugar, count: 4 },
      ],
      6: [
        { material: skillSummary2, count: 8 },
        { material: aketon, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: coagulatingGel, count: 5 },
        { material: grindstone, count: 2 },
      ],
    },
    "나태한 자의 비명": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: solidifiedFiberBoard, count: 4 },
        { material: orironCluster, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: polymerizedGel, count: 4 },
        { material: crystallineCircuit, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: ketonColloid, count: 1 },
      ],
    },
    "맹렬한 사냥": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: orirockCluster, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: manganeseTrihydrate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: transmutedSaltAgglomerate, count: 6 },
      ],
    },
    "종막 - 대단원": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: RMA7024, count: 4 },
        { material: grindstone, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: cyclicenePrefab, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: orironBlock, count: 5 },
      ],
    },
  },
  moduleList: [{ type: "FUN-X", name: "늑대의 시간" }],
  preferModuleList: [
    {
      module: {
        type: "FUN-X",
        name: "늑대의 시간",
      },
      level: 1,
    },
  ],
  moduleMaterials: {
    "FUN-X": {
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

/** 마르실 */
export const Marcille: Caster = {
  id: 342,
  name: "마르실",
  imageFilename: "marcille",
  class: "Caster",
  branch: "Splash",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: casterChip!, count: 5 },
      { material: device, count: 5 },
      { material: polyketon, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: casterDualchip, count: 4 },
      { material: nucleicCrystalSinter, count: 4 },
      { material: grindstonePentahydrate, count: 2 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["수재의 실력", "사역마 소환", "폭발 마법"],
  preferSkillList: ["사역마 소환"],
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
        { material: RMA7012, count: 4 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: semiSyntheticSolvent, count: 5 },
        { material: manganeseOre, count: 3 },
      ],
    },
    "수재의 실력": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: RMA7012, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: RMA7024, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: incandescentAlloyBlock, count: 6 },
      ],
    },
    "사역마 소환": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: optimizedDevice, count: 4 },
        { material: semiSyntheticSolvent, count: 1 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: solidifiedFiberBoard, count: 4 },
        { material: crystallineCircuit, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: ketonColloid, count: 5 },
      ],
    },
    "폭발 마법": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: polymerizedGel, count: 4 },
        { material: sugarPack, count: 10 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: grindstonePentahydrate, count: 4 },
        { material: manganeseTrihydrate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: transmutedSaltAgglomerate, count: 2 },
      ],
    },
  },
  moduleList: [{ type: "SPC-Y", name: "천재의 장서" }],
  preferModuleList: [
    {
      module: {
        type: "SPC-Y",
        name: "천재의 장서",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "SPC-Y": {
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

/** 님프 */
export const Nymph: Caster = {
  id: 333,
  name: "님프",
  imageFilename: "nymph",
  class: "Caster",
  branch: "Primal",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: casterChip!, count: 5 },
      { material: polyester, count: 8 },
      { material: sugar, count: 6 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: casterDualchip, count: 4 },
      { material: polymerizationPreparation, count: 4 },
      { material: optimizedDevice, count: 5 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["고백 공격", "엄습하는 공포", "상심 방지"],
  preferSkillList: ["엄습하는 공포", "상심 방지"],
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
        { material: incandescentAlloy, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: polyesterPack, count: 5 },
        { material: integratedDevice, count: 3 },
      ],
    },
    "고백 공격": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orironBlock, count: 4 },
        { material: coagulatingGel, count: 3 },
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
    "엄습하는 공포": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: optimizedDevice, count: 4 },
        { material: loxicKohl, count: 1 },
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
    "상심 방지": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: fuscousFiber, count: 5 },
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
  },
  moduleList: [],
  moduleMaterials: null,
};

/** 로고스 */
export const Logos: Caster = {
  id: 327,
  name: "로고스",
  imageFilename: "logos",
  class: "Caster",
  branch: "Core",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: casterChip!, count: 5 },
      { material: polyester, count: 8 },
      { material: orirockCube, count: 8 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: casterDualchip, count: 4 },
      { material: nucleicCrystalSinter, count: 4 },
      { material: whiteHorseKohl, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["몰망", "제유", "확장 시야"],
  preferSkillList: ["몰망", "확장 시야"],
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
        { material: semiSyntheticSolvent, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloy, count: 5 },
        { material: semiSyntheticSolvent, count: 3 },
      ],
    },
    몰망: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: whiteHorseKohl, count: 4 },
        { material: orirockCluster, count: 11 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: ketonColloid, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: optimizedDevice, count: 4 },
      ],
    },
    제유: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orirockConcentration, count: 4 },
        { material: semiSyntheticSolvent, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: optimizedDevice, count: 4 },
        { material: whiteHorseKohl, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: manganeseTrihydrate, count: 6 },
      ],
    },
    "확장 시야": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: optimizedDevice, count: 3 },
        { material: sugarPack, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: RMA7024, count: 4 },
        { material: orironBlock, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: whiteHorseKohl, count: 4 },
      ],
    },
  },
  moduleList: [{ type: "CCR-Δ", name: "협곡에서 온 필통" }],
  preferModuleList: [
    {
      module: {
        type: "CCR-Δ",
        name: "협곡에서 온 필통",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "CCR-Δ": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: polymerizationPreparation, count: 2 },
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
        { material: D32Steel, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 오올헤약 */
export const Hoolheyak: Caster = {
  id: 279,
  name: "오올헤약",
  imageFilename: "ho'olheyak",
  class: "Caster",
  branch: "Core",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: casterChip!, count: 5 },
      { material: polyester, count: 8 },
      { material: sugar, count: 6 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: casterDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: transmutedSaltAgglomerate, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["탐구를 위해", "굽이쳐 흐르는 별들", "박식한 자의 광언"],
  preferSkillList: ["박식한 자의 광언"],
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
        { material: integratedDevice, count: 4 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: loxicKohl, count: 6 },
        { material: incandescentAlloy, count: 3 },
      ],
    },
    "탐구를 위해": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: orironBlock, count: 4 },
        { material: RMA7012, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: crystallineCircuit, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: orirockConcentration, count: 6 },
      ],
    },
    "굽이쳐 흐르는 별들": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: crystallineCircuit, count: 4 },
        { material: transmutedSalt, count: 3 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: whiteHorseKohl, count: 4 },
        { material: ketonColloid, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: crystallineCircuit, count: 5 },
      ],
    },
    "박식한 자의 광언": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: coagulatingGel, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: grindstonePentahydrate, count: 4 },
        { material: transmutedSaltAgglomerate, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: manganeseTrihydrate, count: 4 },
      ],
    },
  },
  moduleList: [
    { type: "CCR-X", name: "'도서관'" },
    { type: "CCR-Y", name: "쿠쿨칸의 시간 박물관" },
  ],
  moduleMaterials: {
    "CCR-X": {
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
    "CCR-Y": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: crystallineElectronicUnit, count: 2 },
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
        { material: D32Steel, count: 4 },
        { material: LMD, count: 120000 },
      ],
    },
  },
};

/** 린 */
export const Lin: Caster = {
  id: 266,
  name: "린",
  imageFilename: "lin",
  class: "Caster",
  branch: "Phalanx",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: casterChip!, count: 5 },
      { material: oriron, count: 8 },
      { material: orirockCube, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: casterDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: cuttingFluidSolution, count: 8 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["영롱", "비호", "유광 작렬"],
  preferSkillList: ["유광 작렬"],
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
        { material: transmutedSalt, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: aketon, count: 5 },
        { material: compoundCuttingFluid, count: 3 },
      ],
    },
    영롱: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: manganeseTrihydrate, count: 4 },
        { material: semiSyntheticSolvent, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: ketonColloid, count: 4 },
        { material: RMA7024, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: whiteHorseKohl, count: 7 },
      ],
    },
    비호: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: orironCluster, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: refinedSolvent, count: 4 },
        { material: manganeseTrihydrate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: orironBlock, count: 4 },
      ],
    },
    "유광 작렬": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: polyesterPack, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: transmutedSaltAgglomerate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: incandescentAlloyBlock, count: 6 },
      ],
    },
  },
  moduleList: [{ type: "PLX-X", name: "'슬기로움'" }],
  preferModuleList: [
    {
      module: {
        type: "PLX-X",
        name: "'슬기로움'",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "PLX-X": {
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

/** 에벤홀츠 */
export const Ebenholz: Caster = {
  id: 239,
  name: "에벤홀츠",
  imageFilename: "ebenholz",
  class: "Caster",
  branch: "Mystic",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: casterChip!, count: 5 },
      { material: polyketon, count: 7 },
      { material: device, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: casterDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: refinedSolvent, count: 7 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["급속 변주", "황량한 메아리", "침묵의 소리"],
  preferSkillList: ["침묵의 소리"],
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
        { material: loxicKohl, count: 7 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: manganeseOre, count: 3 },
        { material: semiSyntheticSolvent, count: 5 },
      ],
    },
    "급속 변주": {
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
        { material: whiteHorseKohl, count: 7 },
      ],
    },
    "황량한 메아리": {
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
    "침묵의 소리": {
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
        { material: refinedSolvent, count: 4 },
      ],
    },
  },
  moduleList: [
    { type: "MSC-X", name: "오리지늄 주사위 수납함" },
    { type: "MSC-Y", name: "'음악이론 해설자'" },
    { type: "MSC-Δ", name: "부패의 전승" },
  ],
  preferModuleList: [
    {
      module: {
        type: "MSC-Δ",
        name: "부패의 전승",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "MSC-X": {
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
    "MSC-Y": {
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
    "MSC-Δ": {
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
  },
};

// 캐스터 오퍼레이터 리스트 계열
const sixStarCasterList: Caster[] = [
  LapplandTheDecadenza,
  Marcille,
  Nymph,
  Logos,
  Hoolheyak,
  Lin,
  Ebenholz,
];
const fiveStarCasterList: Caster[] = [];
const fourStarCasterList: Caster[] = [];
const threeStarCasterList: Caster[] = [];
const twoStarCasterList: Caster[] = [];
const oneStarCasterList: Caster[] = [];

/** 캐스터 오퍼레이터 리스트 */
export const casterList: Caster[] = [
  ...sixStarCasterList,
  ...fiveStarCasterList,
  ...fourStarCasterList,
  ...threeStarCasterList,
  ...twoStarCasterList,
  ...oneStarCasterList,
];
