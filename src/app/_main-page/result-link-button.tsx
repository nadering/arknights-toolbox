"use client";

import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { userDepotInitializedAtom, userNeedInitializedAtom } from "@/store";

/** 계산 결과 페이지로 라우팅하는 버튼 컴포넌트 */
export default function ResultLinkButton() {
  // 사용자가 보유량 및 필요 재료를 모두 설정했을 때 활성화
  const userDepotInitialized = useAtomValue(userDepotInitializedAtom);
  const userNeedInitialized = useAtomValue(userNeedInitializedAtom);

  const canAccessResult = userDepotInitialized && userNeedInitialized;

  return (
    <Link
      className={`relative grow flex flex-row justify-center items-center gap-6 p-4 rounded-xl sm:flex-col sm:gap-4 
      ${
        canAccessResult
          ? "hover:bg-gray-800 hover:bg-opacity-15"
          : "pointer-events-none"
      }`}
      aria-disabled={!canAccessResult}
      tabIndex={!canAccessResult ? -1 : undefined}
      href="/result"
    >
      <div
        className="relative w-16 aspect-square selection:bg-transparent sm:w-24"
        draggable={false}
      >
        <Image
          className={`${
            canAccessResult
              ? "[filter:brightness(100%)_invert(100%)]"
              : "[filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]"
          } [transition:filter_0s]`}
          src="/images/others/calculator.png"
          alt="result-link"
          fill
          sizes="20vw"
          priority
          draggable={false}
        />
      </div>
      <div className="w-[180px] flex flex-col items-center gap-1 translate-y-[4px]">
        <p
          className={`leading-none font-semibold text-2xl ${
            canAccessResult ? "text-white" : "text-gray-600"
          } text-center break-keep`}
        >
          계산 결과 확인
        </p>
        <p
          className={`leading-tight text-center ${
            canAccessResult ? "text-gray-500" : "text-gray-900"
          } break-keep`}
        >
          입력된 데이터로 자동 계산
        </p>
      </div>
    </Link>
  );
}
