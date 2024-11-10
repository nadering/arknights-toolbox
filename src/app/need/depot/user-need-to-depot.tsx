"use client";

import { useRef, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { DepotLine, LMDLine, UpgradeLine } from "@common/depot";
import {
  makeEmptyDepot,
  selectedOperatorsMaterialAtom,
  userNeedAtom,
} from "@/store";
import { setDepotMaterialById } from "@/tool";
import { CountableMaterial } from "@/data/material";
import { ModuleActiveElite } from "@/data/operator";

/** 사용자 필요 재료의 창고화된 데이터 */
export default function UserNeedToDepot() {
  // 사용자 필요 재료
  const [userNeed, setUserNeed] = useAtom(userNeedAtom);

  // 오퍼레이터 총 육성 재화
  const selectedOperatorsMaterial = useAtomValue(selectedOperatorsMaterialAtom);

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  /** 오퍼레이터 총 육성 재화를 창고 데이터로 반영 */
  const setUserNeedWithSelectedOperator = () => {
    // 새로운 빈 창고 데이터를 생성
    const newUserNeed = makeEmptyDepot();

    for (const operatorMaterial of selectedOperatorsMaterial) {
      // 각각의 오퍼레이터의 육성 재화를 창고 데이터에 추가
      const target = operatorMaterial.target;

      // 정예화
      for (
        let eliteNum = target.elite;
        eliteNum < target.targetElite;
        eliteNum++
      ) {
        // 정예화 재료를 구해서,
        const eliteMaterial: CountableMaterial[] =
          operatorMaterial.eliteMaterials[eliteNum + 1];

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

      // 스킬 마스터리
      const commonAdded = [false, false, false, false, false, false, false];
      for (const skill of target.skillLevels) {
        const skillName = skill.name;
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
              operatorMaterial.skillUpgradeMaterials["common"][skillNum + 1];
            commonAdded[skillNum] = true;
          } else {
            // 마스터리 (8 ~ 10레벨)
            skillMaterial =
              operatorMaterial.skillUpgradeMaterials[skillName][skillNum + 1];
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
      if (target.targetElite >= ModuleActiveElite) {
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
              operatorMaterial.moduleMaterials![moduleType][moduleNum + 1];

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

    // 추가가 끝나면 새로운 창고를, 사용자 필요 재료의 창고화된 데이터로 설정
    setUserNeed(newUserNeed);
  };

  // 오퍼레이터가 변경되면, 새로 재료를 설정
  useEffect(() => {
    setUserNeedWithSelectedOperator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOperatorsMaterial]);

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
      <div className="flex flex-row gap-4">
        <p className="font-bold text-3xl text-white break-keep">
          필요 재료 확인
        </p>
      </div>
      <div className="grow w-full flex flex-col gap-8 p-2 border-none rounded-xl">
        <LMDLine list={userNeed["LMD"]} skipZero readonly />
        <DepotLine
          title="작전개론"
          list={userNeed["Battle-Record"]}
          skipZero
          readonly
        />
        <UpgradeLine list={userNeed["Upgrade"]} skipZero readonly />
        <DepotLine
          title="스킬개론"
          list={userNeed["Skill-Summary"]}
          skipZero
          readonly
        />
        <DepotLine title="모듈" list={userNeed["Module"]} skipZero readonly />
        <DepotLine
          title="데이터 칩"
          list={userNeed["Memory-Chip"]}
          skipZero
          readonly
        />
      </div>
    </div>
  );
}
