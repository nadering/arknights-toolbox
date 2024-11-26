"use client";

import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { materialLeftAtom, materialLeftInitializedAtom } from "@/store";
import { DepotLine, LMDExpLine, UpgradeLine } from "@common/depot";
import { CountableMaterial, EXP } from "@/data/material";

/** 제작 후 남은 재료를 나타내는 컴포넌트 */
export default function Remaining({ exp }: { exp: CountableMaterial }) {
  // 남은 재료 데이터
  const materialLeft = useAtomValue(materialLeftAtom);
  const materialLeftInitialized = useAtomValue(materialLeftInitializedAtom);

  // 경험치 데이터
  const [expData, setExpData] = useState<CountableMaterial>({
    material: EXP,
    count: exp.count,
  });

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  // 애니메이션 (창고를 보여줄 경우, 아래쪽으로 이동하며 Fade-in으로 나타남)
  useEffect(() => {
    if (materialLeftInitialized) {
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
    }
  }, [materialLeftInitialized]);

  // 경험치 설정
  useEffect(() => {
    setExpData({ material: EXP, count: Math.max(0, exp.count) });
  }, [exp]);

  return (
    <div className="hidden flex flex-col p-4" ref={divRef}>
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
        <p className="pl-1 font-bold text-3xl text-white break-keep">
          남은 재료 확인
        </p>
      </div>
      {/* 창고화된 데이터 */}
      <div className="grow w-full flex flex-col gap-8 p-2 pt-4 border-none rounded-xl sm:pt-2">
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
