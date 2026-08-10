"use client";

import { type InputEvent, useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import {
  type EliteNumber,
  MAX_ELITE_TABLE,
  MAX_LEVEL_TABLE,
  type ModuleLevel,
  MODULE_MAX_LEVEL,
  type Operator,
  type SkillLevel,
  SKILL_MAX_LEVEL_TABLE,
} from "@/data/operator";
import { handleExponentialNotation } from "@/tool";
import {
  operatorCollapsedAtom,
  type OperatorMaterial,
  selectedOperatorsAtom,
  selectedOperatorsMaterialAtom,
  userNeedInitializedAtom,
} from "@/store";
import SingleSkill from "./single-skill";
import SingleModule from "./single-module";

type OperatorTarget = OperatorMaterial["target"];

type CollapseState = {
  globalValue: boolean;
  localValue: boolean;
};

const cloneSkillLevels = (skillLevels: SkillLevel[]) =>
  skillLevels.map((skillLevel) => ({ ...skillLevel }));

const cloneModuleLevels = (moduleLevels: ModuleLevel[]) =>
  moduleLevels.map((moduleLevel) => ({ ...moduleLevel }));

/** 스킬 레벨을 현재 및 목표 정예화 단계의 허용 범위로 조정 */
const normalizeSkillLevels = (
  skillLevels: SkillLevel[],
  currentElite: EliteNumber,
  targetElite: EliteNumber,
) => {
  const currentMaxLevel = SKILL_MAX_LEVEL_TABLE[currentElite];
  const targetMaxLevel = SKILL_MAX_LEVEL_TABLE[targetElite];

  return skillLevels.map((skillLevel) => {
    const current = Math.min(skillLevel.current, currentMaxLevel);
    let target = Math.min(skillLevel.target, targetMaxLevel);

    if (current > target) {
      target = current;
    }

    return {
      ...skillLevel,
      current,
      target,
    };
  });
};

/** 오퍼레이터의 기본 육성 목표를 생성 */
const createDefaultOperatorTarget = (operator: Operator): OperatorTarget => {
  const targetElite = MAX_ELITE_TABLE[operator.rarity];

  const skillLevels = operator.skillList.map((skill, index) => {
    const isPreferredSkill =
      operator.preferSkillIndexes?.includes(index as 0 | 1 | 2) ??
      operator.preferSkillList?.includes(skill) ??
      false;

    const target = isPreferredSkill
      ? SKILL_MAX_LEVEL_TABLE[targetElite]
      : SKILL_MAX_LEVEL_TABLE[Math.max(0, targetElite - 1) as EliteNumber];

    return {
      index,
      name: skill,
      current: 1,
      target,
    };
  });

  const moduleLevels = operator.moduleList.map((module) => {
    const preferredModule =
      operator.preferModules?.find((preference) => {
        return preference.type === module.type;
      }) ??
      operator.preferModuleList?.find((preference) => {
        return preference.module.type === module.type;
      });

    return {
      type: module.type,
      name: module.name,
      current: 0,
      target: preferredModule?.level ?? 0,
    };
  });

  return {
    currentElite: 0,
    targetElite,
    currentLevel: 1,
    targetLevel: MAX_LEVEL_TABLE[operator.rarity][targetElite],
    skillLevels,
    moduleLevels,
  };
};

/** 저장된 값이 있으면 복사해 사용하고, 없으면 기본 육성 목표를 생성 */
const createInitialOperatorTarget = (
  operator: Operator,
  savedOperatorMaterial?: OperatorMaterial,
): OperatorTarget => {
  if (!savedOperatorMaterial) {
    return createDefaultOperatorTarget(operator);
  }

  return {
    ...savedOperatorMaterial.target,
    skillLevels: cloneSkillLevels(savedOperatorMaterial.target.skillLevels),
    moduleLevels: cloneModuleLevels(savedOperatorMaterial.target.moduleLevels),
  };
};

/** 육성하려는 오퍼레이터 한 명을 표현하는 컴포넌트 */
export default function SingleOperator({ operator }: { operator: Operator }) {
  /** 오퍼레이터 이미지 */
  const operatorImageSrc = `/images/operator/list/${operator.class.toLowerCase()}/${
    operator.imageFilename
  }.png`;

  // 선택된 오퍼레이터
  const [selectedOperators, setSelectedOperators] = useAtom(
    selectedOperatorsAtom,
  );

  // 오퍼레이터 육성 재료 설정
  const [selectedOperatorsMaterial, setSelectedOperatorsMaterial] = useAtom(
    selectedOperatorsMaterialAtom,
  );

  // 사용자의 필요 재료가 설정되었는지 여부를 설정
  const setUserNeedInitialized = useSetAtom(userNeedInitializedAtom);

  const savedOperatorMaterial = selectedOperatorsMaterial.find(
    (operatorMaterial) => operatorMaterial.id === operator.id,
  );

  const [operatorTarget, setOperatorTarget] = useState<OperatorTarget>(() =>
    createInitialOperatorTarget(operator, savedOperatorMaterial),
  );

  const {
    currentElite,
    targetElite,
    currentLevel,
    targetLevel,
    skillLevels,
    moduleLevels,
  } = operatorTarget;

  // 전체 오퍼레이터 접기/펼치기 상태
  const allOperatorCollapsed = useAtomValue(operatorCollapsedAtom);

  // 전체 상태가 바뀌면 이를 따르고, 이후 개별 클릭부터 로컬 상태를 사용
  const [collapseState, setCollapseState] = useState<CollapseState>(() => ({
    globalValue: allOperatorCollapsed,
    localValue: allOperatorCollapsed,
  }));

  const singleOperatorCollapsed =
    collapseState.globalValue === allOperatorCollapsed
      ? collapseState.localValue
      : allOperatorCollapsed;

  /** 애니메이션을 위해 노드를 참조하는 Ref */
  const divRef = useRef<HTMLDivElement>(null);

  /** 레벨을 정예화 단계의 허용 범위로 조정 */
  const normalizeLevelRange = (
    target: OperatorTarget,
    targetEliteChanged = false,
  ): OperatorTarget => {
    const currentMaxLevel =
      MAX_LEVEL_TABLE[operator.rarity][target.currentElite];
    const targetMaxLevel = MAX_LEVEL_TABLE[operator.rarity][target.targetElite];

    let nextCurrentLevel = target.currentLevel;
    let nextTargetLevel = targetEliteChanged
      ? targetMaxLevel
      : target.targetLevel;

    if (!Number.isNaN(nextCurrentLevel)) {
      nextCurrentLevel = Math.min(
        Math.max(nextCurrentLevel, 1),
        currentMaxLevel,
      );
    }

    if (!Number.isNaN(nextTargetLevel)) {
      nextTargetLevel = Math.min(Math.max(nextTargetLevel, 1), targetMaxLevel);
    }

    if (
      target.currentElite === target.targetElite &&
      !Number.isNaN(nextCurrentLevel) &&
      (Number.isNaN(nextTargetLevel) || nextCurrentLevel > nextTargetLevel)
    ) {
      nextTargetLevel = nextCurrentLevel;
    }

    return {
      ...target,
      currentLevel: nextCurrentLevel,
      targetLevel: nextTargetLevel,
    };
  };

  /** 정예화 단계 변경을 담당 */
  const handleEliteChange = (
    event: InputEvent<HTMLInputElement>,
    type: "current" | "target",
  ) => {
    let value = event.currentTarget.value;

    if (value.length > 1) {
      value = value.replace(/^0+/, "");
    }

    if (value.length === 0) {
      value = "0";
    }

    const valueNumber = Math.min(
      Number.parseInt(value, 10),
      MAX_ELITE_TABLE[operator.rarity],
    ) as EliteNumber;

    setOperatorTarget((previousTarget) => {
      const nextCurrentElite =
        type === "current" ? valueNumber : previousTarget.currentElite;
      const nextTargetElite =
        type === "current"
          ? Math.max(valueNumber, previousTarget.targetElite)
          : Math.max(valueNumber, previousTarget.currentElite);
      const typedTargetElite = nextTargetElite as EliteNumber;
      const targetEliteChanged =
        typedTargetElite !== previousTarget.targetElite;

      const nextTarget: OperatorTarget = {
        ...previousTarget,
        currentElite: nextCurrentElite,
        targetElite: typedTargetElite,
        skillLevels: normalizeSkillLevels(
          previousTarget.skillLevels,
          nextCurrentElite,
          typedTargetElite,
        ),
      };

      return normalizeLevelRange(nextTarget, targetEliteChanged);
    });
  };

  /** 레벨 변경을 담당 */
  const handleLevelChange = (
    event: InputEvent<HTMLInputElement>,
    type: "current" | "target",
  ) => {
    let value = event.currentTarget.value;

    if (value.length > 1) {
      value = value.replace(/^0+/, "");
    }

    setOperatorTarget((previousTarget) => {
      const elite =
        type === "current"
          ? previousTarget.currentElite
          : previousTarget.targetElite;
      const valueNumber = Math.min(
        Number.parseInt(value, 10),
        MAX_LEVEL_TABLE[operator.rarity][elite],
      );

      if (type === "current") {
        const shouldRaiseTarget =
          !Number.isNaN(valueNumber) &&
          previousTarget.currentElite === previousTarget.targetElite &&
          valueNumber > previousTarget.targetLevel;

        return {
          ...previousTarget,
          currentLevel: valueNumber,
          targetLevel: shouldRaiseTarget
            ? valueNumber
            : previousTarget.targetLevel,
        };
      }

      return {
        ...previousTarget,
        targetLevel: valueNumber,
      };
    });
  };

  /** 레벨이 비어 있지 않고 허용 범위 안에 있도록 설정 */
  const handleLevelBlur = (type: "current" | "target") => {
    setOperatorTarget((previousTarget) => {
      let nextCurrentLevel = previousTarget.currentLevel;
      let nextTargetLevel = previousTarget.targetLevel;

      if (type === "current" && Number.isNaN(nextCurrentLevel)) {
        nextCurrentLevel = 1;
      }

      if (type === "target" && Number.isNaN(nextTargetLevel)) {
        nextTargetLevel =
          previousTarget.currentElite === previousTarget.targetElite
            ? Number.isNaN(nextCurrentLevel)
              ? 1
              : nextCurrentLevel
            : 1;
      }

      return normalizeLevelRange({
        ...previousTarget,
        currentLevel: nextCurrentLevel,
        targetLevel: nextTargetLevel,
      });
    });
  };

  /** 스킬 레벨 변경을 담당 */
  const handleSkillLevelChange = (
    event: InputEvent<HTMLInputElement>,
    type: "current" | "target",
    index: number,
  ) => {
    let value = event.currentTarget.value;

    if (value.length > 1) {
      value = value.replace(/^0+/, "");
    }

    let valueNumber = Number.parseInt(value, 10);

    if (valueNumber === 0) {
      valueNumber = 1;
    }

    setOperatorTarget((previousTarget) => {
      const nextSkillLevels = previousTarget.skillLevels.map(
        (skillLevel, skillIndex) =>
          skillIndex === index
            ? {
                ...skillLevel,
                [type]: valueNumber,
              }
            : skillLevel,
      );

      return {
        ...previousTarget,
        skillLevels: normalizeSkillLevels(
          nextSkillLevels,
          previousTarget.currentElite,
          previousTarget.targetElite,
        ),
      };
    });
  };

  /** 스킬 레벨이 7레벨까지 공통으로 변경되는 부분 설정 */
  const handleCommonSkillLevels = (
    type: "current" | "target",
    index: number,
  ) => {
    setOperatorTarget((previousTarget) => {
      const selectedSkillLevel = previousTarget.skillLevels[index]?.[type];

      if (selectedSkillLevel === undefined) {
        return previousTarget;
      }

      const nextSkillLevels = previousTarget.skillLevels.map((skillLevel) => {
        if (Number.isNaN(selectedSkillLevel)) {
          return {
            ...skillLevel,
            [type]: 1,
          };
        }

        if (selectedSkillLevel < 7) {
          const nextTarget =
            type === "current" && selectedSkillLevel > skillLevel.target
              ? selectedSkillLevel
              : skillLevel.target;

          return {
            ...skillLevel,
            [type]: selectedSkillLevel,
            target: nextTarget,
          };
        }

        if (skillLevel[type] >= 7) {
          return skillLevel;
        }

        return {
          ...skillLevel,
          [type]: 7,
          target:
            type === "current" && skillLevel.target < 7 ? 7 : skillLevel.target,
        };
      });

      return {
        ...previousTarget,
        skillLevels: normalizeSkillLevels(
          nextSkillLevels,
          previousTarget.currentElite,
          previousTarget.targetElite,
        ),
      };
    });
  };

  /** 모듈 레벨 변경을 담당 */
  const handleModuleLevelChange = (
    event: InputEvent<HTMLInputElement>,
    type: "current" | "target",
    index: number,
  ) => {
    let value = event.currentTarget.value;

    if (value.length > 1) {
      value = value.replace(/^0+/, "");
    }

    if (value.length === 0) {
      value = "0";
    }

    const valueNumber = Math.min(Number.parseInt(value, 10), MODULE_MAX_LEVEL);

    setOperatorTarget((previousTarget) => ({
      ...previousTarget,
      moduleLevels: previousTarget.moduleLevels.map(
        (moduleLevel, moduleIndex) => {
          if (moduleIndex !== index) {
            return moduleLevel;
          }

          const nextModuleLevel = {
            ...moduleLevel,
            [type]: valueNumber,
          };

          return nextModuleLevel.current > nextModuleLevel.target
            ? {
                ...nextModuleLevel,
                target: nextModuleLevel.current,
              }
            : nextModuleLevel;
        },
      ),
    }));
  };

  /** 선택된 오퍼레이터에서 제거 */
  const removeSelf = () => {
    const newSelectedOperators = selectedOperators.filter(
      (operatorId) => operatorId !== operator.id,
    );
    const newSelectedOperatorsMaterial = selectedOperatorsMaterial.filter(
      (operatorMaterial) => operatorMaterial.id !== operator.id,
    );

    setSelectedOperators(newSelectedOperators);
    setSelectedOperatorsMaterial(newSelectedOperatorsMaterial);

    if (newSelectedOperators.length === 0) {
      setUserNeedInitialized(false);

      if (typeof window !== "undefined") {
        localStorage.removeItem("selectedOperators");
        localStorage.removeItem("selectedOperatorsMaterial");
        localStorage.removeItem("userNeed");
      }
    }
  };

  // 애니메이션 (오퍼레이터가 추가될 경우, 아래쪽으로 이동하며 Fade-in으로 나타남)
  useEffect(() => {
    const element = divRef.current;

    if (!element) {
      return;
    }

    const animateClass = "animate-[fade-in-down_0.2s_ease-in-out]";

    element.classList.remove("hidden");
    element.classList.add(animateClass);

    const timeoutId = window.setTimeout(() => {
      element.classList.remove(animateClass);
    }, 200);

    return () => {
      window.clearTimeout(timeoutId);
      element.classList.remove(animateClass);
    };
  }, []);

  // 현재 오퍼레이터의 육성 목표를 전역 상태에 반영
  useEffect(() => {
    const currentLevelData = Number.isNaN(currentLevel) ? 1 : currentLevel;
    const targetLevelData = Number.isNaN(targetLevel)
      ? 1
      : currentElite === targetElite && currentLevelData > targetLevel
        ? currentLevelData
        : targetLevel;

    const currentOperatorMaterial: OperatorMaterial = {
      id: operator.id,
      rarity: operator.rarity,
      target: {
        currentElite,
        targetElite,
        currentLevel: currentLevelData,
        targetLevel: targetLevelData,
        skillLevels: cloneSkillLevels(skillLevels),
        moduleLevels: cloneModuleLevels(moduleLevels),
      },
    };

    setSelectedOperatorsMaterial((previousMaterials) => {
      const operatorExists = previousMaterials.some(
        (operatorMaterial) => operatorMaterial.id === operator.id,
      );

      if (!operatorExists) {
        return [...previousMaterials, currentOperatorMaterial];
      }

      return previousMaterials.map((operatorMaterial) =>
        operatorMaterial.id === operator.id
          ? currentOperatorMaterial
          : operatorMaterial,
      );
    });

    setUserNeedInitialized(true);
  }, [
    currentElite,
    currentLevel,
    moduleLevels,
    operator.id,
    operator.rarity,
    setSelectedOperatorsMaterial,
    setUserNeedInitialized,
    skillLevels,
    targetElite,
    targetLevel,
  ]);

  const currentLevelString = Number.isNaN(currentLevel)
    ? ""
    : currentLevel.toString();
  const targetLevelString = Number.isNaN(targetLevel)
    ? ""
    : targetLevel.toString();

  return (
    <div
      className="hidden relative w-[234px] min-w-[234px] flex flex-col justify-between items-center gap-4 border-2 border-gray-800
        rounded-lg transition-all hover:border-white"
      onContextMenu={(event) => {
        event.preventDefault();
        removeSelf();
      }}
      ref={divRef}
    >
      {/* 오퍼레이터 이미지 및 이름 */}
      <div
        className="w-full flex flex-row justify-center items-center gap-3 p-2 cursor-pointer"
        onClick={() => {
          setCollapseState({
            globalValue: allOperatorCollapsed,
            localValue: !singleOperatorCollapsed,
          });
        }}
      >
        <div className="relative w-10 min-w-10 aspect-square select-none selection:bg-transparent">
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

      {/* 오퍼레이터 정보 */}
      <div
        className={`${
          singleOperatorCollapsed ? "hidden" : ""
        } w-full flex flex-col gap-6 px-2`}
      >
        <div className="w-full flex flex-col gap-4">
          {/* 정예화 */}
          <div className="w-full flex items-center px-1">
            <p className="pl-1 w-full leading-tight font-medium text-gray-200 break-keep">
              정예화
            </p>
            <div className="flex flex-row items-center gap-[6px]">
              <input
                className="w-9 h-6 px-2 py-3 resize-none rounded-lg
                outline-none bg-dark-800 selection:bg-gray-800 text-gray-200 text-center
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                id={`${operator.id}-current-elite`}
                type="number"
                min={0}
                max={MAX_ELITE_TABLE[operator.rarity]}
                step={1}
                value={currentElite.toString()}
                onInput={(event) => {
                  handleEliteChange(event, "current");
                }}
                onKeyDown={handleExponentialNotation}
              />
              <p className="leading-tight font-medium text-[10px] text-dark-800 select-none selection:bg-transparent">
                ▶
              </p>
              <input
                className="w-9 h-6 px-2 py-3 resize-none rounded-lg
                outline-none bg-dark-800 selection:bg-gray-800 text-gray-200 text-center
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                id={`${operator.id}-target-elite`}
                type="number"
                min={0}
                max={MAX_ELITE_TABLE[operator.rarity]}
                step={1}
                value={targetElite.toString()}
                onInput={(event) => {
                  handleEliteChange(event, "target");
                }}
                onKeyDown={handleExponentialNotation}
              />
            </div>
          </div>

          {/* 레벨 */}
          <div className="w-full flex items-center px-1">
            <p className="pl-1 w-full leading-tight font-medium text-gray-200 break-keep">
              레벨
            </p>
            <div className="flex flex-row items-center gap-[6px]">
              <input
                className="w-9 h-6 px-2 py-3 resize-none rounded-lg
                outline-none bg-dark-800 selection:bg-gray-800 text-gray-200 text-center
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                id={`${operator.id}-current-level`}
                type="number"
                min={1}
                max={MAX_LEVEL_TABLE[operator.rarity][currentElite]}
                step={1}
                value={currentLevelString}
                onInput={(event) => {
                  handleLevelChange(event, "current");
                }}
                onKeyDown={handleExponentialNotation}
                onBlur={() => handleLevelBlur("current")}
              />
              <p className="leading-tight font-medium text-[10px] text-dark-800 select-none selection:bg-transparent">
                ▶
              </p>
              <input
                className="w-9 h-6 px-2 py-3 resize-none rounded-lg
                outline-none bg-dark-800 selection:bg-gray-800 text-gray-200 text-center
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                id={`${operator.id}-target-level`}
                type="number"
                min={1}
                max={MAX_LEVEL_TABLE[operator.rarity][targetElite]}
                step={1}
                value={targetLevelString}
                onInput={(event) => {
                  handleLevelChange(event, "target");
                }}
                onKeyDown={handleExponentialNotation}
                onBlur={() => handleLevelBlur("target")}
              />
            </div>
          </div>
        </div>

        {/* 스킬 */}
        <div className="w-full flex flex-col gap-2 px-1">
          {operator.skillList.map((skill, index) => (
            <SingleSkill
              key={skill}
              skill={skill}
              index={index}
              currentElite={currentElite}
              targetElite={targetElite}
              skillLevels={skillLevels}
              handleSkillLevelChange={handleSkillLevelChange}
              handleCommonSkillLevels={handleCommonSkillLevels}
            />
          ))}
        </div>

        {/* 모듈 */}
        <div
          className={`${
            operator.moduleList.length === 0 ? "hidden" : ""
          } w-full flex flex-col gap-2 px-1`}
        >
          {operator.moduleList.map((module, index) => (
            <SingleModule
              key={module.type}
              index={index}
              rarity={operator.rarity}
              currentElite={currentElite}
              targetElite={targetElite}
              currentLevel={currentLevel}
              targetLevel={targetLevel}
              moduleLevels={moduleLevels}
              handleModuleLevelChange={handleModuleLevelChange}
            />
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div
        className={`${
          singleOperatorCollapsed ? "hidden" : ""
        } w-full flex flex-row justify-center items-center px-2 pb-2`}
      >
        <button
          type="button"
          className="group relative w-6 selection:bg-transparent aspect-square"
          onClick={removeSelf}
        >
          <Image
            className="transition:[filter_0s] [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
            hover:[filter:invert(98%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]"
            src="/images/others/erase.png"
            alt="remove-operator"
            fill
            sizes="10vw"
            draggable={false}
          />
          <p
            className="hidden absolute inset-x-auto top-0 z-10 px-3 py-[2px] bg-gray-900 text-gray-200 text-center text-nowrap
            rounded-lg translate-x-[-13px] translate-y-[-33px] group-hover:block"
          >
            삭제
          </p>
        </button>
      </div>
    </div>
  );
}
