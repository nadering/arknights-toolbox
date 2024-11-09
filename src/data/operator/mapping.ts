import Operator from "./operator";
import { casterList } from "./caster";
import { defenderList } from "./defender";
import { guardList } from "./guard";
import { medicList } from "./medic";
import { sniperList } from "./sniper";
import { specialistList } from "./specialist";
import { supporterList } from "./supporter";
import { vanguardList } from "./vanguard";

/** 전체 오퍼레이터 리스트 */
export const operatorList: Operator[] = [
  ...vanguardList,
  ...guardList,
  ...defenderList,
  ...sniperList,
  ...casterList,
  ...medicList,
  ...supporterList,
  ...specialistList,
].sort((a, b) => {
  // ID 내림차순으로 정렬
  return b.id - a.id;
});
