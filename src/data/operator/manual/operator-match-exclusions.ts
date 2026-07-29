export type OperatorMatchExclusion = {
  legacyId: number;
  reason: string;
};

/**
 * character_table에 없어서 매칭되지 않지만,
 * 실제 앱 데이터에 포함되어야 하는 캐릭터를 수동으로 넣습니다.
 */
export const operatorMatchExclusionList: OperatorMatchExclusion[] = [
  {
    legacyId: 75.2,
    reason: "multi-form operator manually managed: amiya-medic",
  },
];