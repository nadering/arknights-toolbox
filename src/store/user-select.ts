import { atom } from "jotai";

/** 사용자가 선택할 수 있는 데이터 입력 방법 종류 */
export type UserSelectType = "Back" | "JSON" | "Manual";

/** 사용자가 선택한 데이터 입력 방법 */
export const userSelectAtom = atom<UserSelectType>();