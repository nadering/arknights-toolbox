import type { InputEvent } from "react";
import type { EliteNumber, SkillLevel } from "@/data/operator";
import { handleExponentialNotation } from "@/tool";

/** 오퍼레이터의 단일 스킬 */
export default function SingleSkill({
  skill,
  index,
  currentElite,
  targetElite,
  skillLevels,
  handleSkillLevelChange,
  handleCommonSkillLevels,
}: {
  skill: string;
  index: number;
  currentElite: EliteNumber;
  targetElite: EliteNumber;
  skillLevels: SkillLevel[];
  handleSkillLevelChange: (
    event: InputEvent<HTMLInputElement>,
    type: "current" | "target",
    index: number,
  ) => void;
  handleCommonSkillLevels: (type: "current" | "target", index: number) => void;
}) {
  const skillLevel = skillLevels[index];

  if (!skillLevel) {
    return null;
  }

  // 현재 정예화에 따른 스킬 입력창 활성화 여부
  const isAbleAtCurrentElite = currentElite >= index;

  // 목표 정예화에 따른 스킬 활성화 여부
  const isActive = targetElite >= index;

  const currentSkillValue = Number.isNaN(skillLevel.current)
    ? ""
    : skillLevel.current;

  const targetSkillValue = Number.isNaN(skillLevel.target)
    ? ""
    : skillLevel.target;

  return (
    <div
      className={`${isActive ? "" : "select-none"} flex w-full flex-row gap-2`}
    >
      <div className="flex w-full flex-col items-start">
        <p className="leading-tight text-gray-600 break-keep">
          스킬 {index + 1}
        </p>

        <p
          className={`pl-1 leading-tight font-medium break-keep ${
            isActive ? "text-gray-200" : "text-gray-600"
          }`}
        >
          {skill}
        </p>
      </div>

      <div className="flex flex-row items-center gap-[6px]">
        <input
          className={`h-6 w-9 resize-none rounded-lg bg-dark-800 px-2 py-3 text-center outline-none selection:bg-gray-800 ${
            isAbleAtCurrentElite ? "text-gray-200" : "text-gray-600"
          } [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
          id={`${skill}-current`}
          type={isActive ? "number" : "hidden"}
          min={1}
          max={10}
          step={1}
          value={currentSkillValue}
          disabled={!isAbleAtCurrentElite}
          onInput={(event) => {
            handleSkillLevelChange(event, "current", index);
          }}
          onBlur={() => {
            handleCommonSkillLevels("current", index);
          }}
          onKeyDown={handleExponentialNotation}
        />

        <p
          className={`${
            isActive ? "" : "hidden"
          } text-[10px] leading-tight font-medium text-dark-800 select-none selection:bg-transparent`}
        >
          ▶
        </p>

        <input
          className="h-6 w-9 resize-none rounded-lg bg-dark-800 px-2 py-3 text-center text-gray-200 outline-none selection:bg-gray-800 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          id={`${skill}-target`}
          type={isActive ? "number" : "hidden"}
          min={1}
          max={10}
          step={1}
          value={targetSkillValue}
          disabled={!isActive}
          onInput={(event) => {
            handleSkillLevelChange(event, "target", index);
          }}
          onBlur={() => {
            handleCommonSkillLevels("target", index);
          }}
          onKeyDown={handleExponentialNotation}
        />
      </div>
    </div>
  );
}
