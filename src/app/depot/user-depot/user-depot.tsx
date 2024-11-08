"use client";

import { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { userDepotAtom, userDepotInitializedAtom } from "@/store";
import { DepotLine } from "@/app/common/depot";
import UpgradeLine from "./upgrade-line";
import LMDLine from "./lmd-line";

/** 사용자 현재 보유량 (창고 데이터) */
export default function UserDepot() {
  const userDepot = useAtomValue(userDepotAtom);
  const setUserDepotInitialized = useSetAtom(userDepotInitializedAtom);

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  // 사용자에게 창고 데이터를 보여주는 순간, 창고가 초기화되었다고 설정
  useEffect(() => {
    setUserDepotInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 애니메이션 (창고를 보여줄 경우, 위쪽으로 이동하며 Fade-in으로 나타남)
  useEffect(() => {
    /** 애니메이션을 나타내는 클래스 */
    const animateClass = "animate-[fade-in-up_0.2s_ease-in-out]";

    if (
      !divRef.current?.classList.contains(animateClass)
    ) {
      /**
       * 사용자의 데이터 입력 방법으로 JSON이 선택되면,
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
    <div className="w-full flex flex-col gap-8 hidden" ref={divRef}>
      <LMDLine list={userDepot["LMD"]} />
      <DepotLine title="작전개론" list={userDepot["Battle-Record"]} />
      <UpgradeLine list={userDepot["Upgrade"]} />
      <DepotLine title="스킬개론" list={userDepot["Skill-Summary"]} />
      <DepotLine title="모듈" list={userDepot["Module"]} />
      <DepotLine title="데이터 칩" list={userDepot["Memory-Chip"]} />
    </div>
  );
}