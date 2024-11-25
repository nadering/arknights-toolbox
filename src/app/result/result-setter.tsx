"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import {
  Depot,
  expAtom,
  makeEmptyDepot,
  userDepotAtom,
  userNeedAtom,
} from "@/store";
import {
  BattleRecord,
  CountableMaterial,
  EXP,
  MaterialType,
} from "@/data/material";
import { setDepotMaterialById } from "@/tool";
import LackMaterials from "./lack-materials";
import Remaining from "./remaining";

/** 계산 결과를 제공하는 컴포넌트 */
export default function ResultSetter() {
  // 사용자의 현재 보유량 및 필요 재료, 경험치
  const userDepot = useAtomValue(userDepotAtom);
  const userNeed = useAtomValue(userNeedAtom);
  const needExp = useAtomValue(expAtom);

  // 계산 결과
  const [calculatedDepot, setCalculatedDepot] = useState<Depot>(
    makeEmptyDepot()
  );
  const [calculatedExp, setCalculatedExp] = useState<CountableMaterial>({
    material: EXP,
    count: 0,
  });

  /** 현재 보유량에서 필요 재료와 경험치를 빼는 연산 */
  const calculate = () => {
    // 현재 보유 중인 경험치를 계산
    let depotExpCount = 0;
    for (const mat of userDepot["Battle-Record"]) {
      const battleRecord = mat.material as BattleRecord;
      depotExpCount += battleRecord.exp * mat.count;
    }
    // 현재 보유 중인 경험치에서, 육성에 필요한 경험치를 뺌
    const newExp: CountableMaterial = {
      material: EXP,
      count: depotExpCount - needExp.count,
    };

    // 계산 결과를 저장
    const newDepot = makeEmptyDepot();
    Object.keys(userDepot).forEach((type) => {
      // 경험치는 이미 계산했으므로 생략
      if (type == "Battle-Record") {
        return;
      }

      // 현재 타입의 리스트를 받아옴
      const currentDepotLine = userDepot[type as MaterialType];
      const currentNeedLine = userNeed[type as MaterialType];

      for (let i = 0; i < currentDepotLine.length; i++) {
        // 재료가 들어간 순서는 동일하므로, 인덱스로 순회하며 값을 계산한 후 저장
        const id = currentDepotLine[i].material.id;
        const count = currentDepotLine[i].count - currentNeedLine[i].count;
        setDepotMaterialById(id, count, newDepot);
      }
    });

    // 변경된 값을 반영
    setCalculatedExp(newExp);
    setCalculatedDepot(newDepot);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => calculate(), [userDepot, userNeed, needExp]);

  return (
    <div className="flex flex-col w-full gap-4">
      <LackMaterials
        key="need-to-craft"
        data={calculatedDepot}
        exp={calculatedExp}
      />
      <Remaining key="remaining" exp={calculatedExp} />
    </div>
  );
}
