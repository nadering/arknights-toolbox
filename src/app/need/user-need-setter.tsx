"use client";

import { useAtomValue } from "jotai";
import { userNeedInitializedAtom } from "@/store";
import { UserNeedToDepot } from "./depot";
import { OperatorSetter } from "./operator";

/** 사용자의 필요 재료 설정 관련 컴포넌트 */
export default function UserNeedSetter() {
  // 사용자의 필요 재료가 설정되었는지 여부
  const userNeedInitialized = useAtomValue(userNeedInitializedAtom);

  return (
    <>
      <OperatorSetter />
      {userNeedInitialized && <UserNeedToDepot />}
    </>
  );
}
