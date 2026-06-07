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

/**
 * 글로벌 서버 기준, 현재 오퍼레이터 직전에 출시된 오퍼레이터 아이디
 * (예를 들어 만트라 - 레재 순서면, 만트라 아이디를 등록)
 * */
export const RECENT_OPERATOR_ID = 395;
