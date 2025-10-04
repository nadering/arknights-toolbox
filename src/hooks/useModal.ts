import { RefObject, useEffect, useState } from "react";

type UseModalOptions = {
  event?: "pointerdown" | "click" | "contextmenu";
  useCapture?: boolean;
};

/**
 * React hook: 특정 DOM 영역(ref) 안팎의 클릭(또는 포인터) 이벤트를 감지하여
 * 모달(또는 드롭다운 등)의 열림/닫힘 상태를 관리합니다.
 *
 * @template T HTMLElement를 상속하는 ref의 대상 타입
 *
 * @param {RefObject<T>} wrapperRef
 *  - 감시할 DOM 요소의 ref입니다.
 *  - 이 ref가 가리키는 요소 내부 클릭 시 `open`이 `true`가 되고,
 *    외부 클릭 시 `open`이 `false`로 전환됩니다.
 *
 * @param {UseModalOptions} [options]
 *  - 감지할 이벤트 타입 및 capture 옵션을 설정합니다.
 *  - 기본값: `{ event: "pointerdown", useCapture: true }`
 *
 * @param {"pointerdown" | "click" | "contextmenu"} [options.event]
 *  - 감지할 이벤트 타입입니다.
 *  - `"pointerdown"`을 기본으로 사용하면 클릭보다 먼저 트리거되어,
 *    `stopPropagation`의 영향을 덜 받는 장점이 있습니다.
 *
 * @param {boolean} [options.useCapture]
 *  - `addEventListener`의 capture 단계 사용 여부입니다.
 *  - 기본값은 `true`이며, 이 경우 상위 요소의 버블링 차단 영향을 받지 않습니다.
 *
 * @returns {{
 *   open: boolean,
 *   insideTick: number,
 *   outsideTick: number,
 *   setOpen: React.Dispatch<React.SetStateAction<boolean>>
 * }}
 * - `open`: ref 내부를 클릭하면 `true`, 외부 클릭 시 `false`가 되는 현재 열림 상태
 * - `insideTick`: ref 내부 클릭이 발생할 때마다 +1 증가하는 카운터 (동일한 상태여도 변화를 감지 가능)
 * - `outsideTick`: ref 외부 클릭이 발생할 때마다 +1 증가하는 카운터
 * - `setOpen`: 외부에서 강제로 열림/닫힘 상태를 제어하기 위한 setter
 *
 * @example
 * ```tsx
 * const modalRef = useRef<HTMLDivElement>(null);
 * const { open, outsideTick, setOpen } = useModal(modalRef);
 *
 * // 모달이 바깥을 클릭할 때마다 실행되는 효과
 * useEffect(() => {
 *   if (!open) console.log("모달 닫힘");
 * }, [outsideTick]);
 *
 * return (
 *   <div ref={modalRef}>
 *     {open && <ModalContent />}
 *     <button onClick={() => setOpen(true)}>열기</button>
 *   </div>
 * );
 * ```
 */
export default function useModal(
  wrapperRef: RefObject<HTMLElement>,
  { event = "pointerdown", useCapture = true }: UseModalOptions = {}
) {
  const [open, setOpen] = useState(false);
  const [insideTick, setInsideTick] = useState(0);
  const [outsideTick, setOutsideTick] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onDoc = (e: Event) => {
      const target = e.target as Node | null;
      if (!target) return;
      // el.contains가 true면 내부 클릭
      if (el.contains(target)) {
        setOpen(true);
        setInsideTick((n) => n + 1);
      } else {
        setOpen(false);
        setOutsideTick((n) => n + 1);
      }
    };

    document.addEventListener(event, onDoc, useCapture);
    return () => document.removeEventListener(event, onDoc, useCapture);
  }, [wrapperRef, event, useCapture]);

  return { open, insideTick, outsideTick, setOpen };
}
