// 전체 오퍼레이터 검색, 필터링, 정렬 및 선택 모달

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useAtom, useSetAtom } from "jotai";
import {
  type Operator,
  type OperatorClass,
  OperatorClassList,
  type RarityNumber,
  RarityNumberList,
  operatorList,
} from "@/data/operator";
import {
  selectedOperatorsAtom,
  selectedOperatorsMaterialAtom,
  userNeedInitializedAtom,
} from "@/store";
import { CommonModal } from "@/app/_common/modal/common-modal";
import { getOperatorSearchMatch } from "./operator-search";

type OperatorListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SortKey = "release" | "rarity" | "name";
type SortDirection = "asc" | "desc";

const OperatorClassNameMap: Record<OperatorClass, string> = {
  Vanguard: "뱅가드",
  Guard: "가드",
  Defender: "디펜더",
  Sniper: "스나이퍼",
  Caster: "캐스터",
  Medic: "메딕",
  Supporter: "서포터",
  Specialist: "스페셜리스트",
};

/** char_1234_name 형태의 인게임 ID에서 내부 숫자 ID를 추출 */
const getOperatorInternalId = (operatorId: string) => {
  const match = operatorId.match(/^char_(\d+)_/);

  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

/** 내부 ID 오름차순 비교 */
const compareOperatorInternalId = (
  operatorA: Operator,
  operatorB: Operator,
) => {
  const internalIdDifference =
    getOperatorInternalId(operatorA.id) - getOperatorInternalId(operatorB.id);

  return internalIdDifference || operatorA.id.localeCompare(operatorB.id);
};

/**
 * 선택한 기준과 방향에 따라 오퍼레이터를 정렬
 *
 * 출시순:
 * 출시 → 레어도 내림차순 → 내부 ID 오름차순
 *
 * 레어도순:
 * 레어도 → 출시 내림차순 → 내부 ID 오름차순
 *
 * 이름순:
 * 이름 → 내부 ID 오름차순
 */
const compareOperators = (
  operatorA: Operator,
  operatorB: Operator,
  sortKey: SortKey,
  sortDirection: SortDirection,
) => {
  const direction = sortDirection === "asc" ? 1 : -1;

  if (sortKey === "release") {
    const releaseOrderDifference =
      (operatorA.releaseInfo?.order ?? Number.MIN_SAFE_INTEGER) -
      (operatorB.releaseInfo?.order ?? Number.MIN_SAFE_INTEGER);

    if (releaseOrderDifference !== 0) {
      return releaseOrderDifference * direction;
    }

    if (operatorA.rarity !== operatorB.rarity) {
      return operatorB.rarity - operatorA.rarity;
    }

    return compareOperatorInternalId(operatorA, operatorB);
  }

  if (sortKey === "rarity") {
    if (operatorA.rarity !== operatorB.rarity) {
      return (operatorA.rarity - operatorB.rarity) * direction;
    }

    const releaseOrderDifference =
      (operatorB.releaseInfo?.order ?? Number.MIN_SAFE_INTEGER) -
      (operatorA.releaseInfo?.order ?? Number.MIN_SAFE_INTEGER);

    if (releaseOrderDifference !== 0) {
      return releaseOrderDifference;
    }

    return compareOperatorInternalId(operatorA, operatorB);
  }

  const nameDifference = operatorA.name.localeCompare(operatorB.name, "ko");

  if (nameDifference !== 0) {
    return nameDifference * direction;
  }

  return compareOperatorInternalId(operatorA, operatorB);
};

/** 전체 오퍼레이터 목록 모달 */
export default function OperatorListModal({
  isOpen,
  onClose,
}: OperatorListModalProps) {
  const [selectedOperators, setSelectedOperators] = useAtom(
    selectedOperatorsAtom,
  );

  const setSelectedOperatorsMaterial = useSetAtom(
    selectedOperatorsMaterialAtom,
  );
  const setUserNeedInitialized = useSetAtom(userNeedInitializedAtom);

  // 현재 모달에서 새로 추가하거나 제거한 오퍼레이터
  const [addedOperatorIds, setAddedOperatorIds] = useState<string[]>([]);
  const [removedOperatorIds, setRemovedOperatorIds] = useState<string[]>([]);

  const [searchText, setSearchText] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<OperatorClass[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<RarityNumber[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("release");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const sortControlRef = useRef<HTMLDivElement>(null);

  const filteredOperatorList = useMemo(() => {
    return operatorList
      .filter((operator) => {
        if (
          searchText.trim() &&
          !getOperatorSearchMatch(operator, searchText)
        ) {
          return false;
        }

        if (
          selectedClasses.length > 0 &&
          !selectedClasses.includes(operator.class)
        ) {
          return false;
        }

        if (
          selectedRarities.length > 0 &&
          !selectedRarities.includes(operator.rarity)
        ) {
          return false;
        }

        return true;
      })
      .sort((operatorA, operatorB) =>
        compareOperators(operatorA, operatorB, sortKey, sortDirection),
      );
  }, [searchText, selectedClasses, selectedRarities, sortKey, sortDirection]);

  /** 현재 모달에서 오퍼레이터가 선택된 상태인지 확인 */
  const isOperatorSelected = (operatorId: string) => {
    if (addedOperatorIds.includes(operatorId)) {
      return true;
    }

    if (removedOperatorIds.includes(operatorId)) {
      return false;
    }

    return selectedOperators.includes(operatorId);
  };

  /** 오퍼레이터 임시 선택 또는 선택 해제 */
  const toggleOperator = (operator: Operator) => {
    if (operator.growthType === "roguelike") {
      return;
    }

    // 이번 모달에서 새롭게 선택한 오퍼레이터를 다시 클릭
    if (addedOperatorIds.includes(operator.id)) {
      setAddedOperatorIds((previousIds) =>
        previousIds.filter((operatorId) => operatorId !== operator.id),
      );

      return;
    }

    // 기존 선택 오퍼레이터를 해제했다가 다시 선택
    if (removedOperatorIds.includes(operator.id)) {
      setRemovedOperatorIds((previousIds) =>
        previousIds.filter((operatorId) => operatorId !== operator.id),
      );

      return;
    }

    // 기존에 선택되어 있던 오퍼레이터는 제거 예정 상태로 변경
    if (selectedOperators.includes(operator.id)) {
      setRemovedOperatorIds((previousIds) => [...previousIds, operator.id]);

      return;
    }

    // 새 오퍼레이터는 클릭 순서를 유지하며 추가
    setAddedOperatorIds((previousIds) => [...previousIds, operator.id]);
  };

  /**
   * 모달에서 변경한 오퍼레이터 선택 상태를 반영하고 닫습니다.
   *
   * 새롭게 선택한 오퍼레이터 그룹은 기존 목록보다 위에 표시하고,
   * 그룹 내부에서는 모달에서 선택한 순서를 유지합니다.
   */
  const closeModal = () => {
    const nextSelectedOperators = [
      ...selectedOperators.filter(
        (operatorId) => !removedOperatorIds.includes(operatorId),
      ),
      ...[...addedOperatorIds].reverse(),
    ];

    setSelectedOperators(nextSelectedOperators);

    if (removedOperatorIds.length > 0) {
      setSelectedOperatorsMaterial((previousMaterials) =>
        previousMaterials.filter(
          (operatorMaterial) =>
            !removedOperatorIds.includes(operatorMaterial.id),
        ),
      );
    }

    if (nextSelectedOperators.length === 0) {
      setUserNeedInitialized(false);

      if (typeof window !== "undefined") {
        localStorage.removeItem("selectedOperators");
        localStorage.removeItem("selectedOperatorsMaterial");
        localStorage.removeItem("userNeed");
      }
    }

    // 다음 모달 실행을 위해 임시 상태 초기화
    setAddedOperatorIds([]);
    setRemovedOperatorIds([]);
    setSortMenuOpen(false);

    onClose();
  };

  // 정렬 드롭다운 바깥을 클릭하면 닫기
  useEffect(() => {
    if (!sortMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        sortControlRef.current &&
        !sortControlRef.current.contains(event.target as Node)
      ) {
        setSortMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [sortMenuOpen]);

  return (
    <CommonModal
      isOpen={isOpen}
      title="전체 오퍼레이터"
      size="wide"
      onClose={closeModal}
    >
      <div className="flex h-full min-h-0 flex-col gap-4">
        {/* 검색 */}
        <div className="relative shrink-0">
          <input
            type="text"
            value={searchText}
            aria-label="오퍼레이터 이름 검색"
            placeholder="검색할 오퍼레이터 이름을 입력해주세요."
            autoComplete="off"
            className="w-full rounded-lg bg-dark-800 py-3 pr-11 pl-4 text-gray-200 outline-1 outline-gray-600 transition focus:outline-gray-400 selection:bg-gray-800"
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />

          {searchText && (
            <button
              type="button"
              aria-label="검색어 지우기"
              className="absolute top-1/2 right-3 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-lg leading-none text-gray-500 transition hover:bg-gray-700 hover:text-gray-200"
              onClick={() => {
                setSearchText("");
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* 필터 */}
        <div className="flex shrink-0 flex-col gap-3">
          {/* 직군 */}
          <div className="flex items-start gap-3">
            <p className="flex h-8 w-12 shrink-0 items-center font-medium text-gray-400">
              직군
            </p>

            <div className="flex flex-wrap gap-1.5">
              {OperatorClassList.map((operatorClass) => {
                const selected = selectedClasses.includes(operatorClass);

                return (
                  <button
                    key={operatorClass}
                    type="button"
                    aria-label={`${OperatorClassNameMap[operatorClass]} 직군 필터`}
                    aria-pressed={selected}
                    className={`group relative size-8 rounded-md border transition ${
                      selected
                        ? "border-yellow-400 bg-yellow-400/10"
                        : "border-gray-700 bg-gray-900 hover:border-gray-400"
                    }`}
                    onClick={() => {
                      setSelectedClasses((previousClasses) =>
                        previousClasses.includes(operatorClass)
                          ? previousClasses.filter(
                              (value) => value !== operatorClass,
                            )
                          : [...previousClasses, operatorClass],
                      );
                    }}
                  >
                    <Image
                      src={`/images/operator/class/${operatorClass.toLowerCase()}.png`}
                      alt=""
                      fill
                      sizes="32px"
                      draggable={false}
                      className="object-contain p-1 mix-blend-screen"
                    />

                    <span className="pointer-events-none invisible absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-nowrap text-gray-200 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                      {OperatorClassNameMap[operatorClass]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 레어도 */}
          <div className="flex items-start gap-3">
            <p className="flex h-8 w-12 shrink-0 items-center font-medium text-gray-400">
              레어도
            </p>

            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {[...RarityNumberList].reverse().map((rarity) => {
                const selected = selectedRarities.includes(rarity);

                return (
                  <button
                    key={rarity}
                    type="button"
                    aria-label={`${rarity}성 필터`}
                    aria-pressed={selected}
                    className={`min-w-10 rounded-md border px-2 py-1 text-sm transition ${
                      selected
                        ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                        : "border-gray-700 text-gray-400 hover:border-gray-400 hover:text-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedRarities((previousRarities) =>
                        previousRarities.includes(rarity)
                          ? previousRarities.filter((value) => value !== rarity)
                          : [...previousRarities, rarity],
                      );
                    }}
                  >
                    ★{rarity}
                  </button>
                );
              })}

              {(selectedClasses.length > 0 || selectedRarities.length > 0) && (
                <button
                  type="button"
                  className="basis-full pt-1 text-right text-xs text-gray-500 transition hover:text-gray-200 sm:ml-auto sm:basis-auto sm:pt-0"
                  onClick={() => {
                    setSelectedClasses([]);
                    setSelectedRarities([]);
                  }}
                >
                  필터 초기화
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 결과 개수 및 정렬 */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-gray-800 pt-3">
          <p className="text-xs text-gray-500">
            {filteredOperatorList.length}명
          </p>

          <div ref={sortControlRef} className="flex items-center">
            {/* 정렬 기준 */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={sortMenuOpen}
                className="flex min-w-24 items-center justify-between gap-3 rounded-l-lg border border-r-0 border-gray-700 bg-gray-950 px-3 py-2 text-gray-300 transition hover:bg-gray-900 hover:text-white"
                onClick={() => {
                  setSortMenuOpen((previousValue) => !previousValue);
                }}
              >
                <span>
                  {sortKey === "release"
                    ? "출시순"
                    : sortKey === "rarity"
                      ? "레어도순"
                      : "이름순"}
                </span>

                <span className="text-[10px] text-gray-500">▼</span>
              </button>

              {sortMenuOpen && (
                <div className="absolute top-full left-0 z-30 mt-2 min-w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-xl">
                  <button
                    type="button"
                    className={`block w-full px-3 py-2 text-left transition hover:bg-gray-800 ${
                      sortKey === "release"
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => {
                      setSortKey("release");
                      setSortMenuOpen(false);
                    }}
                  >
                    출시순
                  </button>

                  <button
                    type="button"
                    className={`block w-full px-3 py-2 text-left transition hover:bg-gray-800 ${
                      sortKey === "rarity" ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => {
                      setSortKey("rarity");
                      setSortMenuOpen(false);
                    }}
                  >
                    레어도순
                  </button>

                  <button
                    type="button"
                    className={`block w-full px-3 py-2 text-left transition hover:bg-gray-800 ${
                      sortKey === "name" ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => {
                      setSortKey("name");
                      setSortMenuOpen(false);
                    }}
                  >
                    이름순
                  </button>
                </div>
              )}
            </div>

            {/* 오름차순 / 내림차순 */}
            <button
              type="button"
              aria-label={sortDirection === "asc" ? "오름차순" : "내림차순"}
              title={sortDirection === "asc" ? "오름차순" : "내림차순"}
              className="flex w-10 self-stretch items-center justify-center rounded-r-lg border border-gray-700 bg-gray-950 px-3 text-base text-gray-300 transition hover:bg-gray-900 hover:text-white"
              onClick={() => {
                setSortDirection((previousDirection) =>
                  previousDirection === "asc" ? "desc" : "asc",
                );
              }}
            >
              {sortDirection === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        {/* 오퍼레이터 목록 */}
        <div
          className="min-h-0 flex-1 overflow-y-auto pr-2
          [scrollbar-width:thin]
          [scrollbar-color:#4b5563_transparent]
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-700
          [&::-webkit-scrollbar-thumb:hover]:bg-gray-600"
        >
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(92px,104px))] sm:justify-start">
            {filteredOperatorList.map((operator) => {
              const isSelected = isOperatorSelected(operator.id);
              const isDisabled = operator.growthType === "roguelike";

              return (
                <button
                  key={operator.id}
                  type="button"
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  aria-label={
                    isDisabled
                      ? `${operator.name}, 선택할 수 없는 오퍼레이터`
                      : operator.name
                  }
                  className={`group flex min-w-0 flex-col overflow-hidden rounded-lg border-2 transition ${
                    isDisabled
                      ? "cursor-not-allowed border-gray-800 opacity-40"
                      : isSelected
                        ? "border-yellow-400 bg-yellow-400/5 hover:border-yellow-200"
                        : "border-gray-800 hover:border-gray-400"
                  }`}
                  onClick={() => {
                    toggleOperator(operator);
                  }}
                >
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-gray-900">
                    <Image
                      src={`/images/operator/list/${operator.class.toLowerCase()}/${
                        operator.imageFilename
                      }.png`}
                      alt={operator.name}
                      fill
                      sizes="104px"
                      draggable={false}
                      className="object-cover transition-transform duration-150 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex min-h-11 w-full flex-1 items-center justify-center px-1.5 py-1.5">
                    <p className="text-center text-sm leading-tight font-medium text-gray-200 break-keep">
                      {operator.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </CommonModal>
  );
}
