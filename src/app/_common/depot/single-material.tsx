"use client";

import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";
import { useAtom } from "jotai";
import { CountableMaterial, TierType } from "@/data/material";
import { handleExponentialNotation, setDepotMaterialById } from "@/tool";
import { userDepotAtom } from "@/store";

/** 창고에 있는 재료 하나를 표현하는 컴포넌트 */
export default function SingleMaterial({
  countableMaterial,
  isLmd = false,
  readonly = false,
  userDepotUse = false,
}: {
  countableMaterial: CountableMaterial;
  isLmd?: boolean;
  readonly?: boolean;
  userDepotUse?: boolean;
}) {
  // 사용자의 창고 데이터
  const [userDepot, setUserDepot] = useAtom(userDepotAtom);

  // 재료 데이터
  const [countableMaterialData, setCountableMaterialData] =
    useState(countableMaterial);

  // 사용자로부터 입력받은 재료 보유량
  const [countString, setCountString] = useState(
    countableMaterial.count.toString()
  );

  /** 이미지 경로 */
  const imageSrc = `/images/material/${countableMaterialData.material.type.toLowerCase()}/${
    countableMaterialData.material.type == "Upgrade"
      ? `${countableMaterialData.material.tier}/`
      : ""
  }${countableMaterialData.material.imageFilename}.png`;

  /** 테두리 색상 타입 */
  type BorderColors = {
    [key in TierType]: string;
  };

  /** 아이템 티어에 따른 테두리 색상 */
  const borderColorByTier: BorderColors = {
    5: "border-tier-5",
    4: "border-tier-4",
    3: "border-tier-3",
    2: "border-tier-2",
    1: "border-tier-1",
  };

  /** 현재 재료가 용문폐라면, 화면 크기가 640px 이하일 때 보유량 길이 증가 */
  const countLengthWhenMobile = isLmd ? "w-[108px]" : "w-16";

  /** 문자열을 입력하지 않고, (마우스 클릭을 통해) 현재 보유량 수정 */
  const addCount = (value: number) => {
    // 640px 이하일 때는, 마우스 클릭이나 터치로 보유량을 수정하지 않음 (임시 처리)
    // 추후 breakpoint를 설정한 후 검사할 예정
    if (window && window.innerWidth < 640) {
      return;
    }

    if (readonly) {
      // 읽기 전용일 때는 보유량을 수정하지 않음
      return;
    }

    // 보유량을 계산한 후,
    const currentCount = parseInt(countString, 10);
    const newCount = Math.max(currentCount + value, 0);

    // 보유량을 반영
    setCountString(newCount.toString());

    // 사용자 창고를 설정하는 경우
    if (userDepotUse) {
      setDepotMaterialById(
        countableMaterialData.material.id,
        newCount,
        userDepot
      );
      setUserDepot({...userDepot});
    }
  };

  /** 현재 보유량 문자열 설정 */
  const handleCountStringValue = (event: FormEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;

    // 0으로 시작하고 문자열 길이가 1을 초과한다면 (00, 01 등), 가장 왼쪽의 0을 제거함
    const startsWithZeroPattern = /^0+/;
    if (value.length > 1) {
      value = value.replace(startsWithZeroPattern, "");
    }

    // 문자열의 길이가 0이라면, 0으로 재설정
    if (value.length == 0) {
      value = "0";
    }

    // 그 후, 보유량 문자열을 설정하고 보유량을 갱신
    setCountString(value);

    // 사용자 창고를 설정하는 경우
    if (userDepotUse) {
      setDepotMaterialById(
        countableMaterialData.material.id,
        parseInt(value, 10),
        userDepot
      );
      setUserDepot({...userDepot});
    }
  };

  // Re-render를 위한 useEffect 추가
  useEffect(() => {
    setCountableMaterialData(countableMaterial);
    setCountString(countableMaterial.count.toString());
  }, [countableMaterial]);

  /**
   * 마우스 기능:
   * - 좌클릭: 보유량 1 증가
   *   - Shift: 보유량 10 증가
   * - 우클릭: 보유량 1 감소
   *   - Shift: 보유량 10 감소
   */
  return (
    <div
      className={`relative w-full flex flex-row justify-between items-center px-4 gap-4 border ${
        borderColorByTier[countableMaterialData.material.tier]
      }  rounded-lg sm:w-28 sm:min-w-28 sm:flex-col sm:justify-center sm:gap-0 sm:px-0 sm:py-2 sm:border-2`}
    >
      <div
        className="flex flex-row items-center gap-2 sm:flex-col sm:gap-0"
        onClick={(event) => {
          if (event.shiftKey) {
            addCount(10);
          } else {
            addCount(1);
          }
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          if (event.shiftKey) {
            addCount(-10);
          } else {
            addCount(-1);
          }
        }}
      >
        <div className="relative w-10 min-w-10 aspect-square select-none sm:w-20 sm:min-w-20">
          <Image
            src={imageSrc}
            alt={countableMaterialData.material.name}
            fill
            sizes="20vw"
            draggable={false}
          />
        </div>
        <p className="flex justify-center items-center px-1 leading-tight h-12 text-base text-gray-200 text-center select-none">
          {countableMaterialData.material.name}
        </p>
      </div>
      <input
        className={`
          ${countLengthWhenMobile} h-6 px-2 py-3 resize-none rounded-xl
          outline-none ${
            readonly
              ? "bg-black selection:bg-transparent cursor-default"
              : "bg-dark-800 selection:bg-gray-800"
          } text-gray-200 text-center 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          sm:w-full sm:px-4 sm:rounded-none`}
        id={countableMaterialData.material.id}
        type="number"
        min={0}
        step={1}
        value={countString}
        onInput={(event) => handleCountStringValue(event)}
        onKeyDown={(event) => handleExponentialNotation(event)}
        readOnly={readonly}
        tabIndex={readonly ? -1 : undefined}
      ></input>
    </div>
  );
}
