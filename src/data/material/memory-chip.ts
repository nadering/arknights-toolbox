import Material from "./material";

// 메모리 칩 계열

/** 칩 첨가제 */
export const chipCatalyst: Material = {
  id: "32001",
  name: "칩 첨가제",
  objectName: "chipCatalyst",
  imageFilename: "chip-catalyst",
  type: "Memory-Chip",
  tier: 4,
};

// 칩
/** 뱅가드 칩 */
export const vanguardChip: Material = {
  id: "3211",
  name: "뱅가드 칩",
  objectName: "vanguardChip",
  imageFilename: "vanguard-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
};

/** 가드 칩 */
export const guardChip: Material = {
  id: "3221",
  name: "가드 칩",
  objectName: "guardChip",
  imageFilename: "guard-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
};

/** 디펜더 칩 */
export const defenderChip: Material = {
  id: "3231",
  name: "디펜더 칩",
  objectName: "defenderChip",
  imageFilename: "defender-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
};

/** 스나이퍼 칩 */
export const sniperChip: Material = {
  id: "3241",
  name: "스나이퍼 칩",
  objectName: "sniperChip",
  imageFilename: "sniper-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
};

/** 캐스터 칩 */
export const casterChip: Material = {
  id: "3251",
  name: "캐스터 칩",
  objectName: "casterChip",
  imageFilename: "caster-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
};

/** 메딕 칩 */
export const medicChip: Material = {
  id: "3261",
  name: "메딕 칩",
  objectName: "medicChip",
  imageFilename: "medic-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
};

/** 서포터 칩 */
export const supporterChip: Material = {
  id: "3271",
  name: "서포터 칩",
  objectName: "supporterChip",
  imageFilename: "supporter-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
};

/** 스페셜리스트 칩 */
export const specialistChip: Material = {
  id: "3281",
  name: "스페셜리스트 칩",
  objectName: "specialistChip",
  imageFilename: "specialist-chip",
  type: "Memory-Chip",
  tier: 3,
  craftingUnit: 2,
};

vanguardChip.recipe = [{ material: supporterChip, count: 3 }];
guardChip.recipe = [{ material: specialistChip, count: 3 }];
defenderChip.recipe = [{ material: medicChip, count: 3 }];
sniperChip.recipe = [{ material: casterChip, count: 3 }];
casterChip.recipe = [{ material: sniperChip, count: 3 }];
medicChip.recipe = [{ material: defenderChip, count: 3 }];
supporterChip.recipe = [{ material: vanguardChip, count: 3 }];
specialistChip.recipe = [{ material: guardChip, count: 3 }];

/** 칩 리스트 */
export const chipList: Material[] = [
  vanguardChip,
  guardChip,
  defenderChip,
  sniperChip,
  casterChip,
  medicChip,
  supporterChip,
  specialistChip,
];

// 칩셋
/** 뱅가드 칩셋 */
export const vanguardChipPack: Material = {
  id: "3212",
  name: "뱅가드 칩셋",
  objectName: "vanguardChipPack",
  imageFilename: "vanguard-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
};

/** 가드 칩셋 */
export const guardChipPack: Material = {
  id: "3222",
  name: "가드 칩셋",
  objectName: "guardChipPack",
  imageFilename: "guard-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
};

/** 디펜더 칩셋 */
export const defenderChipPack: Material = {
  id: "3232",
  name: "디펜더 칩셋",
  objectName: "defenderChipPack",
  imageFilename: "defender-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
};

/** 스나이퍼 칩셋 */
export const sniperChipPack: Material = {
  id: "3242",
  name: "스나이퍼 칩셋",
  objectName: "sniperChipPack",
  imageFilename: "sniper-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
};

/** 캐스터 칩셋 */
export const casterChipPack: Material = {
  id: "3252",
  name: "캐스터 칩셋",
  objectName: "casterChipPack",
  imageFilename: "caster-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
};

/** 메딕 칩셋 */
export const medicChipPack: Material = {
  id: "3262",
  name: "메딕 칩셋",
  objectName: "medicChipPack",
  imageFilename: "medic-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
};

/** 서포터 칩셋 */
export const supporterChipPack: Material = {
  id: "3272",
  name: "서포터 칩셋",
  objectName: "supporterChipPack",
  imageFilename: "supporter-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
};

/** 스페셜리스트 칩셋 */
export const specialistChipPack: Material = {
  id: "3282",
  name: "스페셜리스트 칩셋",
  objectName: "specialistChipPack",
  imageFilename: "specialist-chip-pack",
  type: "Memory-Chip",
  tier: 4,
  craftingUnit: 2,
};

vanguardChipPack.recipe = [{ material: supporterChipPack, count: 3 }];
guardChipPack.recipe = [{ material: specialistChipPack, count: 3 }];
defenderChipPack.recipe = [{ material: medicChipPack, count: 3 }];
sniperChipPack.recipe = [{ material: casterChipPack, count: 3 }];
casterChipPack.recipe = [{ material: sniperChipPack, count: 3 }];
medicChipPack.recipe = [{ material: defenderChipPack, count: 3 }];
supporterChipPack.recipe = [{ material: vanguardChipPack, count: 3 }];
specialistChipPack.recipe = [{ material: guardChipPack, count: 3 }];

/** 칩셋 리스트 */
export const chipPackList: Material[] = [
  vanguardChipPack,
  guardChipPack,
  defenderChipPack,
  sniperChipPack,
  casterChipPack,
  medicChipPack,
  supporterChipPack,
  specialistChipPack,
];

// 듀얼 칩
/** 뱅가드 듀얼 칩 */
export const vanguardDualchip: Material = {
  id: "3213",
  name: "뱅가드 듀얼 칩",
  objectName: "vanguardDualchip",
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
  objectName: "guardDualchip",
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
  objectName: "defenderDualchip",
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
  objectName: "sniperDualchip",
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
  objectName: "casterDualchip",
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
  objectName: "medicDualchip",
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
  objectName: "supporterDualchip",
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
  id: "3283",
  name: "스페셜리스트 듀얼 칩",
  objectName: "specialistDualchip",
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
