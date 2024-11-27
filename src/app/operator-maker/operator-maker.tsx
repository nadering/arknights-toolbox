"use client";

import { FormEvent, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import {
  casterChip,
  casterChipPack,
  casterDualchip,
  CountableMaterial,
  dataSupplementInstrument,
  dataSupplementStick,
  defenderChip,
  defenderChipPack,
  defenderDualchip,
  guardChip,
  guardChipPack,
  guardDualchip,
  LMD,
  Material,
  materialNames,
  medicChip,
  medicChipPack,
  medicDualchip,
  moduleDataBlock,
  skillSummary1,
  skillSummary2,
  skillSummary3,
  sniperChip,
  sniperChipPack,
  sniperDualchip,
  specialistChip,
  specialistChipPack,
  specialistDualchip,
  supporterChip,
  supporterChipPack,
  supporterDualchip,
  vanguardChip,
  vanguardChipPack,
  vanguardDualchip,
} from "@/data/material";
import {
  ELITE_ONE_CHIP_TABLE,
  ELITE_ONE_LMD_TABLE,
  ELITE_ONE_MATERIAL_TABLE,
  ELITE_TWO_CHIP_TABLE,
  ELITE_TWO_LMD_TABLE,
  ELITE_TWO_MATERIAL_TABLE,
  EliteNumber,
  MaterialsWithNumberAndName,
  MAX_ELITE_TABLE,
  MODULE_ACTIVE_ELITE,
  Operator,
  OperatorClass,
  OperatorClassList,
  RarityNumber,
  RarityNumberList,
  SKILL_COUNT_TABLE,
  SKILL_MAX_LEVEL_TABLE,
} from "@/data/operator";
import { handleExponentialNotation } from "@/tool";
import SelectableMaterial from "./selectable-material";
import ModuleTextInput from "./module-text-input";
import ToastPopup from "./toast-popup";

/** 공백 컴포넌트 */
const EmptySpace = () => {
  return <div className="h-6"></div>;
};

// 업그레이드 재료 관련
// 1줄
type CountableMaterialList = (CountableMaterial | null)[];

// 여러 줄
type CountableMaterialMultipleList = CountableMaterialList[];

/** 오퍼레이터 데이터 제작 컴포넌트 */
export default function OperatorMaker() {
  // 아이디
  const [id, setId] = useState("0");

  // 이름
  const [name, setName] = useState("");

  // 영어 이름
  const [englishName, setEnglishName] = useState("");

  // 레어도
  const [rarity, setRarity] = useState<RarityNumber>();

  // 포지션
  const [operatorClass, setOperatorClass] = useState<OperatorClass>();

  /*
  // 세부 직군
  const [operatorBranch, setOperatorBranch] = useState("");
  */

  // 최대 정예화
  const [maxElite, setMaxElite] = useState<EliteNumber>();

  // 1정예화 재료
  const [eliteOneMaterial, setEliteOneMaterial] =
    useState<CountableMaterialList>([null, null, null, null]);

  // 2정예화 재료
  const [eliteTwoMaterial, setEliteTwoMaterial] =
    useState<CountableMaterialList>([null, null, null, null]);

  // 스킬 개수 및 최대 레벨
  const [skillCount, setSkillCount] = useState<number>();
  const [skillMaxLevel, setSkillMaxLevel] = useState<number>();

  // 스킬 이름
  const [skillOneName, setSkillOneName] = useState("");
  const [skillTwoName, setSkillTwoName] = useState("");
  const [skillThreeName, setSkillThreeName] = useState("");

  // 스킬 재료 (공통)
  const [commonSkillMaterial, setCommonSkillMaterial] =
    useState<CountableMaterialMultipleList>([
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);

  // 스킬 재료 (8레벨 이후)
  const [skillMasteryMaterial, setSkillMasteryMaterial] = useState<
    CountableMaterialMultipleList[]
  >([
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  ]);

  // 모듈
  const [moduleCount, setModuleCount] = useState("0");

  // 모듈 타입 및 이름
  const [moduleNameList, setModuleNameList] = useState<string[][]>([]);

  // 모듈 재료
  const [moduleMaterial, setModuleMaterial] = useState<
    CountableMaterialMultipleList[]
  >([]);

  // 토스트 팝업
  const [toastPopupActive, setToastPopupActive] = useState(false);

  /** 숫자로 된 문자열 설정 */
  const handleNumberStringValue = (
    event: FormEvent<HTMLInputElement>,
    setter: (value: SetStateAction<string>) => void
  ) => {
    let value = event.currentTarget.value;

    // 0으로 시작하고 문자열 길이가 1을 초과한다면 (00, 01 등), 가장 왼쪽의 0을 제거함
    const startsWithZeroPattern = /^0+/;
    if (value.length > 1) {
      value = value.replace(startsWithZeroPattern, "");
    }

    // 문자열의 길이가 0이라면, 0으로 재설정
    if (value.length == 0) {
      value = "0";
    }

    // 그 후, 아이디 문자열을 설정
    setter(value);
  };

  /** 1차 정예화 재료 변화를 반영 */
  const handleEliteOneMaterialChange = (
    index: number,
    material: Material,
    count: number
  ) => {
    const prev = eliteOneMaterial;
    prev[index] = { material, count };

    setEliteOneMaterial([...prev]);
  };

  /** 2차 정예화 재료 변화를 반영 */
  const handleEliteTwoMaterialChange = (
    index: number,
    material: Material,
    count: number
  ) => {
    const prev = eliteTwoMaterial;
    prev[index] = { material, count };

    setEliteTwoMaterial([...prev]);
  };

  /** 공통 스킬 재료 목록을 생성 및 반환 */
  const makeCommonSkillMaterialList = () => {
    const result = [];

    for (let level = 0; level < 6; level++) {
      result.push(
        <div
          className="flex flex-row items-center justify-between gap-2"
          key={`skill-common-${level}`}
        >
          <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
            공통 {level + 2}레벨
          </p>
          <div className="w-full flex flex-row flex-wrap gap-2">
            {Array.from(Array(3), (_, slot) => {
              switch (slot) {
                // 스킬개론
                case 0:
                  let defaultMaterial;
                  switch (level + 2) {
                    // 2레벨 ~ 3레벨 = 제1권
                    case 2:
                    case 3:
                      defaultMaterial = skillSummary1;
                      break;
                    // 4레벨 ~ 6레벨 = 제2권
                    case 4:
                    case 5:
                    case 6:
                      defaultMaterial = skillSummary2;
                      break;
                    // 7레벨 = 제3권
                    case 7:
                      defaultMaterial = skillSummary3;
                      break;
                  }

                  return (
                    <SelectableMaterial
                      key={`skill-common-${level}-${slot}`}
                      keyString={`skill-common-${level}-${slot}`}
                      defaultMaterial={defaultMaterial}
                      id={slot}
                      listId={level}
                      handleChange={handleCommonSkillMaterialChange}
                      skillSummary
                    />
                  );
                // 스킬개론 제외한 재료
                case 1:
                case 2:
                  switch (level + 2) {
                    // 2레벨 ~ 3레벨 = 1티어
                    case 2:
                    case 3:
                      return (
                        <SelectableMaterial
                          key={`skill-common-${level}-${slot}`}
                          keyString={`skill-common-${level}-${slot}`}
                          id={slot}
                          listId={level}
                          handleChange={handleCommonSkillMaterialChange}
                          T1
                        />
                      );
                    // 4레벨 ~ 5레벨 = 2티어
                    case 4:
                    case 5:
                      return (
                        <SelectableMaterial
                          key={`skill-common-${level}-${slot}`}
                          keyString={`skill-common-${level}-${slot}`}
                          id={slot}
                          listId={level}
                          handleChange={handleCommonSkillMaterialChange}
                          T2
                        />
                      );
                    // 6레벨 ~ 7레벨 = 3티어
                    case 6:
                    case 7:
                      return (
                        <SelectableMaterial
                          key={`skill-common-${level}-${slot}`}
                          keyString={`skill-common-${level}-${slot}`}
                          id={slot}
                          listId={level}
                          handleChange={handleCommonSkillMaterialChange}
                          T3
                        />
                      );
                    default:
                      return (
                        <SelectableMaterial
                          key={`skill-common-${level}-${slot}`}
                          keyString={`skill-common-${level}-${slot}`}
                          id={slot}
                          listId={level}
                          handleChange={handleCommonSkillMaterialChange}
                          T1
                          T2
                          T3
                        />
                      );
                  }
              }
            })}
          </div>
        </div>
      );
    }

    return result;
  };

  /** 7레벨 이후 각각의 스킬 재료 목록을 생성 및 반환 */
  const makeSkillMaterialList = (skillNum: number) => {
    const result = [];

    // 8레벨 ~ 10레벨 구간의 스킬을 생성
    for (let level = 0; level < skillMaxLevel! - 7; level++) {
      result.push(
        <div
          className="flex flex-row items-center justify-between gap-2"
          key={`skill-${skillNum}-${level}`}
        >
          <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
            {skillNum}스킬 {level + 8}레벨
          </p>
          <div className="w-full flex flex-row flex-wrap gap-2">
            {Array.from(Array(3), (_, slot) => {
              // 각각의 스킬 레벨을 올릴 때마다 필요한 재료 설정
              switch (slot) {
                // 스킬개론
                case 0:
                  return (
                    <SelectableMaterial
                      key={`skill-${skillNum}-${level}-${slot}`}
                      keyString={`skill-${skillNum}-${level}-${slot}`}
                      defaultMaterial={skillSummary3}
                      id={slot}
                      listId={level}
                      itemId={skillNum - 1}
                      handleChange={handleSkillMasteryMaterialChange}
                      skillSummary
                    />
                  );
                // 스킬의 레벨에 따라 사용되는 재료 티어가 설정됨
                case 1:
                  switch (level + 8) {
                    // 8레벨 ~ 9레벨 구간의 첫 번째 칸 = 4티어
                    case 8:
                    case 9:
                      return (
                        <SelectableMaterial
                          key={`skill-${skillNum}-${level}-${slot}`}
                          keyString={`skill-${skillNum}-${level}-${slot}`}
                          id={slot}
                          listId={level}
                          itemId={skillNum - 1}
                          handleChange={handleSkillMasteryMaterialChange}
                          T4
                        />
                      );
                    // 10레벨 구간의 첫 번째 칸 = 5티어
                    case 10:
                      return (
                        <SelectableMaterial
                          key={`skill-${skillNum}-${level}-${slot}`}
                          keyString={`skill-${skillNum}-${level}-${slot}`}
                          id={slot}
                          listId={level}
                          itemId={skillNum - 1}
                          handleChange={handleSkillMasteryMaterialChange}
                          T5
                        />
                      );
                  }
                case 2:
                  switch (level + 8) {
                    // 8레벨 구간의 두 번째 칸 = 3티어
                    case 8:
                      return (
                        <SelectableMaterial
                          key={`skill-${skillNum}-${level}-${slot}`}
                          keyString={`skill-${skillNum}-${level}-${slot}`}
                          id={slot}
                          listId={level}
                          itemId={skillNum - 1}
                          handleChange={handleSkillMasteryMaterialChange}
                          T3
                        />
                      );
                    // 9 ~ 10레벨 구간의 두 번째 칸 = 4티어
                    case 9:
                    case 10:
                      return (
                        <SelectableMaterial
                          key={`skill-${skillNum}-${level}-${slot}`}
                          keyString={`skill-${skillNum}-${level}-${slot}`}
                          id={slot}
                          listId={level}
                          itemId={skillNum - 1}
                          handleChange={handleSkillMasteryMaterialChange}
                          T4
                        />
                      );
                    default:
                      return (
                        <SelectableMaterial
                          key={`skill-${skillNum}-${level}-${slot}`}
                          keyString={`skill-${skillNum}-${level}-${slot}`}
                          id={slot}
                          listId={level}
                          itemId={skillNum - 1}
                          handleChange={handleSkillMasteryMaterialChange}
                          T3
                          T4
                        />
                      );
                  }
              }
            })}
          </div>
        </div>
      );
    }

    return result;
  };

  /** 공통 스킬 업그레이드 재료 변화를 반영 */
  const handleCommonSkillMaterialChange = (
    index: number,
    material: Material,
    count: number,
    listIndex?: number
  ) => {
    const prev = commonSkillMaterial[listIndex!];
    prev[index] = { material, count } as CountableMaterial;

    setCommonSkillMaterial([...commonSkillMaterial]);
  };

  /** 7레벨 이후의 스킬 업그레이드 재료 변화를 반영 */
  const handleSkillMasteryMaterialChange = (
    index: number,
    material: Material,
    count: number,
    listIndex?: number,
    itemIndex?: number
  ) => {
    const prev = skillMasteryMaterial[itemIndex!][listIndex!];
    prev[index] = { material, count } as CountableMaterial;

    setSkillMasteryMaterial([...skillMasteryMaterial]);
  };

  /** 모듈 타입 및 이름 변경을 반영 */
  const handleModuleTextChange = (
    text: string,
    itemIndex: number,
    index: number
  ) => {
    // 타입 및 이름 변경
    moduleNameList[itemIndex][index] = text;
    setModuleNameList([...moduleNameList]);
  };

  /** 모듈 재료 목록을 생성 및 반환 */
  const makeModuleList = (moduleNum: number) => {
    const result = [];

    // 모듈 타입 및 이름 입력란을 생성
    result.push(
      <ModuleTextInput
        key={`module-text-${moduleNum}`}
        itemId={moduleNum}
        handleChange={handleModuleTextChange}
      />
    );

    // 모듈 업그레이드 1레벨 ~ 3레벨 구간을 생성
    for (let level = 0; level < moduleMaterial[moduleNum].length; level++) {
      result.push(
        <div
          className="flex flex-row items-center justify-between gap-2"
          key={`module-${moduleNum}-${level}`}
        >
          <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
            {moduleNum + 1}모듈 {level + 1}레벨
          </p>
          <div className="w-full flex flex-row flex-wrap gap-2">
            {Array.from(
              Array(moduleMaterial[moduleNum][level].length),
              (_, slot) => {
                // 각각의 모듈 레벨을 올릴 때마다 필요한 재료 설정
                switch (slot) {
                  // 1번째 칸: 모듈 데이터 칩
                  case 0:
                    return (
                      <SelectableMaterial
                        id={slot}
                        listId={level}
                        itemId={moduleNum}
                        handleChange={handleModuleMaterialChange}
                        key={`module-${moduleNum}-${level}-${slot}`}
                        keyString={`module-${moduleNum}-${level}-${slot}`}
                        defaultMaterial={moduleDataBlock}
                        module
                      />
                    );
                  // 2번째 칸
                  case 1:
                    switch (level + 1) {
                      // 1레벨 업그레이드 시 2번째 칸은 재료
                      case 1:
                        switch (rarity) {
                          case 6:
                            return (
                              <SelectableMaterial
                                id={slot}
                                listId={level}
                                itemId={moduleNum}
                                handleChange={handleModuleMaterialChange}
                                key={`module-${moduleNum}-${level}-${slot}`}
                                keyString={`module-${moduleNum}-${level}-${slot}`}
                                T5
                              />
                            );
                          case 5:
                            return (
                              <SelectableMaterial
                                id={slot}
                                listId={level}
                                itemId={moduleNum}
                                handleChange={handleModuleMaterialChange}
                                key={`module-${moduleNum}-${level}-${slot}`}
                                keyString={`module-${moduleNum}-${level}-${slot}`}
                                T4
                              />
                            );
                          case 4:
                            return (
                              <SelectableMaterial
                                id={slot}
                                listId={level}
                                itemId={moduleNum}
                                handleChange={handleModuleMaterialChange}
                                key={`module-${moduleNum}-${level}-${slot}`}
                                keyString={`module-${moduleNum}-${level}-${slot}`}
                                T3
                              />
                            );
                          default:
                            return (
                              <SelectableMaterial
                                id={slot}
                                listId={level}
                                itemId={moduleNum}
                                handleChange={handleModuleMaterialChange}
                                key={`module-${moduleNum}-${level}-${slot}`}
                                keyString={`module-${moduleNum}-${level}-${slot}`}
                                T5
                                T4
                                T3
                              />
                            );
                        }
                      // 2~3레벨 업그레이드 시 2번째 칸은 데이터 리더기, 데이터 메모리
                      case 2:
                        return (
                          <SelectableMaterial
                            id={slot}
                            listId={level}
                            itemId={moduleNum}
                            handleChange={handleModuleMaterialChange}
                            key={`module-${moduleNum}-${level}-${slot}`}
                            keyString={`module-${moduleNum}-${level}-${slot}`}
                            defaultMaterial={dataSupplementStick}
                            module
                          />
                        );
                      case 3:
                        return (
                          <SelectableMaterial
                            id={slot}
                            listId={level}
                            itemId={moduleNum}
                            handleChange={handleModuleMaterialChange}
                            key={`module-${moduleNum}-${level}-${slot}`}
                            keyString={`module-${moduleNum}-${level}-${slot}`}
                            defaultMaterial={dataSupplementInstrument}
                            module
                          />
                        );
                    }
                  // 3번째 칸
                  case 2:
                    switch (level + 1) {
                      // 1레벨 업그레이드 시 3번째 칸은 용문폐
                      case 1:
                        return (
                          <SelectableMaterial
                            id={slot}
                            listId={level}
                            itemId={moduleNum}
                            handleChange={handleModuleMaterialChange}
                            key={`module-${moduleNum}-${level}-${slot}`}
                            keyString={`module-${moduleNum}-${level}-${slot}`}
                            defaultMaterial={LMD}
                            lmd
                          />
                        );
                      // 2~3레벨 업그레이드 시 3번째 칸은 재료
                      case 2:
                      case 3:
                        switch (rarity) {
                          case 6:
                            return (
                              <SelectableMaterial
                                id={slot}
                                listId={level}
                                itemId={moduleNum}
                                handleChange={handleModuleMaterialChange}
                                key={`module-${moduleNum}-${level}-${slot}`}
                                keyString={`module-${moduleNum}-${level}-${slot}`}
                                T5
                              />
                            );
                          case 5:
                            return (
                              <SelectableMaterial
                                id={slot}
                                listId={level}
                                itemId={moduleNum}
                                handleChange={handleModuleMaterialChange}
                                key={`module-${moduleNum}-${level}-${slot}`}
                                keyString={`module-${moduleNum}-${level}-${slot}`}
                                T4
                              />
                            );
                          case 4:
                            return (
                              <SelectableMaterial
                                id={slot}
                                listId={level}
                                itemId={moduleNum}
                                handleChange={handleModuleMaterialChange}
                                key={`module-${moduleNum}-${level}-${slot}`}
                                keyString={`module-${moduleNum}-${level}-${slot}`}
                                T3
                              />
                            );
                          default:
                            return (
                              <SelectableMaterial
                                id={slot}
                                listId={level}
                                itemId={moduleNum}
                                handleChange={handleModuleMaterialChange}
                                key={`module-${moduleNum}-${level}-${slot}`}
                                keyString={`module-${moduleNum}-${level}-${slot}`}
                                T5
                                T4
                                T3
                              />
                            );
                        }
                    }
                  // 4번째 칸: 용문폐
                  case 3:
                    return (
                      <SelectableMaterial
                        id={slot}
                        listId={level}
                        itemId={moduleNum}
                        handleChange={handleModuleMaterialChange}
                        key={`module-${moduleNum}-${level}-${slot}`}
                        keyString={`module-${moduleNum}-${level}-${slot}`}
                        defaultMaterial={LMD}
                        lmd
                      />
                    );
                }
              }
            )}
          </div>
        </div>
      );
    }

    // 마지막에 공백 추가
    result.push(<EmptySpace key={`module-emptyspace-${moduleNum}`} />);

    return result;
  };

  /** 모듈 업그레이드 재료 변화를 반영 */
  const handleModuleMaterialChange = (
    index: number,
    material: Material,
    count: number,
    listIndex?: number,
    itemIndex?: number
  ) => {
    const prev = moduleMaterial[itemIndex!][listIndex!];
    prev[index] = { material, count } as CountableMaterial;

    setModuleMaterial([...moduleMaterial]);
  };

  /** JSON Stringify 과정에서 CountableMaterial 안의 Material 객체를 객체 이름으로 변환시키는 Replacer */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const replacer = (key: string, value: any): any => {
    // 속성에 material이 있다면, 해당 객체는 CountableMaterial이므로 객체 이름으로 전환
    if (value && typeof value === "object" && "material" in value) {
      const material = (value as CountableMaterial).material;
      const materialName = materialNames[material.objectName];

      return {
        material: materialName || "Unknown",
        count: value.count,
      };
    }
    return value;
  };

  /** 오퍼레이터 데이터 문자열 제작 */
  const makeOperatorData = () => {
    let operatorData: Operator;

    if (rarity && operatorClass) {
      // 모듈 재료
      let moduleMaterials: MaterialsWithNumberAndName | null;

      if (parseInt(moduleCount, 10) > 0) {
        moduleMaterials = {};

        // 모듈이 존재한다면 모듈을 추가
        for (let i = 0; i < moduleNameList.length; i++) {
          moduleMaterials[moduleNameList[i][0]] = {};
          for (let j = 0; j < moduleMaterial[i].length; j++) {
            moduleMaterials[moduleNameList[i][0]][j + 1] = moduleMaterial[i][
              j
            ].filter((material) => material != null);
          }
        }
      } else {
        moduleMaterials = null;
      }

      // 레어도에 따라 오퍼레이터 데이터를 생성
      if (rarity == 6) {
        operatorData = {
          id: parseInt(id, 10),
          name,
          imageFilename: englishName.toLowerCase().split(" ").join("-"),
          class: operatorClass,
          // 세부 직군 생략
          rarity,
          eliteMaterials: {
            0: [],
            1: eliteOneMaterial.filter((material) => material != null),
            2: eliteTwoMaterial.filter((material) => material != null),
          },
          skillList: [skillOneName, skillTwoName, skillThreeName],
          skillUpgradeMaterials: {
            common: {
              2: commonSkillMaterial[0].filter((material) => material != null),
              3: commonSkillMaterial[1].filter((material) => material != null),
              4: commonSkillMaterial[2].filter((material) => material != null),
              5: commonSkillMaterial[3].filter((material) => material != null),
              6: commonSkillMaterial[4].filter((material) => material != null),
              7: commonSkillMaterial[5].filter((material) => material != null),
            },
            [skillOneName]: {
              8: skillMasteryMaterial[0][0].filter(
                (material) => material != null
              ),
              9: skillMasteryMaterial[0][1].filter(
                (material) => material != null
              ),
              10: skillMasteryMaterial[0][2].filter(
                (material) => material != null
              ),
            },
            [skillTwoName]: {
              8: skillMasteryMaterial[1][0].filter(
                (material) => material != null
              ),
              9: skillMasteryMaterial[1][1].filter(
                (material) => material != null
              ),
              10: skillMasteryMaterial[1][2].filter(
                (material) => material != null
              ),
            },
            [skillThreeName]: {
              8: skillMasteryMaterial[2][0].filter(
                (material) => material != null
              ),
              9: skillMasteryMaterial[2][1].filter(
                (material) => material != null
              ),
              10: skillMasteryMaterial[2][2].filter(
                (material) => material != null
              ),
            },
          },
          moduleList: moduleNameList.map((moduleName) => {
            return { type: moduleName[0], name: moduleName[1] };
          }),
          moduleMaterials,
        };
      } else if (rarity == 5 || rarity == 4) {
        // 오퍼레이터 데이터를 생성
        operatorData = {
          id: parseInt(id, 10),
          name,
          imageFilename: englishName.toLowerCase().split(" ").join("-"),
          class: operatorClass,
          // 세부 직군 생략
          rarity,
          eliteMaterials: {
            0: [],
            1: eliteOneMaterial.filter((material) => material != null),
            2: eliteTwoMaterial.filter((material) => material != null),
          },
          skillList: [skillOneName, skillTwoName],
          skillUpgradeMaterials: {
            common: {
              2: commonSkillMaterial[0].filter((material) => material != null),
              3: commonSkillMaterial[1].filter((material) => material != null),
              4: commonSkillMaterial[2].filter((material) => material != null),
              5: commonSkillMaterial[3].filter((material) => material != null),
              6: commonSkillMaterial[4].filter((material) => material != null),
              7: commonSkillMaterial[5].filter((material) => material != null),
            },
            [skillOneName]: {
              8: skillMasteryMaterial[0][0].filter(
                (material) => material != null
              ),
              9: skillMasteryMaterial[0][1].filter(
                (material) => material != null
              ),
              10: skillMasteryMaterial[0][2].filter(
                (material) => material != null
              ),
            },
            [skillTwoName]: {
              8: skillMasteryMaterial[1][0].filter(
                (material) => material != null
              ),
              9: skillMasteryMaterial[1][1].filter(
                (material) => material != null
              ),
              10: skillMasteryMaterial[1][2].filter(
                (material) => material != null
              ),
            },
          },
          moduleList: moduleNameList.map((moduleName) => {
            return { type: moduleName[0], name: moduleName[1] };
          }),
          moduleMaterials,
        };
      } else if (rarity == 3) {
        operatorData = {
          id: parseInt(id, 10),
          name,
          imageFilename: englishName.toLowerCase().split(" ").join("-"),
          class: operatorClass,
          // 세부 직군 생략
          rarity,
          eliteMaterials: {
            0: [],
            1: eliteOneMaterial.filter((material) => material != null),
            2: eliteTwoMaterial.filter((material) => material != null),
          },
          skillList: [skillOneName],
          skillUpgradeMaterials: {
            common: {
              2: commonSkillMaterial[0].filter((material) => material != null),
              3: commonSkillMaterial[1].filter((material) => material != null),
              4: commonSkillMaterial[2].filter((material) => material != null),
              5: commonSkillMaterial[3].filter((material) => material != null),
              6: commonSkillMaterial[4].filter((material) => material != null),
              7: commonSkillMaterial[5].filter((material) => material != null),
            },
          },
          moduleList: moduleNameList.map((moduleName) => {
            return { type: moduleName[0], name: moduleName[1] };
          }),
          moduleMaterials,
        };
      } else {
        operatorData = {
          id: parseInt(id, 10),
          name,
          imageFilename: englishName.toLowerCase().split(" ").join("-"),
          class: operatorClass,
          // 세부 직군 생략
          rarity,
          eliteMaterials: {
            0: [],
            1: eliteOneMaterial.filter((material) => material != null),
            2: eliteTwoMaterial.filter((material) => material != null),
          },
          skillList: [],
          skillUpgradeMaterials: {},
          moduleList: moduleNameList.map((moduleName) => {
            return { type: moduleName[0], name: moduleName[1] };
          }),
          moduleMaterials,
        };
      }

      // 오퍼레이터 데이터를 문자열로 변환
      const resultString = JSON.stringify(operatorData!, replacer, 2).replace(
        /"material": "(.*?)"/g,
        '"material": $1'
      );

      // 클립보드 혹은 콘솔에 출력
      if (navigator.clipboard) {
        navigator.clipboard.writeText(resultString);
        setToastPopupActive(true);
      } else {
        console.log(resultString);
      }
    }
  };

  // 최대 정예화, 스킬 개수 및 최대 스킬 레벨을 자동으로 설정
  useEffect(() => {
    if (rarity) {
      // 정예화
      setMaxElite(MAX_ELITE_TABLE[rarity]);
      setEliteOneMaterial([null, null, null, null]);
      setEliteTwoMaterial([null, null, null, null]);

      // 스킬
      setSkillCount(SKILL_COUNT_TABLE[rarity]);
      setSkillMaxLevel(SKILL_MAX_LEVEL_TABLE[MAX_ELITE_TABLE[rarity]]);
    }
  }, [rarity]);

  // 모듈 설정
  useEffect(() => {
    // 모듈 수량이 변경되면, 이름 및 재료를 재설정
    const moduleCountNumber = parseInt(moduleCount, 10);

    if (!isNaN(moduleCountNumber)) {
      const newModuleNameList: string[][] = [];
      const newModuleMaterial: CountableMaterialMultipleList[] = [];

      for (let i = 0; i < moduleCountNumber; i++) {
        newModuleNameList.push(["", ""]);
        newModuleMaterial.push([
          [null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      }

      setModuleNameList(newModuleNameList);
      setModuleMaterial(newModuleMaterial);
    }
  }, [moduleCount]);

  return (
    <div className="flex flex-col w-full gap-3 p-4 pb-32">
      <div className="flex flex-row gap-5">
        <p className="pl-1 font-bold text-3xl text-white break-keep">
          오퍼레이터 데이터 제작소
        </p>
        {/* 버튼 */}
        <div className="flex flex-row justify-start items-center gap-2 translate-y-[2px]">
          <button
            className={`group relative w-9 selection:bg-transparent aspect-square`}
            onClick={() => makeOperatorData()}
          >
            <Image
              className="rotate-90 transition:[filter_0s] [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
                hover:[filter:invert(98%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]"
              src="/images/others/import.png"
              alt="make-operator-data"
              fill
              sizes="10vw"
              draggable={false}
            />
            <p
              className="hidden absolute inset-x-auto top-0 z-10 px-3 py-[2px] bg-gray-900 text-gray-200 text-center text-nowrap
                rounded-lg translate-x-[-31px] translate-y-[-30px] group-hover:block"
            >
              데이터 제작
            </p>
            {/* 팝업 */}
            {toastPopupActive && (
              <ToastPopup
                message="클립보드에 복사되었습니다."
                ms={1500}
                setter={setToastPopupActive}
              />
            )}
          </button>
          <a
            href="https://forms.gle/NoCmMhxvd5feDmCT6"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative w-7 selection:bg-transparent aspect-square`}
          >
            <Image
              className="transition:[filter_0s] [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
                hover:[filter:invert(98%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]"
              src="/images/others/page-new.png"
              alt="google-forms"
              fill
              sizes="10vw"
              draggable={false}
            />
            <p
              className="hidden absolute inset-x-auto top-0 z-10 px-3 py-[2px] bg-gray-900 text-gray-200 text-center text-nowrap
                rounded-lg translate-x-[-48px] translate-y-[-34px] group-hover:block"
            >
              Google Forms
            </p>
          </a>
        </div>
      </div>
      {/* 아이디 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <a
          href="https://hx3n.github.io/gachaplanner/oper"
          target="_blank"
          rel="noopener noreferrer"
          className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 underline break-keep"
        >
          아이디
        </a>
        <input
          className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id="id"
          type="number"
          min={0}
          step={1}
          placeholder={`오퍼레이터 아이디를 입력해주세요.`}
          value={id}
          onInput={(event) => handleNumberStringValue(event, setId)}
          onKeyDown={(event) => handleExponentialNotation(event)}
        ></input>
      </div>
      {/* 이름 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          이름
        </p>
        <input
          className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id="name"
          type="text"
          placeholder={`오퍼레이터 이름을 입력해주세요.`}
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
        ></input>
      </div>
      {/* 영어 이름 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          영어 이름
        </p>
        <input
          className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id="english-name"
          type="text"
          placeholder={`오퍼레이터 영어 이름을 입력해주세요.`}
          value={englishName}
          onChange={(event) => setEnglishName(event.target.value)}
          autoComplete="off"
        ></input>
      </div>
      {/* 레어도 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          레어도
        </p>
        <div className="w-full flex flex-row flex-wrap gap-2">
          {RarityNumberList.map((rarityNumber) => {
            return (
              <button
                key={rarityNumber}
                className={`w-8 px-3 py-1 ${
                  rarity == rarityNumber ? "bg-dark-500" : "bg-dark-800"
                } hover:bg-dark-400 text-gray-200 rounded-lg`}
                onClick={() => setRarity(rarityNumber)}
              >
                {rarityNumber}
              </button>
            );
          })}
        </div>
      </div>
      {/* 포지션 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          포지션
        </p>
        <div className="w-full flex flex-row flex-wrap gap-2">
          {OperatorClassList.map((opClass) => {
            return (
              <Image
                key={opClass}
                className={`${
                  operatorClass == opClass
                    ? "border-dark-200"
                    : "border-dark-800"
                } border-2 hover:border-dark-100 text-gray-200 rounded-lg cursor-pointer`}
                src={`/images/operator/class/${opClass.toLowerCase()}.png`}
                alt={opClass}
                title={opClass}
                width={32}
                height={32}
                onClick={() => setOperatorClass(opClass)}
                draggable={false}
              />
            );
          })}
        </div>
      </div>
      <EmptySpace />
      {/* 1스킬 이름 */}
      {rarity && skillCount! >= 1 && (
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
            1스킬 이름
          </p>
          <input
            className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id="skill-1-name"
            type="text"
            placeholder={`1스킬 이름을 입력해주세요.`}
            value={skillOneName}
            onChange={(event) => setSkillOneName(event.target.value)}
            autoComplete="off"
          ></input>
        </div>
      )}
      {/* 2스킬 이름 */}
      {rarity && skillCount! >= 2 && (
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
            2스킬 이름
          </p>
          <input
            className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id="skill-2-name"
            type="text"
            placeholder={`2스킬 이름을 입력해주세요.`}
            value={skillTwoName}
            onChange={(event) => setSkillTwoName(event.target.value)}
            autoComplete="off"
          ></input>
        </div>
      )}
      {/* 3스킬 이름 */}
      {rarity && skillCount! >= 3 && (
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
            3스킬 이름
          </p>
          <input
            className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id="skill-3-name"
            type="text"
            placeholder={`3스킬 이름을 입력해주세요.`}
            value={skillThreeName}
            onChange={(event) => setSkillThreeName(event.target.value)}
            autoComplete="off"
          ></input>
        </div>
      )}
      <EmptySpace />
      {/* 1정예화 재료 */}
      {rarity && maxElite! >= 1 && (
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
            1정예화 재료
          </p>
          <div className="w-full flex flex-row flex-wrap gap-2">
            {Array.from(Array(ELITE_ONE_MATERIAL_TABLE[rarity]), (_, i) => {
              switch (i) {
                // 용문폐
                case 0:
                  return (
                    <SelectableMaterial
                      key={`elite-one-${i}`}
                      keyString={`elite-one-${i}`}
                      defaultMaterial={LMD}
                      defaultCount={ELITE_ONE_LMD_TABLE[rarity]}
                      id={i}
                      handleChange={handleEliteOneMaterialChange}
                      lmd
                    />
                  );
                // 메모리 칩
                case 1:
                  let defaultMaterial;
                  switch (operatorClass) {
                    case "Vanguard":
                      defaultMaterial = vanguardChip!;
                      break;
                    case "Guard":
                      defaultMaterial = guardChip!;
                      break;
                    case "Defender":
                      defaultMaterial = defenderChip!;
                      break;
                    case "Sniper":
                      defaultMaterial = sniperChip!;
                      break;
                    case "Caster":
                      defaultMaterial = casterChip!;
                      break;
                    case "Medic":
                      defaultMaterial = medicChip!;
                      break;
                    case "Supporter":
                      defaultMaterial = supporterChip!;
                      break;
                    case "Specialist":
                      defaultMaterial = specialistChip!;
                      break;
                  }

                  return (
                    <SelectableMaterial
                      key={`elite-one-${i}`}
                      keyString={`elite-one-${i}`}
                      defaultMaterial={defaultMaterial}
                      defaultCount={ELITE_ONE_CHIP_TABLE[rarity]}
                      id={i}
                      handleChange={handleEliteOneMaterialChange}
                      memoryChip
                    />
                  );
                // 정예화 재료
                case 2:
                case 3:
                  return (
                    <SelectableMaterial
                      key={`elite-one-${i}`}
                      keyString={`elite-one-${i}`}
                      id={i}
                      handleChange={handleEliteOneMaterialChange}
                      T2
                    />
                  );
              }
            })}
          </div>
        </div>
      )}
      {/* 2정예화 재료 */}
      {rarity && maxElite! >= 2 && (
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
            2정예화 재료
          </p>
          <div className="w-full flex flex-row flex-wrap gap-2">
            {Array.from(Array(ELITE_TWO_MATERIAL_TABLE[rarity]), (_, i) => {
              switch (i) {
                // 용문폐
                case 0:
                  return (
                    <SelectableMaterial
                      key={`elite-two-${i}`}
                      keyString={`elite-two-${i}`}
                      defaultMaterial={LMD}
                      defaultCount={ELITE_TWO_LMD_TABLE[rarity]}
                      id={i}
                      handleChange={handleEliteTwoMaterialChange}
                      lmd
                    />
                  );
                // 메모리 칩
                case 1:
                  let defaultMaterial;
                  switch (operatorClass) {
                    case "Vanguard":
                      defaultMaterial =
                        rarity > 4 ? vanguardDualchip : vanguardChipPack!;
                      break;
                    case "Guard":
                      defaultMaterial =
                        rarity > 4 ? guardDualchip : guardChipPack!;
                      break;
                    case "Defender":
                      defaultMaterial =
                        rarity > 4 ? defenderDualchip : defenderChipPack!;
                      break;
                    case "Sniper":
                      defaultMaterial =
                        rarity > 4 ? sniperDualchip : sniperChipPack!;
                      break;
                    case "Caster":
                      defaultMaterial =
                        rarity > 4 ? casterDualchip : casterChipPack!;
                      break;
                    case "Medic":
                      defaultMaterial =
                        rarity > 4 ? medicDualchip : medicChipPack!;
                      break;
                    case "Supporter":
                      defaultMaterial =
                        rarity > 4 ? supporterDualchip : supporterChipPack!;
                      break;
                    case "Specialist":
                      defaultMaterial =
                        rarity > 4 ? specialistDualchip : specialistChipPack!;
                      break;
                  }

                  return (
                    <SelectableMaterial
                      key={`elite-two-${i}`}
                      keyString={`elite-two-${i}`}
                      defaultMaterial={defaultMaterial}
                      defaultCount={ELITE_TWO_CHIP_TABLE[rarity]}
                      id={i}
                      handleChange={handleEliteTwoMaterialChange}
                      memoryChip
                    />
                  );
                // 정예화 재료
                case 2:
                  switch (rarity) {
                    case 6:
                      return (
                        <SelectableMaterial
                          key={`elite-two-${i}`}
                          keyString={`elite-two-${i}`}
                          id={i}
                          handleChange={handleEliteTwoMaterialChange}
                          T5
                        />
                      );
                    case 5:
                      return (
                        <SelectableMaterial
                          key={`elite-two-${i}`}
                          keyString={`elite-two-${i}`}
                          id={i}
                          handleChange={handleEliteTwoMaterialChange}
                          T4
                        />
                      );
                    case 4:
                      return (
                        <SelectableMaterial
                          key={`elite-two-${i}`}
                          keyString={`elite-two-${i}`}
                          id={i}
                          handleChange={handleEliteTwoMaterialChange}
                          T3
                        />
                      );
                    default:
                      return (
                        <SelectableMaterial
                          key={`elite-two-${i}`}
                          keyString={`elite-two-${i}`}
                          id={i}
                          handleChange={handleEliteTwoMaterialChange}
                          T5
                          T4
                          T3
                        />
                      );
                  }
                case 3:
                  switch (rarity) {
                    case 6:
                      return (
                        <SelectableMaterial
                          key={`elite-two-${i}`}
                          keyString={`elite-two-${i}`}
                          id={i}
                          handleChange={handleEliteTwoMaterialChange}
                          T4
                        />
                      );
                    case 5:
                    case 4:
                      return (
                        <SelectableMaterial
                          key={`elite-two-${i}`}
                          keyString={`elite-two-${i}`}
                          id={i}
                          handleChange={handleEliteTwoMaterialChange}
                          T3
                        />
                      );
                    default:
                      return (
                        <SelectableMaterial
                          key={`elite-two-${i}`}
                          keyString={`elite-two-${i}`}
                          id={i}
                          handleChange={handleEliteTwoMaterialChange}
                          T4
                          T3
                        />
                      );
                  }
              }
            })}
          </div>
        </div>
      )}
      <EmptySpace />
      {/* 공통 재료 */}
      {rarity && skillCount! >= 1 && (
        <>
          {makeCommonSkillMaterialList()}
          <EmptySpace />
        </>
      )}
      {/* 1스킬 재료 */}
      {rarity && skillCount! >= 1 && (
        <>
          {makeSkillMaterialList(1)}
          <EmptySpace />
        </>
      )}
      {/* 2스킬 재료 */}
      {rarity && skillCount! >= 2 && (
        <>
          {makeSkillMaterialList(2)}
          <EmptySpace />
        </>
      )}
      {/* 3스킬 재료 */}
      {rarity && skillCount! >= 3 && (
        <>
          {makeSkillMaterialList(3)}
          <EmptySpace />
        </>
      )}
      {/* 모듈 개수 */}
      {rarity && maxElite! >= MODULE_ACTIVE_ELITE && (
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
            모듈 개수
          </p>
          <input
            className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id="module-count"
            type="number"
            min={0}
            step={1}
            placeholder={`모듈 개수를 입력해주세요.`}
            value={moduleCount}
            onInput={(event) => handleNumberStringValue(event, setModuleCount)}
            onKeyDown={(event) => handleExponentialNotation(event)}
          ></input>
        </div>
      )}
      <EmptySpace />
      {/* 모듈 정보 입력 */}
      {rarity &&
        maxElite! >= MODULE_ACTIVE_ELITE &&
        moduleMaterial.length > 0 &&
        Array.from({ length: moduleMaterial.length }, (_, i) => {
          return makeModuleList(i);
        })}
    </div>
  );
}
