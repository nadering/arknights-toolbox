export type OperatorExclusion = {
  charId: string;
  reason: string;
};

/**
 * character_table 구조상 오퍼레이터처럼 보이지만
 * 실제 앱 데이터에 포함하면 안 되는 캐릭터를 수동으로 제외합니다.
 */
export const operatorExclusionList: OperatorExclusion[] = [];
