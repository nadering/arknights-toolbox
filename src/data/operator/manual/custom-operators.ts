import {
  CountableMaterial,
  LMD,
  RMA7024,
  aketon,
  bipolarNanoflake,
  casterChip,
  casterDualchip,
  coagulatingGel,
  crystallineCircuit,
  crystallineElectronicUnit,
  cuttingFluidSolution,
  damagedDevice,
  device,
  fuscousFiber,
  incandescentAlloyBlock,
  integratedDevice,
  ketonColloid,
  loxicKohl,
  manganeseTrihydrate,
  optimizedDevice,
  orirockConcentration,
  orirockCube,
  oriron,
  polyesterPack,
  polymerizationPreparation,
  polymerizedGel,
  refinedSolvent,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  sugar,
  sugarPack,
  transmutedSaltAgglomerate,
  whiteHorseKohl,
} from "@/data/material";
import { OperatorClass } from "../operator";

type SkillIndex = 0 | 1 | 2;

type Server = "global" | "future";

type EliteMaterials = {
  "0": CountableMaterial[];
  "1": CountableMaterial[];
  "2": CountableMaterial[];
};

type SkillUpgradeMaterials = {
  common: Record<string, CountableMaterial[]>;
  [skillName: string]: Record<string, CountableMaterial[]>;
};

type ModuleInfo = {
  type: string;
  name: string;
};

type ModuleMaterials = Record<
  string,
  Record<"1" | "2" | "3", CountableMaterial[]>
>;

export type CustomOperator = {
  /** 앱 내부에서만 사용하는 수동 오퍼레이터 ID입니다. */
  id: string;

  /** 기존 number id. localStorage / Firestore migration용입니다. */
  legacyId?: number;

  name: string;
  nicknameList?: string[];

  imageFilename: string;

  class: OperatorClass;
  rarity: 1 | 2 | 3 | 4 | 5 | 6;

  /** character_table에서 자동 생성되지 않는 수동 오퍼레이터인지 구분합니다. */
  isCustomOperator: true;

  /**
   * 현재 서버 기준입니다.
   *
   * 글로벌에 아직 없으면 future,
   * 글로벌에 들어오면 global로 바꿔주세요.
   */
  server: Server;

  eliteMaterials: EliteMaterials;

  skillList: string[];
  preferSkillIndexes?: SkillIndex[];
  skillUpgradeMaterials: SkillUpgradeMaterials;

  moduleList: ModuleInfo[];
  moduleMaterials: ModuleMaterials | null;
};

export const AmiyaGuard: CustomOperator = {
  id: "char_1001_amiya2",
  legacyId: 75.1,

  name: "아미야 (가드)",

  imageFilename: "amiya-guard",

  class: "Guard",
  rarity: 5,

  isCustomOperator: true,
  server: "global",

  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: casterChip,
        count: 3,
      },
      {
        material: device,
        count: 4,
      },
      {
        material: oriron,
        count: 4,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: casterDualchip,
        count: 3,
      },
      {
        material: orirockConcentration,
        count: 10,
      },
      {
        material: loxicKohl,
        count: 10,
      },
    ],
  },

  skillList: ["영소·분야", "영소·절영"],

  skillUpgradeMaterials: {
    common: {
      "2": [
        {
          material: skillSummary1,
          count: 4,
        },
      ],
      "3": [
        {
          material: skillSummary1,
          count: 4,
        },
        {
          material: damagedDevice,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: orirockCube,
          count: 4,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: sugar,
          count: 5,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: aketon,
          count: 4,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: integratedDevice,
          count: 2,
        },
        {
          material: sugarPack,
          count: 3,
        },
      ],
    },
    "영소·분야": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: crystallineCircuit,
          count: 4,
        },
        {
          material: coagulatingGel,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: incandescentAlloyBlock,
          count: 4,
        },
        {
          material: RMA7024,
          count: 5,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: crystallineElectronicUnit,
          count: 4,
        },
        {
          material: whiteHorseKohl,
          count: 4,
        },
      ],
    },
    "영소·절영": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: ketonColloid,
          count: 4,
        },
        {
          material: coagulatingGel,
          count: 4,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: crystallineCircuit,
          count: 4,
        },
        {
          material: polymerizedGel,
          count: 5,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: crystallineElectronicUnit,
          count: 4,
        },
        {
          material: optimizedDevice,
          count: 4,
        },
      ],
    },
  },

  moduleList: [],
  moduleMaterials: null,
};

export const AmiyaMedic: CustomOperator = {
  id: "char_1037_amiya3",
  legacyId: 75.2,

  name: "아미야 (메딕)",
  nicknameList: ["힐미야", "힐당끼"],

  imageFilename: "amiya-medic",

  class: "Medic",
  rarity: 5,

  isCustomOperator: true,
  server: "global",

  eliteMaterials: {
    "0": [],
    "1": [
      {
        material: LMD,
        count: 20000,
      },
      {
        material: casterChip!,
        count: 3,
      },
      {
        material: device,
        count: 4,
      },
      {
        material: oriron,
        count: 4,
      },
    ],
    "2": [
      {
        material: LMD,
        count: 120000,
      },
      {
        material: casterDualchip,
        count: 3,
      },
      {
        material: orirockConcentration,
        count: 10,
      },
      {
        material: loxicKohl,
        count: 10,
      },
    ],
  },

  skillList: ["슬픔의 공감", "자비의 비전"],
  preferSkillIndexes: [1],

  skillUpgradeMaterials: {
    common: {
      "2": [
        {
          material: skillSummary1,
          count: 4,
        },
      ],
      "3": [
        {
          material: skillSummary1,
          count: 4,
        },
        {
          material: damagedDevice,
          count: 4,
        },
      ],
      "4": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: orirockCube,
          count: 4,
        },
      ],
      "5": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: sugar,
          count: 5,
        },
      ],
      "6": [
        {
          material: skillSummary2,
          count: 6,
        },
        {
          material: aketon,
          count: 4,
        },
      ],
      "7": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: integratedDevice,
          count: 2,
        },
        {
          material: sugarPack,
          count: 3,
        },
      ],
    },
    "슬픔의 공감": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: crystallineCircuit,
          count: 3,
        },
        {
          material: fuscousFiber,
          count: 1,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: transmutedSaltAgglomerate,
          count: 3,
        },
        {
          material: manganeseTrihydrate,
          count: 5,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: polymerizationPreparation,
          count: 4,
        },
        {
          material: cuttingFluidSolution,
          count: 4,
        },
      ],
    },
    "자비의 비전": {
      "8": [
        {
          material: skillSummary3,
          count: 5,
        },
        {
          material: whiteHorseKohl,
          count: 3,
        },
        {
          material: polyesterPack,
          count: 6,
        },
      ],
      "9": [
        {
          material: skillSummary3,
          count: 6,
        },
        {
          material: refinedSolvent,
          count: 3,
        },
        {
          material: crystallineCircuit,
          count: 5,
        },
      ],
      "10": [
        {
          material: skillSummary3,
          count: 10,
        },
        {
          material: bipolarNanoflake,
          count: 4,
        },
        {
          material: incandescentAlloyBlock,
          count: 4,
        },
      ],
    },
  },

  moduleList: [],
  moduleMaterials: null,
};

/**
 * 인게임 JSON 파일에서 찾을 수 없는 오퍼레이터의 목록으로,
 * 자동화가 불가능하여 수동으로 관리해야 합니다.
 */
export const customOperatorList: CustomOperator[] = [AmiyaGuard, AmiyaMedic];
