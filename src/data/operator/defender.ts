import Operator from "./operator";
import {
  aketon,
  bipolarNanoflake,
  compoundCuttingFluid,
  crystallineCircuit,
  crystallineComponent,
  crystallineElectronicUnit,
  cuttingFluidSolution,
  D32Steel,
  damagedDivice,
  dataSupplementInstrument,
  dataSupplementStick,
  defenderChip,
  defenderDualchip,
  device,
  diketon,
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
  orironCluster,
  orironShard,
  polyester,
  polyketon,
  polymerizationPreparation,
  polymerizedGel,
  refinedSolvent,
  RMA7012,
  RMA7024,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  sugar,
  sugarSubstitute,
  transmutedSalt,
  transmutedSaltAgglomerate,
  whiteHorseKohl,
} from "@/data/material";

// 디펜더

/** 디펜더 세부 직군 */
export type DefenderBranch =
  | "Protector" // 프로텍터
  | "Guardian" // 가디언
  | "Juggernaut" // 저거너트
  | "Arts-Protector" // 아츠 프로텍터
  | "Duelist" // 결전자
  | "Fortress" // 포트리스
  | "Sentry-Protector" // 센트리 프로텍터
  | "Primal-Protector"; // 프라이멀 프로텍터

/** 디펜더 오퍼레이터 */
export interface Defender extends Operator {
  /** 세부 직군 */
  branch: DefenderBranch;
}

// 6성
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

// 디펜더 오퍼레이터 리스트 계열
const sixStarDefenderList: Defender[] = [
  Shu,
  JessicaTheLiberated,
  Penance,
  Horn,
];
const fiveStarDefenderList: Defender[] = [];
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
