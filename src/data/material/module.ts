import Material from "./material";

// 모듈 계열

/** 모듈 데이터 칩 */
export const moduleDataBlock: Material = {
  id: "mod_unlock_token",
  name: "모듈 데이터 칩",
  imageFilename: "module-data-block",
  type: "Module",
  tier: 5,
};

/** 데이터 리더기 */
export const dataSupplementStick: Material = {
  id: "mod_update_token_1",
  name: "데이터 리더기",
  imageFilename: "data-supplement-stick",
  type: "Module",
  tier: 4,
};

/** 데이터 메모리 */
export const dataSupplementInstrument: Material = {
  id: "mod_update_token_2",
  name: "데이터 메모리",
  imageFilename: "data-supplement-instrument",
  type: "Module",
  tier: 5,
};

/** 모듈 재료 리스트 */
export const moduleMaterialList: Material[] = [
  moduleDataBlock,
  dataSupplementInstrument,
  dataSupplementStick,
];
