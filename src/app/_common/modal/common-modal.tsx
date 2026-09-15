// 공통 모달 컴포넌트

"use client";

import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

type CommonModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  actions?: ReactNode[];
  onClose: () => void;
  hasCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  size?: "default" | "wide";
};

const subscribe = () => {
  return () => {};
};

const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/** 공통 모달 컴포넌트 */
export const CommonModal = ({
  isOpen,
  title,
  children,
  actions = [],
  onClose,
  hasCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  size = "default",
}: CommonModalProps) => {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!mounted || !isOpen) {
    return null;
  }

  const handleBackdropMouseDown = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  const handleModalMouseDown = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6"
      onMouseDown={handleBackdropMouseDown}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative flex max-h-[calc(100dvh-48px)] flex-col rounded-2xl border border-gray-700 bg-gray-950 px-6 py-5 shadow-2xl ${
          size === "wide"
            ? "h-[calc(100dvh-32px)] w-[calc(100vw-32px)] max-w-[732px] sm:h-[90dvh]"
            : "w-full max-w-[480px]"
        }`}
        onMouseDown={handleModalMouseDown}
      >
        <div className="flex shrink-0 items-center justify-between gap-4">
          <h2
            id={titleId}
            className="text-xl leading-tight font-semibold text-white break-keep select-none"
          >
            {title}
          </h2>

          {hasCloseButton && (
            <button
              type="button"
              aria-label="모달 닫기"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-800 hover:text-gray-100"
              onClick={onClose}
            >
              ×
            </button>
          )}
        </div>

        <div className="mt-5 min-h-0 flex-1 text-sm leading-relaxed text-gray-300 break-keep">
          {children}
        </div>

        {actions.length > 0 && (
          <div className="mt-6 flex shrink-0 flex-wrap justify-end gap-2">
            {actions.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </div>
        )}
      </section>
    </div>,
    document.body,
  );
};
