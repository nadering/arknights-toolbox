import { ModuleLevel, Operator } from "@/data/operator";
import { operatorById } from "@/data/operator/generated/operator-by-id.generated";
import { OPERATOR_ID_MIGRATION_MAP } from "@/data/operator/generated/operator-id-migration-map.generated";
import { OperatorMaterial, OperatorTarget } from "@/store";

type UnknownRecord = Record<string, unknown>;

type LegacyOperatorMaterial = Omit<OperatorMaterial, "id"> & {
  id: unknown;
};

const isUnknownRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null;
};

const getUnknownRecord = (value: unknown): UnknownRecord => {
  if (isUnknownRecord(value)) {
    return value;
  }

  return {};
};

const getMigratedOperatorId = (value: unknown): string | null => {
  if (typeof value === "string") {
    if (operatorById[value] !== undefined) {
      return value;
    }

    return OPERATOR_ID_MIGRATION_MAP[value] ?? null;
  }

  if (typeof value === "number") {
    return OPERATOR_ID_MIGRATION_MAP[String(value)] ?? null;
  }

  return null;
};

const getOperatorIdFromSavedOperator = (value: unknown): string | null => {
  const directOperatorId = getMigratedOperatorId(value);

  if (directOperatorId !== null) {
    return directOperatorId;
  }

  const record = getUnknownRecord(value);

  return getMigratedOperatorId(record.id);
};

const isLegacyOperatorMaterial = (
  value: unknown,
): value is LegacyOperatorMaterial => {
  const record = getUnknownRecord(value);

  return (
    record.id !== undefined &&
    isUnknownRecord(record.target) &&
    typeof record.rarity === "number"
  );
};

/** 저장된 선택 오퍼레이터 데이터를 최신 형식으로 변환 */
export const normalizeSelectedOperators = (savedObject: unknown): string[] => {
  if (!Array.isArray(savedObject)) {
    return [];
  }

  const operatorIdList = savedObject
    .map((operator) => {
      return getOperatorIdFromSavedOperator(operator);
    })
    .filter((operatorId): operatorId is string => {
      return operatorId !== null;
    });

  return Array.from(new Set(operatorIdList));
};

/** 저장된 오퍼레이터 육성 목표 및 재료 데이터를 최신화 */
export const normalizeSelectedOperatorsMaterial = (
  savedObject: unknown,
): OperatorMaterial[] => {
  if (!Array.isArray(savedObject)) {
    return [];
  }

  const newObject: OperatorMaterial[] = [];

  savedObject.forEach((savedOperatorMaterial) => {
    if (!isLegacyOperatorMaterial(savedOperatorMaterial)) {
      return;
    }

    const operatorId = getMigratedOperatorId(savedOperatorMaterial.id);

    if (operatorId === null) {
      return;
    }

    const operator = operatorById[operatorId] as Operator | undefined;

    if (operator === undefined) {
      return;
    }

    const newTarget: OperatorTarget = { ...savedOperatorMaterial.target };

    newTarget.skillLevels = newTarget.skillLevels.map((skillLevel, index) => {
      return {
        ...skillLevel,
        index,
        name: operator.skillList[index] ?? skillLevel.name,
      };
    });

    newTarget.moduleLevels = operator.moduleList.map((module) => {
      const existModuleLevel = newTarget.moduleLevels.find((moduleLevel) => {
        return moduleLevel.type === module.type;
      });

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
      id: operatorId,
      rarity: operator.rarity,
      target: newTarget,
    });
  });

  return newObject;
};
