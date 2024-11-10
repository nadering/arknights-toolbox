import { FormEvent, useEffect, useState } from "react";
import { EliteNumber, ModuleLevel, ModuleMaxLevel } from "@/data/operator";
import { handleExponentialNotation } from "@/tool";

/** 오퍼레이터의 단일 모듈 */
export default function SingleModule({
  index,
  elite,
  targetElite,
  moduleLevels,
  handleModuleLevelChange,
}: {
  index: number;
  elite: EliteNumber;
  targetElite: EliteNumber;
  moduleLevels: ModuleLevel[];
  handleModuleLevelChange: (
    event: FormEvent<HTMLInputElement>,
    type: "current" | "target",
    index: number
  ) => void;
}) {
  // 현재 정예화에 따른 모듈 현재 입력창 색상 설정 여부
  const isAbleAtCurrentElite = elite >= 2;

  // 목표 정예화에 따른 모듈 활성화 여부
  const isActive = targetElite >= 2;

  // 스킬 문자열 설정
  const [currentModuleString, setCurrentModuleString] = useState(
    moduleLevels[index].current.toString()
  );
  const [targetModuleString, setTargetModuleString] = useState(
    moduleLevels[index].target.toString()
  );

  useEffect(() => {
    setCurrentModuleString(moduleLevels[index].current.toString());
    setTargetModuleString(moduleLevels[index].target.toString());
  }, [index, moduleLevels]);

  return (
    <div
      className={`${!isActive ? "select-none" : ""} w-full flex flex-row gap-2`}
    >
      <div className="w-full flex flex-col items-start">
        <p className="leading-tight text-gray-600 break-keep">
          {moduleLevels[index].type}
        </p>
        <p
          className={`pl-1 leading-tight font-medium ${
            isActive ? "text-gray-200" : "text-gray-600"
          } break-keep`}
        >
          {moduleLevels[index].name}
        </p>
      </div>
      <div className="flex flex-row items-center gap-[6px]">
        <input
          className={`w-8 h-6 px-2 py-3 resize-none rounded-lg
          outline-none bg-dark-800 selection:bg-gray-800 ${
            isAbleAtCurrentElite ? "text-gray-200" : "text-gray-600"
          } text-center 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          id={`${moduleLevels[index].type}-current`}
          type={isActive ? "number" : "hidden"}
          min={0}
          max={ModuleMaxLevel}
          step={1}
          value={currentModuleString}
          disabled={!isAbleAtCurrentElite}
          onInput={(event) => handleModuleLevelChange(event, "current", index)}
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
          id={`${moduleLevels[index].type}-target`}
          type={isActive ? "number" : "hidden"}
          min={0}
          max={ModuleMaxLevel}
          step={1}
          value={targetModuleString}
          disabled={!isActive}
          onInput={(event) => handleModuleLevelChange(event, "target", index)}
          onKeyDown={(event) => handleExponentialNotation(event)}
        ></input>
      </div>
    </div>
  );
}
