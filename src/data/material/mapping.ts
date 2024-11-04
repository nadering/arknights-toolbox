import Material from "./material";
import { upgradeList } from "./upgrade";
import { battleRecordList } from "./battle-record";
import { skillSummaryList } from "./skill-summary";
import { memoryChipList } from "./memory-chip";
import { moduleMaterialList } from "./module";
import { LMD } from "./lmd";

// 재료의 ID와 재료를 연결

/** 전체 재료 리스트 */
const materialList: Material[] = [
  ...upgradeList,
  ...battleRecordList,
  ...skillSummaryList,
  ...memoryChipList,
  ...moduleMaterialList,
  LMD,
];

/** 재료의 ID와 재료 그 자체를 연결해둔 Map으로, ID를 통해 Material에 접근할 수 있도록 해줌 */
export const materialMap = new Map<string, Material>();
materialList.forEach((material) => {
  materialMap.set(material.id, material);
});
