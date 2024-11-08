// 재료 타입 및 인터페이스

/** 재료 타입 */
export type MaterialType =
  | "Upgrade"
  | "Battle-Record"
  | "Skill-Summary"
  | "Memory-Chip"
  | "Module"
  | "LMD";

export type TierType = 1 | 2 | 3 | 4 | 5;

/** 재료 인터페이스 */
export default interface Material {
  /** 재료 아이디 속성으로, MAA나 Arkntools 같은 외부 도구/사이트에서 사용되는 아이디를 그대로 사용 */
  id: string;
  /** 재료 이름 */
  name: string;
  /** 이미지 파일 이름 */
  imageFilename: string;
  /** 재료 타입 */
  type: MaterialType;
  /** 재료 티어로, 1티어 ~ 6티어까지 있으며 숫자가 클 수록 높은 티어를 의미함 */
  tier: TierType;
  /** 아이템 메인 설명 */
  description?: string;
  /** 아이템 부가 설명 (게임 내에서 이탤릭체로 작성되어 있음) */
  subDescription?: string;
  /**
   * 제작될 때 몇 개 제작되는지 나타내는 속성으로, 
   * 해당 속성이 없다면 기본적으로 1개 제작되며, 있다면 해당 개수만큼 제작됨
   */
  craftingUnit?: number;
  /** 가공소 및 제작소에서 제작할 때 필요한 하위 재료 */
  recipe?: CountableMaterial[];
}

/** 특정 재료의 수량을 나타내는 인터페이스 */
export interface CountableMaterial {
  /** 특정 재료 */
  material: Material;
  /** 재료의 수량 */
  count: number;
}
