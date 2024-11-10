import { atom } from "jotai";
import {
  EliteNumber,
  MaterialsWithNumber,
  MaterialsWithNumberAndName,
  ModuleLevel,
  Operator,
  SkillLevel,
} from "@/data/operator";

/** 오퍼레이터 목표치 */
export interface OperatorTarget {
  // 정예화
  elite: EliteNumber;
  targetElite: EliteNumber;

  /** 스킬 마스터리 현재 레벨 및 목표 레벨 */
  skillLevels: SkillLevel[];

  /** 모듈 현재 레벨 및 목표 레벨 */
  moduleLevels: ModuleLevel[];
}

/** 오퍼레이터 육성 재료 */
export interface OperatorMaterial {
  /** 오퍼레이터 아이디 */
  id: number;

  /** 오퍼레이터 목표치 */
  target: OperatorTarget;

  /** 정예화 재료 */
  eliteMaterials: MaterialsWithNumber;

  /** 스킬 마스터리 재료 */
  skillUpgradeMaterials: MaterialsWithNumberAndName;

  /** 모듈 재료 */
  moduleMaterials: MaterialsWithNumberAndName | null;
}

/** 사용자가 선택한 오퍼레이터 목록 */
export const selectedOperatorsAtom = atom<Operator[]>([]);
export const selectedOperatorsMaterialAtom = atom<OperatorMaterial[]>([]);
