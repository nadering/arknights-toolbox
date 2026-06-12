"use client";

import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  expAtom,
  makeEmptyDepot,
  operatorCollapsedAtom,
  OperatorMaterial,
  OperatorTarget,
  selectedOperatorsAtom,
  selectedOperatorsMaterialAtom,
  userDepotAtom,
  userDepotInitializedAtom,
  userNeedAtom,
  userNeedInitializedAtom,
} from "@/store";
import { EXP } from "@/data/material";
import { ModuleLevel, Operator } from "@/data/operator";
import { getOperatorById } from "@/tool";
import { calculateUserNeed } from "@/tool/calculate-user-need";
import {
  createDepotFromRawStorageData,
  createStorageData,
} from "@/tool/persisted-depot";

/** 저장소 불러오기 및 저장을 담당하는 클라이언트 레이아웃 컴포넌트 */
export default function StorageSetter() {
  // 사용자의 현재 재료 보유량
  const [userDepot, setUserDepot] = useAtom(userDepotAtom);
  const [userDepotInitialized, setUserDepotInitialized] = useAtom(
    userDepotInitializedAtom,
  );

  // 사용자의 필요 재료
  const setUserNeed = useSetAtom(userNeedAtom);
  const setUserNeedInitialized = useSetAtom(userNeedInitializedAtom);

  // 오퍼레이터 육성에 필요한 총 경험치
  const setExp = useSetAtom(expAtom);

  // 선택된 오퍼레이터
  const [selectedOperators, setSelectedOperators] = useAtom(
    selectedOperatorsAtom,
  );

  // 선택된 오퍼레이터의 육성 목표치
  const [selectedOperatorsMaterial, setSelectedOperatorsMaterial] = useAtom(
    selectedOperatorsMaterialAtom,
  );

  // 접기/펼치기 여부
  const [operatorCollapsed, setOperatorCollapsed] = useAtom(
    operatorCollapsedAtom,
  );

  // 저장소에서 값을 가져왔는지 여부
  const [dataFetched, setDataFetched] = useState(false);

  // localStorage에서 값을 불러옴
  useEffect(() => {
    // 사용자의 현재 재료 보유량
    const userDepotSaved = localStorage.getItem("userDepot");
    if (userDepotSaved) {
      try {
        const restoredDepot = createDepotFromRawStorageData(userDepotSaved);

        setUserDepot(restoredDepot);
        setUserDepotInitialized(true);
      } catch {
        setUserDepot(makeEmptyDepot());
      }
    }

    // 선택된 오퍼레이터
    const selectedOperatorsSaved = localStorage.getItem("selectedOperators");
    if (selectedOperatorsSaved) {
      // 오퍼레이터 정보를 분리함에 따라 구조 변경
      try {
        const savedObject = JSON.parse(selectedOperatorsSaved) as
          | Operator[]
          | number[];
        const newObject: number[] = [];

        // 옛날 데이터를 지원하되, 저장될 때는 최신 형식으로 저장되도록 설정
        savedObject.forEach((operator) => {
          if (typeof operator === "number") {
            newObject.push(operator);
          } else if (typeof operator === "object") {
            newObject.push(operator.id);
          }
        });

        setSelectedOperators(newObject);
      } catch {
        setSelectedOperators([]);
      }
    }

    // 선택된 오퍼레이터의 육성 재화
    const selectedOperatorsMaterialSaved = localStorage.getItem(
      "selectedOperatorsMaterial",
    );
    if (selectedOperatorsMaterialSaved) {
      try {
        // 오퍼레이터 육성 필요 재료를 분리함에 따라 구조 변경
        const savedObject = JSON.parse(
          selectedOperatorsMaterialSaved,
        ) as OperatorMaterial[];
        const newObject: OperatorMaterial[] = [];

        // 옛날 데이터를 지원하되, 저장될 때는 최신 형식으로 저장되도록 설정
        savedObject.forEach((operatorMaterial) => {
          const operator = getOperatorById(operatorMaterial.id);
          const newTarget: OperatorTarget = { ...operatorMaterial.target };

          // 스킬 이름 변경 반영
          newTarget.skillLevels = newTarget.skillLevels.map(
            (skillLevel, index) => {
              return {
                ...skillLevel,
                index,
                name: operator!.skillList[index],
              };
            },
          );

          // 모듈 추가 및 이름 변경 반영
          newTarget.moduleLevels = operator!.moduleList.map((module) => {
            const existModuleLevel = operatorMaterial.target.moduleLevels.find(
              (moduleLevel) => moduleLevel.type === module.type,
            );

            if (existModuleLevel !== undefined) {
              return {
                ...existModuleLevel,
                name: module.name,
              };
            } else {
              return {
                type: module.type,
                name: module.name,
                current: 0,
                target: 0,
              } as ModuleLevel;
            }
          });

          newObject.push({
            id: operatorMaterial.id,
            rarity: operatorMaterial.rarity,
            target: newTarget,
          });
        });

        setSelectedOperatorsMaterial(newObject);
      } catch {
        setSelectedOperatorsMaterial([]);
      }
    }

    // 접기/펼치기 여부
    const operatorCollapsedSaved = localStorage.getItem("operatorCollapsed");
    if (operatorCollapsedSaved) {
      setOperatorCollapsed(JSON.parse(operatorCollapsedSaved));
    }

    // 가져온 데이터를 기반으로, 필요 재료 계산 후 반영
    const { userNeed: newUserNeed, exp: newExp } = calculateUserNeed({
      selectedOperatorsMaterial,
    });
    setUserNeed(newUserNeed);
    setUserNeedInitialized(selectedOperators.length > 0);
    setExp({ material: EXP, count: newExp });

    // 데이터를 가져왔음을 알림
    setDataFetched(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // localStorage에 값을 저장
  useEffect(() => {
    if (dataFetched) {
      if (userDepotInitialized) {
        const storageData = createStorageData(userDepot);
        localStorage.setItem("userDepot", JSON.stringify(storageData));
      }
    }
  }, [dataFetched, userDepot, userDepotInitialized]);

  useEffect(() => {
    if (dataFetched) {
      localStorage.setItem(
        "selectedOperators",
        JSON.stringify(selectedOperators),
      );
      localStorage.setItem(
        "selectedOperatorsMaterial",
        JSON.stringify(selectedOperatorsMaterial),
      );
    }
  }, [dataFetched, selectedOperators, selectedOperatorsMaterial]);

  useEffect(() => {
    if (dataFetched) {
      localStorage.setItem(
        "operatorCollapsed",
        JSON.stringify(operatorCollapsed),
      );
    }
  }, [dataFetched, operatorCollapsed]);

  // 더 이상 사용하지 않는 데이터 제거
  useEffect(() => {
    localStorage.removeItem("userNeed");
    localStorage.removeItem("exp");
  }, []);

  return <></>;
}
