import { LMD } from "./lmd";
import Material from "./material";

/**
 * 정예화 (+ 스킬 마스터리, 모듈) 재료 계열
 *
 * 정예화 재료 리스트에 추가되는 순서는 재료 목록을 위에서부터 아래로 추가한 것이며,
 * 게임 내부에서 보이는 재료 순서와 동일하므로 웬만하면 해당 순서를 지켜야함
 *
 * 해당 내용은 다른 재료 계열에도 마찬가지로 적용됨
 */

// 재료 목록 (T1)
/** (T1) 원암 */
export const orirock: Material = {
  id: "30011",
  name: "원암",
  imageFilename: "orirock",
  type: "Upgrade",
  tier: 1,
};

/** (T1) 파손된 장치 */
export const damagedDivice: Material = {
  id: "30061",
  name: "파손된 장치",
  imageFilename: "damaged-device",
  type: "Upgrade",
  tier: 1,
};

/** (T1) 에스테르 원료 */
export const ester: Material = {
  id: "30031",
  name: "에스테르 원료",
  imageFilename: "ester",
  type: "Upgrade",
  tier: 1,
};

/** (T1) 대체당 */
export const sugarSubstitute: Material = {
  id: "30021",
  name: "대체당",
  imageFilename: "sugar-substitute",
  type: "Upgrade",
  tier: 1,
};

/** (T1) 이철 조각 */
export const orironShard: Material = {
  id: "30041",
  name: "이철 조각",
  imageFilename: "oriron-shard",
  type: "Upgrade",
  tier: 1,
};

/** (T1) 디케톤 */
export const diketon: Material = {
  id: "30051",
  name: "디케톤",
  imageFilename: "diketon",
  type: "Upgrade",
  tier: 1,
};

/** 정예화 재료(T1) 리스트 */
export const T1UpgradeList: Material[] = [
  orirock,
  damagedDivice,
  ester,
  sugarSubstitute,
  orironShard,
  diketon,
];

// 재료 목록 (T2)
/** (T2) 원암 큐브 */
export const orirockCube: Material = {
  id: "30012",
  name: "원암 큐브",
  imageFilename: "orirock-cube",
  type: "Upgrade",
  tier: 2,
  recipe: [
    { material: orirock, count: 3 },
    { material: LMD, count: 100 },
  ],
};

/** (T2) 장치 */
export const device: Material = {
  id: "30062",
  name: "장치",
  imageFilename: "device",
  type: "Upgrade",
  tier: 2,
  recipe: [
    { material: damagedDivice, count: 3 },
    { material: LMD, count: 100 },
  ],
};

/** (T2) 폴리에스테르 */
export const polyester: Material = {
  id: "30032",
  name: "폴리에스테르",
  imageFilename: "polyester",
  type: "Upgrade",
  tier: 2,
  recipe: [
    { material: ester, count: 3 },
    { material: LMD, count: 100 },
  ],
};

/** (T2) 포도당 */
export const sugar: Material = {
  id: "30022",
  name: "포도당",
  imageFilename: "sugar",
  type: "Upgrade",
  tier: 2,
  recipe: [
    { material: sugarSubstitute, count: 3 },
    { material: LMD, count: 100 },
  ],
};

/** (T2) 이철 */
export const oriron: Material = {
  id: "30042",
  name: "이철",
  imageFilename: "oriron",
  type: "Upgrade",
  tier: 2,
  recipe: [
    { material: orironShard, count: 3 },
    { material: LMD, count: 100 },
  ],
};

/** (T2) 아케톤 응집체 */
export const polyketon: Material = {
  id: "30052",
  name: "아케톤 응집체",
  imageFilename: "polyketon",
  type: "Upgrade",
  tier: 2,
  recipe: [
    { material: diketon, count: 3 },
    { material: LMD, count: 100 },
  ],
};

/** 정예화 재료(T2) 리스트 */
export const T2UpgradeList: Material[] = [
  orirockCube,
  device,
  polyester,
  sugar,
  oriron,
  polyketon,
];

