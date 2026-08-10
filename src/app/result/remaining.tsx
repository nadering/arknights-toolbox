"use client";

import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { materialLeftAtom, materialLeftInitializedAtom } from "@/store";
import { DepotLine, LMDExpLine, UpgradeLine } from "@common/depot";
import { type CountableMaterial, EXP } from "@/data/material";

/** 제작 후 남은 재료를 나타내는 컴포넌트 */
export default function Remaining({ exp }: { exp: CountableMaterial }) {
  // 남은 재료 데이터
  const materialLeft = useAtomValue(materialLeftAtom);
  const materialLeftInitialized = useAtomValue(materialLeftInitializedAtom);

  // 경험치 데이터
  const expData: CountableMaterial = {
    material: EXP,
    count: Math.max(0, exp.count),
  };

  // 애니메이션을 위해 노드를 참조
  const divRef = useRef<HTMLDivElement>(null);

  // 남은 재료가 설정되면 아래쪽으로 이동하며 Fade-in
  useEffect(() => {
    if (!materialLeftInitialized) {
      return;
    }

    const element = divRef.current;

    if (!element) {
      return;
    }

    const animateClass = "animate-[fade-in-down_0.2s_ease-in-out]";

    element.classList.remove("hidden");
    element.classList.add(animateClass);

    const timeoutId = window.setTimeout(() => {
      element.classList.remove(animateClass);
    }, 200);

    return () => {
      window.clearTimeout(timeoutId);
      element.classList.remove(animateClass);
    };
  }, [materialLeftInitialized]);

  return (
    <div ref={divRef} className="hidden flex flex-col p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
        <p className="pl-1 text-3xl font-bold text-white break-keep">
          남은 재료 확인
        </p>
      </div>

      <div className="flex w-full grow flex-col gap-8 rounded-xl border-none p-2 pt-4 sm:pt-2">
        <UpgradeLine list={materialLeft["Upgrade"]} skipZero readonly />

        <LMDExpLine
          list={materialLeft["LMD"]}
          expData={expData}
          skipZero
          readonly
        />

        <DepotLine
          title="스킬개론"
          list={materialLeft["Skill-Summary"]}
          skipZero
          readonly
        />

        <DepotLine
          title="모듈"
          list={materialLeft["Module"]}
          skipZero
          readonly
        />

        <DepotLine
          title="데이터 칩"
          list={materialLeft["Memory-Chip"]}
          skipZero
          readonly
        />
      </div>
    </div>
  );
}
