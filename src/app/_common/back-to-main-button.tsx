"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// 메인 페이지로 리다이렉트해주는 컴포넌트
export default function BackToMainButton() {
  const router = useRouter();

  return (
    <Image
      className="fixed z-50 bottom-[24px] right-[24px] opacity-60 cursor-pointer [transition:filter_0s]
        [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
        hover:opacity-100 hover:[filter:invert(80%)_sepia(0%)_saturate(28%)_hue-rotate(223deg)_brightness(90%)_contrast(92%)]"
      src="/images/others/home-icon.png"
      alt="back-to-main-button"
      width={40}
      height={40}
      onClick={() => router.push("/")}
      draggable={false}
    />
  );
}
