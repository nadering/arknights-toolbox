"use client";

import { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { DepotLine, LMDLine, UpgradeLine } from "@common/depot";
import { userDepotAtom, userDepotInitializedAtom } from "@/store";

/** 사용자 현재 보유량 (창고 데이터) */
export default function UserDepot() {
  // 사용자 창고 설정
  const userDepot = useAtomValue(userDepotAtom);
  const setUserDepotInitialized = useSetAtom(userDepotInitializedAtom);

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  // 사용자에게 창고 데이터를 보여주는 순간, 창고가 초기화되었다고 설정
  useEffect(() => {
    setUserDepotInitialized(true);
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
    <div className="hidden w-full flex flex-col gap-8" ref={divRef}>
      <LMDLine list={userDepot["LMD"]} userDepotUse />
      <DepotLine
        title="작전기록"
        list={userDepot["Battle-Record"]}
        userDepotUse
      />
      <UpgradeLine list={userDepot["Upgrade"]} userDepotUse />
      <DepotLine
        title="스킬개론"
        list={userDepot["Skill-Summary"]}
        userDepotUse
      />
      <DepotLine title="모듈" list={userDepot["Module"]} userDepotUse />
      <DepotLine
        title="데이터 칩"
        list={userDepot["Memory-Chip"]}
        userDepotUse
      />
    </div>
  );
}
