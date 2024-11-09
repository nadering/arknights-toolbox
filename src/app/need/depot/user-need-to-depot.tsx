"use client";

import { useRef, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { DepotLine, LMDLine, UpgradeLine } from "@common/depot";
import { userNeedAtom, userNeedInitializedAtom } from "@/store";

/** 사용자 필요 재료의 창고화된 데이터 */
export default function UserNeedToDepot() {
  // 사용자 필요 재료
  const userNeed = useAtomValue(userNeedAtom);
  const setUserNeedInitialized = useSetAtom(userNeedInitializedAtom);

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  // 사용자 필요 재료의 창고화된 데이터를 보여주는 순간, 창고가 초기화되었다고 설정
  useEffect(() => {
    setUserNeedInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 애니메이션 (창고를 보여줄 경우, 아래쪽으로 이동하며 Fade-in으로 나타남)
  useEffect(() => {
    /** 애니메이션을 나타내는 클래스 */
    const animateClass = "animate-[fade-in-down_0.2s_ease-in-out]";

    if (!divRef.current?.classList.contains(animateClass)) {
      /**
       * 숨겨두었던 컴포넌트를 다시 활성화시키고,
       * Fade-in 애니메이션을 실행함
       */
      if (divRef.current?.classList.contains("hidden")) {
        divRef.current.classList.remove("hidden");
      }
      divRef.current?.classList.add(animateClass);

      // 200ms 동안 애니메이션 실행
      setTimeout(() => {
        divRef.current?.classList.remove(animateClass);
      }, 200);
    }
  }, []);

  return (
    <div className="hidden flex flex-col p-4" ref={divRef}>
      <div className="flex flex-row gap-4">
        <p className="font-bold text-3xl text-white break-keep">
          필요 재료 확인
        </p>
      </div>
      <div className="grow w-full flex flex-col gap-8 p-2 border-none rounded-xl">
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
  );
}
