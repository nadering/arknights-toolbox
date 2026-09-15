// 오퍼레이터 이름 및 별명 검색 공통 로직

import { type Operator } from "@/data/operator";

/**
 * 기존 오퍼레이터 검색창과 동일한 기준으로 검색 결과를 판정합니다.
 *
 * - 이름 완전 일치 여부 반환
 * - 이름 부분 일치
 * - 별명 부분 일치 및 일치한 별명 반환
 */
export const getOperatorSearchMatch = (
  operator: Operator,
  searchText: string,
) => {
  const lowerSearchText = searchText.trim().toLowerCase();

  if (!lowerSearchText) {
    return null;
  }

  const firstSearchCharacter = lowerSearchText.at(0) ?? "";
  const lowerOperatorName = operator.name.toLowerCase();

  if (lowerOperatorName === lowerSearchText) {
    return {
      exactName: true,
      matchedNickname: undefined,
    };
  }

  if (
    lowerOperatorName.startsWith(firstSearchCharacter) &&
    lowerOperatorName.includes(lowerSearchText)
  ) {
    return {
      exactName: false,
      matchedNickname: undefined,
    };
  }

  const matchedNickname = operator.nicknameList?.find((nickname) => {
    const lowerNickname = nickname.toLowerCase();

    return (
      lowerNickname.startsWith(firstSearchCharacter) &&
      lowerNickname.includes(lowerSearchText)
    );
  });

  if (!matchedNickname) {
    return null;
  }

  return {
    exactName: false,
    matchedNickname,
  };
};
