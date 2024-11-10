"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { Operator, operatorList } from "@/data/operator";
import { selectedOperatorsAtom } from "@/store";

/** 오퍼레이터 한 명을 추가하는 컴포넌트 */
export default function OperatorAdder() {
  // 사용자가 선택한 오퍼레이터
  const [selectedOperators, setSelectedOperators] = useAtom(
    selectedOperatorsAtom
  );

  // 오퍼레이터 검색 문자열 및 검색된 데이터
  const [searchText, setSearchText] = useState("");
  const [searchedData, setSearchedData] = useState<Operator[]>([]);

  /** 검색 문자열에 해당되는 오퍼레이터 리스트를 반환 */
  const searchOperatorData = () => {
    // 현재 및 최대 데이터 수
    let currentDataCount = 0;
    const maxDataCount = 5;

    return operatorList.filter((operator) => {
      if (currentDataCount >= maxDataCount) {
        // 최대 데이터 수를 초과하면, 검색하여 추가하지 않음
        return;
      }

      if (
        searchText &&
        operator.name.startsWith(searchText.at(0)!) &&
        operator.name.includes(searchText)
      ) {
        // 문자열 탐색 후, 현재 검색 문자열에 오퍼레이터가 해당된다고 파악되면 추가
        // 단, 이미 선택된 오퍼레이터는 추가하지 않음
        if (!selectedOperators || !selectedOperators.includes(operator)) {
          currentDataCount += 1;
          return operator;
        }
      }
    });
  };

  /** 선택된 오퍼레이터를 추가 */
  const addSelectedOperator = (operator: Operator) => {
    setSelectedOperators((prev) => [...prev, operator]);
    setSearchText("");
  };

  // 검색 문자열이 변경될 때마다, 검색 데이터를 갱신
  useEffect(() => {
    setSearchedData(searchOperatorData());
  }, [searchText]);

  return (
    <div className="group relative flex justify-center items-center">
      <div className="relative w-full flex flex-row justify-between items-center">
        <input
          className={`w-full min-h-12 px-4 py-3 ${
            searchedData.length == 0 ? "rounded-lg" : "rounded-t-lg"
          } z-20 resize-none 
          outline-solid outline-1 outline-gray-400
          bg-dark-800 text-gray-200 selection:bg-gray-800
          [&::-webkit-search-cancel-button]:appearance-none`}
          id="operator-adder"
          type="search"
          placeholder="원하는 오퍼레이터 이름을 입력해주세요."
          value={searchText}
          autoComplete="off"
          autoFocus
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (searchedData.length != 0) {
                // 엔터 키가 눌리면, 가장 위에 있는 오퍼레이터를 추가
                addSelectedOperator(searchedData[0]);
              }
            }
          }}
        ></input>
        <div className="absolute right-4 w-6 z-30 aspect-square selection:bg-transparent">
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
      <ol
        className={`${
          searchedData.length == 0 ? "hidden" : "group-focus:block"
        } absolute left-0 right-0 top-full flex flex-col bg-dark-700 z-10 rounded-b-xl`}
      >
        {searchedData.map((data) => (
          <li
            key={data.id}
            className="flex flex-row items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all hover:bg-dark-300 hover:bg-opacity-20"
            onClick={() => {
              addSelectedOperator(data);
            }}
          >
            <div className="relative w-8 min-w-8 aspect-square rounded-2xl select-none">
              <Image
                className="rounded-2xl"
                src={`/images/operator/list/${data.class.toLowerCase()}/${
                  data.imageFilename
                }.png`}
                alt={data.name}
                fill
                sizes="10vw"
                draggable={false}
              />
            </div>
            <p
              className="text-gray-200 translate-y-px selection:bg-transparent"
              draggable={false}
            >
              {data.name}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
