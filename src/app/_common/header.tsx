"use client";

import Link from "next/link";
import Image from "next/image";
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
      <a
        href="https://github.com/nadering/arknights-toolbox"
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative w-[28px] aspect-square translate-y-2 selection:bg-transparent`}
      >
        <Image
          className="transition:[filter_0s] [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
            hover:[filter:invert(98%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]"
          src="/images/others/github.png"
          alt="github-link"
          fill
          sizes="10vw"
          draggable={false}
        />
        
      </a>
    </header>
  );
}
