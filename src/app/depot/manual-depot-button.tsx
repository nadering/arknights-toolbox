"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { userSelectAtom } from "@/store";

/** 직접 재료를 입력받는 선택지 버튼 */
export default function ManualDepotButton() {
  /** 애니메이션을 위해 버튼 노드를 참조하는 Ref */
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 사용자가 선택한 데이터 입력 방법
  const [userSelect, setUserSelect] = useAtom(userSelectAtom);

  // 애니메이션 1 (JSON이 선택될 경우, 오른쪽으로 이동하며 Fade-out으로 사라짐)
  useEffect(() => {
    const animateClass = "animate-[fade-out-right_0.2s_ease-in-out]";

    if (
      userSelect == "JSON" &&
      !buttonRef.current?.classList.contains(animateClass)
    ) {
      /**
       * 사용자의 데이터 입력 방법으로 JSON이 선택되면,
       * Fade-out 애니메이션을 실행한 후, 현재 컴포넌트를 숨김
       */
      buttonRef.current?.classList.add(animateClass);

      setTimeout(() => {
        buttonRef.current?.classList.remove(animateClass);
        buttonRef.current?.classList.add("hidden");
      }, 180);
    }
  }, [userSelect]);

  // 애니메이션 2 (이전 화면으로 돌아올 경우, 왼쪽으로 이동하며 Fade-in으로 나타남)
  useEffect(() => {
    const animateClass = "animate-[fade-in-left_0.2s_ease-in-out]";

    if (
      userSelect == "Back" &&
      !buttonRef.current?.classList.contains(animateClass)
    ) {
      /**
       * 사용자가 JSON 입력 도중 "이전"을 눌러 기존 화면으로 돌아가면,
       * 숨겨두었던 컴포넌트를 다시 활성화시키고,
       * Fade-in 애니메이션을 실행함
       */
      if (buttonRef.current?.classList.contains("hidden")) {
        buttonRef.current.classList.remove("hidden");
      }
      buttonRef.current?.classList.add(animateClass);

      setTimeout(() => {
        buttonRef.current?.classList.remove(animateClass);
      }, 200);
    }
  }, [userSelect]);

  return (
    <button
      className="w-full flex flex-row justify-center items-center gap-x-4 p-4 rounded-xl sm:w-[47.5%] sm:flex-col hover:bg-gray-800 hover:bg-opacity-15"
      onClick={() => setUserSelect("Manual")}
      ref={buttonRef}
    >
      <Image
        className="translate-y-[-12px] [filter:brightness(100%)_invert(100%)]"
        src={`/images/others/keyboard.png`}
        alt="keyboard-typing"
        width={128}
        height={128}
        priority
      />
      <div className="flex flex-col items-center gap-y-3">
        <p className="leading-none font-semibold text-2xl text-white text-center break-keep">
          직접 입력하기
        </p>
        <p className="leading-tight text-center text-gray-500 break-keep">
          <span className="font-semibold text-gray-400">명일방주 창고</span>
          에서 직접 확인 후, <br />
          데이터 입력하기
        </p>
      </div>
    </button>
  );
}
