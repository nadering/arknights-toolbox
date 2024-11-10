import { atom } from "jotai";

/** 현재 보유량 설정 과정 중 사용자 선택 */
export type UserSelectType = "Main" | "JSON" | "Depot" | "BackToMain" ;

/** 사용자가 선택한 데이터 입력 방법 */
export const userSelectAtom = atom<UserSelectType>("Main");

/** 오퍼레이터 정보 접기/펼치기 여부 */
export const operatorCollapsedAtom = atom<boolean>(false);