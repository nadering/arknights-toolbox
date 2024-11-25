"use client";

import { useEffect, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { Depot, makeEmptyDepot, materialLeftAtom, materialLeftInitializedAtom } from "@/store";
import { DepotLine, LMDExpLine, UpgradeLine } from "@common/depot";
import {
  CountableMaterial,
  EXP,
  MaterialType,
  TierType,
} from "@/data/material";
import { setDepotMaterialById } from "@/tool";

/** 부족한 재료를 나타내는 컴포넌트 */
export default function LackMaterials({
  data,
  exp,
}: {
  data: Depot;
  exp: CountableMaterial;
}) {
  // 사용자에게 보여주도록 필터링할 타입
  const filterMaterialTypes: MaterialType[] = [
    "Upgrade",
    "Skill-Summary",
    "Memory-Chip",
    "Module",
    "LMD",
  ];

  // 필터링된 데이터
  const [filteredData, setFilteredData] = useState({ ...data });

  // 남은 재료 데이터
  const setMaterialLeft = useSetAtom(materialLeftAtom);
  const setMaterialLeftInitialized = useSetAtom(materialLeftInitializedAtom);

  // 경험치 데이터 (데이터가 음수일 때 부족하다는 뜻이므로, 부호를 바꾼 값이 양수일 때만 보여줌)
  const [expData, setExpData] = useState<CountableMaterial>({
    material: EXP,
    count: -exp.count,
  });

  // 분해하지 않는 재료의 최고 티어 (즉, 4티어로 저장되어 있다면 5티어의 재료는 4티어로 분해)
  const [materialMaxTier, setMaterialMaxTier] = useState<TierType>(5);

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  /** 재료의 최고 티어에 따라, 재료를 분해한 후 반환 */
  const decomposeMaterial = (depot: Depot) => {
    let initialDepot = { ...depot };
    let resultDepot = makeEmptyDepot();

    if (5 - materialMaxTier <= 0) {
      // 분해할 필요가 없다면, 그대로 반환
      return depot;
    }

    for (let i = 0; i < 5 - materialMaxTier; i++) {
      // 선택된 최고 티어가 낮아질수록, 분해 횟수 증가
      resultDepot = makeEmptyDepot();

      Object.keys(initialDepot).forEach((type) => {
        if (filterMaterialTypes.includes(type as MaterialType)) {
          // 필요한 타입의 재료만 필터링
          const dataLine = initialDepot[type as MaterialType];
          for (const mat of dataLine) {
            if (
              mat.count < 0 &&
              mat.material.recipe &&
              mat.material.tier > materialMaxTier
            ) {
              if (type == "Memory-Chip" && mat.material.tier <= 4) {
                // 메모리 칩은 5티어(듀얼 칩) > 4티어(칩셋) 변환만 허용
                setDepotMaterialById(
                  mat.material.id,
                  mat.count,
                  resultDepot,
                  true
                );
              } else {
                // 설정된 티어 이상이면, 부족한 재료를 분해 후 분해된 재료를 추가
                const recipe = mat.material.recipe;
                for (const countableMaterial of recipe) {
                  setDepotMaterialById(
                    countableMaterial.material.id,
                    mat.count * countableMaterial.count,
                    resultDepot,
                    true
                  );
                }
              }
            } else {
              // 그 외의 재료는 그대로 유지
              setDepotMaterialById(
                mat.material.id,
                mat.count,
                resultDepot,
                true
              );
            }
          }
        }
      });

      // 분해 대상인 Depot을 재설정
      initialDepot = { ...resultDepot };
    }
    return resultDepot;
  };

  /** 부족한 재료만 필터링 후, 필터링 된 재료 및 남은 재료를 반환 */
  const filterLackMaterial = (depot: Depot) => {
    // 빈 창고 2개를 생성하여, 필터링 된 재료 및 남은 재료로 설정
    const newFilteredData = makeEmptyDepot();
    const newMaterialLeft = makeEmptyDepot();

    // 남은 재료가 없다고 가정
    let isMaterialLeft = false;

    Object.keys(depot).forEach((type) => {
      if (filterMaterialTypes.includes(type as MaterialType)) {
        // 필요한 타입의 재료만 필터링
        const dataLine = depot[type as MaterialType];
        for (const mat of dataLine) {
          if (mat.count < 0) {
            // 재료를 순회하면서, 부족한 재료만 추가
            setDepotMaterialById(mat.material.id, -mat.count, newFilteredData);
          }
          else if (mat.count > 0) {
            // 재료를 순회하면서, 남은 재료를 추가
            setDepotMaterialById(mat.material.id, mat.count, newMaterialLeft);
            isMaterialLeft = true;
          }
        }
      }
    });

    setMaterialLeftInitialized(isMaterialLeft);
    return [newFilteredData, newMaterialLeft];
  };

  // 애니메이션 (창고를 보여줄 경우, 아래쪽으로 이동하며 Fade-in으로 나타남)
  useEffect(() => {
    /** 애니메이션을 나타내는 클래스 */
    const animateClass = "animate-[fade-in-down_0.2s_ease-in-out]";

    if (!divRef.current?.classList.contains(animateClass)) {
      /**
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
  }, []);

  // 경험치 설정
  useEffect(() => {
    setExpData({ material: EXP, count: Math.max(0, -exp.count) });
  }, [exp]);

  // 사용자가 선택한 티어에 맞게 재료 수량을 변경하고, 부족한 재료만 보이도록 필터링
  useEffect(() => {
    // 사용자가 선택한 티어에 맞게 재료 수량을 변경
    const newDecomposedData = decomposeMaterial(data);

    // 부족한 재료만 보이도록 필터링
    const [newFilteredData, newMaterialLeft] = filterLackMaterial(newDecomposedData);

    // 변경된 필터링 데이터 및 남은 재료를 반영
    setFilteredData(newFilteredData);
    setMaterialLeft(newMaterialLeft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, materialMaxTier]);

  return (
    <div className="hidden flex flex-col p-4" ref={divRef}>
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
        <p className="pl-1 font-bold text-3xl text-white break-keep">
          부족한 재료 확인
        </p>
        {/* 버튼 */}
        <div className="flex flex-row justify-start items-center gap-2 pl-2 translate-y-[2px] sm:pl-0">
          <button
            className={`${
              materialMaxTier == 5
                ? "border-tier-5"
                : "border-gray-800 hover:border-tier-5"
            } group relative w-[30px] flex justify-center items-center px-2 border-2 rounded-xl
            opacity-80 hover:opacity-100 selection:bg-transparent`}
            onClick={() => setMaterialMaxTier(5)}
          >
            <p
              className={`${
                materialMaxTier == 5
                  ? "text-tier-5"
                  : "text-gray-800 group-hover:text-tier-5"
              }  text-center`}
            >
              5
            </p>
          </button>
          <button
            className={`${
              materialMaxTier == 4
                ? "border-tier-4"
                : "border-gray-800 hover:border-tier-4"
            } group relative w-[30px] flex justify-center items-center px-2 border-2 rounded-xl
            opacity-80 hover:opacity-100 selection:bg-transparent`}
            onClick={() => setMaterialMaxTier(4)}
          >
            <p
              className={`${
                materialMaxTier == 4
                  ? "text-tier-4"
                  : "text-gray-800 group-hover:text-tier-4"
              }  text-center`}
            >
              4
            </p>
          </button>
          <button
            className={`${
              materialMaxTier == 3
                ? "border-tier-3"
                : "border-gray-800 hover:border-tier-3"
            } group relative w-[30px] flex justify-center items-center px-2 border-2 rounded-xl
            opacity-80 hover:opacity-100 selection:bg-transparent`}
            onClick={() => setMaterialMaxTier(3)}
          >
            <p
              className={`${
                materialMaxTier == 3
                  ? "text-tier-3"
                  : "text-gray-800 group-hover:text-tier-3"
              }  text-center`}
            >
              3
            </p>
          </button>
          <button
            className={`${
              materialMaxTier == 2
                ? "border-tier-2"
                : "border-gray-800 hover:border-tier-2"
            } group relative w-[30px] flex justify-center items-center px-2 border-2 rounded-xl
            opacity-80 hover:opacity-100 selection:bg-transparent`}
            onClick={() => setMaterialMaxTier(2)}
          >
            <p
              className={`${
                materialMaxTier == 2
                  ? "text-tier-2"
                  : "text-gray-800 group-hover:text-tier-2"
              }  text-center`}
            >
              2
            </p>
          </button>
          <button
            className={`${
              materialMaxTier == 1
                ? "border-tier-1"
                : "border-gray-800 hover:border-tier-1"
            } group relative w-[30px] flex justify-center items-center px-2 border-2 rounded-xl
            opacity-80 hover:opacity-100 selection:bg-transparent`}
            onClick={() => setMaterialMaxTier(1)}
          >
            <p
              className={`${
                materialMaxTier == 1
                  ? "text-tier-1"
                  : "text-gray-800 group-hover:text-tier-1"
              }  text-center`}
            >
              1
            </p>
          </button>
        </div>
      </div>
      {/* 창고화된 데이터 */}
      <div className="grow w-full flex flex-col gap-8 p-2 pt-4 border-none rounded-xl sm:pt-2">
        <UpgradeLine list={filteredData["Upgrade"]} skipZero readonly />
        <LMDExpLine
          list={filteredData["LMD"]}
          expData={expData}
          skipZero
          readonly
        />
        <DepotLine
          title="스킬개론"
          list={filteredData["Skill-Summary"]}
          skipZero
          readonly
        />
        <DepotLine
          title="모듈"
          list={filteredData["Module"]}
          skipZero
          readonly
        />
        <DepotLine
          title="데이터 칩"
          list={filteredData["Memory-Chip"]}
          skipZero
          readonly
        />
      </div>
    </div>
  );
}
