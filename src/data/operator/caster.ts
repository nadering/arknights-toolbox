import Operator from "./operator";
import {
  casterChip,
  casterDualchip,
  crystallineElectronicUnit,
  D32Steel,
  dataSupplementInstrument,
  dataSupplementStick,
  device,
  incandescentAlloy,
  ketonColloid,
  LMD,
  manganeseTrihydrate,
  moduleDataBlock,
  nucleicCrystalSinter,
  optimizedDevice,
  orirockCluster,
  orirockConcentration,
  orirockCube,
  orironBlock,
  orironShard,
  polyester,
  polyketon,
  polymerizationPreparation,
  RMA7024,
  semiSyntheticSolvent,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  sugarPack,
  sugarSubstitute,
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
/** 로고스 */
export const Logos: Caster = {
  id: 328,
  name: "로고스",
  imageFilename: "logos",
  class: "Caster",
  branch: "Core",
  rarity: 6,
  eliteMaterials: {
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

/** 캐스터 오퍼레이터 리스트 */
export const casterList: Caster[] = [Logos];
