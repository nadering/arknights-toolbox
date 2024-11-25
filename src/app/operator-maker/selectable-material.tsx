"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  LMD,
  Material,
  memoryChipList,
  moduleMaterialList,
  skillSummaryList,
  T1UpgradeList,
  T2UpgradeList,
  T3UpgradeList,
  T4UpgradeList,
  T5UpgradeList,
} from "@/data/material";
import Image from "next/image";
import { useModal } from "@/hooks";
import { handleExponentialNotation } from "@/tool";

/** 선택될 수 있는 재료 목록 */
interface SelectableMaterialProps {
  // Key로 사용할 값
  keyString: string;

  // 기본 설정
  defaultMaterial?: Material;
  defaultCount?: number;

  // 부모 값 변경을 위한 아이디 및 함수
  id: number;
  listId?: number;
  handleChange: (
    index: number,
    material: Material,
    count: number,
    listIndex?: number
  ) => void;

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

/** 사용자가 종류 및 수량을 선택할 수 있는 재료 */
export default function SelectableMaterial({
  keyString,
  defaultMaterial,
  defaultCount,
  id,
  listId,
  handleChange,
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
  // 재료 목록
  const [materialList, setMaterialList] = useState<Material[]>([]);

  // 선택된 재료
  const [selectedMaterial, setSelectedMaterial] = useState<Material>();

  // 수량
  const [countString, setCountString] = useState("0");

  // 모달
  const divRef = useRef<HTMLDivElement>(null);
  const selectModalActive = useModal(divRef);

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

    // 그 후, 보유량 문자열을 설정
    setCountString(value);
  };

  useEffect(() => {
    // 기본 재료 설정
    if (defaultMaterial) {
      setSelectedMaterial(defaultMaterial);
    }
    if (defaultCount) {
      setCountString(defaultCount.toString());
    }

    // 재료 설정
    const newMaterialList: Material[] = [];

    // 정예화 재료
    if (T1) newMaterialList.push(...T1UpgradeList);
    if (T2) newMaterialList.push(...T2UpgradeList);
    if (T3) newMaterialList.push(...T3UpgradeList);
    if (T4) newMaterialList.push(...T4UpgradeList);
    if (T5) newMaterialList.push(...T5UpgradeList);

    // 용문폐
    if (lmd) newMaterialList.push(LMD);

    // 스킬개론
    if (skillSummary) newMaterialList.push(...skillSummaryList);

    // 모듈
    if (module) newMaterialList.push(...moduleMaterialList);

    // 메모리 칩
    if (memoryChip) newMaterialList.push(...memoryChipList);

    setMaterialList(newMaterialList);
  }, [
    T1,
    T2,
    T3,
    T4,
    T5,
    lmd,
    memoryChip,
    module,
    skillSummary,
    defaultMaterial,
    defaultCount,
  ]);

  // 값 변경을 반영
  useEffect(() => {
    const count = parseInt(countString, 10);
    if (selectedMaterial && count > 0) {
      if (typeof listId !== undefined) {
        handleChange(id, selectedMaterial, count, listId);
      } else {
        handleChange(id, selectedMaterial, count);
      }
    }
  }, [id, listId, selectedMaterial, countString]);

  return (
    <div className="relative w-20">
      <div className="flex flex-col w-full items-center">
        <div
          className="relative w-20 h-16 border-2 border-gray-800 rounded-t-xl cursor-pointer"
          ref={divRef}
        >
          {selectedMaterial && (
            <Image
              className="px-3 py-1"
              src={`/images/material/${selectedMaterial.type.toLowerCase()}/${
                selectedMaterial.type == "Upgrade"
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
          className="w-20 h-6 px-2 py-3 resize-none rounded-b-xl outline-none bg-dark-800 text-gray-200 text-center border-2 border-t-0 border-gray-800 selection:bg-gray-800
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id={keyString}
          type="number"
          min={0}
          step={1}
          value={countString}
          onInput={(event) => handleCountStringValue(event)}
          onKeyDown={(event) => handleExponentialNotation(event)}
        ></input>
      </div>
      {selectModalActive && (
        <div className="absolute top-full flex flex-row flex-wrap z-10 w-80 gap-1 mt-1 p-1 rounded-xl bg-dark-900 border-2 border-gray-800">
          {materialList.map((material) => {
            return (
              <Image
                key={material.name}
                className="cursor-pointer"
                src={`/images/material/${material.type.toLowerCase()}/${
                  material.type == "Upgrade" ? `${material.tier}/` : ""
                }${material.imageFilename}.png`}
                alt={material.name}
                title={material.name}
                width={48}
                height={48}
                draggable={false}
                onClick={() => setSelectedMaterial(material)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
