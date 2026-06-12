"use client";

import { useRef, useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { DepotLine, LMDExpLine, UpgradeLine } from "@common/depot";
import {
  Depot,
  expAtom,
  selectedOperatorsMaterialAtom,
  userNeedAtom,
  userNeedInitializedAtom,
} from "@/store";
import { decomposeMaterial } from "@/tool";
import { EXP, TierType } from "@/data/material";
import { calculateUserNeed } from "@/tool/calculate-user-need";

/** 사용자 필요 재료의 창고화된 데이터 */
export default function UserNeedToDepot() {
  // 사용자 필요 재료
  const [userNeed, setUserNeed] = useAtom(userNeedAtom);
  const setUserNeedInitialized = useSetAtom(userNeedInitializedAtom);
  const setExp = useSetAtom(expAtom);

  // 오퍼레이터 총 육성 재화
  const selectedOperatorsMaterial = useAtomValue(selectedOperatorsMaterialAtom);

  // 재료 분해
  const [materialMaxTier, setMaterialMaxTier] = useState<TierType>(5);
  const [decomposedDepot, setDecomposedDepot] = useState<Depot>(userNeed);

  // 애니메이션을 위해 노드를 참조하는 Ref
  const divRef = useRef<HTMLDivElement>(null);

  // 오퍼레이터가 변경되면, 새로 재료를 설정
  useEffect(() => {
    const { userNeed: newUserNeed, exp: newExp } = calculateUserNeed(
      selectedOperatorsMaterial,
    );

    setUserNeed(newUserNeed);
    setUserNeedInitialized(true);
    setExp({ material: EXP, count: newExp });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOperatorsMaterial]);

  // 사용자가 선택한 티어에 맞게 분해 후 재료 수량을 변경
  useEffect(() => {
    const newDecomposedData = decomposeMaterial({
      depot: userNeed,
      materialMaxTier,
      userNeedOnly: true,
    });
    setDecomposedDepot(newDecomposedData);
  }, [userNeed, materialMaxTier]);

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

  return (
    <div className="hidden flex flex-col p-4" ref={divRef}>
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
        <p className="pl-1 font-bold text-3xl text-white break-keep">
          필요 재료 확인
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
      <div className="grow w-full flex flex-col gap-8 p-2 pt-4 border-none rounded-xl sm:pt-2">
        <UpgradeLine list={decomposedDepot["Upgrade"]} skipZero readonly />
        <LMDExpLine list={decomposedDepot["LMD"]} skipZero readonly />
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
