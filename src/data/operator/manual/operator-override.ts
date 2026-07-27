export type SkillIndex = 0 | 1 | 2;

export type OperatorGrowthType = "normal" | "roguelike";

export type OperatorOverride = {
  /** 인게임 character_table.json의 char key */
  charId: string;

  /** 기존 number id. localStorage / Firestore migration용 */
  legacyId?: number;

  /** 검색/별명용 */
  nicknameList?: string[];

  /** 0 = 1스킬, 1 = 2스킬, 2 = 3스킬 */
  preferSkillIndexes?: SkillIndex[];

  /** 추천 모듈은 moduleIndex가 아니라 type 기반으로 보관 */
  preferModules?: {
    type: string;
    level: 1 | 2 | 3;
  }[];

  /** future 오퍼레이터 이름 번역 보정 */
  translatedName?: string;

  /** key는 skillId 권장 */
  translatedSkillNames?: Record<string, string>;

  /** key는 module type 권장 */
  translatedModuleNames?: Record<string, string>;

  /** 로그라이크 특수 오퍼레이터 등 일반 육성과 다른 경우 */
  growthType?: OperatorGrowthType;
};

export const operatorOverrideList: OperatorOverride[] = [];
