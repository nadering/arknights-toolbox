"use client";

import Link from "next/link";
import { useSetAtom } from "jotai";
import { userSelectAtom } from "@/store";

export default function Header() {
  // 사용자가 선택한 데이터 입력 방법
  const setUserSelect = useSetAtom(userSelectAtom);

  return (
    <header className="absolute top-0 left-0 right-0 h-12 flex flex-row justify-between items-center px-4 select-none selection:bg-transparent">
      <Link
        href="/"
        className="leading-none font-semibold text-2xl text-gray-400 text-center break-keep px-1 translate-y-2
          hover:text-white hover:animate-[vibration-down-8px_1s_infinite]"
        onClick={() => {
          setUserSelect("Main");
        }}
      >
        Arknights-Toolbox
      </Link>
    </header>
  );
}
