"use client";

import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { DepotLine, LMDLine, UpgradeLine } from "@common/depot";
import { userNeedAtom, userNeedInitializedAtom } from "@/store";

/** 사용자 필요 재료의 창고화된 데이터 */
export default function UserNeedToDepot() {
  // 사용자 필요 재료
  const userNeed = useAtomValue(userNeedAtom);
  const setUserNeedInitialized = useSetAtom(userNeedInitializedAtom);

  // 사용자 필요 재료의 창고화된 데이터를 보여주는 순간, 창고가 초기화되었다고 설정
  useEffect(() => {
    setUserNeedInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col pl-1">
          <p className="font-bold text-3xl text-white break-keep">
            필요 재료 확인
          </p>
          <p className="pl-2 font-medium text-xl text-gray-600 break-keep translate-y-[-3px]">
            없을 경우 하단에 표시되지 않음
          </p>
        </div>
      </div>
      <div className="grow p-2 border-none rounded-xl">
        <div className="w-full flex flex-col gap-8">
          <LMDLine list={userNeed["LMD"]} skipZero readonly />
          <DepotLine
            title="작전개론"
            list={userNeed["Battle-Record"]}
            skipZero
            readonly
          />
          <UpgradeLine list={userNeed["Upgrade"]} skipZero readonly />
          <DepotLine
            title="스킬개론"
            list={userNeed["Skill-Summary"]}
            skipZero
            readonly
          />
          <DepotLine title="모듈" list={userNeed["Module"]} skipZero readonly />
          <DepotLine
            title="데이터 칩"
            list={userNeed["Memory-Chip"]}
            skipZero
            readonly
          />
        </div>
      </div>
    </div>
  );
}
