import Operator from "./operator";
import {
  aggregateCyclicene,
  aketon,
  bipolarNanoflake,
  compoundCuttingFluid,
  crystallineComponent,
  cuttingFluidSolution,
  cyclicenePrefab,
  D32Steel,
  dataSupplementInstrument,
  dataSupplementStick,
  device,
  diketon,
  fuscousFiber,
  grindstone,
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
  orirockCluster,
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
  RMA7012,
  RMA7024,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  solidifiedFiberBoard,
  sugarPack,
  transmutedSaltAgglomerate,
  vanguardChip,
  vanguardChipPack,
  vanguardDualchip,
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

// 6성
/** 불피스폴리아 */
export const Vulpisfoglia: Vanguard = {
  id: 351,
  name: "불피스폴리아",
  imageFilename: "vulpisfoglia",
  class: "Vanguard",
  branch: "Pioneer",
  rarity: 6,
  eliteMaterials: {
    0: [],
    1: [
      { material: vanguardChip!, count: 5 },
      { material: polyester, count: 10 },
      { material: polyketon, count: 3 },
      { material: LMD, count: 30000 },
    ],
    2: [
      { material: vanguardDualchip, count: 4 },
      { material: nucleicCrystalSinter, count: 4 },
      { material: cyclicenePrefab, count: 2 },
      { material: LMD, count: 180000 },
    ],
  },
  skillList: ["가벼운 징계", "단검 낙하 고문", "은밀한 여우의 기교"],
  preferSkillList: ["은밀한 여우의 기교"],
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
        { material: aketon, count: 5 },
        { material: orirockCluster, count: 4 },
      ],
    },
    "가벼운 징계": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: manganeseTrihydrate, count: 4 },
        { material: aggregateCyclicene, count: 4 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: transmutedSaltAgglomerate, count: 4 },
        { material: solidifiedFiberBoard, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: polymerizationPreparation, count: 6 },
        { material: polymerizedGel, count: 7 },
      ],
    },
    "단검 낙하 고문": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: cyclicenePrefab, count: 4 },
        { material: manganeseOre, count: 5 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: orironBlock, count: 4 },
        { material: grindstonePentahydrate, count: 7 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: D32Steel, count: 6 },
        { material: orirockConcentration, count: 7 },
      ],
    },
    "은밀한 여우의 기교": {
      8: [
        { material: skillSummary3, count: 8 },
        { material: refinedSolvent, count: 4 },
        { material: fuscousFiber, count: 6 },
      ],
      9: [
        { material: skillSummary3, count: 12 },
        { material: cuttingFluidSolution, count: 4 },
        { material: RMA7024, count: 8 },
      ],
      10: [
        { material: skillSummary3, count: 15 },
        { material: nucleicCrystalSinter, count: 6 },
        { material: incandescentAlloyBlock, count: 2 },
      ],
    },
  },
  moduleList: [{ type: "SOL-X", name: "히트맨에게도 필요한 휴가" }],
  preferModuleList: [
    {
      module: {
        type: "SOL-X",
        name: "히트맨에게도 필요한 휴가",
      },
      level: 1,
    },
  ],
  moduleMaterials: {
    "SOL-X": {
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

// 4성
/** 머틀 */
export const Myrtle: Vanguard = {
  id: 101,
  name: "머틀",
  imageFilename: "myrtle",
  class: "Vanguard",
  branch: "Standard-Bearer",
  rarity: 4,
  eliteMaterials: {
    0: [],
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
export const vanguardList: Vanguard[] = [Vulpisfoglia, Myrtle];
