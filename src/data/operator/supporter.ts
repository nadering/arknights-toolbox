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
  supporterChip,
  supporterDualchip,
  transmutedSalt,
  transmutedSaltAgglomerate,
  whiteHorseKohl,
} from "@/data/material";

// 서포터

/** 서포터 세부 직군 리스트 */
export const SupporterBranchList = [
  "Decel-Binder", // 감속자
  "Summoner", // 소환사
  "Hexer", // 약화자
  "Bard", // 음유시인
  "Abjurer", // 비호자
  "Artificer", // 기능공
  "Ritualist", // 의식술사
] as const;

/** 서포터 세부 직군 */
export type SupporterBranch = (typeof SupporterBranchList)[number];

/** 서포터 오퍼레이터 */
export interface Supporter extends Operator {
  /** 세부 직군 */
  branch?: SupporterBranch;
}

// 6성
/** 시빌라이트 에테르나 (마왕) */
export const CivilightEterna: Supporter = {
  id: 326,
  name: "시빌라이트 에테르나",
  nicknameList: ["마왕"],
  imageFilename: "civilight-eterna",
  class: "Supporter",
  branch: "Bard",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: supporterChip!, count: 5 },
      { material: oriron, count: 7 },
      { material: sugar, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: supporterDualchip, count: 4 },
      { material: polymerizationPreparation, count: 4 },
      { material: manganeseTrihydrate, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["과거의 여운", "아득한 미래", "재구성된 현재"],
  preferSkillList: ["아득한 미래"],
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
        { material: coagulatingGel, count: 4 },
        { material: integratedDevice, count: 3 },
      ],
    },
    "과거의 여운": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: RMA7024, count: 4 },
        { material: incandescentAlloy, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: grindstonePentahydrate, count: 4 },
        { material: transmutedSaltAgglomerate, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: solidifiedFiberBoard, count: 4 },
      ],
    },
    "아득한 미래": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cyclicenePrefab, count: 4 },
        { material: coagulatingGel, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: polymerizedGel, count: 4 },
        { material: grindstonePentahydrate, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: cyclicenePrefab, count: 5 },
      ],
    },
    "재구성된 현재": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: polyesterPack, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: refinedSolvent, count: 4 },
        { material: RMA7024, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: orironBlock, count: 3 },
      ],
    },
  },
  moduleList: [{ type: "BAR-X", name: "이야기의 결말" }],
  preferModuleList: [
    { module: { type: "BAR-X", name: "이야기의 결말" }, level: 1 },
  ],
  moduleMaterials: {
    "BAR-X": {
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

/** 비르투오사 (아르투리아) */
export const Virtuosa: Supporter = {
  id: 305,
  name: "비르투오사",
  nicknameList: ["아르투리아"],
  imageFilename: "virtuosa",
  class: "Supporter",
  branch: "Ritualist",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: supporterChip!, count: 5 },
      { material: polyketon, count: 7 },
      { material: orirockCube, count: 7 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: supporterDualchip, count: 4 },
      { material: polymerizationPreparation, count: 4 },
      { material: RMA7024, count: 5 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["'골든 엑스터시'", "'레퀴엠 매스'", "'리버럴 탱고'"],
  preferSkillList: ["'골든 엑스터시'", "'리버럴 탱고'"],
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
        { material: manganeseOre, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: loxicKohl, count: 6 },
        { material: incandescentAlloy, count: 3 },
      ],
    },
    "'골든 엑스터시'": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: aketon, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
        { material: whiteHorseKohl, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: crystallineElectronicUnit, count: 6 },
        { material: whiteHorseKohl, count: 4 },
      ],
    },
    "'레퀴엠 매스'": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: aggregateCyclicene, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: RMA7024, count: 4 },
        { material: orironBlock, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: crystallineCircuit, count: 3 },
      ],
    },
    "'리버럴 탱고'": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: incandescentAlloy, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: incandescentAlloyBlock, count: 4 },
        { material: crystallineCircuit, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: orirockConcentration, count: 6 },
      ],
    },
  },
  moduleList: [{ type: "RIT-X", name: "셈여림법" }],
  preferModuleList: [{ module: { type: "RIT-X", name: "셈여림법" }, level: 3 }],
  moduleMaterials: {
    "RIT-X": {
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

/** 사일런스 더 패러디그매틱 */
export const SilenceTheParadigmatic: Supporter = {
  id: 278,
  name: "사일런스 더 패러디그매틱",
  imageFilename: "silence-the-paradigmatic",
  class: "Supporter",
  branch: "Abjurer",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: supporterChip!, count: 5 },
      { material: oriron, count: 7 },
      { material: polyester, count: 4 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: supporterDualchip, count: 4 },
      { material: crystallineElectronicUnit, count: 3 },
      { material: RMA7024, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["진취심", "부감 시야", "드레드노트 협약"],
  preferSkillList: ["드레드노트 협약"],
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
        { material: loxicKohl, count: 7 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: polyesterPack, count: 6 },
        { material: semiSyntheticSolvent, count: 3 },
      ],
    },
    진취심: {
      8: [
        { material: skillSummary3, count: 8 },
        { material: optimizedDevice, count: 3 },
        { material: crystallineComponent, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: polymerizedGel, count: 4 },
        { material: RMA7024, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: grindstonePentahydrate, count: 4 },
      ],
    },
    "부감 시야": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: grindstonePentahydrate, count: 4 },
        { material: semiSyntheticSolvent, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: ketonColloid, count: 4 },
        { material: incandescentAlloyBlock, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: cuttingFluidSolution, count: 6 },
      ],
    },
    "드레드노트 협약": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: aketon, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: crystallineCircuit, count: 4 },
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
    { type: "BLS-X", name: "모처럼 맑은 정신" },
    { type: "BLS-Y", name: "제어할 수 있는 운동량" },
  ],
  moduleMaterials: {
    "BLS-X": {
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
    "BLS-Y": {
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

/** 스테인리스 (스뎅) */
export const Stainless: Supporter = {
  id: 253,
  name: "스테인리스",
  nicknameList: ["스뎅"],
  imageFilename: "stainless",
  class: "Supporter",
  branch: "Artificer",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: supporterChip!, count: 5 },
      { material: oriron, count: 7 },
      { material: sugar, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: supporterDualchip, count: 4 },
      { material: polymerizationPreparation, count: 4 },
      { material: refinedSolvent, count: 6 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["극한 화력", "고효율 보급", "글룸핀서호 - 프로토타입"],
  preferSkillList: ["글룸핀서호 - 프로토타입"],
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
        { material: semiSyntheticSolvent, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: crystallineComponent, count: 6 },
        { material: sugarPack, count: 4 },
      ],
    },
    "극한 화력": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: manganeseTrihydrate, count: 4 },
        { material: coagulatingGel, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: refinedSolvent, count: 4 },
        { material: cuttingFluidSolution, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: orirockConcentration, count: 6 },
      ],
    },
    "고효율 보급": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cuttingFluidSolution, count: 4 },
        { material: grindstone, count: 6 },
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
    "글룸핀서호 - 프로토타입": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: crystallineCircuit, count: 4 },
        { material: sugarPack, count: 4 },
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
    { type: "CRA-X", name: "글룸핀서호 - 크롤러" },
    { type: "CRA-Y", name: "하이버리 씰" },
  ],
  preferModuleList: [
    { module: { type: "CRA-X", name: "글룸핀서호 - 크롤러" }, level: 1 },
  ],
  moduleMaterials: {
    "CRA-X": {
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
    "CRA-Y": {
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

/** 링 */
export const Ling: Supporter = {
  id: 221,
  name: "링",
  imageFilename: "ling",
  class: "Supporter",
  branch: "Summoner",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: supporterChip!,
        count: 5,
      },
      {
        material: polyester,
        count: 10,
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
        material: supporterDualchip,
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
  skillList: ["다시 술을 권하다", "웃으며 슬을 켜다", "나 자신이 되다"],
  preferSkillList: ["나 자신이 되다"],
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
          material: orirockCluster,
          count: 5,
        },
        {
          material: integratedDevice,
          count: 4,
        },
      ],
    },
    "다시 술을 권하다": {
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
          material: polymerizationPreparation,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 6,
        },
      ],
    },
    "웃으며 슬을 켜다": {
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
          material: crystallineElectronicUnit,
          count: 6,
        },
        {
          material: orirockConcentration,
          count: 4,
        },
      ],
    },
    "나 자신이 되다": {
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
          material: orirockConcentration,
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
      type: "SUM-Y",
      name: "시는 짧고 꿈은 길다",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "SUM-Y",
        name: "시는 짧고 꿈은 길다",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "SUM-Y": {
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

/** 노시스 */
export const Gnosis: Supporter = {
  id: 216,
  name: "노시스",
  imageFilename: "gnosis",
  class: "Supporter",
  branch: "Hexer",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: supporterChip!,
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
        material: supporterDualchip,
        count: 4,
      },
      {
        material: crystallineElectronicUnit,
        count: 3,
      },
      {
        material: incandescentAlloyBlock,
        count: 7,
      },
    ],
  },
  skillList: ["빠른 사고", "영도 폭발", "저체온증"],
  preferSkillList: ["저체온증"],
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
          material: semiSyntheticSolvent,
          count: 3,
        },
        {
          material: RMA7012,
          count: 4,
        },
      ],
    },
    "빠른 사고": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
        },
        {
          material: RMA7024,
          count: 3,
        },
        {
          material: manganeseOre,
          count: 9,
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
    "영도 폭발": {
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
    저체온증: {
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
  },
  moduleList: [
    {
      type: "UMD-X",
      name: "'약속'",
    },
    {
      type: "UMD-Y",
      name: "1번 프로젝트 모델",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "UMD-X",
        name: "'약속'",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "UMD-X": {
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
    "UMD-Y": {
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

/** 스카디 더 커럽팅 하트 (보카디) */
export const SkadiTheCorruptingHeart: Supporter = {
  id: 190,
  name: "스카디 더 커럽팅 하트",
  nicknameList: ["보카디"],
  imageFilename: "skadi-the-corrupting-heart",
  class: "Supporter",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: supporterChip!,
        count: 5,
      },
      {
        material: polyester,
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
        material: supporterDualchip,
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
  skillList: ["수도동귀의 노래", "함께 묻히길 바라는 마음", "'밀물, 썰물'"],
  preferSkillList: ["함께 묻히길 바라는 마음"],
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
          material: incandescentAlloy,
          count: 4,
        },
        {
          material: manganeseOre,
          count: 5,
        },
      ],
    },
    "수도동귀의 노래": {
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
    "함께 묻히길 바라는 마음": {
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: crystallineCircuit,
          count: 4,
        },
      ],
    },
    "'밀물, 썰물'": {
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
      type: "BAR-X",
      name: "타락의 흔적",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "BAR-X",
        name: "타락의 흔적",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "BAR-X": {
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

/** 스즈란 */
export const Suzuran: Supporter = {
  id: 135,
  name: "스즈란",
  imageFilename: "suzuran",
  class: "Supporter",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: supporterChip!,
        count: 5,
      },
      {
        material: polyester,
        count: 8,
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
        material: supporterDualchip,
        count: 4,
      },
      {
        material: D32Steel,
        count: 4,
      },
      {
        material: grindstonePentahydrate,
        count: 8,
      },
    ],
  },
  skillList: ["전력투구", "어린 시절의 무용", "희미한 여우불"],
  preferSkillList: ["희미한 여우불"],
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
          material: orironCluster,
          count: 3,
        },
        {
          material: grindstone,
          count: 5,
        },
      ],
    },
    전력투구: {
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
          material: D32Steel,
          count: 6,
        },
        {
          material: orironBlock,
          count: 5,
        },
      ],
    },
    "어린 시절의 무용": {
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
    "희미한 여우불": {
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
  },
  moduleList: [
    {
      type: "DEC-X",
      name: "가슴에 품은 부적",
    },
    {
      type: "DEC-Y",
      name: "아이들",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "DEC-Y",
        name: "아이들",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "DEC-X": {
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
    "DEC-Y": {
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
  },
};

/** 마젤란 */
export const Magallan: Supporter = {
  id: 99,
  name: "마젤란",
  imageFilename: "magallan",
  class: "Supporter",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: supporterChip!,
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
        material: supporterDualchip,
        count: 4,
      },
      {
        material: polymerizationPreparation,
        count: 4,
      },
      {
        material: manganeseTrihydrate,
        count: 6,
      },
    ],
  },
  skillList: ["고효율 냉각 모드", "레이저 채굴 모드", "무장 타격 모드"],
  preferSkillList: ["고효율 냉각 모드", "무장 타격 모드"],
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
    "고효율 냉각 모드": {
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
          material: manganeseTrihydrate,
          count: 6,
        },
      ],
    },
    "레이저 채굴 모드": {
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
          material: D32Steel,
          count: 6,
        },
        {
          material: ketonColloid,
          count: 5,
        },
      ],
    },
    "무장 타격 모드": {
      "8": [
        {
          material: skillSummary3,
          count: 8,
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
  },
  moduleList: [
    {
      type: "SUM-X",
      name: "프로 드론 조작 모듈",
    },
    {
      type: "SUM-Y",
      name: "교육용 드래곤플라이 드론",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "SUM-X",
        name: "프로 드론 조작 모듈",
      },
      level: 1,
    },
  ],
  moduleMaterials: {
    "SUM-X": {
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
    "SUM-Y": {
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

/** 안젤리나 (젤리) */
export const Angelina: Supporter = {
  id: 76,
  name: "안젤리나",
  nicknameList: ["젤리"],
  imageFilename: "angelina",
  class: "Supporter",
  rarity: 6,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 30000,
      },
      {
        material: supporterChip!,
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
        material: supporterDualchip,
        count: 4,
      },
      {
        material: bipolarNanoflake,
        count: 4,
      },
      {
        material: sugarLump,
        count: 5,
      },
    ],
  },
  skillList: [
    "아케인스태프·충전",
    "아케인스태프·미립자",
    "아케인스태프·반중력",
  ],
  preferSkillList: ["아케인스태프·반중력"],
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
    "아케인스태프·충전": {
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
          material: bipolarNanoflake,
          count: 6,
        },
        {
          material: sugarLump,
          count: 5,
        },
      ],
    },
    "아케인스태프·미립자": {
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
          material: sugarLump,
          count: 6,
        },
      ],
    },
    "아케인스태프·반중력": {
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
          material: polymerizationPreparation,
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
      type: "DEC-X",
      name: "실험용 반중력 모듈",
    },
    {
      type: "DEC-Y",
      name: "중력 교정 모듈",
    },
    {
      type: "ISW-α",
      name: "안젤리나의 특별 한정 배지",
    },
  ],
  preferModuleList: [
    {
      module: {
        type: "ISW-α",
        name: "안젤리나의 특별 한정 배지",
      },
      level: 3,
    },
  ],
  moduleMaterials: {
    "DEC-X": {
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
    "DEC-Y": {
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

// 5성
/** 루실라 */
export const Lucilla: Supporter = {
  id: 330,
  name: "루실라",
  imageFilename: "lucilla",
  class: "Supporter",
  branch: "Hexer",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: supporterChip!,
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
        material: supporterDualchip,
        count: 3,
      },
      {
        material: RMA7024,
        count: 6,
      },
      {
        material: manganeseOre,
        count: 16,
      },
    ],
  },
  skillList: ["현혹성 해류도", "저지성 현색제"],
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
    "현혹성 해류도": {
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
          material: aggregateCyclicene,
          count: 3,
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
          material: cuttingFluidSolution,
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
          material: solidifiedFiberBoard,
          count: 1,
        },
      ],
    },
    "저지성 현색제": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: solidifiedFiberBoard,
          count: 3,
        },
        {
          material: orironCluster,
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
          material: polymerizedGel,
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
          material: orirockConcentration,
          count: 5,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "UMD-X",
      name: "다기능 지도 작성자 - 개량판",
    },
  ],
  moduleMaterials: {
    "UMD-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: crystallineCircuit,
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
          material: manganeseTrihydrate,
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

/** 샌드레코너 */
export const SandReckoner: Supporter = {
  id: 332,
  name: "샌드레코너",
  imageFilename: "sand-reckoner",
  class: "Supporter",
  rarity: 5,
  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: supporterChip!,
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
        material: supporterDualchip,
        count: 3,
      },
      {
        material: transmutedSaltAgglomerate,
        count: 9,
      },
      {
        material: incandescentAlloy,
        count: 12,
      },
    ],
  },
  skillList: ["태엽감기", "현권이동"],
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
          material: manganeseOre,
          count: 4,
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
          material: semiSyntheticSolvent,
          count: 2,
        },
      ],
    },
    태엽감기: {
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
          material: refinedSolvent,
          count: 3,
        },
        {
          material: orirockConcentration,
          count: 7,
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
          material: incandescentAlloyBlock,
          count: 1,
        },
      ],
    },
    현권이동: {
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
          material: fuscousFiber,
          count: 3,
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
          material: D32Steel,
          count: 4,
        },
        {
          material: manganeseTrihydrate,
          count: 4,
        },
      ],
    },
  },
  moduleList: [
    {
      type: "SUM-X",
      name: "과거의 흔적",
    },
  ],
  moduleMaterials: {
    "SUM-X": {
      "1": [
        {
          material: moduleDataBlock,
          count: 2,
        },
        {
          material: solidifiedFiberBoard,
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
          material: polymerizedGel,
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
          material: grindstonePentahydrate,
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

// 서포터 오퍼레이터 리스트 계열
const sixStarSupporterList: Supporter[] = [
  CivilightEterna,
  Virtuosa,
  SilenceTheParadigmatic,
  Stainless,
  Ling,
  Gnosis,
  SkadiTheCorruptingHeart,
  Suzuran,
  Magallan,
  Angelina,
];
const fiveStarSupporterList: Supporter[] = [Lucilla, SandReckoner];
const fourStarSupporterList: Supporter[] = [];
const threeStarSupporterList: Supporter[] = [];
const twoStarSupporterList: Supporter[] = [];
const oneStarSupporterList: Supporter[] = [];

/** 서포터 오퍼레이터 리스트 */
export const supporterList: Supporter[] = [
  ...sixStarSupporterList,
  ...fiveStarSupporterList,
  ...fourStarSupporterList,
  ...threeStarSupporterList,
  ...twoStarSupporterList,
  ...oneStarSupporterList,
];
