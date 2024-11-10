import { FormEvent, useEffect, useState } from "react";
import { EliteNumber, SkillLevel } from "@/data/operator";
import { handleExponentialNotation } from "@/tool";

/** 오퍼레이터의 단일 스킬 */
export default function SingleSkill({
  skill,
  index,
  elite,
  targetElite,
  skillLevels,
  handleSkillLevelChange,
  handleCommonSkillLevels,
}: {
  skill: string;
  index: number;
  elite: EliteNumber;
  targetElite: EliteNumber;
  skillLevels: SkillLevel[];
  handleSkillLevelChange: (
    event: FormEvent<HTMLInputElement>,
    type: "current" | "target",
    index: number
  ) => void;
  handleCommonSkillLevels: (
    type: "current" | "target",
    index: number
  ) => void;
}) {
  // 현재 정예화에 따른 스킬 입력창 색상 설정 여부
  const isAbleAtCurrentElite = elite >= index;

  // 목표 정예화에 따른 스킬 활성화 여부
  const isActive = targetElite >= index;

  // 스킬 문자열 설정
  const [currentSkillString, setCurrentSkillString] = useState(
    skillLevels[index].current.toString()
  );
  const [targetSkillString, setTargetSkillString] = useState(
    skillLevels[index].target.toString()
  );

  useEffect(() => {
    if (isNaN(skillLevels[index].current)) {
      setCurrentSkillString("");
    } else {
      setCurrentSkillString(skillLevels[index].current.toString());
    }

    if (isNaN(skillLevels[index].target)) {
      setTargetSkillString("");
    } else {
      setTargetSkillString(skillLevels[index].target.toString());
    }
  }, [index, skillLevels]);

  return (
    <div
      className={`${!isActive ? "select-none" : ""} w-full flex flex-row gap-2`}
    >
      <div className="w-full flex flex-col items-start">
        <p className="leading-tight text-gray-600 break-keep">
          스킬 {index + 1}
        </p>
        <p
          className={`pl-1 leading-tight font-medium ${
            isActive ? "text-gray-200" : "text-gray-600"
          } break-keep`}
        >
          {skill}
        </p>
      </div>
      <div className="flex flex-row items-center gap-[6px]">
        <input
          className={`w-8 h-6 px-2 py-3 resize-none rounded-lg
          outline-none bg-dark-800 selection:bg-gray-800 ${
            isAbleAtCurrentElite ? "text-gray-200" : "text-gray-600"
          } text-center 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          id={`${skill}-current`}
          type={isActive ? "number" : "hidden"}
          min={1}
          max={10}
          step={1}
          value={currentSkillString}
          disabled={!isAbleAtCurrentElite}
          onInput={(event) => handleSkillLevelChange(event, "current", index)}
          onBlur={() => {
            handleCommonSkillLevels("current", index);
          }}
          onKeyDown={(event) => handleExponentialNotation(event)}
        ></input>
        <p
          className={`${
            isActive ? "" : "hidden"
          } leading-tight font-medium text-[10px] text-dark-800 select-none selection:bg-transparent`}
        >
          ▶
        </p>
        <input
          className={`w-8 h-6 px-2 py-3 resize-none rounded-lg
          outline-none bg-dark-800 selection:bg-gray-800 text-gray-200 text-center 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          id={`${skill}-target`}
          type={isActive ? "number" : "hidden"}
          min={1}
          max={10}
          step={1}
          value={targetSkillString}
          disabled={!isActive}
          onInput={(event) => handleSkillLevelChange(event, "target", index)}
          onBlur={() => {
            handleCommonSkillLevels("target", index);
          }}
          onKeyDown={(event) => handleExponentialNotation(event)}
        ></input>
      </div>
    </div>
  );
}
