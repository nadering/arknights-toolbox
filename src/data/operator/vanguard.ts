import Operator from "./operator";
import {
  bipolarNanoflake,
  compoundCuttingFluid,
  dataSupplementInstrument,
  dataSupplementStick,
  device,
  diketon,
  grindstone,
  grindstonePentahydrate,
  integratedDevice,
  ketonColloid,
  LMD,
  manganeseTrihydrate,
  moduleDataBlock,
  optimizedDevice,
  orirockCube,
  oriron,
  orironBlock,
  polyesterPack,
  polyketon,
  polymerizationPreparation,
  RMA7012,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  sugarPack,
  vanguardChip,
  vanguardChipPack,
  whiteHorseKohl,
} from "@/data/material";

// 뱅가드

/** 뱅가드 세부 직군 */
export type VanguardBranch =
  | "Pioneer" // 척후병
  | "Charger" // 돌격수
  | "Standard-Bearer" // 기수
  | "Tactician" // 전술가
  | "Agent"; // 에이전트

/** 뱅가드 오퍼레이터 */
export interface Vanguard extends Operator {
  /** 세부 직군 */
  branch: VanguardBranch;
}

// 4성
/** 머틀 */
export const Myrtle: Vanguard = {
  id: 99,
  name: "머틀",
  imageFilename: "myrtle",
  class: "Vanguard",
  branch: "Standard-Bearer",
  rarity: 4,
  eliteMaterials: {
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

/** 뱅가드 오퍼레이터 리스트 */
export const vanguardList: Vanguard[] = [Myrtle];
