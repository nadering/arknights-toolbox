"use client";

import { useState } from "react";
import Image from "next/image";
import { useAtom, useSetAtom } from "jotai";
import { UserNeedToDepot } from "./depot";
import { makeEmptyDepot, userNeedAtom, userNeedInitializedAtom } from "@/store";

/** 사용자의 필요 재료 설정 관련 컴포넌트 */
export default function UserNeedSetter() {
  // 사용자의 필요 재료 설정
  const setUserNeed = useSetAtom(userNeedAtom);
  const [userNeedInitialized, setUserNeedInitialized] = useAtom(
    userNeedInitializedAtom
  );

  // 필요 재료로 이루어진 창고 형태의 데이터를 보여주는지 여부
  const [activateNeedDepot, setActivateNeedDepot] = useState(true);

  /** 필요 재료 설정 초기화 */
  const resetNeed = () => {
    setActivateNeedDepot(false);
    setUserNeed(makeEmptyDepot());
    setUserNeedInitialized(false);
  };

  return (
    <>
      <div className="flex flex-col p-4">
        <>
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
                />
                <p
                  className="hidden absolute inset-x-auto bottom-0 z-10 px-3 py-[2px] bg-gray-700 bg-opacity-25 text-gray-300 text-center text-nowrap
                rounded-lg translate-x-[-21px] translate-y-[33px] group-hover:block"
                >
                  초기화
                </p>
              </button>
            </div>
          </div>
          <div className="grow p-2 border-none rounded-xl"></div>
        </>
      </div>
      {activateNeedDepot && <UserNeedToDepot />}
    </>
  );
}
