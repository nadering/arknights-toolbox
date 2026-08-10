"use client";

import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { type Operator, operatorList } from "@/data/operator";
import { selectedOperatorsAtom, showFutureAtom } from "@/store";
import { useModal } from "@/hooks";

/** 검색 결과 최대 개수 */
const MAX_DATA_COUNT = 5;

const getLatestGlobalSixStarReleaseOrder = () => {
  const globalSixStarOrderList = operatorList
    .filter((operator) => {
      return operator.server !== "future" && operator.rarity === 6;
    })
    .map((operator) => {
      return operator.releaseInfo?.order ?? Number.MIN_SAFE_INTEGER;
    });

  return Math.max(...globalSixStarOrderList);
};

const sortOperatorsByReleaseOrderAsc = (
  operatorA: Operator,
  operatorB: Operator,
) => {
  const orderA = operatorA.releaseInfo?.order ?? Number.MAX_SAFE_INTEGER;
  const orderB = operatorB.releaseInfo?.order ?? Number.MAX_SAFE_INTEGER;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return operatorA.id.localeCompare(operatorB.id);
};

/** 오퍼레이터 한 명을 추가하는 컴포넌트 */
export default function OperatorAdder() {
  // 사용자가 선택한 오퍼레이터
  const [selectedOperators, setSelectedOperators] = useAtom(
    selectedOperatorsAtom,
  );

  // 오퍼레이터 검색 문자열
  const [searchText, setSearchText] = useState("");

  // 미래시
  const [showFuture, setShowFuture] = useAtom(showFutureAtom);

  // 검색 결과 드롭다운의 선택된 인덱스
  const [dataIndex, setDataIndex] = useState(0);

  // 검색창 및 검색 결과 드롭다운 활성화
  const adderRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);

  const {
    open: searchClicked,
    setOpen: setSearchClicked,
    outsideTick,
  } = useModal(adderRef);

  /** 검색 문자열 또는 미래시에 해당하는 오퍼레이터 목록 */
  const searchedData = useMemo<Operator[]>(() => {
    if (showFuture) {
      const latestGlobalReleaseOrder = getLatestGlobalSixStarReleaseOrder();

      return operatorList
        .filter((operator) => {
          return (
            operator.rarity === 6 &&
            operator.growthType === "normal" &&
            (operator.server === "future" ||
              operator.releaseInfo?.order === latestGlobalReleaseOrder) &&
            !selectedOperators.includes(operator.id)
          );
        })
        .sort(sortOperatorsByReleaseOrderAsc);
    }

    const lowerSearchText = searchText.trim().toLowerCase();

    if (!lowerSearchText) {
      return [];
    }

    const firstSearchCharacter = lowerSearchText.at(0);
    const searchedOperatorList: Operator[] = [];
    let matchedOperator: Operator | undefined;

    for (const operator of operatorList) {
      if (
        selectedOperators.includes(operator.id) ||
        operator.growthType === "roguelike"
      ) {
        continue;
      }

      const lowerOperatorName = operator.name.toLowerCase();

      // 이름이 완전히 일치하는 오퍼레이터는 검색 결과 최상단에 배치
      if (lowerOperatorName === lowerSearchText) {
        matchedOperator = operator;
        continue;
      }

      if (searchedOperatorList.length >= MAX_DATA_COUNT) {
        continue;
      }

      const nameMatches =
        lowerOperatorName.startsWith(firstSearchCharacter ?? "") &&
        lowerOperatorName.includes(lowerSearchText);

      if (nameMatches) {
        searchedOperatorList.push(operator);
        continue;
      }

      const matchedNickname = operator.nicknameList?.find((nickname) => {
        const lowerNickname = nickname.toLowerCase();

        return (
          lowerNickname.startsWith(firstSearchCharacter ?? "") &&
          lowerNickname.includes(lowerSearchText)
        );
      });

      if (matchedNickname) {
        searchedOperatorList.push({
          ...operator,
          name: `${operator.name} (${matchedNickname})`,
        });
      }
    }

    if (matchedOperator) {
      searchedOperatorList.unshift(matchedOperator);
    }

    return searchedOperatorList.slice(0, MAX_DATA_COUNT);
  }, [searchText, selectedOperators, showFuture]);

  const selectedDataIndex = Math.min(
    dataIndex,
    Math.max(searchedData.length - 1, 0),
  );

  /** 선택된 오퍼레이터를 추가 */
  const addSelectedOperator = (operator: Operator) => {
    setSelectedOperators((previousOperators) => [
      ...previousOperators,
      operator.id,
    ]);

    setSearchText("");
    setDataIndex(0);
    setSearchClicked(true);

    // 마지막 미래시 오퍼레이터를 추가한 경우 미래시 모드를 종료
    if (showFuture && searchedData.length <= 1) {
      setShowFuture(false);
    }

    searchBarRef.current?.focus();
  };

  /** 검색 중 키보드 입력 처리 */
  const handleSearchBarKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const selectedOperator = searchedData[selectedDataIndex];

      if (selectedOperator) {
        addSelectedOperator(selectedOperator);
      }

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setDataIndex((previousIndex) => Math.max(previousIndex - 1, 0));
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setDataIndex((previousIndex) =>
        Math.min(previousIndex + 1, searchedData.length - 1),
      );
    }
  };

  // 외부에서 미래시 모드가 활성화되면 검색창을 열고 포커스
  useEffect(() => {
    if (!showFuture) {
      return;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      setSearchText("");
      setDataIndex(0);
      setSearchClicked(true);
      searchBarRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [showFuture, setSearchClicked]);

  // 검색 영역 바깥을 클릭하면 미래시 모드를 종료
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowFuture(false);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [outsideTick, setShowFuture]);

  const showSearchBox =
    (showFuture || searchClicked) && searchedData.length > 0;

  return (
    <div
      ref={adderRef}
      className="group relative flex items-center justify-center"
    >
      <div className="relative flex w-full flex-row items-center justify-between">
        <input
          ref={searchBarRef}
          className={`z-20 min-h-12 w-full resize-none px-4 py-3 ${
            showSearchBox ? "rounded-t-lg" : "rounded-lg"
          } bg-dark-800 text-gray-200 outline-1 outline-solid outline-gray-400 selection:bg-gray-800 [&::-webkit-search-cancel-button]:appearance-none`}
          id="operator-adder"
          type="search"
          placeholder="원하는 오퍼레이터 이름을 입력해주세요."
          value={searchText}
          autoComplete="off"
          autoFocus
          onChange={(event) => {
            setDataIndex(0);
            setSearchText(event.target.value);
            setShowFuture(false);
          }}
          onKeyDown={handleSearchBarKeyDown}
          onFocus={() => {
            setDataIndex(0);
            setSearchClicked(true);
          }}
        />

        <div className="absolute right-4 z-30 aspect-square w-6 selection:bg-transparent">
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
          showSearchBox ? "visible opacity-100" : "invisible opacity-0"
        } bg-dark-700 absolute top-full right-0 left-0 z-10 flex flex-col rounded-b-xl shadow-2xl`}
      >
        {searchedData.map((operator, index) => (
          <li
            key={operator.id}
            className={`${
              selectedDataIndex === index ? "bg-dark-300 bg-opacity-20" : ""
            } flex cursor-pointer flex-row items-center gap-3 rounded-xl px-4 py-2 transition-colors`}
            onClick={() => {
              addSelectedOperator(operator);
            }}
            onMouseEnter={() => {
              setDataIndex(index);
            }}
          >
            <div className="relative aspect-square w-8 min-w-8 rounded-2xl select-none">
              <Image
                className="rounded-2xl"
                src={`/images/operator/list/${operator.class.toLowerCase()}/${
                  operator.imageFilename
                }.png`}
                alt={operator.name}
                fill
                sizes="10vw"
                draggable={false}
              />
            </div>

            <p
              className="translate-y-px text-gray-200 selection:bg-transparent"
              draggable={false}
            >
              {operator.name}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
