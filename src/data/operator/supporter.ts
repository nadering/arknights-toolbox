import {
  bipolarNanoflake,
  coagulatingGel,
  crystallineElectronicUnit,
  cyclicenePrefab,
  dataSupplementInstrument,
  dataSupplementStick,
  device,
  diketon,
  grindstonePentahydrate,
  incandescentAlloy,
  incandescentAlloyBlock,
  integratedDevice,
  LMD,
  manganeseTrihydrate,
  moduleDataBlock,
  nucleicCrystalSinter,
  orirock,
  orirockCube,
  oriron,
  orironBlock,
  polyesterPack,
  polymerizationPreparation,
  polymerizedGel,
  refinedSolvent,
  RMA7024,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  solidifiedFiberBoard,
  sugar,
  supporterChip,
  supporterDualchip,
  transmutedSaltAgglomerate,
} from "../material";
import Operator from "./operator";

// 서포터

/** 서포터 세부 직군 */
export type SupporterBranch =
  | "Decel-Binder" // 감속자
  | "Summoner" // 소환사
  | "Hexer" // 약화자
  | "Bard" // 음유시인
  | "Abjurer" // 비호자
  | "Artificer" // 기능공
  | "Ritualist"; // 의식술사

/** 서포터 오퍼레이터 */
export interface Supporter extends Operator {
  /** 세부 직군 */
  branch: SupporterBranch;
}

// 6성
export const CivilightEterna: Supporter = {
  id: 327,
  name: "시빌라이트 에테르나",
  imageFilename: "civilight-eterna",
  class: "Supporter",
  branch: "Bard",
  rarity: 6,
  eliteMaterials: {
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

/** 서포터 오퍼레이터 리스트 */
export const supporterList: Supporter[] = [CivilightEterna];
