"use client";

import Image from "next/image";
import { useAtom, useSetAtom } from "jotai";
import {
  makeEmptyDepot,
  operatorCollapsedAtom,
  selectedOperatorsAtom,
  selectedOperatorsMaterialAtom,
  userNeedAtom,
  userNeedInitializedAtom,
} from "@/store";
import OperatorAdder from "./operator-adder";
import SelectedOperators from "./selected-operators";

/** 육성할 오퍼레이터 설정 */
export default function OperatorSetter() {
  // 사용자의 필요 재료 설정
  const setUserNeed = useSetAtom(userNeedAtom);
  const [userNeedInitialized, setUserNeedInitialized] = useAtom(
    userNeedInitializedAtom
  );

  // 사용자가 선택한 오퍼레이터 및 재화
  const setSelectedOperators = useSetAtom(selectedOperatorsAtom);
  const setSelectedOperatorsMaterial = useSetAtom(
    selectedOperatorsMaterialAtom
  );

  // 오퍼레이터 정보 접기/펼치기 여부
  const [operatorCollapsed, setOperatorCollapsed] = useAtom(
    operatorCollapsedAtom
  );

  /** 필요 재료 설정 초기화 */
  const resetNeed = () => {
    setSelectedOperators([]);
    setSelectedOperatorsMaterial([]);
    setUserNeed(makeEmptyDepot());
    setUserNeedInitialized(false);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row gap-5">
        <p className="pl-1 font-bold text-3xl text-white break-keep">
          필요 재료 설정
        </p>
        <div className="flex flex-row justify-start items-center gap-3 translate-y-[2px]">
          <button
            className={`${
              userNeedInitialized ? "" : "hidden"
            } group relative w-6 aspect-square selection:bg-transparent`}
            onClick={() => {
              setOperatorCollapsed((prev) => !prev);
            }}
          >
            <Image
              className="transition:[filter_0s] [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
            hover:[filter:invert(98%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]"
              src={
                operatorCollapsed
                  ? "/images/others/expand.png"
                  : "/images/others/collapse.png"
              }
              alt="collapse-operator-data"
              fill
              sizes="10vw"
              draggable={false}
            />
            <p
              className={`hidden absolute inset-x-auto top-0 z-10 px-3 py-[2px] bg-gray-900 text-gray-200 text-center text-nowrap
            rounded-lg ${
              operatorCollapsed ? "translate-x-[-75px]" : "translate-x-[-67px]"
            } translate-y-[-36px] group-hover:block`}
            >
              {operatorCollapsed
                ? "오퍼레이터 정보 펼치기"
                : "오퍼레이터 정보 접기"}
            </p>
          </button>
          <button
            className={`${
              userNeedInitialized ? "" : "hidden"
            } group relative w-6 aspect-square selection:bg-transparent`}
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
