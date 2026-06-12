/** 저장 시간을 형식화하는 함수 */
export const formatSavedAt = (value: unknown) => {
  if (value === null || value === undefined) {
    return "기록 없음";
  }

  if (typeof value === "string") {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "기록 없음";
    }

    return date.toLocaleString();
  }

  if (
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate().toLocaleString();
  }

  return "기록 없음";
};
