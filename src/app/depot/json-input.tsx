"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useAtom, useSetAtom } from "jotai";
import { userSelectAtom, userDepotAtom } from "@/store";
import { makeDepotWithJSON, setDepotMaterialById } from "@/tool";

/** JSON 및 용문폐 입력창 컴포넌트 */
export default function JsonInput() {
  // 입력받은 용문폐
  const [lmdString, setLmdString] = useState("");

  // 입력받은 JSON 문자열
  const [jsonString, setJsonString] = useState("");

  // 사용자가 선택한 데이터 입력 방법
  const [userSelect, setUserSelect] = useAtom(userSelectAtom);

  // 사용자 창고 데이터 설정
  const setUserDepot = useSetAtom(userDepotAtom);

  /** 애니메이션을 위해 Div 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  // 애니메이션 1 (JSON이 선택될 경우, 왼쪽으로 이동하며 Fade-in으로 나타남)
  useEffect(() => {
    /** 애니메이션을 나타내는 클래스 */
    const animateClass = "animate-[fade-in-left_0.2s_ease-in-out]";

    if (
      userSelect == "JSON" &&
      !divRef.current?.classList.contains(animateClass)
    ) {
      /**
       * 사용자의 데이터 입력 방법으로 JSON이 선택되면,
       * 숨겨두었던 컴포넌트를 다시 활성화시키고,
       * Fade-in 애니메이션을 실행함
       */
      if (divRef.current?.classList.contains("hidden")) {
        divRef.current.classList.remove("hidden");
      }
      divRef.current?.classList.add(animateClass);

      // 200ms 동안 애니메이션 실행
      setTimeout(() => {
        divRef.current?.classList.remove(animateClass);
      }, 200);
    }
  }, [userSelect]);

  // 애니메이션 2 (JSON 입력창에서 돌아갈 경우, 오른쪽으로 이동하며 Fade-out으로 사라짐)
  useEffect(() => {
    /** 애니메이션을 나타내는 클래스 */
    const animateClass = "animate-[fade-out-right_0.2s_ease-in-out]";

    if (
      userSelect == "Back" &&
      !divRef.current?.classList.contains(animateClass)
    ) {
      /**
       * 사용자가 JSON 입력 도중 "이전"을 눌러 기존 화면으로 돌아가면,
       * Fade-out 애니메이션을 실행한 후, 현재 컴포넌트를 숨김
       */
      divRef.current?.classList.add(animateClass);

      setTimeout(() => {
        divRef.current?.classList.remove(animateClass);
        divRef.current?.classList.add("hidden");
      }, 180);
    }
  }, [userSelect]);

  /** JSON 문자열 설정 */
  const handleJsonStringValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setJsonString(event.target.value);
  };

  /** 용문폐 문자열 설정 */
  const handleLmdStringValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLmdString(event.target.value);
  };

  /** 이전으로 돌아가기 */
  const goBack = () => {
    setUserSelect("Back");
  };

  /** JSON 문자열 및 용문폐 문자열로 사용자 창고 설정 */
  const setUserDepotWithJSON = () => {
    // JSON 문자열로 새로운 창고 생성
    const result = makeDepotWithJSON(jsonString);
    if (result) {
      // 용문폐 문자열로 새로운 창고에 용문폐 데이터를 추가로 설정
      const lmdQuantity = parseInt(lmdString, 10);
      if (!isNaN(lmdQuantity)) {
        setDepotMaterialById("lmd", lmdQuantity, result);
      }

      // 새로운 창고 데이터를 사용자의 창고로 설정
      setUserDepot(result);
    }

    // 데이터 확인을 위해 콘솔에 임시로 출력
    console.log(result);
  };

  return (
    <div
      className="w-full flex flex-col gap-4 items-center p-4 rounded-xl sm:w-[52.5%]"
      ref={divRef}
    >
      <div className="w-full flex flex-col gap-2">
        <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">JSON</p>
        <textarea
          className="
        w-full min-h-20 p-4 rounded-lg resize-none
        outline-solid outline-1 outline-gray-400
        bg-dark-800 text-gray-200 selection:bg-gray-800 
        [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-r-lg
        [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-r-lg"
          placeholder={`"Arkntools으로 내보내기"로 복사한 JSON을 입력해주세요.`}
          value={jsonString}
          onChange={(event) => handleJsonStringValue(event)}
        ></textarea>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">용문폐</p>
        <textarea
          className="
        w-full min-h-20 p-4 rounded-lg resize-none
        outline-solid outline-1 outline-gray-400
        bg-dark-800 text-gray-200 selection:bg-gray-800 
        [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-r-lg
        [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-r-lg"
          placeholder={`용문폐 보유량을 입력해주세요.`}
          value={lmdString}
          onChange={(event) => handleLmdStringValue(event)}
        ></textarea>
      </div>

      <div className="w-full flex flex-row-reverse gap-2">
        <button
          className="leading-tight px-2 py-[2px] border-2 border-gray-500 font-semibold text-gray-200 rounded-lg
        hover:border-gray-500 hover:bg-gray-500 hover:text-black [transition:background_.15s]"
          onClick={() => setUserDepotWithJSON()}
        >
          데이터 가져오기
        </button>
        <button
          className="leading-tight px-2 py-[2px] border-2 border-gray-500 font-semibold text-gray-200 rounded-lg
        hover:border-gray-500 hover:bg-gray-500 hover:text-black [transition:background_.15s]"
          onClick={() => goBack()}
        >
          이전
        </button>
      </div>
    </div>
  );
}
