import Operator from "./operator";
import {
  compoundCuttingFluid,
  crystallineCircuit,
  crystallineComponent,
  crystallineElectronicUnit,
  cuttingFluidSolution,
  D32Steel,
  dataSupplementInstrument,
  dataSupplementStick,
  device,
  ester,
  ketonColloid,
  LMD,
  manganeseTrihydrate,
  moduleDataBlock,
  nucleicCrystalSinter,
  optimizedDevice,
  orirockConcentration,
  orirockCube,
  oriron,
  orironCluster,
  orironShard,
  polyketon,
  polymerizationPreparation,
  polymerizedGel,
  semiSyntheticSolvent,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  sniperChip,
  sniperDualchip,
  solidifiedFiberBoard,
  sugar,
  sugarPack,
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
/** 위셔델 */
export const Wisadel: Sniper = {
  id: 329,
  name: "위셔델",
  imageFilename: "wisadel",
  class: "Sniper",
  branch: "Flinger",
  rarity: 6,
  maxElite: 2,
  eliteMaterials: {
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
  moduleList: [{ type: "BOM-X", name: `'조상 발사기'` }],
  preferModuleList: [
    {
      module: {
        type: "BOM-X",
        name: `'조상 발사기'`,
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

/** 스나이퍼 오퍼레이터 리스트 */
export const sniperList: Sniper[] = [Wisadel];
