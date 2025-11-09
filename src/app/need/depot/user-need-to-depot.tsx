"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { DepotLine, LMDExpLine, UpgradeLine } from "@common/depot";
import {
  Depot,
  expAtom,
  makeEmptyDepot,
  selectedOperatorsMaterialAtom,
  userNeedAtom,
  userNeedInitializedAtom,
} from "@/store";
import {
  decomposeMaterial,
  getOperatorById,
  setDepotMaterialById,
} from "@/tool";
import { CountableMaterial, EXP, LMD, TierType } from "@/data/material";
import {
  EliteNumber,
  LEVEL_UP_STACKED_TABLE,
  MAX_LEVEL_TABLE,
  MODULE_ACTIVE_ELITE,
  MODULE_LEVEL_REQUIRED,
} from "@/data/operator";

/** 사용자 필요 재료의 창고화된 데이터 */
export default function UserNeedToDepot() {
  // 사용자 필요 재료
  const [userNeed, setUserNeed] = useAtom(userNeedAtom);
  const setUserNeedInitialized = useSetAtom(userNeedInitializedAtom);

  // 오퍼레이터 총 육성 재화
  const selectedOperatorsMaterial = useAtomValue(selectedOperatorsMaterialAtom);

  // 오퍼레이터 육성 경험치
  const setExp = useSetAtom(expAtom);

  // 재료 분해
  const [materialMaxTier, setMaterialMaxTier] = useState<TierType>(5);
  const [decomposedDepot, setDecomposedDepot] = useState<Depot>(userNeed);

  // 애니메이션을 위해 노드를 참조하는 Ref
  const divRef = useRef<HTMLDivElement>(null);

  /** 오퍼레이터 총 육성 재화를 창고 데이터로 반영 */
  const setUserNeedWithSelectedOperator = useCallback(() => {
    // 새로운 빈 창고 데이터를 생성
    const newUserNeed = makeEmptyDepot();
    let newExp = 0;

    for (const operatorMaterial of selectedOperatorsMaterial) {
      // 각각의 오퍼레이터의 육성 재화를 창고 데이터에 추가
      const target = operatorMaterial.target;
      const operator = getOperatorById(operatorMaterial.id);
      if (operator === undefined) {
        break;
      }

      // 정예화
      for (
        let eliteNum = target.currentElite;
        eliteNum < target.targetElite;
        eliteNum++
      ) {
        // 정예화 재료를 구해서,
        const eliteMaterial: CountableMaterial[] =
          operator.eliteMaterials[(eliteNum + 1) as EliteNumber];

        // 창고 데이터에 추가
        for (const countableMaterial of eliteMaterial) {
          setDepotMaterialById(
            countableMaterial.material.id,
            countableMaterial.count,
            newUserNeed,
            true
          );
        }
      }

      // 레벨
      if (target.currentElite == target.targetElite) {
        // 같은 정예화 단계면, 같은 테이블 안에서 경험치 및 용문폐를 계산
        newExp +=
          LEVEL_UP_STACKED_TABLE[target.currentElite][target.targetLevel].exp -
          LEVEL_UP_STACKED_TABLE[target.currentElite][target.currentLevel].exp;

        setDepotMaterialById(
          LMD.id,
          LEVEL_UP_STACKED_TABLE[target.currentElite][target.targetLevel].lmd -
            LEVEL_UP_STACKED_TABLE[target.currentElite][target.currentLevel]
              .lmd,
          newUserNeed,
          true
        );
      } else {
        for (
          let eliteNum = target.currentElite;
          eliteNum <= target.targetElite;
          eliteNum++
        ) {
          // 현재 정예화 단계가 목표 정예화 단계보다 아래라면, 테이블을 여러 번 더해야 함
          if (eliteNum != target.targetElite) {
            if (eliteNum == target.currentElite) {
              // 현재 인덱스가 현재 정예화 단계면, 최대 레벨에서 현재 레벨의 수치를 뺀 만큼 더하면 됨
              const maxLevel =
                MAX_LEVEL_TABLE[operatorMaterial.rarity][eliteNum];
              newExp +=
                LEVEL_UP_STACKED_TABLE[eliteNum][maxLevel].exp -
                LEVEL_UP_STACKED_TABLE[eliteNum][target.currentLevel].exp;
              setDepotMaterialById(
                LMD.id,
                LEVEL_UP_STACKED_TABLE[eliteNum][maxLevel].lmd -
                  LEVEL_UP_STACKED_TABLE[eliteNum][target.currentLevel].lmd,
                newUserNeed,
                true
              );
            } else {
              // 현재 인덱스가 현재 정예화 단계도 아니고, 목표 정예화 단계도 아니라면 최대 레벨의 수치를 더하면 됨
              const maxLevel =
                MAX_LEVEL_TABLE[operatorMaterial.rarity][eliteNum];
              newExp += LEVEL_UP_STACKED_TABLE[eliteNum][maxLevel].exp;
              setDepotMaterialById(
                LMD.id,
                LEVEL_UP_STACKED_TABLE[eliteNum][maxLevel].lmd,
                newUserNeed,
                true
              );
            }
          } else {
            // 목표 정예화 단계와 동일하다면, 같은 테이블 안에서 경험치 및 용문폐를 계산
            // 이 경우, 현재 레벨은 1레벨 기준으로 계산해도 됨
            newExp += LEVEL_UP_STACKED_TABLE[eliteNum][target.targetLevel].exp;
            setDepotMaterialById(
              LMD.id,
              LEVEL_UP_STACKED_TABLE[eliteNum][target.targetLevel].lmd,
              newUserNeed,
              true
            );
          }
        }
      }

      // 스킬 마스터리
      const commonAdded = [false, false, false, false, false, false, false];
      for (const skill of target.skillLevels) {
        const skillName = operator.skillList[skill.index];

        for (
          let skillNum = skill.current;
          skillNum < skill.target;
          skillNum++
        ) {
          // 스킬 레벨에 따라 재료 추가
          let skillMaterial: CountableMaterial[];

          if (skillNum < 7) {
            // 1 ~ 7레벨 구간의 공통 재료는 1번만 더함
            if (commonAdded[skillNum]) continue;

            skillMaterial =
              operator.skillUpgradeMaterials["common"][skillNum + 1];
            commonAdded[skillNum] = true;
          } else {
            // 마스터리 (8 ~ 10레벨)
            skillMaterial =
              operator.skillUpgradeMaterials[skillName][skillNum + 1];
          }

          // 창고 데이터에 추가
          for (const countableMaterial of skillMaterial) {
            setDepotMaterialById(
              countableMaterial.material.id,
              countableMaterial.count,
              newUserNeed,
              true
            );
          }
        }
      }

      // 모듈
      if (
        target.targetElite >= MODULE_ACTIVE_ELITE &&
        target.targetLevel >= MODULE_LEVEL_REQUIRED[operatorMaterial.rarity]
      ) {
        // 모듈이 활성화되어 있는 경우에만 추가
        for (const moduleInfo of target.moduleLevels) {
          const moduleType = moduleInfo.type;
          for (
            let moduleNum = moduleInfo.current;
            moduleNum < moduleInfo.target;
            moduleNum++
          ) {
            // 모듈 레벨에 따라 재료 추가 (이 분기에는 반드시 모듈 재료가 있음)
            const moduleMaterial: CountableMaterial[] =
              operator.moduleMaterials![moduleType][moduleNum + 1];

            // 창고 데이터에 추가
            for (const countableMaterial of moduleMaterial) {
              setDepotMaterialById(
                countableMaterial.material.id,
                countableMaterial.count,
                newUserNeed,
                true
              );
            }
          }
        }
      }
    }

    // 오퍼레이터의 육성 재료 추가가 끝나면 새로운 창고 및 경험치를 사용자 필요 재료의 창고화된 데이터로 설정
    setUserNeed(newUserNeed);
    setUserNeedInitialized(true);
    setExp({ material: EXP, count: newExp });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOperatorsMaterial]);

  // 오퍼레이터가 변경되면, 새로 재료를 설정
  useEffect(() => {
    setUserNeedWithSelectedOperator();
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
