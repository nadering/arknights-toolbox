"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAtom, useSetAtom } from "jotai";
import {
  makeEmptyDepot,
  userDepotAtom,
  userDepotInitializedAtom,
  userSelectAtom,
} from "@/store";
import { UserDepot } from "@depot/user-depot";
import { DepotGuide } from "@depot/user-depot/user-depot-guide";

/** 사용자의 현재 재료 보유량 설정 관련 컴포넌트 */
export default function UserDepotSetter() {
  // 사용자가 선택한 데이터 입력 방법, 현재 보유량 및 데이터 입력 여부
  const [userSelect, setUserSelect] = useAtom(userSelectAtom);
  const setUserDepot = useSetAtom(userDepotAtom);
  const [userDepotInitialized, setUserDepotInitialized] = useAtom(
    userDepotInitializedAtom
  );

  // 창고 데이터를 보여주는지 여부
  const [activateDepot, setActivateDepot] = useState(false);

  // 현재 상태에 따른 JSON 입력창의 변화에 맞춰 애니메이션 재생을 관리함
  const [activateJsonInput, setActivateJsonInput] = useState(false);

  /** 현재 보유량 설정 초기화 */
  const resetDepot = () => {
    setUserSelect("Main");
    setUserDepot(makeEmptyDepot());
    setActivateDepot(false);
    setUserDepotInitialized(false);
  };

  useEffect(() => {
    if (userSelect == "JSON") {
      /**
       * JSON을 선택하면,
       * 200ms 동안 OrText 및 ManualDepotButton의 Fade-out 애니메이션을 실행하고,
       * 잠시 후 JsonInput의 Fade-in 애니메이션을 실행함
       */
      setTimeout(() => {
        setActivateJsonInput(true);
      }, 220);
    } else if (userSelect == "BackToMain") {
      /**
       * JSON 입력 창을 닫으면,
       * 200ms 동안 JsonInput의 Fade-out 애니메이션을 실행하고,
       * 잠시 후 OrText 및 ManualDepotButton의 Fade-in 애니메이션을 실행함
       */
      setTimeout(() => {
        setActivateJsonInput(false);
      }, 220);
    } else if (userSelect == "Depot" || userDepotInitialized) {
      /**
       * 창고 데이터를 보여줘야 하면,
       * 200ms 동안 모든 버튼 및 입력창 컴포넌트의 Fade-out 애니메이션을 실행하고,
       * 잠시 후 창고 데이터의 Fade-in 애니메이션을 실행함
       */
      setTimeout(() => {
        setActivateDepot(true);
      }, 220);
    }
  }, [userSelect, userDepotInitialized]);

  return (
    <div className="flex flex-col p-4 selection:bg-gray-800">
      <div className="flex flex-row gap-5">
        <p className="pl-1 font-bold text-3xl text-white break-keep">
          현재 보유량 설정
        </p>
        <div className="flex flex-row justify-start items-center gap-1 translate-y-[2px]">
          <button
            className={`${
              userDepotInitialized ? "" : "hidden"
            } group relative w-6 selection:bg-transparent aspect-square`}
            onClick={() => resetDepot()}
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
      <div className="grow p-2 border-none rounded-xl">
        {userDepotInitialized || activateDepot ? (
          <UserDepot />
        ) : (
          <DepotGuide activateJsonInput={activateJsonInput} />
        )}
      </div>
    </div>
  );
}
