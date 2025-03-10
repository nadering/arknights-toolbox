import { atom } from "jotai";
import {
  Material,
  CountableMaterial,
  MaterialType,
  upgradeList,
  battleRecordList,
  skillSummaryList,
  memoryChipList,
  moduleMaterialList,
  LMD,
  EXP,
} from "@/data/material";

/** 사용자의 재료 보유량 및 필요량을 나타내는 타입 */
export type Depot = {
  [key in MaterialType]: CountableMaterial[];
};

/**
 * Material[] 타입을 받아, 개수가 0으로 설정되어 있는 CountableMaterial[] 타입으로 반환
 * @param materialList 재료 아이템 리스트
 * @returns 개수가 0으로 설정되어 있는 재료 아이템 리스트
 */
const makeCountableMaterialList = (materialList: Material[]) => {
  const result: CountableMaterial[] = [];

  materialList.forEach((material) => {
    result.push({
      material,
      count: 0,
    });
  });

  return result;
};

/**
 * 개수가 0으로 초기화되어 있는 Depot 타입의 객체를 반환
 * @returns 개수가 0으로 초기화되어 있는 Depot 타입의 객체
 */
export const makeEmptyDepot = () => {
  return {
    Upgrade: makeCountableMaterialList(upgradeList),
    "Battle-Record": makeCountableMaterialList(battleRecordList),
    "Skill-Summary": makeCountableMaterialList(skillSummaryList),
    "Memory-Chip": makeCountableMaterialList(memoryChipList),
    Module: makeCountableMaterialList(moduleMaterialList),
    LMD: [{ material: LMD, count: 0 }],
  } as Depot;
};

/** 사용자가 창고에 보유 중인 재료의 양을 저장하는 아톰 */
export const userDepotAtom = atom<Depot>(makeEmptyDepot());

/** 사용자가 창고 데이터를 입력했는지 여부를 저장하는 아톰 */
export const userDepotInitializedAtom = atom<boolean>(false);

/** 사용자가 필요한 재료의 양을 저장하는 아톰 */
export const userNeedAtom = atom<Depot>(makeEmptyDepot());

/** 사용자가 필요한 재료를 입력했는지 여부를 저장하는 아톰 */
export const userNeedInitializedAtom = atom<boolean>(false);

/** 제작 후 남은 재료를 저장하는 아톰 */
export const materialLeftAtom = atom<Depot>(makeEmptyDepot());

/** 제작 후 남은 재료가 생겼는지 여부를 저장하는 아톰 */
export const materialLeftInitializedAtom = atom<boolean>(false);

/** 오퍼레이터 육성에 필요한 총 경험치를 저장하는 아톰 */
export const expAtom = atom<CountableMaterial>({
  material: EXP,
  count: 0,
});
