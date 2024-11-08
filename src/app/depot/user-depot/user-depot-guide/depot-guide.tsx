"use client";

import { useRef, useEffect } from "react";
import { useAtomValue } from "jotai";
import { userSelectAtom } from "@/store";
import JsonImportButton from "./json-import-button";
import ManualDepotButton from "./manual-depot-button";
import JsonInput from "./json-input";
import OrText from "./or-text";

/** 사용자가 현재 보유량을 설정하도록 도와주는 컴포넌트 모음 */
export default function DepotGuide({
  activateJsonInput,
}: {
  activateJsonInput: boolean;
}) {
  // 사용자가 선택한 데이터 입력 방법
  const userSelect = useAtomValue(userSelectAtom);

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  // 애니메이션 (창고를 보여줄 경우, 아래쪽으로 이동하며 Fade-out으로 사라짐)
  useEffect(() => {
    const animateClass = "animate-[fade-out-down_0.2s_ease-in-out]";

    if (
      userSelect == "Depot" &&
      !divRef.current?.classList.contains(animateClass)
    ) {
      /**
       * 사용자의 창고를 보여줘야 할 경우,
       * Fade-out 애니메이션을 실행한 후, 현재 컴포넌트를 숨김
       */
      divRef.current?.classList.add(animateClass);

      setTimeout(() => {
        divRef.current?.classList.remove(animateClass);
        divRef.current?.classList.add("hidden");
      }, 180);
    }
  }, [userSelect]);

  return (
    <div
      className="relative w-full flex flex-col justify-between min-h-[283px] sm:flex-row"
      ref={divRef}
    >
      <JsonImportButton />
      {activateJsonInput ? (
        <JsonInput />
      ) : (
        <>
          <OrText />
          <ManualDepotButton />
        </>
      )}
    </div>
  );
}
