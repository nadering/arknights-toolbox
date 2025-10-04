import { MaterialType, TierType } from "@/data/material";
import { Depot, makeEmptyDepot } from "@/store";
import { setDepotMaterialById } from "./set-depot";

/**
 * 재료의 최고 티어에 따라, 재료를 분해한 후 반환
 * @param depot 창고
 * @param materialMaxTier 분해 결과의 최고 티어
 * @param filterMaterialTypes 사용자에게 보여주도록 필터링할 타입
 * @param userNeedOnly 보유 재료와 관계 없이 필요 재료만 계산하는지 여부 (기본값 false)
 * @returns 분해된 재료 결과의 Depot 형태
 * */
export const decomposeMaterial = ({
  depot,
  materialMaxTier,
  filterMaterialTypes,
  userNeedOnly = false,
}: {
  depot: Depot;
  materialMaxTier: TierType;
  filterMaterialTypes?: MaterialType[];
  userNeedOnly?: boolean;
}) => {
  let initialDepot = { ...depot };
  let resultDepot = makeEmptyDepot();

  if (filterMaterialTypes === undefined) {
    // 기본 타입 설정
    filterMaterialTypes = [
      "Upgrade",
      "Skill-Summary",
      "Memory-Chip",
      "Module",
      "LMD",
    ];
  }

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
            (mat.count < 0 || (userNeedOnly && mat.count > 0)) &&
            mat.material.recipe &&
            mat.material.tier > materialMaxTier
          ) {
            // 보유 재료보다 필요 재료가 더 많은 경우 (mat.count < 0)
            // 혹은 필요 재료만 계산하는 경우
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
            setDepotMaterialById(mat.material.id, mat.count, resultDepot, true);
          }
        }
      }
    });

    // 분해 대상인 Depot을 재설정
    initialDepot = { ...resultDepot };
  }
  return resultDepot;
};
