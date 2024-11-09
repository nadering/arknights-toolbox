"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  makeEmptyDepot,
  selectedOperatorsAtom,
  userNeedAtom,
  userNeedInitializedAtom,
} from "@/store";
import {
  crystallineElectronicUnit,
  LMD,
  manganeseTrihydrate,
  moduleDataBlock,
  orirock,
  skillSummary3,
} from "@/data/material";
import { setDepotMaterialById } from "@/tool";
import OperatorAdder from "./operator-adder";
import SelectedOperators from "./selected-operators";

/** 육성할 오퍼레이터 설정 */
export default function OperatorSetter() {
  // 사용자의 필요 재료 설정
  const [userNeed, setUserNeed] = useAtom(userNeedAtom);
  const [userNeedInitialized, setUserNeedInitialized] = useAtom(
    userNeedInitializedAtom
  );

  // 사용자가 선택한 오퍼레이터
  const setSelectedOperators = useSetAtom(selectedOperatorsAtom);

  /** 필요 재료 설정 초기화 */
  const resetNeed = () => {
    setSelectedOperators([]);
    setUserNeed(makeEmptyDepot());
    setUserNeedInitialized(false);
  };

  useEffect(() => {
    console.log("SET TEST");
    const value = userNeed;

    setDepotMaterialById(LMD.id, 5, value);
    setDepotMaterialById(crystallineElectronicUnit.id, 5, value);
    setDepotMaterialById(manganeseTrihydrate.id, 10, value);
    setDepotMaterialById(skillSummary3.id, 15, value);
    setDepotMaterialById(crystallineElectronicUnit.id, 5, value, true);
    setDepotMaterialById(orirock.id, 132, value, true);
    setDepotMaterialById(moduleDataBlock.id, 12345, value);

    setUserNeed(value);
    setUserNeedInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row gap-4">
        <p className="pl-1 font-bold text-3xl text-white break-keep">
          필요 재료 설정
        </p>
        <div className="flex flex-row justify-start items-center gap-1 translate-y-[2px]">
          <button
            className={`${
              userNeedInitialized ? "" : "hidden"
            } group relative w-6 selection:bg-transparent aspect-square`}
            onClick={() => resetNeed()}
          >
            <Image
              className="transition:[filter_0s] [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
            hover:[filter:invert(98%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]"
              src="/images/others/trashcan-new.png"
              alt="clear-data"
              fill
              sizes="10vw"
              draggable={false}
            />
            <p
              className="hidden absolute inset-x-auto top-0 z-10 px-3 py-[2px] bg-gray-900 text-gray-200 text-center text-nowrap
            rounded-lg translate-x-[-21px] translate-y-[-36px] group-hover:block"
            >
              초기화
            </p>
          </button>
        </div>
      </div>
      <div className="grow flex flex-col gap-4 p-2 border-none rounded-xl">
        <OperatorAdder />
        <SelectedOperators />
      </div>
    </div>
  );
}
