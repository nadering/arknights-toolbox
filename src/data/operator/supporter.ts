import Operator from "./operator";
import {
  aggregateCyclicene,
  aketon,
  bipolarNanoflake,
  coagulatingGel,
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
  orirockConcentration,
  orirockCube,
  oriron,
  orironBlock,
  polyester,
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
  sugarPack,
  supporterChip,
  supporterDualchip,
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
export type SupporterBranch = typeof SupporterBranchList[number];

/** 서포터 오퍼레이터 */
export interface Supporter extends Operator {
  /** 세부 직군 */
  branch?: SupporterBranch;
}

// 6성
/** 시빌라이트 에테르나 */
export const CivilightEterna: Supporter = {
  id: 326,
  name: "시빌라이트 에테르나",
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
    { module: { type: "BAR-X", name: "이야기의 결말" }, level: 2 },
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

/** 비르투오사 */
export const Virtuosa: Supporter = {
  id: 305,
  name: "비르투오사",
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
  moduleList: [{ type: "BLS-X", name: "모처럼 맑은 정신" }],
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

// 서포터 오퍼레이터 리스트 계열
const sixStarSupporterList: Supporter[] = [
  CivilightEterna,
  Virtuosa,
  SilenceTheParadigmatic,
  Stainless,
];
const fiveStarSupporterList: Supporter[] = [];
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
