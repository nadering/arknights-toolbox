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

  // 애니메이션 1 (처음 마운트될 경우, 아래쪽으로 이동하며 Fade-in으로 나타남)
  useEffect(() => {
    const animateClass = "animate-[fade-in-down_0.2s_ease-in-out]";

    if (
      userSelect == "Main" &&
      !divRef.current?.classList.contains(animateClass)
    ) {
      /**
       * 현재 보유량 설정 페이지로 들아오면,
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
  }, [userSelect]);

  // 애니메이션 2 (창고를 보여줄 경우, 아래쪽으로 이동하며 Fade-out으로 사라짐)
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
      className="hidden relative w-full flex flex-col justify-between gap-1 sm:flex-row sm:min-h-[283px] sm:gap-0"
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
