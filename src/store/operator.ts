import { CivilightEterna, Logos, Myrtle, Operator, Wisadel } from "@/data/operator";
import { atom } from "jotai";

/** 사용자가 선택한 오퍼레이터 목록 */
export const selectedOperatorsAtom = atom<Operator[]>([Wisadel, Logos, CivilightEterna, Myrtle]);