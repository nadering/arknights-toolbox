"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  Depot,
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
import { EXP, MaterialType } from "@/data/material";
import { ModuleLevel, Operator } from "@/data/operator";
import { getOperatorById } from "@/tool";

/** localStorage 불러오기 및 저장을 담당하는 클라이언트 레이아웃 컴포넌트 */
export default function LocalStorageSetter() {
  // 사용자의 현재 재료 보유량
  const [userDepot, setUserDepot] = useAtom(userDepotAtom);

  // 사용자의 필요 재료
  const [userNeed, setUserNeed] = useAtom(userNeedAtom);

  // 오퍼레이터 육성에 필요한 총 경험치
  const [exp, setExp] = useAtom(expAtom);

  // 창고 및 육성 재화 설정 여부
  const [userDepotInitialized, setUserDepotInitialized] = useAtom(
    userDepotInitializedAtom
  );
  const [userNeedInitialized, setUserNeedInitialized] = useAtom(
    userNeedInitializedAtom
  );

  // 선택된 오퍼레이터
  const [selectedOperators, setSelectedOperators] = useAtom(
    selectedOperatorsAtom
  );

  // 선택된 오퍼레이터의 육성 재화
  const [selectedOperatorsMaterial, setSelectedOperatorsMaterial] = useAtom(
    selectedOperatorsMaterialAtom
  );

  // 접기/펼치기 여부
  const [operatorCollapsed, setOperatorCollapsed] = useAtom(
    operatorCollapsedAtom
  );

  // localStorage에서 값을 가져왔는지 여부
  const [dataFetched, setDataFetched] = useState(false);

  // localStorage에서 값을 불러옴
  useEffect(() => {
    // 사용자의 현재 재료 보유량
    const userDepotSaved = localStorage.getItem("userDepot");
    if (userDepotSaved) {
      try {
        const savedDepot: Depot = JSON.parse(userDepotSaved);
        const emptyDepot = makeEmptyDepot();

        const mergedDepot: Depot = {} as Depot;

        for (const type in emptyDepot) {
          const typed = type as MaterialType;

          const currentMaterials = emptyDepot[typed]; // 최신 전체 재료 리스트 (count: 0)
          const savedMaterials = savedDepot[typed] ?? []; // 저장된 기존 재료 리스트

          const mergedMaterials = currentMaterials.map((mat) => {
            const matched = savedMaterials.find(
              (s) => s.material.id === mat.material.id
            );
            return {
              material: { ...mat.material, name: mat.material.name },
              count: matched?.count ?? 0, // 있으면 유지, 없으면 0
            };
          });

          mergedDepot[typed] = mergedMaterials;
        }

        setUserDepot(mergedDepot);
        setUserDepotInitialized(true);
      } catch {
        setUserDepot(makeEmptyDepot());
      }
    }

    // 사용자의 필요 재료
    const userNeedSaved = localStorage.getItem("userNeed");
    if (userNeedSaved) {
      try {
        const savedNeed: Depot = JSON.parse(userNeedSaved);
        const emptyNeed = makeEmptyDepot();

        const mergedNeed: Depot = {} as Depot;

        for (const type in emptyNeed) {
          const typed = type as MaterialType;

          const currentMaterials = emptyNeed[typed];
          const savedMaterials = savedNeed[typed] ?? [];

          const mergedMaterials = currentMaterials.map((mat) => {
            const matched = savedMaterials.find(
              (s) => s.material.id === mat.material.id
            );
            return {
              material: { ...mat.material, name: mat.material.name },
              count: matched?.count ?? 0,
            };
          });

          mergedNeed[typed] = mergedMaterials;
        }

        setUserNeed(mergedNeed);
        setUserNeedInitialized(true);
      } catch {
        setUserNeed(makeEmptyDepot());
      }
    }

    // 오퍼레이터 육성에 필요한 총 경험치
    const expSaved = localStorage.getItem("exp");
    if (expSaved) {
      try {
        setExp(JSON.parse(expSaved));
      } catch {
        setExp({ material: EXP, count: 0 });
      }
    }

    // 선택된 오퍼레이터의 육성 재화
    const selectedOperatorsMaterialSaved = localStorage.getItem(
      "selectedOperatorsMaterial"
    );
    if (selectedOperatorsMaterialSaved) {
      try {
        // 오퍼레이터 육성 필요 재료를 분리함에 따라 구조 변경
        const savedObject = JSON.parse(
          selectedOperatorsMaterialSaved
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
            }
          );

          // 모듈 추가 및 이름 변경 반영
          newTarget.moduleLevels = operator!.moduleList.map((module) => {
            const existModuleLevel = operatorMaterial.target.moduleLevels.find(
              (moduleLevel) => moduleLevel.type === module.type
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

    // 접기/펼치기 여부
    const operatorCollapsedSaved = localStorage.getItem("operatorCollapsed");
    if (operatorCollapsedSaved) {
      setOperatorCollapsed(JSON.parse(operatorCollapsedSaved));
    }

    // 데이터를 가져왔음을 알림
    setDataFetched(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // localStorage에 값을 저장
  useEffect(() => {
    if (dataFetched) {
      if (userDepotInitialized) {
        localStorage.setItem("userDepot", JSON.stringify(userDepot));
      }
    }
  }, [dataFetched, userDepot, userDepotInitialized]);

  useEffect(() => {
    if (dataFetched) {
      if (userNeedInitialized) {
        localStorage.setItem("userNeed", JSON.stringify(userNeed));
        localStorage.setItem("exp", JSON.stringify(exp));
      }
    }
  }, [dataFetched, userNeed, exp, userNeedInitialized]);

  useEffect(() => {
    if (dataFetched) {
      localStorage.setItem(
        "selectedOperators",
        JSON.stringify(selectedOperators)
      );
      localStorage.setItem(
        "selectedOperatorsMaterial",
        JSON.stringify(selectedOperatorsMaterial)
      );
    }
  }, [dataFetched, selectedOperators, selectedOperatorsMaterial]);

  useEffect(() => {
    if (dataFetched) {
      localStorage.setItem(
        "operatorCollapsed",
        new Boolean(operatorCollapsed).toString()
      );
    }
  });

  return <></>;
}
