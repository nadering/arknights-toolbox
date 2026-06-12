"use client";

import { ReactNode, useEffect, useState } from "react";
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
};

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
}: CommonModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (!isOpen) {
      return;
    }

    if (!closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!mounted) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  const handleBackdropMouseDown = () => {
    if (!closeOnBackdrop) {
      return;
    }

    onClose();
  };

  const handleModalMouseDown = (event: React.MouseEvent) => {
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
        aria-labelledby="common-modal-title"
        className="relative flex max-h-[calc(100vh-48px)] w-full max-w-[480px] flex-col rounded-2xl border border-gray-700 bg-gray-950 px-6 py-5 shadow-2xl"
        onMouseDown={handleModalMouseDown}
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id="common-modal-title"
            className="leading-tight font-medium text-xl text-gray-300 break-keep select-none"
          >
            {title}
          </h2>
          {hasCloseButton && (
            <button
              type="button"
              aria-label="모달 닫기"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-800 hover:text-gray-100"
              onClick={onClose}
              hidden={!hasCloseButton}
            >
              ×
            </button>
          )}
        </div>

        <div className="mt-5 text-sm leading-relaxed text-gray-300 break-keep">
          {children}
        </div>

        {actions.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            {actions.map((action, index) => {
              return <div key={index}>{action}</div>;
            })}
          </div>
        )}
      </section>
    </div>,
    document.body,
  );
};
