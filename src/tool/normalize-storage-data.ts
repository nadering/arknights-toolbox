import { ModuleLevel, Operator } from "@/data/operator";
import { OperatorMaterial, OperatorTarget } from "@/store";
import { getOperatorById } from "@/tool";

/** 저장된 선택 오퍼레이터 데이터를 최신 형식으로 변환 */
export const normalizeSelectedOperators = (
  savedObject: Operator[] | number[],
): number[] => {
  const newObject: number[] = [];

  savedObject.forEach((operator) => {
    if (typeof operator === "number") {
      newObject.push(operator);
      return;
    }

    if (typeof operator === "object" && operator !== null) {
      newObject.push(operator.id);
    }
  });

  return newObject;
};

/** 저장된 오퍼레이터 육성 목표 및 재료 데이터를 최신화 */
export const normalizeSelectedOperatorsMaterial = (
  savedObject: OperatorMaterial[],
): OperatorMaterial[] => {
  const newObject: OperatorMaterial[] = [];

  savedObject.forEach((operatorMaterial) => {
    const operator = getOperatorById(operatorMaterial.id);

    if (operator === undefined) {
      return;
    }

    const newTarget: OperatorTarget = { ...operatorMaterial.target };

    newTarget.skillLevels = newTarget.skillLevels.map((skillLevel, index) => {
      return {
        ...skillLevel,
        index,
        name: operator.skillList[index] ?? skillLevel.name,
      };
    });

    newTarget.moduleLevels = operator.moduleList.map((module) => {
      const existModuleLevel = operatorMaterial.target.moduleLevels.find(
        (moduleLevel) => moduleLevel.type === module.type,
      );

      if (existModuleLevel !== undefined) {
        return {
          ...existModuleLevel,
          name: module.name,
        };
      }

      return {
        type: module.type,
        name: module.name,
        current: 0,
        target: 0,
      } as ModuleLevel;
    });

    newObject.push({
      id: operatorMaterial.id,
      rarity: operatorMaterial.rarity,
      target: newTarget,
    });
  });

  return newObject;
};
