"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { Operator, operatorList } from "@/data/operator";
import { selectedOperatorsAtom } from "@/store";
import { useModal } from "@/hooks";

/** 오퍼레이터 한 명을 추가하는 컴포넌트 */
export default function OperatorAdder() {
  // 사용자가 선택한 오퍼레이터
  const [selectedOperators, setSelectedOperators] = useAtom(
    selectedOperatorsAtom
  );

  // 오퍼레이터 검색 문자열 및 검색된 데이터
  const [searchText, setSearchText] = useState("");
  const [searchedData, setSearchedData] = useState<Operator[]>([]);

  /** 검색 결과 최대 개수 */
  const MAX_DATA_COUNT = 5;

  // 검색 결과 드랍다운의 인덱스
  const [dataIndex, setDataIndex] = useState(0);

  // 검색 창 및 검색 결과 드랍다운을 클릭 및 숨기기 관련
  const adderRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const searchClicked = useModal(adderRef);

  /** 검색 중 키보드 입력에 따라 선택된 오퍼레이터를 추가하거나, 오퍼레이터 선택을 변경 */
  const handleSearchBarKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchedData.length != 0) {
        // 엔터 키가 눌리면, 선택된 오퍼레이터를 추가
        addSelectedOperator(searchedData[dataIndex]);
      }
    } else if (event.key === "ArrowUp") {
      // 위 방향키가 눌리면, 위의 오퍼레이터를 선택하며 검색 창의 커서가 움직이지 않게 설정
      event.preventDefault();
      if (dataIndex > 0) {
        setDataIndex(dataIndex - 1);
      }
    } else if (event.key === "ArrowDown") {
      // 아래 방향키가 눌리면, 아래의 오퍼레이터를 선택하며 검색 창의 커서가 움직이지 않게 설정
      event.preventDefault();
      if (
        dataIndex + 1 < searchedData.length &&
        dataIndex + 1 < MAX_DATA_COUNT
      ) {
        setDataIndex(dataIndex + 1);
      }
    }
  };

  /** 검색 문자열에 해당되는 오퍼레이터 리스트를 반환 */
  const searchOperatorData = () => {
    // 현재 및 최대 데이터 수
    let currentDataCount = 0;

    // 이름이 완벽히 일치하는 오퍼레이터
    let matchedOperator: Operator | null = null;

    // 전체 오퍼레이터를 순회하며 검색
    const searchedOperatorList = operatorList.filter((operator) => {
      if (currentDataCount >= MAX_DATA_COUNT) {
        // 최대 데이터 수를 초과하면, 검색하여 추가하지 않음
        return;
      }

      // 입력된 문자열이 없다면, 검색하지 않음
      if (!searchText) return;

      // 모든 글자를 소문자화 후 검색
      const lowerSearchText = searchText.toLowerCase();
      const lowerOperatorName = operator.name.toLowerCase();

      if (operator.nicknameList) {
        // 별명이 있다면, 별명을 검색
        for (const nickname of operator.nicknameList) {
          const lowerNickname = nickname.toLowerCase();
          if (
            lowerNickname.startsWith(lowerSearchText.at(0)!) &&
            lowerNickname.includes(lowerSearchText)
          ) {
            if (
              !selectedOperators ||
              !selectedOperators.find((op) => op.id === operator.id)
            ) {
              currentDataCount += 1;
              return operator;
            }
          }
        }
      }

      if (lowerSearchText == lowerOperatorName) {
        // 이름이 완벽히 일치하는 오퍼레이터를 검색
        matchedOperator = operator;
      } else if (
        lowerOperatorName.startsWith(lowerSearchText.at(0)!) &&
        lowerOperatorName.includes(lowerSearchText)
      ) {
        // 문자열 탐색 후, 현재 검색 문자열에 오퍼레이터가 해당된다고 파악되면 추가
        // 단, 이미 선택된 오퍼레이터는 추가하지 않음
        if (
          !selectedOperators ||
          !selectedOperators.find((op) => op.id === operator.id)
        ) {
          currentDataCount += 1;
          return operator;
        }
      }
    });

    if (matchedOperator) {
      // 이름이 완벽히 일치하는 오퍼레이터를, 검색 결과 최상단에 추가
      searchedOperatorList.unshift(matchedOperator);
    }

    if (searchedOperatorList.length > MAX_DATA_COUNT) {
      // 검색 결과 최대 개수를 초과하면, 해당 오퍼레이터를 제외
      searchedOperatorList.pop();
    }

    return searchedOperatorList;
  };

  /** 선택된 오퍼레이터를 추가 */
  const addSelectedOperator = (operator: Operator) => {
    setSelectedOperators((prev) => [...prev, operator]);
    setSearchText("");
    setDataIndex(0);
  };

  // 검색 문자열이 변경될 때마다, 검색 데이터를 갱신
  useEffect(() => {
    setSearchedData(searchOperatorData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, selectedOperators]);

  // 컴포넌트가 마운트될 때, Div 노드를 클릭해 드랍다운을 활성화하고, Input 노드에 포커스를 설정
  useEffect(() => {
    adderRef.current?.click();
    searchBarRef.current?.focus();
  }, []);

  return (
    <div
      className="group relative flex justify-center items-center"
      ref={adderRef}
    >
      <div className="relative w-full flex flex-row justify-between items-center">
        <input
          className={`w-full min-h-12 px-4 py-3 ${
            !searchClicked || searchedData.length == 0
              ? "rounded-lg"
              : "rounded-t-lg"
          } z-20 resize-none 
          outline-solid outline-1 outline-gray-400
          bg-dark-800 text-gray-200 selection:bg-gray-800
          [&::-webkit-search-cancel-button]:appearance-none`}
          ref={searchBarRef}
          id="operator-adder"
          type="search"
          placeholder="원하는 오퍼레이터 이름을 입력해주세요."
          value={searchText}
          autoComplete="off"
          onChange={(event) => {
            // 검색 창의 텍스트가 바뀔 때마다, 맨 위의 오퍼레이터를 선택
            setDataIndex(0);
            setSearchText(event.target.value);
          }}
          onKeyDown={(event) => {
            handleSearchBarKeyDown(event);
          }}
          onFocus={() => {
            // 검색 창을 포커스할 때마다, 맨 위의 오퍼레이터를 선택
            setDataIndex(0);
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
          searchClicked
            ? searchedData.length == 0
              ? "opacity-0"
              : "opacity-100"
            : "invisible"
        } absolute left-0 right-0 top-full flex flex-col bg-dark-700 z-10 rounded-b-xl`}
      >
        {searchedData.map((data, index) => (
          <li
            key={data.id}
            className={`${
              dataIndex == index ? "bg-dark-300 bg-opacity-20" : ""
            } flex flex-row items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-colors`}
            onClick={() => {
              addSelectedOperator(data);
            }}
            onMouseOver={() => {
              setDataIndex(index);
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
