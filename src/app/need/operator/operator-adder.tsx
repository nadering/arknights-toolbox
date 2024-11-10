"use client";

import { Logos } from "@/data/operator";
import { selectedOperatorsAtom } from "@/store";
import { useSetAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";

/** 오퍼레이터 한 명을 추가하는 컴포넌트 */
export default function OperatorAdder() {
  const [inputText, setInputText] = useState("");

  const setSelectedOperators = useSetAtom(selectedOperatorsAtom);

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full flex flex-row justify-between items-center">
        <input
          className="w-full min-h-12 px-4 py-3 rounded-lg resize-none 
            outline-solid outline-1 outline-gray-400 
            bg-dark-800 text-gray-200 selection:bg-gray-800 
            [appearance:textfield] [::-webkit-outer-spin-button]:appearance-none [::-webkit-inner-spin-button]:appearance-none"
          id="operator-adder"
          type="search"
          placeholder="원하는 오퍼레이터 이름을 입력해주세요."
          value={inputText}
          onChange={(event) => {
            setInputText(event.target.value);
            setSelectedOperators((prev) => [...prev, Logos]);
          }}
        ></input>
        <div className="absolute right-4 w-6 selection:bg-transparent aspect-square">
          <Image
            className="[filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]"
            src="/images/others/search.png"
            alt="search"
            fill
            sizes="10vw"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
