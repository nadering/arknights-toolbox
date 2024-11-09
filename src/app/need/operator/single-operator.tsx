"use client;";

import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Operator } from "@/data/operator";
import { handleExponentialNotation } from "@/tool";
import {
  EliteNumber,
  maxEliteTable,
  skillMaxLevelTable,
} from "@/data/operator";

// 스킬 레벨 타입
interface SkillLevel {
  name: string;
  current: number;
  target: number;
}

/** 오퍼레이터의 단일 스킬 */
const SingleSkill = ({
  skill,
  index,
  skillLevels,
  handleSkillLevelChange,
}: {
  skill: string;
  index: number;
  skillLevels: SkillLevel[];
  handleSkillLevelChange: (
    event: ChangeEvent<HTMLInputElement>,
    type: "current" | "target",
    index: number
  ) => void;
}) => {
  return (
    <div className="w-full flex flex-row gap-4">
      <div className="w-full flex flex-col items-start">
        <p className="leading-tight text-gray-600 break-keep">
          스킬 {index + 1}
        </p>
        <p className="pl-1 leading-tight font-medium text-gray-200 break-keep">
          {skill}
        </p>
      </div>
      <div className="flex flex-row items-center gap-[6px]">
        <input
          className="w-8 h-6 px-2 py-3 resize-none rounded-lg
          outline-none bg-dark-800 selection:bg-gray-800 text-gray-200 text-center 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id={`${skill}-current`}
          type="number"
          min={1}
          max={10}
          step={1}
          value={skillLevels[index].current}
          onChange={(event) => handleSkillLevelChange(event, "current", index)}
          onKeyDown={(event) => handleExponentialNotation(event)}
        ></input>
        <p className="leading-tight font-medium text-[10px] text-dark-800 select-none selection:bg-transparent">
          ▶
        </p>
        <input
          className="w-8 h-6 px-2 py-3 resize-none rounded-lg
          outline-none bg-dark-800 selection:bg-gray-800 text-gray-200 text-center 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id={`${skill}-target`}
          type="number"
          min={1}
          max={10}
          step={1}
          value={skillLevels[index].target}
          onChange={(event) => handleSkillLevelChange(event, "target", index)}
          onKeyDown={(event) => handleExponentialNotation(event)}
        ></input>
      </div>
    </div>
  );
};

/** 육성하려는 오퍼레이터 한 명을 표현하는 컴포넌트 */
export default function SingleOperator({ operator }: { operator: Operator }) {
  /** 오퍼레이터 이미지 */
  const operatorImageSrc = `/images/operator/list/${operator.class.toLowerCase()}/${
    operator.imageFilename
  }.png`;

  // 정예화 설정
  const [elite, setElite] = useState<EliteNumber>(0);
  const [targetElite, setTargetElite] = useState<EliteNumber>(
    maxEliteTable[operator.rarity]
  );

  // 스킬 레벨 설정
  const [skillLevels, setSkillLevels] = useState<SkillLevel[]>(
    operator.skillList.map((skill) => {
      if (operator.preferSkillList?.includes(skill)) {
        return { name: skill, current: 1, target: 10 };
      } else {
        return { name: skill, current: 1, target: 7 };
      }
    })
  );

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  /** 정예화 수치 변경을 담당 */
  const handleEliteChange = (
    event: FormEvent<HTMLInputElement>,
    type: "current" | "target"
  ) => {
    // 값을 얻어옴
    let value = event.currentTarget.value;

    // 0으로 시작하고 문자열 길이가 1을 초과한다면 (00, 01 등), 가장 왼쪽의 0을 제거함
    const startsWithZeroPattern = /^0+/;
    if (value.length > 1) {
      value = value.replace(startsWithZeroPattern, "");
    }

    // 문자열의 길이가 0이라면, 0으로 재설정 (00 등)
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
        // 현재 정예화는, 목표 정예화 수치를 초과할 수 없음
        valueNumber = targetElite;
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

  /** 스킬 레벨이 범위 내에 들어오도록 조정하고, 목표 스킬은 범위 내에서 가장 큰 값을 갖도록 설정 (선호 스킬일 경우 최대치로 설정) */
  const handleSkillLevelRange = (
    skillLevels: SkillLevel[],
    elite: EliteNumber,
    targetElite: EliteNumber
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

      // 현재 레벨이 목표 레벨을 초과할 경우, 현재 레벨을 목표 레벨로 조정
      if (skillLevels[i].current > skillLevels[i].target) {
        skillLevels[i].current = skillLevels[i].target;
      }

      // 목표 스킬의 현재 레벨이 최대 레벨 미만일 경우, 가능한 최대 레벨로 설정
      if (targetElite >= 2) {
        if (
          skillLevels[i].target <
          skillMaxLevelTable[(targetElite - 1) as EliteNumber]
        ) {
          // 2정예화 이상이라면, 직전 정예화(1정예화) 기준 최대 레벨로 설정
          skillLevels[i].target =
            skillMaxLevelTable[(targetElite - 1) as EliteNumber];
        }
      } else {
        // 2정예화 이상이 아니라면, 가능한 최대 레벨로 설정
        skillLevels[i].target = skillMaxLevelTable[targetElite];
      }
    }
  };

  /** 스킬 레벨 변경을 담당 */
  const handleSkillLevelChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: "current" | "target",
    index: number
  ) => {
    const prev = skillLevels;
    const value = event.target.value.length == 0 ? "1" : event.target.value;
    const valueNumber = parseInt(value, 10);

    if (valueNumber <= 7) {
      // 모든 스킬은 7레벨까지 동시에 레벨이 변경됨
      for (let i = 0; i < prev.length; i++) {
        prev[i][type] = valueNumber;
      }
    } else {
      // 7레벨 미만인 모든 스킬의 (같은 종류) 레벨을 7로 변경
      for (let i = 0; i < prev.length; i++) {
        prev[i][type] = Math.max(7, prev[i][type]);
      }

      // 스킬 레벨 변경
      prev[index][type] = valueNumber;
    }

    // 스킬 레벨 범위를 조정 후, 스킬 레벨 변경을 반영
    handleSkillLevelRange(prev, elite, targetElite);
    setSkillLevels([...prev]);
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

  return (
    <div
      className="hidden relative w-full flex flex-row justify-between items-center px-4 gap-6 border border-gray-800 rounded-lg
        transition-all hover:border-white sm:w-72 sm:min-w-72 sm:flex-col sm:flex-start sm:gap-2 sm:px-2 sm:py-2 sm:border-2"
      ref={divRef}
    >
      {/* 오퍼레이터 이미지 및 이름 */}
      <div className="w-full flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <div className="relative w-10 min-w-10 aspect-square select-none sm:w-10 sm:min-w-10">
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
      <div className="w-full flex items-center px-1 py-2">
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
            value={elite}
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
            value={targetElite}
            onInput={(event) => {
              handleEliteChange(event, "target");
            }}
            onKeyDown={(event) => handleExponentialNotation(event)}
          ></input>
        </div>
      </div>
      {/* 스킬 */}
      <div className="w-full min-h-36 flex flex-col gap-3 px-1">
        {operator.skillList.map((skill, index) => {
          return (
            <SingleSkill
              key={skill}
              skill={skill}
              index={index}
              skillLevels={skillLevels}
              handleSkillLevelChange={handleSkillLevelChange}
            />
          );
        })}
      </div>
    </div>
  );
}
