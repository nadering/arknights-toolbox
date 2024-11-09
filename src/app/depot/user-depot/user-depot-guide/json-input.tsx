"use client";

import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
} from "react";
import { useAtom, useSetAtom } from "jotai";
import { userSelectAtom, userDepotAtom } from "@/store";
import { makeDepotWithJSON, setDepotMaterialById } from "@/tool";

/** JSON 및 용문폐 입력창 컴포넌트 */
export default function JsonInput() {
  // 입력받은 JSON 문자열
  const [jsonString, setJsonString] = useState("");

  // 입력받은 용문폐
  const [lmdString, setLmdString] = useState("");

  // 사용자가 선택한 데이터 입력 방법
  const [userSelect, setUserSelect] = useAtom(userSelectAtom);

  // 사용자 창고 데이터 설정
  const setUserDepot = useSetAtom(userDepotAtom);

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);
  const jsonRef = useRef<HTMLTextAreaElement>(null);

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

      // 200ms 동안 애니메이션 실행 후, JSON 문자열 입력창을 포커스함
      setTimeout(() => {
        divRef.current?.classList.remove(animateClass);
        jsonRef.current?.focus();
      }, 200);
    }
  }, [userSelect]);

  // 애니메이션 2 (JSON 입력창에서 돌아갈 경우, 오른쪽으로 이동하며 Fade-out으로 사라짐)
  useEffect(() => {
    /** 애니메이션을 나타내는 클래스 */
    const animateClass = "animate-[fade-out-right_0.2s_ease-in-out]";

    if (
      userSelect == "BackToMain" &&
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
  const handleLmdStringValue = (event: FormEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;

    // 0으로 시작하고 문자열 길이가 1을 초과한다면 (00, 01 등), 가장 왼쪽의 0을 제거함
    const startsWithZeroPattern = /^0+/;
    if (value.length > 1) {
      value = value.replace(startsWithZeroPattern, "");
      if (value.length == 0) {
        value = "0";
      }
    }

    // 그 후, 용문폐 문자열을 설정
    setLmdString(value);
  };

  /** 지수 표기법 기호를 입력할 수 없도록 설정 */
  const handleExponentialNotation = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    // 지수 표기법 기호 목록
    const exponentialNotationList = ["e", "E", "-", "+", "."];

    if (exponentialNotationList.includes(event.key)) {
      event.preventDefault();
    }
  };

  /** 이전으로 돌아가기 */
  const goBack = () => {
    setUserSelect("BackToMain");
  };

  /** JSON 문자열 및 용문폐 문자열로 사용자 창고 설정 */
  const setUserDepotWithJSON = () => {
    // JSON 문자열로 새로운 창고 생성
    const result = makeDepotWithJSON(jsonString);
    if (result) {
      // 용문폐 문자열로 새로운 창고에 용문폐 데이터를 추가로 설정
      const lmdQuantity = parseInt(lmdString, 10);
      if (!isNaN(lmdQuantity) && lmdQuantity >= 0) {
        setDepotMaterialById("lmd", lmdQuantity, result);
      }

      // 새로운 창고 데이터를 사용자의 창고로 설정 후, 창고 데이터를 보여줌
      setUserDepot(result);
      setUserSelect("Depot");
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
        <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
          JSON
        </p>
        <form id="json">
          <textarea
            className="
              w-full min-h-20 px-4 py-3 rounded-lg resize-none
              outline-solid outline-1 outline-gray-400
              bg-dark-800 text-gray-200 selection:bg-gray-800 
              [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-r-lg
              [&::-webkit-scrollbar-thumb]:cursor-default [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-r-lg"
            id="json"
            placeholder={`"Arkntools으로 내보내기"로 복사한 JSON을 입력해주세요.`}
            value={jsonString}
            onChange={(event) => handleJsonStringValue(event)}
            ref={jsonRef}
          ></textarea>
        </form>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
          용문폐
        </p>
        <form
          id="lmd"
          onSubmit={(event) => {
            event.preventDefault();
            setUserDepotWithJSON();
          }}
        >
          <input
            className="
              w-full min-h-12 px-4 py-3 rounded-lg resize-none
              outline-solid outline-1 outline-gray-400
              bg-dark-800 text-gray-200 selection:bg-gray-800 
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id="lmd"
            type="number"
            min={0}
            step={1}
            placeholder={`용문폐 보유량을 입력해주세요.`}
            value={lmdString}
            onInput={(event) => handleLmdStringValue(event)}
            onKeyDown={(event) => handleExponentialNotation(event)}
          ></input>
        </form>
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
