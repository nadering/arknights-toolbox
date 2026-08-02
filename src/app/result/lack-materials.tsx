"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import {
  type Depot,
  makeEmptyDepot,
  materialLeftAtom,
  materialLeftInitializedAtom,
} from "@/store";
import { DepotLine, LMDExpLine, UpgradeLine } from "@common/depot";
import {
  type CountableMaterial,
  EXP,
  type MaterialType,
  type TierType,
} from "@/data/material";
import { decomposeMaterial, setDepotMaterialById } from "@/tool";

type MaterialMaxTier = Exclude<TierType, 6>;

type FilterLackMaterialResult = {
  filteredData: Depot;
  materialLeft: Depot;
  hasMaterialLeft: boolean;
};

const FILTER_MATERIAL_TYPES = [
  "Upgrade",
  "Skill-Summary",
  "Memory-Chip",
  "Module",
  "LMD",
] as const satisfies readonly MaterialType[];

const MATERIAL_MAX_TIERS = [
  5, 4, 3, 2, 1,
] as const satisfies readonly MaterialMaxTier[];

const TIER_STYLES: Record<
  MaterialMaxTier,
  {
    activeBorder: string;
    inactiveBorder: string;
    activeText: string;
    inactiveText: string;
  }
> = {
  5: {
    activeBorder: "border-tier-5",
    inactiveBorder: "border-gray-800 hover:border-tier-5",
    activeText: "text-tier-5",
    inactiveText: "text-gray-800 group-hover:text-tier-5",
  },
  4: {
    activeBorder: "border-tier-4",
    inactiveBorder: "border-gray-800 hover:border-tier-4",
    activeText: "text-tier-4",
    inactiveText: "text-gray-800 group-hover:text-tier-4",
  },
  3: {
    activeBorder: "border-tier-3",
    inactiveBorder: "border-gray-800 hover:border-tier-3",
    activeText: "text-tier-3",
    inactiveText: "text-gray-800 group-hover:text-tier-3",
  },
  2: {
    activeBorder: "border-tier-2",
    inactiveBorder: "border-gray-800 hover:border-tier-2",
    activeText: "text-tier-2",
    inactiveText: "text-gray-800 group-hover:text-tier-2",
  },
  1: {
    activeBorder: "border-tier-1",
    inactiveBorder: "border-gray-800 hover:border-tier-1",
    activeText: "text-tier-1",
    inactiveText: "text-gray-800 group-hover:text-tier-1",
  },
};

/** 부족한 재료와 남은 재료를 분리 */
const filterLackMaterial = (depot: Depot): FilterLackMaterialResult => {
  const filteredData = makeEmptyDepot();
  const materialLeft = makeEmptyDepot();

  let hasMaterialLeft = false;

  for (const type of FILTER_MATERIAL_TYPES) {
    for (const countableMaterial of depot[type]) {
      const { material, count } = countableMaterial;

      if (count < 0) {
        setDepotMaterialById(material.id, -count, filteredData);
        continue;
      }

      if (count > 0) {
        setDepotMaterialById(material.id, count, materialLeft);
        hasMaterialLeft = true;
      }
    }
  }

  return {
    filteredData,
    materialLeft,
    hasMaterialLeft,
  };
};

/** 부족한 재료를 나타내는 컴포넌트 */
export default function LackMaterials({
  data,
  exp,
}: {
  data: Depot;
  exp: CountableMaterial;
}) {
  const setMaterialLeft = useSetAtom(materialLeftAtom);
  const setMaterialLeftInitialized = useSetAtom(materialLeftInitializedAtom);

  // 분해하지 않는 재료의 최고 티어
  const [materialMaxTier, setMaterialMaxTier] = useState<MaterialMaxTier>(5);

  const divRef = useRef<HTMLDivElement>(null);

  // 선택한 최고 티어에 맞게 재료를 분해하고 부족·잔여 재료를 구분
  const { filteredData, materialLeft, hasMaterialLeft } = useMemo(() => {
    const decomposedData = decomposeMaterial({
      depot: data,
      materialMaxTier,
    });

    return filterLackMaterial(decomposedData);
  }, [data, materialMaxTier]);

  // 경험치가 음수이면 부족한 양을 양수로 변환
  const expData = useMemo<CountableMaterial>(
    () => ({
      material: EXP,
      count: Math.max(0, -exp.count),
    }),
    [exp.count],
  );

  // 남은 재료를 전역 상태에 반영
  useEffect(() => {
    setMaterialLeft(materialLeft);
    setMaterialLeftInitialized(hasMaterialLeft);
  }, [
    hasMaterialLeft,
    materialLeft,
    setMaterialLeft,
    setMaterialLeftInitialized,
  ]);

  // 아래쪽으로 이동하며 Fade-in
  useEffect(() => {
    const element = divRef.current;

    if (!element) {
      return;
    }

    const animateClass = "animate-[fade-in-down_0.2s_ease-in-out]";

    element.classList.remove("hidden");
    element.classList.add(animateClass);

    const timeoutId = window.setTimeout(() => {
      element.classList.remove(animateClass);
    }, 200);

    return () => {
      window.clearTimeout(timeoutId);
      element.classList.remove(animateClass);
    };
  }, []);

  return (
    <div ref={divRef} className="hidden flex flex-col p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
        <p className="pl-1 text-3xl font-bold text-white break-keep">
          부족한 재료 확인
        </p>

        <div className="flex translate-y-[2px] flex-row items-center justify-start gap-2 pl-2 sm:pl-0">
          {MATERIAL_MAX_TIERS.map((tier) => {
            const isSelected = materialMaxTier === tier;
            const styles = TIER_STYLES[tier];

            return (
              <button
                key={tier}
                type="button"
                className={`${
                  isSelected ? styles.activeBorder : styles.inactiveBorder
                } group relative flex w-[30px] items-center justify-center rounded-xl border-2 px-2 opacity-80 selection:bg-transparent hover:opacity-100`}
                onClick={() => {
                  setMaterialMaxTier(tier);
                }}
              >
                <span
                  className={`${
                    isSelected ? styles.activeText : styles.inactiveText
                  } text-center`}
                >
                  {tier}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex w-full grow flex-col gap-8 rounded-xl border-none p-2 pt-4 sm:pt-2">
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
