import { CountableMaterial, LMD } from "@/data/material";
import {
  EliteNumber,
  LEVEL_UP_STACKED_TABLE,
  MAX_LEVEL_TABLE,
  MODULE_ACTIVE_ELITE,
  MODULE_LEVEL_REQUIRED,
} from "@/data/operator";
import { makeEmptyDepot, OperatorMaterial } from "@/store";
import { getOperatorById } from "./get-operator";
import { setDepotMaterialById } from "./set-depot";

/**
 * 오퍼레이터 육성에 필요한 재료를 계산 및 반환
 * @param selectedOperatorsMaterial 선택된 오퍼레이터들의 목표 육성치
 * @returns 사용자에게 필요한 재화 목록
 */
export const calculateUserNeed = ({
  selectedOperatorsMaterial,
}: {
  selectedOperatorsMaterial: OperatorMaterial[];
}) => {
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
          true,
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
          LEVEL_UP_STACKED_TABLE[target.currentElite][target.currentLevel].lmd,
        newUserNeed,
        true,
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
            const maxLevel = MAX_LEVEL_TABLE[operatorMaterial.rarity][eliteNum];
            newExp +=
              LEVEL_UP_STACKED_TABLE[eliteNum][maxLevel].exp -
              LEVEL_UP_STACKED_TABLE[eliteNum][target.currentLevel].exp;
            setDepotMaterialById(
              LMD.id,
              LEVEL_UP_STACKED_TABLE[eliteNum][maxLevel].lmd -
                LEVEL_UP_STACKED_TABLE[eliteNum][target.currentLevel].lmd,
              newUserNeed,
              true,
            );
          } else {
            // 현재 인덱스가 현재 정예화 단계도 아니고, 목표 정예화 단계도 아니라면 최대 레벨의 수치를 더하면 됨
            const maxLevel = MAX_LEVEL_TABLE[operatorMaterial.rarity][eliteNum];
            newExp += LEVEL_UP_STACKED_TABLE[eliteNum][maxLevel].exp;
            setDepotMaterialById(
              LMD.id,
              LEVEL_UP_STACKED_TABLE[eliteNum][maxLevel].lmd,
              newUserNeed,
              true,
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
            true,
          );
        }
      }
    }

    // 스킬 마스터리
    const commonAdded = [false, false, false, false, false, false, false];
    for (const skill of target.skillLevels) {
      const skillName = operator.skillList[skill.index];

      for (let skillNum = skill.current; skillNum < skill.target; skillNum++) {
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
            true,
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
              true,
            );
          }
        }
      }
    }
  }

  // 오퍼레이터의 육성 재료 추가가 끝나면 새로운 창고 및 경험치를 사용자 필요 재료의 창고화된 데이터로 설정
  return { userNeed: newUserNeed, exp: newExp };
};
