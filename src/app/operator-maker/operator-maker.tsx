/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  casterChip,
  casterChipPack,
  casterDualchip,
  CountableMaterial,
  defenderChip,
  defenderChipPack,
  defenderDualchip,
  guardChip,
  guardChipPack,
  guardDualchip,
  LMD,
  Material,
  medicChip,
  medicChipPack,
  medicDualchip,
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
  MAX_ELITE_TABLE,
  NumberByElite,
  OperatorClass,
  OperatorClassList,
  RarityNumber,
  RarityNumberList,
  SKILL_COUNT_TABLE,
  SKILL_MAX_LEVEL_TABLE,
} from "@/data/operator";
import { handleExponentialNotation } from "@/tool";
import SelectableMaterial from "./selectable-material";

/** 공백 컴포넌트 */
const EmptySpace = () => {
  return <div className="h-6"></div>;
};

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
  const [eliteOneMaterial, setEliteOneMaterial] = useState<
    (CountableMaterial | null)[]
  >([null, null, null, null]);

  // 2정예화 재료
  const [eliteTwoMaterial, setEliteTwoMaterial] = useState<
    (CountableMaterial | null)[]
  >([null, null, null, null]);

  // 스킬 개수 및 최대 레벨
  const [skillCount, setSkillCount] = useState<number>();
  const [skillMaxLevel, setSkillMaxLevel] = useState<number>();

  // 스킬 이름
  const [skillOneName, setSkillOneName] = useState("");
  const [skillTwoName, setSkillTwoName] = useState("");
  const [skillThreeName, setSkillThreeName] = useState("");

  // 스킬 재료 (공통)
  const [commonSkillMaterial, setCommonSkillMaterial] = useState<
    (CountableMaterial | null)[][]
  >([
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  // 1스킬 재료
  const [skillOneMaterial, setSkillOneMaterial] = useState<
    (CountableMaterial | null)[][]
  >([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  // 2스킬 재료
  const [skillTwoMaterial, setSkillTwoMaterial] = useState<
    (CountableMaterial | null)[][]
  >([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  // 3스킬 재료
  const [skillThreeMaterial, setSkillThreeMaterial] = useState<
    (CountableMaterial | null)[][]
  >([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  // 모듈
  const [moduleCount, setModuleCount] = useState<number>(0);

  /** 아이디 문자열 설정 */
  const handleIdValue = (event: FormEvent<HTMLInputElement>) => {
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
    setId(value);
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

    for (let i = 0; i < 6; i++) {
      result.push(
        <div
          className="flex flex-row items-center justify-between gap-2"
          key={`skill-common-${i}`}
        >
          <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
            공통 {i + 2}레벨
          </p>
          <div className="w-[640px] flex flex-row gap-2">
            {Array.from(Array(3), (_, j) => {
              switch (j) {
                // 스킬개론
                case 0:
                  let defaultMaterial;
                  switch (i) {
                    // 2레벨 ~ 3레벨 = 제1권
                    case 0:
                    case 1:
                      defaultMaterial = skillSummary1;
                      break;
                    // 4레벨 ~ 6레벨 = 제2권
                    case 2:
                    case 3:
                    case 4:
                      defaultMaterial = skillSummary2;
                      break;
                    // 7레벨 = 제3권
                    case 5:
                      defaultMaterial = skillSummary3;
                      break;
                  }

                  return (
                    <SelectableMaterial
                      key={`skill-common-${i}-${j}`}
                      keyString={`skill-common-${i}-${j}`}
                      defaultMaterial={defaultMaterial}
                      id={j}
                      listId={i}
                      handleChange={handleCommonSkillMaterialChange}
                      skillSummary
                    />
                  );
                // 스킬개론 제외한 재료
                case 1:
                case 2:
                  switch (i) {
                    // 2레벨 ~ 3레벨 = 1티어
                    case 0:
                    case 1:
                      return (
                        <SelectableMaterial
                          key={`skill-common-${i}-${j}`}
                          keyString={`skill-common-${i}-${j}`}
                          id={j}
                          listId={i}
                          handleChange={handleCommonSkillMaterialChange}
                          T1
                        />
                      );
                    // 4레벨 ~ 5레벨 = 2티어
                    case 2:
                    case 3:
                      return (
                        <SelectableMaterial
                          key={`skill-common-${i}-${j}`}
                          keyString={`skill-common-${i}-${j}`}
                          id={j}
                          listId={i}
                          handleChange={handleCommonSkillMaterialChange}
                          T2
                        />
                      );
                    // 6레벨 ~ 7레벨 = 3티어
                    case 4:
                    case 5:
                      return (
                        <SelectableMaterial
                          key={`skill-common-${i}-${j}`}
                          keyString={`skill-common-${i}-${j}`}
                          id={j}
                          listId={i}
                          handleChange={handleCommonSkillMaterialChange}
                          T3
                        />
                      );
                    default:
                      return (
                        <SelectableMaterial
                          key={`skill-common-${i}-${j}`}
                          keyString={`skill-common-${i}-${j}`}
                          id={j}
                          listId={i}
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

    // 스킬 재료 설정 함수를, 스킬에 따라 다르게 설정
    let handler;
    switch (skillNum) {
      case 1:
        handler = handleOneSkillMaterialChange;
        break;
      case 2:
        handler = handleTwoSkillMaterialChange;
        break;
      case 3:
        handler = handleThreeSkillMaterialChange;
        break;
      default:
        handler = handleOneSkillMaterialChange;
        break;
    }

    // 8레벨 ~ 10레벨 구간의 스킬을 생성
    for (let i = 0; i < skillMaxLevel! - 7; i++) {
      result.push(
        <div
          className="flex flex-row items-center justify-between gap-2"
          key={`skill-${skillNum}-${i}`}
        >
          <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
            {skillNum}스킬 {i + 8}레벨
          </p>
          <div className="w-[640px] flex flex-row gap-2">
            {Array.from(Array(3), (_, j) => {
              // 각각의 스킬 레벨을 올릴 때마다 필요한 재료 설정
              switch (j) {
                // 스킬개론
                case 0:
                  return (
                    <SelectableMaterial
                      key={`skill-${skillNum}-${i}-${j}`}
                      keyString={`skill-${skillNum}-${i}-${j}`}
                      defaultMaterial={skillSummary3}
                      id={j}
                      listId={i}
                      handleChange={handler}
                      skillSummary
                    />
                  );
                // 스킬의 레벨에 따라 사용되는 재료 티어가 설정됨
                case 1:
                  switch (i) {
                    // 8레벨 ~ 9레벨 구간의 첫 번째 칸 = 4티어
                    case 0:
                    case 1:
                      return (
                        <SelectableMaterial
                          key={`skill-${skillNum}-${i}-${j}`}
                          keyString={`skill-${skillNum}-${i}-${j}`}
                          id={j}
                          listId={i}
                          handleChange={handler}
                          T4
                        />
                      );
                    // 10레벨 구간의 첫 번째 칸 = 5티어
                    case 2:
                      return (
                        <SelectableMaterial
                          key={`skill-${skillNum}-${i}-${j}`}
                          keyString={`skill-${skillNum}-${i}-${j}`}
                          id={j}
                          listId={i}
                          handleChange={handler}
                          T5
                        />
                      );
                  }
                case 2:
                  switch (i) {
                    // 8레벨 구간의 두 번째 칸 = 3티어
                    case 0:
                      return (
                        <SelectableMaterial
                          key={`skill-${skillNum}-${i}-${j}`}
                          keyString={`skill-${skillNum}-${i}-${j}`}
                          id={j}
                          listId={i}
                          handleChange={handler}
                          T3
                        />
                      );
                    // 9 ~ 10레벨 구간의 두 번째 칸 = 4티어
                    case 1:
                    case 2:
                      return (
                        <SelectableMaterial
                          key={`skill-${skillNum}-${i}-${j}`}
                          keyString={`skill-${skillNum}-${i}-${j}`}
                          id={j}
                          listId={i}
                          handleChange={handler}
                          T4
                        />
                      );
                    default:
                      return (
                        <SelectableMaterial
                          key={`skill-${skillNum}-${i}-${j}`}
                          keyString={`skill-${skillNum}-${i}-${j}`}
                          id={j}
                          listId={i}
                          handleChange={handler}
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

    const newMaterial = [];
    for (let i = 0; i < commonSkillMaterial.length; i++) {
      if (i == index) {
        newMaterial.push(prev);
      } else {
        newMaterial.push(commonSkillMaterial[i]);
      }
    }

    setCommonSkillMaterial(newMaterial);
  };

  /** 1스킬 업그레이드 재료 변화를 반영 */
  const handleOneSkillMaterialChange = (
    index: number,
    material: Material,
    count: number,
    listIndex?: number
  ) => {
    const prev = skillOneMaterial[listIndex!];
    prev[index] = { material, count } as CountableMaterial;

    const newMaterial = [];
    for (let i = 0; i < skillOneMaterial.length; i++) {
      if (i == index) {
        newMaterial.push(prev);
      } else {
        newMaterial.push(skillOneMaterial[i]);
      }
    }

    setSkillOneMaterial(newMaterial);
  };

  /** 2스킬 업그레이드 재료 변화를 반영 */
  const handleTwoSkillMaterialChange = (
    index: number,
    material: Material,
    count: number,
    listIndex?: number
  ) => {
    const prev = skillTwoMaterial[listIndex!];
    prev[index] = { material, count } as CountableMaterial;

    const newMaterial = [];
    for (let i = 0; i < skillTwoMaterial.length; i++) {
      if (i == index) {
        newMaterial.push(prev);
      } else {
        newMaterial.push(skillTwoMaterial[i]);
      }
    }

    setSkillTwoMaterial(newMaterial);
  };

  /** 3스킬 업그레이드 재료 변화를 반영 */
  const handleThreeSkillMaterialChange = (
    index: number,
    material: Material,
    count: number,
    listIndex?: number
  ) => {
    const prev = skillThreeMaterial[listIndex!];
    prev[index] = { material, count } as CountableMaterial;

    const newMaterial = [];
    for (let i = 0; i < skillThreeMaterial.length; i++) {
      if (i == index) {
        newMaterial.push(prev);
      } else {
        newMaterial.push(skillThreeMaterial[i]);
      }
    }

    setSkillThreeMaterial(newMaterial);
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

  return (
    <div className="flex flex-col w-full gap-3 py-4 pb-32">
      <p className="px-1 mb-1 leading-none font-semibold text-3xl text-white break-keep">
        오퍼레이터 데이터 제작 (PC, Fullscreen Only)
      </p>
      {/* 아이디 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <a
          href="https://hx3n.github.io/gachaplanner/oper"
          target="_blank"
          rel="noopener noreferrer"
          className="px-1 leading-none font-semibold text-xl text-gray-200 underline break-keep"
        >
          아이디
        </a>
        <input
          className="w-[640px] px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id="id"
          type="number"
          min={0}
          step={1}
          placeholder={`오퍼레이터 아이디를 입력해주세요.`}
          value={id}
          onInput={(event) => handleIdValue(event)}
          onKeyDown={(event) => handleExponentialNotation(event)}
        ></input>
      </div>
      {/* 이름 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
          이름
        </p>
        <input
          className="w-[640px] px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
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
        <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
          영어 이름
        </p>
        <input
          className="w-[640px] px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
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
        <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
          레어도
        </p>
        <div className="w-[640px] flex flex-row gap-2">
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
        <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
          포지션
        </p>
        <div className="w-[640px] flex flex-row gap-2">
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
          <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
            1스킬 이름
          </p>
          <input
            className="w-[640px] px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
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
          <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
            2스킬 이름
          </p>
          <input
            className="w-[640px] px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
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
          <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
            3스킬 이름
          </p>
          <input
            className="w-[640px] px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
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
          <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
            1정예화 재료
          </p>
          <div className="w-[640px] flex flex-row gap-2">
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
          <p className="px-1 leading-none font-semibold text-xl text-gray-200 break-keep">
            2정예화 재료
          </p>
          <div className="w-[640px] flex flex-row gap-2">
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
      {rarity && skillCount! >= 1 && makeCommonSkillMaterialList()}
      <EmptySpace />
      {/* 1스킬 재료 */}
      {rarity && skillCount! >= 1 && makeSkillMaterialList(1)}
      <EmptySpace />
      {/* 2스킬 재료 */}
      {rarity && skillCount! >= 2 && makeSkillMaterialList(2)}
      <EmptySpace />
      {/* 3스킬 재료 */}
      {rarity && skillCount! >= 3 && makeSkillMaterialList(3)}
      <EmptySpace />
    </div>
  );
}