// 재료 목록 (T3)
/** (T3) 고리탄화수소 응집질 */
export const aggregateCyclicene: Material = {
  id: "31083",
  name: "고리탄화수소 응집질",
  imageFilename: "aggregate-cyclicene",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 퓨신 섬유 */
export const fuscousFiber: Material = {
  id: "31073",
  name: "퓨신 섬유",
  imageFilename: "fuscous-fiber",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 합성 소금 번들 */
export const transmutedSalt: Material = {
  id: "31063",
  name: "합성 소금 번들",
  imageFilename: "transmuted-salt",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 중합 절삭유 */
export const compoundCuttingFluid: Material = {
  id: "31053",
  name: "중합 절삭유",
  imageFilename: "compound-cutting-fluid",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 반합성 용제 */
export const semiSyntheticSolvent: Material = {
  id: "31043",
  name: "반합성 용제",
  imageFilename: "semi-synthetic-solvent",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 결정 부품 */
export const crystallineComponent: Material = {
  id: "31033",
  name: "결정 부품",
  imageFilename: "crystalline-component",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 열합금 */
export const incandescentAlloy: Material = {
  id: "31023",
  name: "열합금",
  imageFilename: "incandescent-alloy",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 젤 */
export const coagulatingGel: Material = {
  id: "31013",
  name: "젤",
  imageFilename: "coagulating-gel",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 로식 콜 */
export const loxicKohl: Material = {
  id: "30073",
  name: "로식 콜",
  imageFilename: "loxic-kohl",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 망간 */
export const manganeseOre: Material = {
  id: "30083",
  name: "망간",
  imageFilename: "manganese-ore",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 연마석 */
export const grindstone: Material = {
  id: "30093",
  name: "연마석",
  imageFilename: "grindstone",
  type: "Upgrade",
  tier: 3,
};

/** (T3) RMA70-12 */
export const RMA7012: Material = {
  id: "30103",
  name: "RMA70-12",
  imageFilename: "rma70-12",
  type: "Upgrade",
  tier: 3,
};

/** (T3) 원암 큐브 번들 */
export const orirockCluster: Material = {
  id: "30013",
  name: "원암 큐브 번들",
  imageFilename: "orirock-cluster",
  type: "Upgrade",
  tier: 3,
  recipe: [
    { material: orirockCube, count: 5 },
    { material: LMD, count: 200 },
  ],
};

/** (T3) 리뉴얼 장치 */
export const integratedDevice: Material = {
  id: "30063",
  name: "리뉴얼 장치",
  imageFilename: "integrated-device",
  type: "Upgrade",
  tier: 3,
  recipe: [
    { material: device, count: 4 },
    { material: LMD, count: 200 },
  ],
};

/** (T3) 폴리에스테르 번들 */
export const polyesterPack: Material = {
  id: "30033",
  name: "폴리에스테르 번들",
  imageFilename: "polyester-pack",
  type: "Upgrade",
  tier: 3,
  recipe: [
    { material: polyester, count: 4 },
    { material: LMD, count: 200 },
  ],
};

/** (T3) 포도당 번들 */
export const sugarPack: Material = {
  id: "30023",
  name: "포도당 번들",
  imageFilename: "sugar-pack",
  type: "Upgrade",
  tier: 3,
  recipe: [
    { material: sugar, count: 4 },
    { material: LMD, count: 200 },
  ],
};

/** (T3) 이철 번들 */
export const orironCluster: Material = {
  id: "30043",
  name: "이철 번들",
  imageFilename: "oriron-cluster",
  type: "Upgrade",
  tier: 3,
  recipe: [
    { material: oriron, count: 4 },
    { material: LMD, count: 200 },
  ],
};

/** (T3) 아케톤 응집체 번들 */
export const aketon: Material = {
  id: "30053",
  name: "아케톤 응집체 번들",
  imageFilename: "aketon",
  type: "Upgrade",
  tier: 3,
  recipe: [
    { material: polyketon, count: 4 },
    { material: LMD, count: 200 },
  ],
};

/** 정예화 재료(T3) 리스트 */
export const T3UpgradeList: Material[] = [
  aggregateCyclicene,
  fuscousFiber,
  transmutedSalt,
  compoundCuttingFluid,
  semiSyntheticSolvent,
  crystallineComponent,
  incandescentAlloy,
  coagulatingGel,
  loxicKohl,
  manganeseOre,
  grindstone,
  RMA7012,
  orirockCluster,
  integratedDevice,
  polyesterPack,
  sugarPack,
  orironCluster,
  aketon,
];

// 재료 목록 (T4)
/** (T4) 고리탄화수소 프리폼 */
export const cyclicenePrefab: Material = {
  id: "31084",
  name: "고리탄화수소 프리폼",
  imageFilename: "cyclicene-prefab",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: aggregateCyclicene, count: 1 },
    { material: fuscousFiber, count: 1 },
    { material: transmutedSalt, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 경화 섬유판 */
export const solidifiedFiberBoard: Material = {
  id: "31074",
  name: "경화 섬유판",
  imageFilename: "solidified-fiber-board",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: fuscousFiber, count: 1 },
    { material: polyesterPack, count: 2 },
    { material: orirockCluster, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 합성 소금 팩 */
export const transmutedSaltAgglomerate: Material = {
  id: "31064",
  name: "합성 소금 팩",
  imageFilename: "transmuted-salt-agglomerate",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: semiSyntheticSolvent, count: 1 },
    { material: sugarPack, count: 1 },
    { material: transmutedSalt, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 절삭유 원액 */
export const cuttingFluidSolution: Material = {
  id: "31054",
  name: "절삭유 원액",
  imageFilename: "cutting-fluid-solution",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: compoundCuttingFluid, count: 1 },
    { material: crystallineComponent, count: 1 },
    { material: RMA7012, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 정제된 용제 */
export const refinedSolvent: Material = {
  id: "31044",
  name: "정제된 용제",
  imageFilename: "refined-solvent",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: semiSyntheticSolvent, count: 1 },
    { material: compoundCuttingFluid, count: 1 },
    { material: coagulatingGel, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 결정 회로 */
export const crystallineCircuit: Material = {
  id: "31034",
  name: "결정 회로",
  imageFilename: "crystalline-circuit",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: crystallineComponent, count: 2 },
    { material: coagulatingGel, count: 1 },
    { material: incandescentAlloy, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 열합금 팩 */
export const incandescentAlloyBlock: Material = {
  id: "31024",
  name: "열합금 팩",
  imageFilename: "incandescent-alloy-block",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: integratedDevice, count: 1 },
    { material: grindstone, count: 1 },
    { material: incandescentAlloy, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 중합젤 */
export const polymerizedGel: Material = {
  id: "31014",
  name: "중합젤",
  imageFilename: "polymerized-gel",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: orironCluster, count: 1 },
    { material: coagulatingGel, count: 1 },
    { material: incandescentAlloy, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 화이트 호스 콜 */
export const whiteHorseKohl: Material = {
  id: "30074",
  name: "화이트 호스 콜",
  imageFilename: "white-horse-kohl",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: loxicKohl, count: 1 },
    { material: sugarPack, count: 1 },
    { material: RMA7012, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 망간 중합체 */
export const manganeseTrihydrate: Material = {
  id: "30084",
  name: "망간 중합체",
  imageFilename: "manganese-trihydrate",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: manganeseOre, count: 2 },
    { material: polyesterPack, count: 1 },
    { material: loxicKohl, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 고급연마석 */
export const grindstonePentahydrate: Material = {
  id: "30094",
  name: "고급연마석",
  imageFilename: "grindstone-pentahydrate",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: grindstone, count: 1 },
    { material: orironCluster, count: 1 },
    { material: integratedDevice, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) RMA70-24 */
export const RMA7024: Material = {
  id: "30104",
  name: "RMA70-24",
  imageFilename: "rma70-24",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: RMA7012, count: 1 },
    { material: orirockCluster, count: 2 },
    { material: aketon, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 정제 원암 */
export const orirockConcentration: Material = {
  id: "30014",
  name: "정제 원암",
  imageFilename: "orirock-concentration",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: orirockCluster, count: 4 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 개량 장치 */
export const optimizedDevice: Material = {
  id: "30064",
  name: "개량 장치",
  imageFilename: "optimized-device",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: integratedDevice, count: 1 },
    { material: orirockCluster, count: 2 },
    { material: grindstone, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 폴리에스테르 팩 */
export const polyesterLump: Material = {
  id: "30034",
  name: "폴리에스테르 팩",
  imageFilename: "polyester-lump",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: polyesterPack, count: 2 },
    { material: aketon, count: 1 },
    { material: loxicKohl, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 포도당 팩 */
export const sugarLump: Material = {
  id: "30024",
  name: "포도당 팩",
  imageFilename: "sugar-lump",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: sugarPack, count: 2 },
    { material: orironCluster, count: 1 },
    { material: manganeseOre, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 이철 팩 */
export const orironBlock: Material = {
  id: "30044",
  name: "이철 팩",
  imageFilename: "oriron-block",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: orironCluster, count: 2 },
    { material: integratedDevice, count: 1 },
    { material: polyesterPack, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** (T4) 아케톤 팩 */
export const ketonColloid: Material = {
  id: "30054",
  name: "아케톤 팩",
  imageFilename: "keton-colloid",
  type: "Upgrade",
  tier: 4,
  recipe: [
    { material: aketon, count: 2 },
    { material: sugarPack, count: 1 },
    { material: orironCluster, count: 1 },
    { material: LMD, count: 300 },
  ],
};

/** 정예화 재료(T4) 리스트 */
export const T4UpgradeList: Material[] = [
  cyclicenePrefab,
  solidifiedFiberBoard,
  transmutedSaltAgglomerate,
  cuttingFluidSolution,
  refinedSolvent,
  crystallineCircuit,
  incandescentAlloyBlock,
  polymerizedGel,
  whiteHorseKohl,
  manganeseTrihydrate,
  grindstonePentahydrate,
  RMA7024,
  orirockConcentration,
  optimizedDevice,
  polyesterLump,
  sugarLump,
  orironBlock,
  ketonColloid,
];

// 재료 목록 (T5)
/** (T5) 핵결정체 소결물 */
export const nucleicCrystalSinter: Material = {
  id: "30155",
  name: "핵결정체 소결물",
  imageFilename: "nucleic-crystal-sinter",
  type: "Upgrade",
  tier: 5,
  recipe: [
    { material: transmutedSaltAgglomerate, count: 1 },
    { material: cuttingFluidSolution, count: 1 },
    { material: refinedSolvent, count: 2 },
    { material: LMD, count: 400 },
  ],
};

/** (T5) 결정 전자 장치 */
export const crystallineElectronicUnit: Material = {
  id: "30145",
  name: "결정 전자 장치",
  imageFilename: "crystalline-electronic-unit",
  type: "Upgrade",
  tier: 5,
  recipe: [
    { material: crystallineCircuit, count: 1 },
    { material: polymerizedGel, count: 2 },
    { material: incandescentAlloyBlock, count: 1 },
    { material: LMD, count: 400 },
  ],
};

/** (T5) D32강 */
export const D32Steel: Material = {
  id: "30135",
  name: "D32강",
  imageFilename: "d32-steel",
  type: "Upgrade",
  tier: 5,
  recipe: [
    { material: manganeseTrihydrate, count: 1 },
    { material: grindstonePentahydrate, count: 1 },
    { material: RMA7024, count: 1 },
    { material: LMD, count: 400 },
  ],
};

/** (T5) 바이폴라 나노플레이크 칩 */
export const bipolarNanoflake: Material = {
  id: "30125",
  name: "바이폴라 나노플레이크 칩",
  imageFilename: "bipolar-nanoflake",
  type: "Upgrade",
  tier: 5,
  recipe: [
    { material: optimizedDevice, count: 1 },
    { material: whiteHorseKohl, count: 2 },
    { material: LMD, count: 400 },
  ],
};

/** (T5) 중합제 */
export const polymerizationPreparation: Material = {
  id: "30115",
  name: "중합제",
  imageFilename: "polymerization-preparation",
  type: "Upgrade",
  tier: 5,
  recipe: [
    { material: orirockConcentration, count: 1 },
    { material: orironBlock, count: 1 },
    { material: ketonColloid, count: 1 },
    { material: LMD, count: 400 },
  ],
};

/** 정예화 재료(T5) 리스트 */
export const T5UpgradeList: Material[] = [
  nucleicCrystalSinter,
  crystallineElectronicUnit,
  D32Steel,
  bipolarNanoflake,
  polymerizationPreparation,
];

/** 정예화 재료 리스트 */
export const upgradeList: Material[] = [
  ...T5UpgradeList,
  ...T4UpgradeList,
  ...T3UpgradeList,
  ...T2UpgradeList,
  ...T1UpgradeList,
];
