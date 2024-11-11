"use client";

import Image from "next/image";

// 사이트 맨 아래로 스크롤해주는 컴포넌트
export default function GoToBottomButton() {
  /** 스크롤 최하단으로 이동 */
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Image
      className="fixed z-50 bottom-[20px] right-[72px] opacity-60 cursor-pointer rotate-180 [transition:filter_0s]
        [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
        hover:opacity-100 hover:[filter:invert(80%)_sepia(0%)_saturate(28%)_hue-rotate(223deg)_brightness(90%)_contrast(92%)]"
      src="/images/others/uparrow.png"
      alt="go-to-bottom-button"
      width={48}
      height={48}
      onClick={scrollToBottom}
      draggable={false}
    />
  );
}
