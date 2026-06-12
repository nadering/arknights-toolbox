import { Depot, makeEmptyDepot, PersistedDepot } from "@/store/depot";

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isValidCount = (value: unknown): value is number => {
  return typeof value === "number" && Number.isFinite(value);
};

/**
 * 주어진 값이 유효한 PersistedDepot 타입인지 확인
 * @param value 확인할 값
 * @returns 유효한 PersistedDepot 타입이면 true, 그렇지 않으면 false
 */
export const isPersistedDepot = (value: unknown): value is PersistedDepot => {
  if (!isObject(value)) {
    return false;
  }

  if (value.schemaVersion !== 2) {
    return false;
  }

  if (!isObject(value.items)) {
    return false;
  }

  return Object.values(value.items).every((count) => {
    return isValidCount(count);
  });
};

/**
 * Depot 객체를, 버전 2의 저장소 데이터로 변환
 * @param depot 변환할 Depot 객체
 * @returns 저장소에 저장할 수 있는 데이터
 */
export const createStorageData = (depot: Depot): PersistedDepot => {
  const items: Record<string, number> = {};
  const visitedIds = new Set<string>();

  Object.values(depot).forEach((countableMaterials) => {
    countableMaterials.forEach((countableMaterial) => {
      const { material, count } = countableMaterial;

      if (visitedIds.has(material.id)) {
        throw new Error(`Duplicated material id: ${material.id}`);
      }

      visitedIds.add(material.id);

      if (count === 0) {
        return;
      }

      items[material.id] = count;
    });
  });

  return {
    schemaVersion: 2,
    items,
  };
};

/**
 * 버전 2의 저장소 데이터를 기반으로, Depot 객체를 생성
 * @param storageData 저장소에 저장된 데이터
 * @returns 생성된 Depot 객체
 */
export const createDepotFromStorageData = (
  storageData: PersistedDepot,
): Depot => {
  const emptyDepot = makeEmptyDepot();

  const restoredDepot = Object.entries(emptyDepot).reduce<Depot>(
    (acc, [materialType, countableMaterials]) => {
      acc[materialType as keyof Depot] = countableMaterials.map(
        (countableMaterial) => {
          const id = countableMaterial.material.id;
          const count = storageData.items[id];

          return {
            material: countableMaterial.material,
            count: count ?? 0,
          };
        },
      );

      return acc;
    },
    {} as Depot,
  );

  return restoredDepot;
};

/**
 * 레거시 저장 데이터에서, 재료 ID별 개수 맵을 생성
 * @param legacyDepot 레거시 저장 데이터
 * @returns 재료 ID와 개수의 매핑
 */
const createCountMapFromLegacyStorageData = (
  legacyDepot: unknown,
): Map<string, number> => {
  const countByMaterialId = new Map<string, number>();

  if (!isObject(legacyDepot)) {
    return countByMaterialId;
  }

  Object.values(legacyDepot).forEach((maybeCountableMaterials) => {
    if (!Array.isArray(maybeCountableMaterials)) {
      return;
    }

    maybeCountableMaterials.forEach((maybeCountableMaterial) => {
      if (!isObject(maybeCountableMaterial)) {
        return;
      }

      const material = maybeCountableMaterial.material;
      const count = maybeCountableMaterial.count;

      if (!isObject(material)) {
        return;
      }

      if (typeof material.id !== "string") {
        return;
      }

      if (!isValidCount(count)) {
        return;
      }

      countByMaterialId.set(material.id, count);
    });
  });

  return countByMaterialId;
};

/**
 * 레거시 저장 데이터에서, Depot 객체를 생성
 * @param legacyDepot 레거시 저장 데이터
 * @returns 생성된 Depot 객체
 */
export const createDepotFromLegacyStorageData = (
  legacyDepot: unknown,
): Depot => {
  const emptyDepot = makeEmptyDepot();
  const countByMaterialId = createCountMapFromLegacyStorageData(legacyDepot);

  const restoredDepot = Object.entries(emptyDepot).reduce<Depot>(
    (acc, [materialType, countableMaterials]) => {
      acc[materialType as keyof Depot] = countableMaterials.map(
        (countableMaterial) => {
          const count = countByMaterialId.get(countableMaterial.material.id);

          return {
            material: countableMaterial.material,
            count: count ?? 0,
          };
        },
      );

      return acc;
    },
    {} as Depot,
  );

  return restoredDepot;
};

/**
 * 저장된 데이터에서 Depot 객체를 생성
 * @param rawData 원시 저장 데이터
 * @returns 생성된 Depot 객체
 */
export const createDepotFromRawStorageData = (rawData: string): Depot => {
  const parsedData = JSON.parse(rawData) as unknown;

  if (isPersistedDepot(parsedData)) {
    return createDepotFromStorageData(parsedData);
  }

  return createDepotFromLegacyStorageData(parsedData);
};
