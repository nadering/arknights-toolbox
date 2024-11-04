import Material from "./material";

// 메모리 칩 계열
//
/* eslint-disable prefer-const */
// 상호 참조를 해결하기 위해 const로 선언하지 않고 let으로 변수를 먼저 선언 후 할당

/** 칩 첨가제 */
export const chipCatalyst: Material = {
  id: "32001",
  name: "칩 첨가제",
  imageFilename: "chip-catalyst",
  type: "Memory-Chip",
  tier: 4,
};

// 칩
/** 뱅가드 칩 */
export let vanguardChip: Material | undefined;

/** 가드 칩 */
export let guardChip: Material | undefined;

/** 디펜더 칩 */
export let defenderChip: Material | undefined;

/** 스나이퍼 칩 */
export let sniperChip: Material | undefined;

/** 캐스터 칩 */
export let casterChip: Material | undefined;

/** 메딕 칩 */
export let medicChip: Material | undefined;

/** 서포터 칩 */
export let supporterChip: Material | undefined;

/** 스페셜리스트 칩 */
export let specialistChip: Material | undefined;

vanguardChip = {
  id: "3211",
  name: "뱅가드 칩",
  imageFilename: "vanguard-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
  recipe: [{ material: supporterChip!, count: 3 }],
};

guardChip = {
  id: "3221",
  name: "가드 칩",
  imageFilename: "guard-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
  recipe: [{ material: specialistChip!, count: 3 }],
};

defenderChip = {
  id: "3231",
  name: "디펜더 칩",
  imageFilename: "defender-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
  recipe: [{ material: medicChip!, count: 3 }],
};

sniperChip = {
  id: "3241",
  name: "스나이퍼 칩",
  imageFilename: "sniper-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
  recipe: [{ material: casterChip!, count: 3 }],
};

casterChip = {
  id: "3251",
  name: "캐스터 칩",
  imageFilename: "caster-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
  recipe: [{ material: sniperChip!, count: 3 }],
};

medicChip = {
  id: "3261",
  name: "메딕 칩",
  imageFilename: "medic-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
  recipe: [{ material: defenderChip!, count: 3 }],
};

supporterChip = {
  id: "3271",
  name: "서포터 칩",
  imageFilename: "supporter-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
  recipe: [{ material: vanguardChip!, count: 3 }],
};

specialistChip = {
  id: "3281",
  name: "스페셜리스트 칩",
  imageFilename: "specialist-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
  recipe: [{ material: guardChip!, count: 3 }],
};

/** 칩 리스트 */
export const chipList: Material[] = [
  vanguardChip!,
  guardChip!,
  defenderChip!,
  sniperChip!,
  casterChip!,
  medicChip!,
  supporterChip!,
  specialistChip!,
];

// 칩셋
/** 뱅가드 칩셋 */
export let vanguardChipPack: Material | undefined;

/** 가드 칩셋 */
export let guardChipPack: Material | undefined;

/** 디펜더 칩셋 */
export let defenderChipPack: Material | undefined;

/** 스나이퍼 칩셋 */
export let sniperChipPack: Material | undefined;

/** 캐스터 칩셋 */
export let casterChipPack: Material | undefined;

/** 메딕 칩셋 */
export let medicChipPack: Material | undefined;

/** 서포터 칩셋 */
export let supporterChipPack: Material | undefined;

/** 스페셜리스트 칩셋 */
export let specialistChipPack: Material | undefined;

vanguardChipPack = {
  id: "3212",
  name: "뱅가드 칩셋",
  imageFilename: "vanguard-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
  recipe: [{ material: supporterChipPack!, count: 3 }],
};

guardChipPack = {
  id: "3222",
  name: "가드 칩셋",
  imageFilename: "guard-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
  recipe: [{ material: specialistChipPack!, count: 3 }],
};

defenderChipPack = {
  id: "3232",
  name: "디펜더 칩셋",
  imageFilename: "defender-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
  recipe: [{ material: medicChipPack!, count: 3 }],
};

sniperChipPack = {
  id: "3242",
  name: "스나이퍼 칩셋",
  imageFilename: "sniper-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
  recipe: [{ material: casterChipPack!, count: 3 }],
};

casterChipPack = {
  id: "3252",
  name: "캐스터 칩셋",
  imageFilename: "caster-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
  recipe: [{ material: sniperChipPack!, count: 3 }],
};

