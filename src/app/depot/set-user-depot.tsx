"use client";

import { useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import { userSelectAtom } from "@/store";
import JsonImportButton from "./json-button";
import ManualDepotButton from "./manual-depot-button";
import JsonInput from "./json-input";
import OrText from "./or-text";

export default function SetUserDepot() {
  // 사용자가 선택한 데이터 입력 방법
  const userSelect = useAtomValue(userSelectAtom);

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
    } else if (userSelect == "Back") {
      /**
       * JSON 입력 창을 닫으면,
       * 200ms 동안 JsonInput의 Fade-out 애니메이션을 실행하고,
       * 잠시 후 OrText 및 ManualDepotButton의 Fade-in 애니메이션을 실행함
       */
      setTimeout(() => {
        setActivateJsonInput(false);
      }, 220);
    }
  }, [userSelect]);

  // relative 클래스가 포함된 div의 원래 border: border-dashed border-2 border-gray-500
  return (
    <div className="flex flex-col p-4 min-h-[368px] gap-2 sm:gap-0">
      <p className="font-bold text-3xl text-white pl-1">현재 보유량 설정</p>
      <div className="relative grow flex flex-col justify-between p-2 border-none rounded-xl sm:flex-row">
        <JsonImportButton />
        {activateJsonInput ? (
          <JsonInput />
        ) : (
          <>
            <OrText />
            <ManualDepotButton />
          </>
        )}
      </div>
    </div>
  );
}
