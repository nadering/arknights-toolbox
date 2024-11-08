"use client";

import { useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import { userDepotInitializedAtom, userSelectAtom } from "@/store";
import { UserDepot } from "@/app/depot/user-depot";
import { DepotGuide } from "@/app/depot/user-depot/user-depot-guide";

export default function UserDepotSetter() {
  // 사용자가 선택한 데이터 입력 방법 및 데이터 입력 여부
  const userSelect = useAtomValue(userSelectAtom);
  const userDepotInitialized = useAtomValue(userDepotInitializedAtom);

  // 창고 데이터를 보여주는지 여부
  const [activateDepot, setActivateDepot] = useState(false);

  // 현재 상태에 따른 JSON 입력창의 변화에 맞춰 애니메이션 재생을 관리함
  const [activateJsonInput, setActivateJsonInput] = useState(false);

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

  // relative 클래스가 포함된 div의 원래 border: border-dashed border-2 border-gray-500
  return (
    <div className="flex flex-col p-4">
      <p className="pl-1 font-bold text-3xl text-white break-keep">현재 보유량 설정</p>
      <div className="grow p-2 border-none rounded-xl">
        {activateDepot ? (
          <UserDepot />
        ) : (
          <DepotGuide activateJsonInput={activateJsonInput} />
        )}
      </div>
    </div>
  );
}
