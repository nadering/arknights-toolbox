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
  damagedDivice,
  dataSupplementInstrument,
  dataSupplementStick,
  device,
  ester,
  grindstonePentahydrate,
  incandescentAlloyBlock,
  integratedDevice,
  ketonColloid,
  LMD,
  manganeseOre,
  manganeseTrihydrate,
  moduleDataBlock,
  nucleicCrystalSinter,
  optimizedDevice,
  orirock,
  orirockConcentration,
  orirockCube,
  oriron,
  orironCluster,
  orironShard,
  polyester,
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
  sniperChip,
  sniperDualchip,
  solidifiedFiberBoard,
  sugar,
  sugarPack,
  sugarSubstitute,
  transmutedSalt,
  transmutedSaltAgglomerate,
  whiteHorseKohl,
} from "@/data/material";

// 스나이퍼

/** 스나이퍼 세부 직군 */
export type SniperBranch =
  | "Marksman" // 명사수
  | "Artilleryman" // 포격사수
  | "Deadeye" // 저격수
  | "Heavyshooter" // 헤비슈터
  | "Spreadshooter" // 산탄사수
  | "Besieger" // 공성사수
  | "Flinger" // 투척수
  | "Hunter" // 사냥꾼
  | "Loopshooter"; // 루프슈터

/** 스나이퍼 오퍼레이터 */
export interface Sniper extends Operator {
  /** 세부 직군 */
  branch: SniperBranch;
}

// 6성
/** 나란투야 */
export const Narantuya: Sniper = {
  id: 337,
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
  skillList: ["회전하는 칼날", "악몽", "태양을 삼키다"],
  preferSkillList: ["태양을 삼키다"],
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
        { material: transmutedSalt, count: 5 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: RMA7012, count: 5 },
        { material: aggregateCyclicene, count: 1 },
      ],
    },
    "회전하는 칼날": {
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
    "태양을 삼키다": {
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
  moduleList: [],
  moduleMaterials: null,
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
  moduleList: [{ type: "HUN-X", name: "《춤추는 달빛》" }],
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
  },
};

/** 스나이퍼 오퍼레이터 리스트 */
export const sniperList: Sniper[] = [Narantuya, Wisadel, Ray];
