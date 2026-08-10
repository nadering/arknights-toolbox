"use client";

import { type InputEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  LMD,
  type Material,
  memoryChipList,
  moduleMaterialList,
  skillSummaryList,
  T1UpgradeList,
  T2UpgradeList,
  T3UpgradeList,
  T4UpgradeList,
  T5UpgradeList,
} from "@/data/material";
import { useModal } from "@/hooks";
import { handleExponentialNotation } from "@/tool";

/** 선택될 수 있는 재료 목록 */
interface SelectableMaterialProps {
  // 부모 값 변경을 위한 아이디 및 함수
  id: number;
  listId?: number;
  itemId?: number;
  handleChange: (
    index: number,
    material: Material,
    count: number,
    listIndex?: number,
    itemIndex?: number,
  ) => void;

  // Key로 사용할 값
  keyString: string;

  // 기본 설정
  defaultMaterial?: Material;
  defaultCount?: number;

  // 정예화 재료
  T1?: boolean;
  T2?: boolean;
  T3?: boolean;
  T4?: boolean;
  T5?: boolean;

  // 용문폐
  lmd?: boolean;

  // 스킬개론
  skillSummary?: boolean;

  // 모듈
  module?: boolean;

  // 메모리 칩
  memoryChip?: boolean;
}

type SelectableMaterialState = {
  selectedMaterial?: Material;
  countString: string;
  defaultMaterialId?: Material["id"];
  defaultCount?: number;
};

/** 사용자가 종류 및 수량을 선택할 수 있는 재료 */
export default function SelectableMaterial({
  id,
  listId,
  itemId,
  handleChange,
  keyString,
  defaultMaterial,
  defaultCount,
  T1,
  T2,
  T3,
  T4,
  T5,
  lmd,
  skillSummary,
  module,
  memoryChip,
}: SelectableMaterialProps) {
  const materialList = useMemo(() => {
    const newMaterialList: Material[] = [];

    if (T1) {
      newMaterialList.push(...T1UpgradeList);
    }

    if (T2) {
      newMaterialList.push(...T2UpgradeList);
    }

    if (T3) {
      newMaterialList.push(...T3UpgradeList);
    }

    if (T4) {
      newMaterialList.push(...T4UpgradeList);
    }

    if (T5) {
      newMaterialList.push(...T5UpgradeList);
    }

    if (lmd) {
      newMaterialList.push(LMD);
    }

    if (skillSummary) {
      newMaterialList.push(...skillSummaryList);
    }

    if (module) {
      newMaterialList.push(...moduleMaterialList);
    }

    if (memoryChip) {
      newMaterialList.push(...memoryChipList);
    }

    return newMaterialList;
  }, [T1, T2, T3, T4, T5, lmd, skillSummary, module, memoryChip]);

  const [state, setState] = useState<SelectableMaterialState>(() => ({
    selectedMaterial: defaultMaterial,
    countString: (defaultCount ?? 0).toString(),
    defaultMaterialId: defaultMaterial?.id,
    defaultCount,
  }));

  const { selectedMaterial, countString } = state;

  // 외부에서 기본값이 변경되면 입력값도 함께 갱신
  if (
    state.defaultMaterialId !== defaultMaterial?.id ||
    state.defaultCount !== defaultCount
  ) {
    setState({
      selectedMaterial: defaultMaterial,
      countString: (defaultCount ?? 0).toString(),
      defaultMaterialId: defaultMaterial?.id,
      defaultCount,
    });
  }

  // 모달
  const divRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const extraInsideRefs = useMemo(() => [modalRef], [modalRef]);

  const { open: selectModalActive, setOpen: setSelectModalActive } = useModal(
    divRef,
    {
      extraInsideRefs,
    },
  );

  /** 변경된 값을 부모 컴포넌트에 반영 */
  const applyChange = (material: Material | undefined, countValue: string) => {
    const count = Number.parseInt(countValue, 10);

    if (!material || Number.isNaN(count) || count <= 0) {
      return;
    }

    if (listId !== undefined && itemId !== undefined) {
      handleChange(id, material, count, listId, itemId);
      return;
    }

    if (listId !== undefined) {
      handleChange(id, material, count, listId);
      return;
    }

    handleChange(id, material, count);
  };

  /** 현재 보유량 문자열 설정 */
  const handleCountStringValue = (event: InputEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;

    // 00, 01처럼 0으로 시작하면 왼쪽의 0을 제거
    if (value.length > 1) {
      value = value.replace(/^0+/, "");
    }

    if (value.length === 0) {
      value = "0";
    }

    setState((previousState) => ({
      ...previousState,
      countString: value,
    }));

    applyChange(selectedMaterial, value);
  };

  // 모달이 열렸을 때 화면 바깥으로 나가지 않도록 위치 조정
  useEffect(() => {
    if (!selectModalActive) {
      return;
    }

    const modalElement = modalRef.current;

    if (!modalElement) {
      return;
    }

    if (window.innerWidth < 640) {
      modalElement.style.transform = "";
      return;
    }

    const padding = 16;
    const rightPosition = modalElement.getBoundingClientRect().right;
    const maximumRightPosition = window.innerWidth - padding;

    if (rightPosition > maximumRightPosition) {
      const overflowWidth = rightPosition - maximumRightPosition;

      modalElement.style.transform = `translateX(-${overflowWidth}px)`;
      return;
    }

    modalElement.style.transform = "";
  }, [selectModalActive]);

  return (
    <div className="relative w-20">
      <div className="flex w-full flex-col items-center">
        <div
          ref={divRef}
          className="relative h-16 w-20 cursor-pointer rounded-t-xl border-2 border-gray-800"
        >
          {selectedMaterial && (
            <Image
              className="px-3 py-1"
              src={`/images/material/${selectedMaterial.type.toLowerCase()}/${
                selectedMaterial.type === "Upgrade"
                  ? `${selectedMaterial.tier}/`
                  : ""
              }${selectedMaterial.imageFilename}.png`}
              alt={selectedMaterial.name}
              fill
              sizes="10vw"
              draggable={false}
            />
          )}
        </div>

        <input
          className="h-6 w-20 resize-none rounded-b-xl border-2 border-t-0 border-gray-800 bg-dark-800 px-2 py-3 text-center text-gray-200 outline-none selection:bg-gray-800 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          id={keyString}
          type="number"
          min={0}
          step={1}
          value={countString}
          onInput={handleCountStringValue}
          onKeyDown={handleExponentialNotation}
        />
      </div>

      {selectModalActive && (
        <>
          <div
            ref={modalRef}
            className="fixed right-0 bottom-24 left-0 z-10 mt-1 flex h-min w-full flex-row flex-wrap items-start gap-1 rounded-t-lg border-t-2 border-gray-800 bg-dark-900 p-2 sm:absolute sm:top-full sm:w-80 sm:rounded-xl sm:border-2 sm:p-1"
          >
            {materialList.map((material) => (
              <Image
                key={material.id}
                className="cursor-pointer"
                src={`/images/material/${material.type.toLowerCase()}/${
                  material.type === "Upgrade" ? `${material.tier}/` : ""
                }${material.imageFilename}.png`}
                alt={material.name}
                title={material.name}
                width={48}
                height={48}
                draggable={false}
                onClick={() => {
                  setState((previousState) => ({
                    ...previousState,
                    selectedMaterial: material,
                  }));

                  applyChange(material, countString);
                  setSelectModalActive(false);
                }}
              />
            ))}
          </div>

          <div className="fixed right-0 bottom-0 left-0 z-10 h-24 w-full bg-dark-900 sm:hidden" />
        </>
      )}
    </div>
  );
}
