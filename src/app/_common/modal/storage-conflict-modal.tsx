"use client";

import { useState } from "react";
import { CommonModal } from "./common-modal";

type StorageConflictModalProps = {
  isOpen: boolean;
  localSavedAt: string;
  cloudSavedAt: string;
  onUseLocalData: () => void | Promise<void>;
  onUseCloudData: () => void | Promise<void>;
};

/** 저장 데이터 충돌을 관리하는 모달 컴포넌트 */
export const StorageConflictModal = ({
  isOpen,
  localSavedAt,
  cloudSavedAt,
  onUseLocalData,
  onUseCloudData,
}: StorageConflictModalProps) => {
  const [selected, setSelected] = useState<"local" | "cloud" | null>(null);

  const handleButtonClick = async (choice: "local" | "cloud" | null) => {
    if (choice === null) {
      return;
    }

    if (choice === "local") {
      await onUseLocalData();
    } else {
      await onUseCloudData();
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      title="저장 데이터 충돌"
      onClose={onUseCloudData}
      hasCloseButton={false}
      closeOnBackdrop={false}
      closeOnEscape={false}
      actions={[
        <button
          key="use-cloud"
          type="button"
          className={`rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-950 transition hover:bg-white ${selected === null ? "opacity-50" : ""}`}
          onClick={() => handleButtonClick(selected)}
          disabled={selected === null}
        >
          확인하기
        </button>,
      ]}
    >
      <div className="space-y-4">
        <p>
          현재 기기의 데이터와 계정에 저장된 데이터가 모두 있습니다. 사용할
          데이터를 선택해 주세요.
        </p>

        <div className="grid gap-3">
          <button
            className={`rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 ${selected === "local" ? "ring-2 ring-blue-500 bg-gray-700/70" : ""}`}
            onClick={() => setSelected("local")}
          >
            <p className="text-sm font-medium text-gray-200">
              현재 기기의 데이터
            </p>
            <p className="mt-1 text-xs text-gray-400">
              최근 저장 일자: {localSavedAt}
            </p>
          </button>

          <button
            className={`rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 ${selected === "cloud" ? "ring-2 ring-blue-500 bg-gray-700/70" : ""}`}
            onClick={() => setSelected("cloud")}
          >
            <p className="text-sm font-medium text-gray-200">
              계정에 저장된 데이터
            </p>
            <p className="mt-1 text-xs text-gray-400">
              최근 저장 일자: {cloudSavedAt}
            </p>
          </button>
        </div>

        <p className="text-xs leading-relaxed text-gray-500">
          현재 기기의 데이터를 선택하면 계정에 저장된 데이터가 현재 기기의
          데이터로 덮어써집니다.
        </p>
      </div>
    </CommonModal>
  );
};
