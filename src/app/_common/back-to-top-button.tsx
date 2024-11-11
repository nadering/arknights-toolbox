"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// 사이트 맨 위로 스크롤해주는 컴포넌트
export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <>
      {isVisible ? (
        <Image
          className="fixed z-50 bottom-5 right-5 opacity-60 cursor-pointer [transition:filter_0s]
          [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
          hover:opacity-100 hover:[filter:invert(80%)_sepia(0%)_saturate(28%)_hue-rotate(223deg)_brightness(90%)_contrast(92%)]"
          src="/images/others/uparrow.png"
          alt="back-to-top-button"
          width={48}
          height={48}
          onClick={scrollToTop}
          draggable={false}
        />
      ) : (
        <></>
      )}
    </>
  );
}
