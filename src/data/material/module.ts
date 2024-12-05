import Material from "./material";

// 모듈 계열

/** 모듈 데이터 칩 */
export const moduleDataBlock: Material = {
  id: "mod_unlock_token",
  name: "모듈 데이터 칩",
  objectName: "moduleDataBlock",
  imageFilename: "module-data-block",
  type: "Module",
  tier: 5,
};

/** (4T) 데이터 메모리 */
export const dataSupplementStick: Material = {
  id: "mod_update_token_1",
  name: "데이터 메모리",
  objectName: "dataSupplementStick",
  imageFilename: "data-supplement-stick",
  type: "Module",
  tier: 4,
};

/** (5T) 데이터 리더기 */
export const dataSupplementInstrument: Material = {
  id: "mod_update_token_2",
  name: "데이터 리더기",
  objectName: "dataSupplementInstrument",
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