medicChipPack = {
  id: "3262",
  name: "메딕 칩셋",
  imageFilename: "medic-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
  recipe: [{ material: defenderChipPack!, count: 3 }],
};

supporterChipPack = {
  id: "3272",
  name: "서포터 칩셋",
  imageFilename: "supporter-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
  recipe: [{ material: vanguardChipPack!, count: 3 }],
};

specialistChipPack = {
  id: "3282",
  name: "스페셜리스트 칩셋",
  imageFilename: "specialist-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
  recipe: [{ material: guardChipPack!, count: 3 }],
};

/** 칩셋 리스트 */
export const chipPackList: Material[] = [
  vanguardChipPack!,
  guardChipPack!,
  defenderChipPack!,
  sniperChipPack!,
  casterChipPack!,
  medicChipPack!,
  supporterChipPack!,
  specialistChipPack!,
];

// 듀얼 칩
/** 뱅가드 듀얼 칩 */
export const vanguardDualchip: Material = {
  id: "3213",
  name: "뱅가드 듀얼 칩",
  imageFilename: "vanguard-dualchip",
  type: "Memory-Chip",
  tier: 5,
  recipe: [
    { material: vanguardChipPack, count: 2 },
    { material: chipCatalyst, count: 1 },
  ],
};

/** 가드 듀얼 칩 */
export const guardDualchip: Material = {
  id: "3223",
  name: "가드 듀얼 칩",
  imageFilename: "guard-dualchip",
  type: "Memory-Chip",
  tier: 5,
  recipe: [
    { material: guardChipPack, count: 2 },
    { material: chipCatalyst, count: 1 },
  ],
};

/** 디펜더 듀얼 칩 */
export const defenderDualchip: Material = {
  id: "3233",
  name: "디펜더 듀얼 칩",
  imageFilename: "defender-dualchip",
  type: "Memory-Chip",
  tier: 5,
  recipe: [
    { material: defenderChipPack, count: 2 },
    { material: chipCatalyst, count: 1 },
  ],
};

/** 스나이퍼 듀얼 칩 */
export const sniperDualchip: Material = {
  id: "3243",
  name: "스나이퍼 듀얼 칩",
  imageFilename: "sniper-dualchip",
  type: "Memory-Chip",
  tier: 5,
  recipe: [
    { material: sniperChipPack, count: 2 },
    { material: chipCatalyst, count: 1 },
  ],
};

/** 캐스터 듀얼 칩 */
export const casterDualchip: Material = {
  id: "3253",
  name: "캐스터 듀얼 칩",
  imageFilename: "caster-dualchip",
  type: "Memory-Chip",
  tier: 5,
  recipe: [
    { material: casterChipPack, count: 2 },
    { material: chipCatalyst, count: 1 },
  ],
};

/** 메딕 듀얼 칩 */
export const medicDualchip: Material = {
  id: "3263",
  name: "메딕 듀얼 칩",
  imageFilename: "medic-dualchip",
  type: "Memory-Chip",
  tier: 5,
  recipe: [
    { material: medicChipPack, count: 2 },
    { material: chipCatalyst, count: 1 },
  ],
};

/** 서포터 듀얼 칩 */
export const supporterDualchip: Material = {
  id: "3273",
  name: "서포터 듀얼 칩",
  imageFilename: "supporter-dualchip",
  type: "Memory-Chip",
  tier: 5,
  recipe: [
    { material: supporterChipPack, count: 2 },
    { material: chipCatalyst, count: 1 },
  ],
};

/** 스페셜리스트 듀얼 칩 */
export const specialistDualchip: Material = {
  id: "3223",
  name: "스페셜리스트 듀얼 칩",
  imageFilename: "specialist-dualchip",
  type: "Memory-Chip",
  tier: 5,
  recipe: [
    { material: specialistChipPack, count: 2 },
    { material: chipCatalyst, count: 1 },
  ],
};

/** 듀얼 칩 리스트 */
export const dualchipList: Material[] = [
  vanguardDualchip,
  guardDualchip,
  defenderDualchip,
  sniperDualchip,
  casterDualchip,
  medicDualchip,
  supporterDualchip,
  specialistDualchip,
];

/** 칩 첨가제 및 전체 칩 리스트 */
export const memoryChipList: Material[] = [
  chipCatalyst,
  ...dualchipList,
  ...chipPackList,
  ...chipList,
];
