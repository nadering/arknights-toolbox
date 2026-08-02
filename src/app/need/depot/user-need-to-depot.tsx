"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { DepotLine, LMDExpLine, UpgradeLine } from "@common/depot";
import {
  expAtom,
  selectedOperatorsMaterialAtom,
  userNeedAtom,
  userNeedInitializedAtom,
} from "@/store";
import { decomposeMaterial } from "@/tool";
import { EXP, type TierType } from "@/data/material";
import { calculateUserNeed } from "@/tool/calculate-user-need";

/** 사용자 필요 재료의 창고화된 데이터 */
export default function UserNeedToDepot() {
  const setUserNeed = useSetAtom(userNeedAtom);
  const setUserNeedInitialized = useSetAtom(userNeedInitializedAtom);
  const setExp = useSetAtom(expAtom);

  // 오퍼레이터 총 육성 재화
  const selectedOperatorsMaterial = useAtomValue(selectedOperatorsMaterialAtom);

  // 재료 분해 시 유지할 최대 티어
  const [materialMaxTier, setMaterialMaxTier] = useState<TierType>(5);

  // 선택된 오퍼레이터를 기준으로 필요 재료와 경험치를 계산
  const { userNeed: calculatedUserNeed, exp: calculatedExp } = useMemo(
    () => calculateUserNeed(selectedOperatorsMaterial),
    [selectedOperatorsMaterial],
  );

  // 선택된 최대 티어에 맞게 필요 재료를 분해
  const decomposedDepot = useMemo(
    () =>
      decomposeMaterial({
        depot: calculatedUserNeed,
        materialMaxTier,
        userNeedOnly: true,
      }),
    [calculatedUserNeed, materialMaxTier],
  );

  // 애니메이션을 위해 노드를 참조하는 Ref
  const divRef = useRef<HTMLDivElement>(null);

  // 계산된 필요 재료와 경험치를 전역 상태에 반영
  useEffect(() => {
    setUserNeed(calculatedUserNeed);
    setUserNeedInitialized(true);
    setExp({
      material: EXP,
      count: calculatedExp,
    });
  }, [
    calculatedExp,
    calculatedUserNeed,
    setExp,
    setUserNeed,
    setUserNeedInitialized,
  ]);

  // 창고가 표시될 때 아래쪽으로 이동하며 Fade-in
  useEffect(() => {
    const element = divRef.current;

    if (!element) {
      return;
    }

    const animateClass = "animate-[fade-in-down_0.2s_ease-in-out]";

    if (element.classList.contains(animateClass)) {
      return;
    }

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
          필요 재료 확인
        </p>

        <div className="flex translate-y-[2px] flex-row items-center justify-start gap-2 pl-2 sm:pl-0">
          <button
            type="button"
            className={`${
              materialMaxTier === 5
                ? "border-tier-5"
                : "border-gray-800 hover:border-tier-5"
            } group relative flex w-[30px] items-center justify-center rounded-xl border-2 px-2 opacity-80 selection:bg-transparent hover:opacity-100`}
            onClick={() => setMaterialMaxTier(5)}
          >
            <p
              className={`${
                materialMaxTier === 5
                  ? "text-tier-5"
                  : "text-gray-800 group-hover:text-tier-5"
              } text-center`}
            >
              5
            </p>
          </button>

          <button
            type="button"
            className={`${
              materialMaxTier === 4
                ? "border-tier-4"
                : "border-gray-800 hover:border-tier-4"
            } group relative flex w-[30px] items-center justify-center rounded-xl border-2 px-2 opacity-80 selection:bg-transparent hover:opacity-100`}
            onClick={() => setMaterialMaxTier(4)}
          >
            <p
              className={`${
                materialMaxTier === 4
                  ? "text-tier-4"
                  : "text-gray-800 group-hover:text-tier-4"
              } text-center`}
            >
              4
            </p>
          </button>

          <button
            type="button"
            className={`${
              materialMaxTier === 3
                ? "border-tier-3"
                : "border-gray-800 hover:border-tier-3"
            } group relative flex w-[30px] items-center justify-center rounded-xl border-2 px-2 opacity-80 selection:bg-transparent hover:opacity-100`}
            onClick={() => setMaterialMaxTier(3)}
          >
            <p
              className={`${
                materialMaxTier === 3
                  ? "text-tier-3"
                  : "text-gray-800 group-hover:text-tier-3"
              } text-center`}
            >
              3
            </p>
          </button>

          <button
            type="button"
            className={`${
              materialMaxTier === 2
                ? "border-tier-2"
                : "border-gray-800 hover:border-tier-2"
            } group relative flex w-[30px] items-center justify-center rounded-xl border-2 px-2 opacity-80 selection:bg-transparent hover:opacity-100`}
            onClick={() => setMaterialMaxTier(2)}
          >
            <p
              className={`${
                materialMaxTier === 2
                  ? "text-tier-2"
                  : "text-gray-800 group-hover:text-tier-2"
              } text-center`}
            >
              2
            </p>
          </button>

          <button
            type="button"
            className={`${
              materialMaxTier === 1
                ? "border-tier-1"
                : "border-gray-800 hover:border-tier-1"
            } group relative flex w-[30px] items-center justify-center rounded-xl border-2 px-2 opacity-80 selection:bg-transparent hover:opacity-100`}
            onClick={() => setMaterialMaxTier(1)}
          >
            <p
              className={`${
                materialMaxTier === 1
                  ? "text-tier-1"
                  : "text-gray-800 group-hover:text-tier-1"
              } text-center`}
            >
              1
            </p>
          </button>
        </div>
      </div>

      <div className="flex w-full grow flex-col gap-8 rounded-xl border-none p-2 pt-4 sm:pt-2">
        <UpgradeLine list={decomposedDepot["Upgrade"]} skipZero readonly />

        <LMDExpLine
          list={decomposedDepot["LMD"]}
          expData={{
            material: EXP,
            count: calculatedExp,
          }}
          skipZero
          readonly
        />

        <DepotLine
          title="스킬개론"
          list={decomposedDepot["Skill-Summary"]}
          skipZero
          readonly
        />

        <DepotLine
          title="모듈"
          list={decomposedDepot["Module"]}
          skipZero
          readonly
        />

        <DepotLine
          title="데이터 칩"
          list={decomposedDepot["Memory-Chip"]}
          skipZero
          readonly
        />
      </div>
    </div>
  );
}
