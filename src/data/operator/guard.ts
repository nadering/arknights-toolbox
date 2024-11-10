import {
  aketon,
  bipolarNanoflake,
  crystallineElectronicUnit,
  D32Steel,
  damagedDivice,
  dataSupplementInstrument,
  dataSupplementStick,
  device,
  ester,
  grindstonePentahydrate,
  guardChip,
  guardDualchip,
  integratedDevice,
  LMD,
  loxicKohl,
  manganeseTrihydrate,
  moduleDataBlock,
  orirockConcentration,
  orirockCube,
  polyester,
  polyesterLump,
  polyketon,
  RMA7024,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  sugar,
  sugarLump,
  sugarPack,
  whiteHorseKohl,
} from "../material";
import Operator from "./operator";

// 가드

/** 가드 세부 직군 */
export type GuardBranch =
  | "Dreadnought" // 드레드노트
  | "Centurion" // 공격수
  | "Lord" // 로드
  | "Arts-Fighter" // 아츠 파이터
  | "Instructor" // 교관
  | "Fighter" // 파이터
  | "Swordmaster" // 소드마스터
  | "Soloblade" // 솔로블레이드
  | "Liberator" // 해방자
  | "Reaper" // 리퍼
  | "Crusher" // 대검사
  | "Earthshaker"; // 어스셰이커

/** 가드 오퍼레이터 */
export interface Guard extends Operator {
  /** 세부 직군 */
  branch: GuardBranch;
}

// 6성
/** 스카디 */
export const Skadi: Guard = {
  id: 89,
  name: "스카디",
  imageFilename: "skadi",
  class: "Guard",
  branch: "Dreadnought",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: guardChip!, count: 5 },
      { material: device, count: 5 },
      { material: polyester, count: 5 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: guardDualchip, count: 4 },
      { material: D32Steel, count: 4 },
      { material: orirockConcentration, count: 9 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["신속공격γ", "파도타기", "파도의 만가"],
  preferSkillList: ["파도타기", "파도의 만가"],
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
        { material: aketon, count: 6 },
      ],
      7: [
        { material: skillSummary3, count: 8 },
        { material: integratedDevice, count: 3 },
        { material: sugarPack, count: 5 },
      ],
    },
    신속공격γ: {
      8: [
        { material: skillSummary3, count: 6 },
        { material: whiteHorseKohl, count: 4 },
        { material: aketon, count: 8 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: RMA7024, count: 4 },
        { material: manganeseTrihydrate, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: orirockConcentration, count: 7 },
      ],
    },
    파도타기: {
      8: [
        { material: skillSummary3, count: 6 },
        { material: manganeseTrihydrate, count: 4 },
        { material: integratedDevice, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orirockConcentration, count: 4 },
        { material: grindstonePentahydrate, count: 9 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: orirockConcentration, count: 6 },
      ],
    },
    "파도의 만가": {
      8: [
        { material: skillSummary3, count: 6 },
        { material: grindstonePentahydrate, count: 4 },
        { material: loxicKohl, count: 7 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: sugarLump, count: 4 },
        { material: RMA7024, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: bipolarNanoflake, count: 6 },
        { material: polyesterLump, count: 5 },
      ],
    },
  },
  moduleList: [
    { type: "DRE-X", name: "지난 날의 불완전한 꿈" },
    { type: "DRE-Y", name: "축축한 대검 케이스" },
  ],
  preferModuleList: [
    {
      module: { type: "DRE-X", name: "지난 날의 불완전한 꿈" },
      level: 3,
    },
    {
      module: { type: "DRE-Y", name: "축축한 대검 케이스" },
      level: 3,
    },
  ],
  moduleMaterials: {
    "DRE-X": {
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
    "DRE-Y": {
      1: [
        { material: moduleDataBlock, count: 4 },
        { material: bipolarNanoflake, count: 2 },
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
  },
};

/** 가드 오퍼레이터 리스트 */
export const guardList: Guard[] = [Skadi];
