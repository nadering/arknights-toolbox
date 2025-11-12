import { RefObject, useEffect, useState } from "react";

type UseModalOptions = {
  event?: "pointerdown" | "click" | "contextmenu";
  useCapture?: boolean;
  /** wrapperRef 이외에도 내부로 간주할 영역들(모달 패널 등) */
  extraInsideRefs?: Array<RefObject<HTMLElement>>;
};

/**
 * React hook: 특정 DOM 영역(ref) 안팎의 클릭(또는 포인터) 이벤트를 감지하여
 * 모달(또는 드롭다운 등)의 열림/닫힘 상태를 관리합니다.
 */
export default function useModal<T extends HTMLElement>(
  wrapperRef: RefObject<T>,
  {
    event = "pointerdown",
    useCapture = true,
    extraInsideRefs = [],
  }: UseModalOptions = {}
) {
  const [open, setOpen] = useState(false);
  const [insideTick, setInsideTick] = useState(0);
  const [outsideTick, setOutsideTick] = useState(0);

  useEffect(() => {
    const isInside = (node: Node | null) => {
      if (!node) return false;
      const bases = [wrapperRef, ...extraInsideRefs];
      return bases.some((r) => r.current && r.current.contains(node));
    };

    const onDoc = (e: Event) => {
      const target = e.target as Node | null;
      if (isInside(target)) {
        setOpen(true);
        setInsideTick((n) => n + 1);
      } else {
        setOpen(false);
        setOutsideTick((n) => n + 1);
      }
    };

    document.addEventListener(event, onDoc, useCapture);
    return () => document.removeEventListener(event, onDoc, useCapture);
  }, [wrapperRef, event, useCapture, extraInsideRefs]);

  return { open, insideTick, outsideTick, setOpen };
}
