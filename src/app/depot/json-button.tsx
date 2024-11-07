"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { userSelectAtom } from "@/store";

/** JSON 문자열을 입력받는 선택지 버튼 */
export default function JsonImportButton() {
  // 사용자가 선택한 데이터 입력 방법
  const [userSelect, setUserSelect] = useAtom(userSelectAtom);

  return (
    <button
      className={`w-full flex flex-row justify-center items-center gap-x-4 p-4 rounded-xl sm:w-[47.5%] sm:flex-col ${
        userSelect && userSelect == "JSON"
          ? "cursor-default"
          : "hover:bg-gray-800 hover:bg-opacity-15"
      }`}
      onClick={() => setUserSelect("JSON")}
    >
      <div className="relative w-32 aspect-square">
        <Image
          className="rotate-90 [filter:brightness(100%)_invert(100%)]"
          src="/images/others/import.png"
          alt="import-json"
          fill
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-y-3">
        <p className="leading-none font-semibold text-2xl text-white text-center break-keep">
          JSON 가져오기
        </p>
        <p className="leading-tight text-center text-gray-500 break-keep">
          <span className="font-semibold text-gray-400">MAA 툴박스</span>에서
          창고 인식 후, <br />
          <span className="font-semibold text-gray-300 underline">
            Arkntools
          </span>
          으로 내보내기
        </p>
      </div>
    </button>
  );
}
