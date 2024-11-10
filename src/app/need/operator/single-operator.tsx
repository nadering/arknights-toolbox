"use client;";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import {
  ModuleLevel,
  ModuleMaxLevel,
  Operator,
  SkillLevel,
  EliteNumber,
  maxEliteTable,
  skillMaxLevelTable,
} from "@/data/operator";
import { handleExponentialNotation } from "@/tool";
import {
  OperatorMaterial,
  selectedOperatorsMaterialAtom,
  userNeedInitializedAtom,
} from "@/store";
import SingleSkill from "./single-skill";
import SingleModule from "./single-module";

/** 육성하려는 오퍼레이터 한 명을 표현하는 컴포넌트 */
export default function SingleOperator({ operator }: { operator: Operator }) {
  // 오퍼레이터 육성 재료 설정
  const [selectedOperatorsMaterial, setSelectedOperatorsMaterial] = useAtom(
    selectedOperatorsMaterialAtom
  );

  // 사용자의 필요 재료가 설정되었는지 여부를 설정
  const [userNeedInitialized, setUserNeedInitialized] = useAtom(
    userNeedInitializedAtom
  );

  /** 오퍼레이터 이미지 */
  const operatorImageSrc = `/images/operator/list/${operator.class.toLowerCase()}/${
    operator.imageFilename
  }.png`;

  // 정예화 설정
  const [elite, setElite] = useState<EliteNumber>(0);
  const [targetElite, setTargetElite] = useState<EliteNumber>(
    maxEliteTable[operator.rarity]
  );

  // 정예화 문자열 설정
  const [eliteString, setEliteString] = useState(elite.toString());
  const [targetEliteString, setTargetEliteString] = useState(
    targetElite.toString()
  );

  // 스킬 레벨 설정
  const [skillLevels, setSkillLevels] = useState<SkillLevel[]>(
    operator.skillList.map((skill) => {
      if (operator.preferSkillList?.includes(skill)) {
        return {
          name: skill,
          current: 1,
          target: skillMaxLevelTable[targetElite],
        };
      } else {
        return {
          name: skill,
          current: 1,
          target:
            skillMaxLevelTable[Math.max(0, targetElite - 1) as EliteNumber],
        };
      }
    })
  );

  // 모듈 레벨 설정
  const [moduleLevels, setModuleLevels] = useState<ModuleLevel[]>(
    operator.moduleList.map((module) => {
      if (operator.preferModuleList) {
        for (const perferModule of operator.preferModuleList) {
          // 선호하는 모듈이라면, 해당 모듈의 목표 레벨을 설정
          if (perferModule.module.type == module.type) {
            return {
              type: module.type,
              name: module.name,
              current: 0,
              target: perferModule.level,
            };
          }
        }
      }

      // 선호하는 모듈이 없거나 아니라면, 해당 모듈의 목표 레벨을 설정하지 않음
      return { type: module.type, name: module.name, current: 0, target: 0 };
    })
  );

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  /** 정예화 수치 변경을 담당 */
  const handleEliteChange = (
    event: FormEvent<HTMLInputElement>,
    type: "current" | "target"
  ) => {
    // 값을 얻어온 후,
    // 0으로 시작하고 문자열 길이가 1을 초과한다면 (00, 01 등), 가장 왼쪽의 0을 제거함
    let value = event.currentTarget.value;

    const startsWithZeroPattern = /^0+/;
    if (value.length > 1) {
      value = value.replace(startsWithZeroPattern, "");
    }

    // 0을 제거한 문자열의 길이가 0이라면, 0으로 재설정 (00 등)
    if (value.length == 0) {
      value = "0";
    }

    // 값을 숫자로 변환
    let valueNumber = Math.min(
      parseInt(value, 10),
      maxEliteTable[operator.rarity]
    );

    if (type == "current") {
      if (valueNumber > targetElite) {
        // 목표 정예화는, 현재 정예화 수치보다 낮아질 수 없음
        setTargetElite(valueNumber as EliteNumber);
      }

      // 현재 정예화를 변경하고 스킬 범위를 재설정
      setElite(valueNumber as EliteNumber);
      handleSkillLevelRange(
        skillLevels,
        valueNumber as EliteNumber,
        targetElite
      );
    } else {
      if (valueNumber < elite) {
        // 목표 정예화는, 현재 정예화 수치보다 낮아질 수 없음
        valueNumber = elite;
      }

      // 목표 정예화를 변경하고 스킬 범위를 재설정
      setTargetElite(valueNumber as EliteNumber);
      handleSkillLevelRange(skillLevels, elite, valueNumber as EliteNumber);
    }

    // 정예화에 따른 스킬 레벨 변경을 반영
    setSkillLevels([...skillLevels]);
  };

  /** 스킬 레벨이 범위 내에 들어오도록 조정 */
  const handleSkillLevelRange = (
    skillLevels: SkillLevel[],
    elite: EliteNumber,
    targetElite: EliteNumber,
    targetEliteChanged: boolean = false
  ) => {
    for (let i = 0; i < skillLevels.length; i++) {
      // 스킬이 가능한 최대 레벨을 초과할 경우, 최대 레벨로 조정
      skillLevels[i].current = Math.min(
        skillLevels[i].current,
        skillMaxLevelTable[elite]
      );
      skillLevels[i].target = Math.min(
        skillLevels[i].target,
        skillMaxLevelTable[targetElite]
      );

      if (!targetEliteChanged) {
        // 현재 레벨이 최대 레벨을 초과할 경우, 현재 레벨을 최대 레벨로 조정
        if (skillLevels[i].current > skillMaxLevelTable[elite]) {
          skillLevels[i].current = skillMaxLevelTable[elite];
        }
      }

      // 목표 레벨이 현재 레벨보다 낮아지지 않도록 설정
      if (skillLevels[i].current > skillLevels[i].target) {
        skillLevels[i].target = skillLevels[i].current;
      }
    }
  };

  /** 스킬 레벨 변경을 담당 */
  const handleSkillLevelChange = (
    event: FormEvent<HTMLInputElement>,
    type: "current" | "target",
    index: number
  ) => {
    // 값을 얻어온 후,
    // 0으로 시작하고 문자열 길이가 1을 초과한다면 (00, 01 등), 가장 왼쪽의 0을 제거함
    const prev = skillLevels;
    let value = event.currentTarget.value;

    const startsWithZeroPattern = /^0+/;
    if (value.length > 1) {
      value = value.replace(startsWithZeroPattern, "");
    }

    // 값을 숫자로 변환
    const valueNumber = parseInt(value, 10);

    // 스킬 레벨 변경
    prev[index][type] = valueNumber;

    // 스킬 레벨 범위를 조정 후, 스킬 레벨 변경을 반영
    handleSkillLevelRange(prev, elite, targetElite, type == "target");
    setSkillLevels([...prev]);
  };

  /** 스킬 레벨이 7레벨까지 공통으로 변경되는 부분 설정 */
  const handleCommonSkillLevels = (type: "current" | "target", index: number) => {
    if (skillLevels[index][type] < 7) {
      // 새로 입력된 스킬 레벨이 7레벨 미만이라면, 해당 레벨로 모든 스킬의 레벨을 변경
      for (let i = 0; i < skillLevels.length; i++) {
        skillLevels[i][type] = skillLevels[index][type];
      }
    } else {
      // 7레벨 이상이면, 7레벨 미만인 모든 스킬의 레벨을 7로 변경
      // 단, 새로 입력된 스킬 레벨이 NaN이라면 1로 변경
      for (let i = 0; i < skillLevels.length; i++) {
        if (isNaN(skillLevels[index][type])) {
          skillLevels[i][type] = 1;
        } else {
          if (skillLevels[i][type] < 7) {
            skillLevels[i][type] = 7;
          }
        }
      }
    }

    // 스킬 레벨 변경을 반영
    setSkillLevels([...skillLevels]);
  };

  /** 모듈 레벨 변경을 담당 */
  const handleModuleLevelChange = (
    event: FormEvent<HTMLInputElement>,
    type: "current" | "target",
    index: number
  ) => {
    // 값을 얻어온 후,
    // 0으로 시작하고 문자열 길이가 1을 초과한다면 (00, 01 등), 가장 왼쪽의 0을 제거함
    const prev = moduleLevels;
    let value = event.currentTarget.value;

    const startsWithZeroPattern = /^0+/;
    if (value.length > 1) {
      value = value.replace(startsWithZeroPattern, "");
    }

    // 0을 제거한 문자열의 길이가 0이라면, 0으로 재설정 (00 등)
    if (value.length == 0) {
      value = "0";
    }

    // 값을 숫자로 변환
    let valueNumber = parseInt(value, 10);

    if (valueNumber > ModuleMaxLevel) {
      // 모듈 최대 레벨을 초과하지 않게 설정
      valueNumber = ModuleMaxLevel;
    }

    prev[index][type] = valueNumber;
    if (prev[index].current > prev[index].target) {
      // 목표 레벨이 현재 레벨보다 낮아지지 않도록 설정
      prev[index].target = prev[index].current;
    }

    // 모듈 레벨 변경을 반영
    setModuleLevels([...prev]);
  };

  // 애니메이션 (오퍼레이터가 추가될 경우, 아래쪽으로 이동하며 Fade-in으로 나타남)
  useEffect(() => {
    /** 애니메이션을 나타내는 클래스 */
    const animateClass = "animate-[fade-in-down_0.2s_ease-in-out]";

    if (!divRef.current?.classList.contains(animateClass)) {
      /**
       * 숨겨두었던 컴포넌트를 다시 활성화시키고,
       * Fade-in 애니메이션을 실행함
       */
      if (divRef.current?.classList.contains("hidden")) {
        divRef.current.classList.remove("hidden");
      }
      divRef.current?.classList.add(animateClass);

      // 200ms 동안 애니메이션 실행
      setTimeout(() => {
        divRef.current?.classList.remove(animateClass);
      }, 200);
    }
  }, []);

  // 정예화 문자열 설정
  useEffect(() => {
    setEliteString(elite.toString());
    setTargetEliteString(targetElite.toString());
  }, [elite, targetElite]);

  // 현재 오퍼레이터의 육성 단계가 설정되어 있다면, 해당 단계에 맞게 설정
  useEffect(() => {
    if (userNeedInitialized) {
      for (const operatorMaterial of selectedOperatorsMaterial) {
        if (operatorMaterial.id == operator.id) {
          setElite(operatorMaterial.target.elite);
          setTargetElite(operatorMaterial.target.targetElite);
          setSkillLevels([...operatorMaterial.target.skillLevels]);
          setModuleLevels([...operatorMaterial.target.moduleLevels]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 현재 오퍼레이터의 육성 재화를 추가
  useEffect(() => {
    // 오퍼레이터 육성 재화 설정
    const currentOperatorMaterial: OperatorMaterial = {
      id: operator.id,
      target: {
        elite,
        targetElite,
        skillLevels,
        moduleLevels,
      },
      eliteMaterials: operator.eliteMaterials,
      skillUpgradeMaterials: operator.skillUpgradeMaterials,
      moduleMaterials: operator.moduleMaterials,
    };

    // 오퍼레이터 육성 재화 리스트에, 현재 오퍼레이터가 있는지 여부를 확인하며 현재 오퍼레이터를 추가
    let operatorExists = false;
    const newSelectedOperatorsMaterial: OperatorMaterial[] = [];

    for (let i = 0; i < selectedOperatorsMaterial.length; i++) {
      if (selectedOperatorsMaterial[i].id == operator.id) {
        // 현재 오퍼레이터가 리스트에 있으면, 해당 내용을 수정
        newSelectedOperatorsMaterial.push(currentOperatorMaterial);
        operatorExists = true;
      } else {
        // 현재 오퍼레이터가 아니면, 순회하며 해당 오퍼레이터를 다시 추가
        newSelectedOperatorsMaterial.push(selectedOperatorsMaterial[i]);
      }
    }

    if (!operatorExists) {
      // 현재 오퍼레이터가 리스트에 없으면, 새롭게 추가
      newSelectedOperatorsMaterial.push(currentOperatorMaterial);
    }

    // 설정된 값을 반영
    setSelectedOperatorsMaterial(newSelectedOperatorsMaterial);
    setUserNeedInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    operator.id,
    operator.eliteMaterials,
    operator.moduleMaterials,
    operator.skillUpgradeMaterials,
    elite,
    targetElite,
    skillLevels,
    moduleLevels,
  ]);

  return (
    <div
      className="hidden relative w-[234px] min-w-[234px] flex flex-col justify-between items-center p-2 gap-6 border-2 border-gray-800 rounded-lg
        transition-all hover:border-white"
      ref={divRef}
    >
      {/* 오퍼레이터 이미지 및 이름 */}
      <div className="w-full flex flex-row justify-center items-center gap-3">
        <div className="relative w-10 min-w-10 aspect-square select-none">
          <Image
            className="rounded-2xl"
            src={operatorImageSrc}
            alt={operator.name}
            fill
            sizes="10vw"
            draggable={false}
          />
        </div>
        <p className="h-[40px] flex items-center leading-tight font-medium text-base text-gray-200 text-center break-keep select-none">
          {operator.name}
        </p>
      </div>
      {/* 정예화 */}
      <div className="w-full flex items-center px-1">
        <p className="w-full leading-tight font-medium text-gray-200 break-keep">
          정예화
        </p>
        <div className="flex flex-row items-center gap-[6px]">
          <input
            className="w-8 h-6 px-2 py-3 resize-none rounded-lg
          outline-none bg-dark-800 selection:bg-gray-800 text-gray-200 text-center 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id={`${operator.name}-current-elite`}
            type="number"
            min={0}
            max={maxEliteTable[operator.rarity]}
            step={1}
            value={eliteString}
            onInput={(event) => {
              handleEliteChange(event, "current");
            }}
            onKeyDown={(event) => handleExponentialNotation(event)}
          ></input>
          <p className="leading-tight font-medium text-[10px] text-dark-800 select-none selection:bg-transparent">
            ▶
          </p>
          <input
            className="w-8 h-6 px-2 py-3 resize-none rounded-lg
          outline-none bg-dark-800 selection:bg-gray-800 text-gray-200 text-center 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id={`${operator.name}-target-elite`}
            type="number"
            min={0}
            max={maxEliteTable[operator.rarity]}
            step={1}
            value={targetEliteString}
            onInput={(event) => {
              handleEliteChange(event, "target");
            }}
            onKeyDown={(event) => handleExponentialNotation(event)}
          ></input>
        </div>
      </div>
      {/* 스킬 */}
      <div className="w-full flex flex-col gap-2 px-1">
        {operator.skillList.map((skill, index) => {
          return (
            <SingleSkill
              key={skill}
              skill={skill}
              index={index}
              elite={elite}
              targetElite={targetElite}
              skillLevels={skillLevels}
              handleSkillLevelChange={handleSkillLevelChange}
              handleCommonSkillLevels={handleCommonSkillLevels}
            />
          );
        })}
      </div>
      {/* 모듈 */}
      <div className="w-full flex flex-col gap-2 px-1">
        {operator.moduleList.map((module, index) => {
          return (
            <SingleModule
              key={module.type}
              index={index}
              elite={elite}
              targetElite={targetElite}
              moduleLevels={moduleLevels}
              handleModuleLevelChange={handleModuleLevelChange}
            />
          );
        })}
      </div>
    </div>
  );
}
