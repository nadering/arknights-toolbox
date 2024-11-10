import {
  compoundCuttingFluid,
  crystallineComponent,
  crystallineElectronicUnit,
  cuttingFluidSolution,
  D32Steel,
  dataSupplementInstrument,
  dataSupplementStick,
  defenderChip,
  defenderDualchip,
  device,
  diketon,
  grindstonePentahydrate,
  incandescentAlloy,
  incandescentAlloyBlock,
  LMD,
  loxicKohl,
  moduleDataBlock,
  nucleicCrystalSinter,
  orirock,
  orirockConcentration,
  orirockCube,
  oriron,
  orironBlock,
  polyketon,
  polymerizationPreparation,
  RMA7012,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  transmutedSalt,
  transmutedSaltAgglomerate,
  whiteHorseKohl,
} from "../material";
import Operator from "./operator";

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
  moduleList: [{ type: "GUA-X", name: `'시간 제정에 관해'` }],
  preferModuleList: [
    {
      module: { type: "GUA-X", name: `'시간 제정에 관해'` },
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

/** 디펜더 오퍼레이터 리스트 */
export const defenderList: Defender[] = [Shu];
