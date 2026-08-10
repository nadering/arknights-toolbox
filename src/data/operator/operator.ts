// 오퍼레이터 인터페이스 및 오퍼레이터 관련 설정
import {
  MaterialsWithElite,
  MaterialsWithNumberAndName,
  ModuleInfo,
  PreferModuleInfo as LegacyPreferModuleInfo,
  RarityNumber,
} from "./table";
import {
  type OperatorReleaseCategory,
  type Server,
} from "./manual/operator-release-types";

/** 오퍼레이터 포지션(클래스) 리스트 */
export const OperatorClassList = [
  "Vanguard",
  "Guard",
  "Defender",
  "Sniper",
  "Caster",
  "Medic",
  "Supporter",
  "Specialist",
] as const;

/** 오퍼레이터 포지션(클래스) */
export type OperatorClass = (typeof OperatorClassList)[number];

/** 오퍼레이터 육성 타입 */
export type OperatorGrowthType = "normal" | "roguelike";

/** 추천 스킬 인덱스 */
export type SkillIndex = 0 | 1 | 2;

/** 추천 모듈 정보 */
export type OperatorPreferModuleInfo = {
  type: string;
  level: 1 | 2 | 3;
};

/** 오퍼레이터 출시 정보 */
export type OperatorReleaseInfo = {
  eventId: string;
  eventName: string;
  category: OperatorReleaseCategory;
  order: number;
};

/** 오퍼레이터 인터페이스 */
export default interface Operator {
  /** 인게임 character id */
  id: string;

  /** 기존 number id. 저장 데이터 migration용 */
  legacyId?: number;

  /** 이름 */
  name: string;

  /** 별명 목록 */
  nicknameList?: string[];

  /** 이미지 파일 이름 */
  imageFilename?: string;

  /** 포지션 */
  class: OperatorClass;

  /** 레어도 (1성 ~ 6성) */
  rarity: RarityNumber;

  /** 일반 육성 / 로그라이크 특수 육성 */
  growthType?: OperatorGrowthType;

  /** global / future */
  server?: Server;

  /** 출시 정보 */
  releaseInfo?: OperatorReleaseInfo;

  /** 정예화 필요 재료 */
  eliteMaterials: MaterialsWithElite;

  /** 스킬 목록 */
  skillList: string[];

  /** 추천 스킬 인덱스 */
  preferSkillIndexes?: SkillIndex[];

  /** 기존 추천 스킬명 기반 필드. generated 전환 후 제거 예정 */
  preferSkillList?: string[];

  /** 스킬 업그레이드 재료 */
  skillUpgradeMaterials: MaterialsWithNumberAndName;

  /** 모듈 목록 */
  moduleList: ModuleInfo[];

  /** 추천 모듈 */
  preferModules?: OperatorPreferModuleInfo[];

  /** 기존 추천 모듈 필드. generated 전환 후 제거 예정 */
  preferModuleList?: LegacyPreferModuleInfo[];

  /** 모듈 업그레이드 재료 */
  moduleMaterials: MaterialsWithNumberAndName | null;
}

/** 기존 수동 오퍼레이터 데이터 보존용 타입 */
export type LegacyOperator = Omit<
  Operator,
  | "id"
  | "legacyId"
  | "growthType"
  | "server"
  | "releaseInfo"
  | "preferSkillIndexes"
  | "preferModules"
> & {
  /** 기존 출시순 number id */
  id: number;

  /** 기존 추천 스킬명 기반 필드 */
  preferSkillList?: string[];

  /** 기존 추천 모듈 필드 */
  preferModuleList?: LegacyPreferModuleInfo[];
};