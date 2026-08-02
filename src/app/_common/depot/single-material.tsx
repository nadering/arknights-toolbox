"use client";

import Image from "next/image";
import { type FormEvent, useState } from "react";
import { useAtom } from "jotai";
import type { CountableMaterial, TierType } from "@/data/material";
import { handleExponentialNotation, setDepotMaterialById } from "@/tool";
import { userDepotAtom } from "@/store";

type BorderColors = {
  [key in TierType]: string;
};

/** 아이템 티어에 따른 테두리 색상 */
const borderColorByTier: BorderColors = {
  6: "border-tier-6",
  5: "border-tier-5",
  4: "border-tier-4",
  3: "border-tier-3",
  2: "border-tier-2",
  1: "border-tier-1",
};

/** 창고에 있는 재료 하나를 표현하는 컴포넌트 */
export default function SingleMaterial({
  countableMaterial,
  readonly = false,
  userDepotUse = false,
}: {
  countableMaterial: CountableMaterial;
  readonly?: boolean;
  userDepotUse?: boolean;
}) {
  const [userDepot, setUserDepot] = useAtom(userDepotAtom);

  const material = countableMaterial.material;
  const materialId = material.id;
  const materialCount = countableMaterial.count;

  // 사용자로부터 입력받은 재료 보유량
  const [countString, setCountString] = useState(materialCount.toString());

  // 외부에서 전달되는 재료 또는 수량이 변경되었는지 확인하기 위한 값
  const [previousMaterialData, setPreviousMaterialData] = useState({
    id: materialId,
    count: materialCount,
  });

  if (
    previousMaterialData.id !== materialId ||
    previousMaterialData.count !== materialCount
  ) {
    setPreviousMaterialData({
      id: materialId,
      count: materialCount,
    });
    setCountString(materialCount.toString());
  }

  /** 이미지 경로 */
  const imageSrc = `/images/material/${material.type.toLowerCase()}/${
    material.type === "Upgrade" ? `${material.tier}/` : ""
  }${material.imageFilename}.png`;

  /** 재료 수량이 6자리 이상이거나 그럴 가능성이 높은 경우 입력창 크기를 확대 */
  const needLongInput =
    ["순오리지늄", "합성옥", "용문폐", "경험치"].includes(material.name) ||
    materialCount >= 100000;

  /** 모바일 화면에서 사용할 입력창 너비 */
  const countLengthWhenMobile = needLongInput ? "w-[108px]" : "w-16";

  /** 변경된 재료 수량을 사용자 창고에 반영 */
  const updateUserDepot = (count: number) => {
    if (!userDepotUse) {
      return;
    }

    setDepotMaterialById(materialId, count, userDepot);
    setUserDepot({ ...userDepot });
  };

  /** 문자열을 직접 입력하지 않고 마우스 클릭으로 현재 보유량 수정 */
  const addCount = (value: number) => {
    // 640px 이하에서는 마우스 클릭이나 터치로 보유량을 수정하지 않음
    if (window.innerWidth < 640 || readonly) {
      return;
    }

    const currentCount = Number.parseInt(countString, 10);
    const newCount = Math.max(currentCount + value, 0);

    setCountString(newCount.toString());
    updateUserDepot(newCount);
  };

  /** 현재 보유량 문자열 설정 */
  const handleCountStringValue = (event: FormEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;

    // 00, 01과 같이 0으로 시작하면 가장 왼쪽의 0을 제거
    if (value.length > 1) {
      value = value.replace(/^0+/, "");
    }

    if (value.length === 0) {
      value = "0";
    }

    setCountString(value);
    updateUserDepot(Number.parseInt(value, 10));
  };

  /**
   * 마우스 기능:
   * - 좌클릭: 보유량 1 증가
   * - Shift + 좌클릭: 보유량 10 증가
   * - 우클릭: 보유량 1 감소
   * - Shift + 우클릭: 보유량 10 감소
   */
  return (
    <div
      className={`relative flex w-full flex-row items-center justify-between gap-4 rounded-lg border px-4 ${
        borderColorByTier[material.tier]
      } sm:w-28 sm:min-w-28 sm:flex-col sm:justify-center sm:gap-0 sm:border-2 sm:px-0 sm:py-2`}
    >
      <div
        className="flex flex-row items-center gap-2 sm:flex-col sm:gap-0"
        onClick={(event) => {
          addCount(event.shiftKey ? 10 : 1);
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          addCount(event.shiftKey ? -10 : -1);
        }}
      >
        <div className="relative aspect-square w-10 min-w-10 select-none sm:w-20 sm:min-w-20">
          <Image
            src={imageSrc}
            alt={material.name}
            fill
            sizes="20vw"
            draggable={false}
          />
        </div>

        <p className="flex h-12 items-center justify-center px-1 text-center text-base leading-tight text-gray-200 select-none">
          {material.name}
        </p>
      </div>

      <input
        className={`
          ${countLengthWhenMobile} h-6 resize-none rounded-xl px-2 py-3
          text-center text-gray-200 outline-none
          ${
            readonly
              ? "cursor-default bg-black selection:bg-transparent"
              : "bg-dark-800 selection:bg-gray-800"
          }
          [appearance:textfield]
          [&::-webkit-inner-spin-button]:appearance-none
          [&::-webkit-outer-spin-button]:appearance-none
          sm:w-full sm:rounded-none sm:px-4
        `}
        id={materialId}
        type="number"
        min={0}
        step={1}
        value={countString}
        onInput={handleCountStringValue}
        onKeyDown={handleExponentialNotation}
        readOnly={readonly}
        tabIndex={readonly ? -1 : undefined}
      />
    </div>
  );
}
