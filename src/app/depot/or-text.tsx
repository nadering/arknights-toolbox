"use client";

import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { userSelectAtom } from "@/store";

/** JSON을 통해 데이터를 가져오는 선택지와, 직접 데이터를 입력하는 선택지를 구분하는 컴포넌트 */
export default function OrText() {
  /** 애니메이션을 위해 Div 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  /** 사용자가 선택한 데이터 입력 방법 */
  const userSelect = useAtomValue(userSelectAtom);

  // 애니메이션 1 (JSON이 선택될 경우, 오른쪽으로 이동하며 Fade-out으로 사라짐)
  useEffect(() => {
    const animateClass = "animate-[fade-out-right_0.2s_ease-in-out]";

    if (
      userSelect == "JSON" &&
      !divRef.current?.classList.contains(animateClass)
    ) {
      /**
       * 사용자의 데이터 입력 방법으로 JSON이 선택되면,
       * Fade-out 애니메이션을 실행한 후, 현재 컴포넌트를 숨김
       */
      divRef.current?.classList.add(animateClass);

      setTimeout(() => {
        divRef.current?.classList.remove(animateClass);
        divRef.current?.classList.add("hidden");
      }, 180);
    }
  }, [userSelect]);

  // 애니메이션 2 (이전 화면으로 돌아올 경우, 왼쪽으로 이동하며 Fade-in으로 나타남)
  useEffect(() => {
    const animateClass = "animate-[fade-in-left_0.2s_ease-in-out]";

    if (
      userSelect == "BackToMain" &&
      !divRef.current?.classList.contains(animateClass)
    ) {
      /**
       * 사용자가 JSON 입력 도중 "이전"을 눌러 기존 화면으로 돌아가면,
       * 숨겨두었던 컴포넌트를 다시 활성화시키고,
       * Fade-in 애니메이션을 실행함
       */
      if (divRef.current?.classList.contains("hidden")) {
        divRef.current.classList.remove("hidden");
      }
      divRef.current?.classList.add(animateClass);

      setTimeout(() => {
        divRef.current?.classList.remove(animateClass);
      }, 200);
    }
  }, [userSelect]);

  return (
    <div
      className="w-full flex justify-center items-center select-none sm:w-[5%] sm:flex-col"
      ref={divRef}
    >
      <p className="text-lg text-gray-700 text-center">or</p>
    </div>
  );
}
