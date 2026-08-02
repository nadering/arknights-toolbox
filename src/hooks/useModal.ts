import { type RefObject, useEffect, useState } from "react";

type UseModalOptions = {
  event?: "pointerdown" | "click" | "contextmenu";
  useCapture?: boolean;
  /** wrapperRef 이외에도 내부로 간주할 영역들(모달 패널 등) */
  extraInsideRefs?: ReadonlyArray<RefObject<HTMLElement | null>>;
};

/**
 * 특정 DOM 영역 안팎의 이벤트를 감지하여
 * 모달 또는 드롭다운의 열림/닫힘 상태를 관리합니다.
 */
export default function useModal<T extends HTMLElement>(
  wrapperRef: RefObject<T | null>,
  {
    event = "pointerdown",
    useCapture = true,
    extraInsideRefs,
  }: UseModalOptions = {},
) {
  const [open, setOpen] = useState(false);
  const [insideTick, setInsideTick] = useState(0);
  const [outsideTick, setOutsideTick] = useState(0);

  useEffect(() => {
    const isInside = (node: Node | null) => {
      if (!node) {
        return false;
      }

      if (wrapperRef.current?.contains(node)) {
        return true;
      }

      return (
        extraInsideRefs?.some((ref) => ref.current?.contains(node)) ?? false
      );
    };

    const handleDocumentEvent = (event: Event) => {
      const target = event.target as Node | null;

      if (isInside(target)) {
        setOpen(true);
        setInsideTick((previousTick) => previousTick + 1);
        return;
      }

      setOpen(false);
      setOutsideTick((previousTick) => previousTick + 1);
    };

    document.addEventListener(event, handleDocumentEvent, useCapture);

    return () => {
      document.removeEventListener(event, handleDocumentEvent, useCapture);
    };
  }, [wrapperRef, event, useCapture, extraInsideRefs]);

  return {
    open,
    insideTick,
    outsideTick,
    setOpen,
  };
}
