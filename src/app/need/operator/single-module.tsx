import type { InputEvent } from "react";
import {
  type EliteNumber,
  MODULE_ACTIVE_ELITE,
  type ModuleLevel,
  MODULE_LEVEL_REQUIRED,
  MODULE_MAX_LEVEL,
  type RarityNumber,
} from "@/data/operator";
import { handleExponentialNotation } from "@/tool";

/** 오퍼레이터의 단일 모듈 */
export default function SingleModule({
  index,
  rarity,
  currentElite,
  targetElite,
  currentLevel,
  targetLevel,
  moduleLevels,
  handleModuleLevelChange,
}: {
  index: number;
  rarity: RarityNumber;
  currentElite: EliteNumber;
  targetElite: EliteNumber;
  currentLevel: number;
  targetLevel: number;
  moduleLevels: ModuleLevel[];
  handleModuleLevelChange: (
    event: InputEvent<HTMLInputElement>,
    type: "current" | "target",
    index: number,
  ) => void;
}) {
  const operatorModule = moduleLevels[index];

  if (!operatorModule) {
    return null;
  }

  // 현재 정예화 및 레벨에서 모듈을 사용할 수 있는지 여부
  const isAbleAtCurrentElite =
    currentElite >= MODULE_ACTIVE_ELITE &&
    currentLevel >= MODULE_LEVEL_REQUIRED[rarity];

  // 목표 정예화 및 레벨에서 모듈을 활성화할 수 있는지 여부
  const isActive =
    targetElite >= MODULE_ACTIVE_ELITE &&
    targetLevel >= MODULE_LEVEL_REQUIRED[rarity];

  return (
    <div
      className={`${isActive ? "" : "select-none"} flex w-full flex-row gap-2`}
    >
      <div className="flex w-full flex-col items-start">
        <p className="leading-tight text-gray-600 break-keep">
          {operatorModule.type}
        </p>

        <p
          className={`pl-1 leading-tight font-medium break-keep ${
            isActive ? "text-gray-200" : "text-gray-600"
          }`}
        >
          {operatorModule.name}
        </p>
      </div>

      <div className="flex flex-row items-center gap-[6px]">
        <input
          className={`h-6 w-9 resize-none rounded-lg bg-dark-800 px-2 py-3 text-center outline-none selection:bg-gray-800 ${
            isAbleAtCurrentElite ? "text-gray-200" : "text-gray-600"
          } [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
          id={`${operatorModule.type}-current`}
          type={isActive ? "number" : "hidden"}
          min={0}
          max={MODULE_MAX_LEVEL}
          step={1}
          value={operatorModule.current}
          disabled={!isAbleAtCurrentElite}
          onInput={(event) => {
            handleModuleLevelChange(event, "current", index);
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
          id={`${operatorModule.type}-target`}
          type={isActive ? "number" : "hidden"}
          min={0}
          max={MODULE_MAX_LEVEL}
          step={1}
          value={operatorModule.target}
          disabled={!isActive}
          onInput={(event) => {
            handleModuleLevelChange(event, "target", index);
          }}
          onKeyDown={handleExponentialNotation}
        />
      </div>
    </div>
  );
}
