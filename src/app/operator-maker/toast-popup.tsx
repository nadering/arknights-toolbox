"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

/** 일정 시간 후 사라지는 토스트 팝업 */
export default function ToastPopup({
  message,
  ms,
  setter,
}: {
  message: string;
  ms: number;
  setter: Dispatch<SetStateAction<boolean>>;
}) {
  // 애니메이션 Ref
  const popupRef = useRef<HTMLDivElement>(null);

  // 나타나는 애니메이션
  useEffect(() => {
    const animateClass = "animate-[fade-in-right_0.2s_ease-in-out]";

    if (!popupRef.current?.classList.contains(animateClass)) {
      if (popupRef.current?.classList.contains("hidden")) {
        popupRef.current.classList.remove("hidden");
      }
      popupRef.current?.classList.add(animateClass);

      // 200ms 동안 애니메이션 실행
      setTimeout(() => {
        popupRef.current?.classList.remove(animateClass);
      }, 200);
    }
  }, []);

  // 사라지는 애니메이션 및 실제 소멸 처리
  useEffect(() => {
    /** 애니메이션을 나타내는 클래스 */
    const animateClass = "animate-[fade-out-right_0.2s_ease-in-out]";

    // 애니메이션 타이머
    const animationTimer = setTimeout(() => {
      if (!popupRef.current?.classList.contains(animateClass)) {
        popupRef.current?.classList.add(animateClass);
      }
    }, ms);

    // 소멸 타이머
    const timer = setTimeout(() => {
      setter(false);
    }, ms + 180);

    // 콜백 함수로 타이머를 지움
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(timer);
    };
  }, [ms, setter]);

  return (
    <div
      className="hidden absolute top-full left-[-80px] z-10 px-3 py-[2px] bg-gray-700 text-gray-100 text-center text-nowrap rounded-lg cursor-default"
      ref={popupRef}
    >
      {message}
    </div>
  );
}
