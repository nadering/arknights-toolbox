import { atom } from "jotai";
import {
  EliteNumber,
  MaterialsWithNumber,
  MaterialsWithNumberAndName,
  ModuleLevel,
  RarityNumber,
  SkillLevel,
} from "@/data/operator";

/** 오퍼레이터 목표치 */
export interface OperatorTarget {
  // 정예화
  currentElite: EliteNumber;
  targetElite: EliteNumber;

  // 레벨
  currentLevel: number;
  targetLevel: number;

  /** 스킬 마스터리 현재 레벨 및 목표 레벨 */
  skillLevels: SkillLevel[];

  /** 모듈 현재 레벨 및 목표 레벨 */
  moduleLevels: ModuleLevel[];
}

/** 오퍼레이터 육성 재료 */
export interface OperatorMaterial {
  /** 오퍼레이터 아이디 */
  id: number;

  /** 오퍼레이터 레어도 */
  rarity: RarityNumber;

  /** 오퍼레이터 목표치 */
  target: OperatorTarget;

  /** 정예화 재료 */
  eliteMaterials?: MaterialsWithNumber;

  /** 스킬 마스터리 재료 */
  skillUpgradeMaterials?: MaterialsWithNumberAndName;

  /** 모듈 재료 */
  moduleMaterials?: MaterialsWithNumberAndName | null;
}

/** 사용자가 선택한 오퍼레이터 목록을 저장하는 아톰 */
export const selectedOperatorsAtom = atom<number[]>([]);

/** 사용자가 선택한 오퍼레이터의 육성 재화 목록을 저장하는 아톰 */
export const selectedOperatorsMaterialAtom = atom<OperatorMaterial[]>([]);
