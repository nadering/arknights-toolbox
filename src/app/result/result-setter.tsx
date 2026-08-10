"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import {
  type Depot,
  expAtom,
  makeEmptyDepot,
  userDepotAtom,
  userNeedAtom,
} from "@/store";
import {
  type BattleRecord,
  type CountableMaterial,
  EXP,
  type MaterialType,
} from "@/data/material";
import { setDepotMaterialById } from "@/tool";
import LackMaterials from "./lack-materials";
import Remaining from "./remaining";

type CalculationResult = {
  calculatedDepot: Depot;
  calculatedExp: CountableMaterial;
};

/** 계산 결과를 제공하는 컴포넌트 */
export default function ResultSetter() {
  // 사용자의 현재 보유량 및 필요 재료, 경험치
  const userDepot = useAtomValue(userDepotAtom);
  const userNeed = useAtomValue(userNeedAtom);
  const needExp = useAtomValue(expAtom);

  /** 현재 보유량에서 필요 재료와 경험치를 차감 */
  const { calculatedDepot, calculatedExp } = useMemo<CalculationResult>(() => {
    const depotExpCount = userDepot["Battle-Record"].reduce(
      (totalExp, countableMaterial) => {
        const battleRecord = countableMaterial.material as BattleRecord;

        return totalExp + battleRecord.exp * countableMaterial.count;
      },
      0,
    );

    const newCalculatedExp: CountableMaterial = {
      material: EXP,
      count: depotExpCount - needExp.count,
    };

    const newCalculatedDepot = makeEmptyDepot();

    for (const type of Object.keys(userDepot) as MaterialType[]) {
      // 경험치는 위에서 별도로 계산했으므로 제외
      if (type === "Battle-Record") {
        continue;
      }

      const currentDepotLine = userDepot[type];
      const currentNeedLine = userNeed[type];

      for (let index = 0; index < currentDepotLine.length; index += 1) {
        const currentMaterial = currentDepotLine[index];
        const neededMaterial = currentNeedLine[index];

        if (!currentMaterial || !neededMaterial) {
          continue;
        }

        const calculatedCount = currentMaterial.count - neededMaterial.count;

        setDepotMaterialById(
          currentMaterial.material.id,
          calculatedCount,
          newCalculatedDepot,
        );
      }
    }

    return {
      calculatedDepot: newCalculatedDepot,
      calculatedExp: newCalculatedExp,
    };
  }, [userDepot, userNeed, needExp.count]);

  return (
    <div className="flex w-full flex-col gap-4">
      <LackMaterials data={calculatedDepot} exp={calculatedExp} />
      <Remaining exp={calculatedExp} />
    </div>
  );
}
