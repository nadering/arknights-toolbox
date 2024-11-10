import {
  ester,
  LMD,
  oriron,
  polyesterPack,
  polyketon,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  sugarPack,
} from "../material";
import Operator from "./operator";

// 메딕

/** 메딕 세부 직군 */
export type MedicBranch =
  | "Medic" // 메딕
  | "Multi-target" // 멀티 타겟 메딕
  | "Therapist" // 테라피스트
  | "Wandering" // 방랑 메딕
  | "Incantation" // 주술 메딕
  | "Chain"; // 체인 메딕

/** 메딕 오퍼레이터 */
export interface Medic extends Operator {
  /** 세부 직군 */
  branch: MedicBranch;
}

// 3성
/** 히비스커스 */
export const Hibiscus: Medic = {
  id: 22,
  name: "히비스커스",
  imageFilename: "hibiscus",
  class: "Medic",
  branch: "Medic",
  rarity: 3,
  eliteMaterials: {
    0: [],
    1: [{ material: LMD, count: 10000 }],
    2: [],
  },
  skillList: ["치료 강화α"],
  preferSkillList: ["치료 강화α"],
  skillUpgradeMaterials: {
    common: {
      2: [{ material: skillSummary1, count: 1 }],
      3: [
        { material: skillSummary1, count: 2 },
        { material: ester, count: 1 },
      ],
      4: [
        { material: skillSummary2, count: 1 },
        { material: oriron, count: 1 },
      ],
      5: [
        { material: skillSummary2, count: 1 },
        { material: polyketon, count: 2 },
      ],
      6: [
        { material: skillSummary2, count: 1 },
        { material: sugarPack, count: 2 },
      ],
      7: [
        { material: skillSummary3, count: 2 },
        { material: polyesterPack, count: 2 },
      ],
    },
  },
  moduleList: [],
  moduleMaterials: null,
};

/** 메딕 오퍼레이터 리스트 */
export const medicList: Medic[] = [Hibiscus];
