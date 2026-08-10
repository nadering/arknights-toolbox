/**
 * 이전 Record와 현재 Record를 비교해서 현재에 새로 추가된 key만 반환합니다.
 */
export const getAddedKeys = <TValue>(
  previousRecord: Record<string, TValue>,
  currentRecord: Record<string, TValue>,
) => {
  return Object.keys(currentRecord).filter((key) => {
    return previousRecord[key] === undefined;
  });
};

export const parseJsonOrNull = <TValue>(rawJson: string | null) => {
  if (rawJson === null) {
    return null;
  }

  try {
    return JSON.parse(rawJson) as TValue;
  } catch {
    return null;
  }
};
