const MODULE_TYPE_NAME_PART_MAP: Record<string, string> = {
  A: "α",
  ALPHA: "α",
  Α: "α",
  α: "α",

  B: "β",
  BETA: "β",
  Β: "β",
  β: "β",

  G: "γ",
  GAMMA: "γ",
  Γ: "γ",
  γ: "γ",

  D: "Δ",
  DELTA: "Δ",
  Δ: "Δ",
  δ: "Δ",
};

export const normalizeModuleTypeNamePart = (value: string) => {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return "";
  }

  return (
    MODULE_TYPE_NAME_PART_MAP[trimmedValue] ??
    MODULE_TYPE_NAME_PART_MAP[trimmedValue.toUpperCase()] ??
    trimmedValue
  );
};

export const createCanonicalModuleType = (value: string) => {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return "";
  }

  const typePartList = trimmedValue.split("-");

  if (typePartList.length <= 1) {
    return normalizeModuleTypeNamePart(trimmedValue);
  }

  const prefix = typePartList.slice(0, -1).join("-");
  const suffix = typePartList[typePartList.length - 1];

  return `${prefix}-${normalizeModuleTypeNamePart(suffix)}`;
};

export const createModuleTypeFromParts = (
  typeName1: string,
  typeName2: string,
  fallbackType: string,
) => {
  const normalizedTypeName1 = typeName1.trim();
  const normalizedTypeName2 = normalizeModuleTypeNamePart(typeName2);

  if (normalizedTypeName1 !== "" && normalizedTypeName2 !== "") {
    return `${normalizedTypeName1}-${normalizedTypeName2}`;
  }

  return createCanonicalModuleType(fallbackType);
};

export const normalizeModuleTypeForCompare = (value: string) => {
  return createCanonicalModuleType(value)
    .replace(/[\s_-]+/g, "")
    .toLowerCase();
};
