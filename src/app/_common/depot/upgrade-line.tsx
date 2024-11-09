"use client";

import React, { useState, useEffect, useRef } from "react";
import { SingleMaterial } from "@common/depot";
import { CountableMaterial, TierType } from "@data/material";

/** 창고의 정예화 재료 목록 */
export default function UpgradeLine({
  list,
  skipZero = false,
  readonly = false,
}: {
  list: CountableMaterial[];
  skipZero?: boolean;
  readonly?: boolean;
}) {
  /** 티어별 재료 타입 */
  type MaterialByTierType = {
    [key in TierType]: CountableMaterial[];
  };

  /** 티어별 재료 */
  const materialByTier = useRef<MaterialByTierType>({
    5: [],
    4: [],
    3: [],
    2: [],
    1: [],
  });

  /** 티어별 재료의 존재 여부 */
  const materialExists = useRef<boolean>(false);
  const materialExistsByTier = useRef<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  /** 티어별 재료에 따른 JSX 엘리먼트 리스트 */
  const [tierLines, setTierLines] = useState<React.JSX.Element[]>([]);

  // 티어별 재료를 설정
  useEffect(() => {
    // 티어별 재료를 초기화 및 재설정
    materialByTier.current = {
      5: [],
      4: [],
      3: [],
      2: [],
      1: [],
    };
    list.forEach((upgrade) => {
      materialByTier.current[upgrade.material.tier].push(upgrade);
      if (skipZero && upgrade.count > 0) {
        // 재료 존재 여부를 확인 후 설정
        materialExists.current = true;
        materialExistsByTier.current[upgrade.material.tier] = true;
      }
    });

    // 티어별 재료에 맞게 JSX 엘리먼트를 생성
    const upgradeTierLines = Object.entries(materialByTier.current)
      .reverse()
      .map((materials) => {
        // Key(티어), Value(티어별 재료 리스트)
        const key = materials[0];
        const value = materials[1];

        if (value.length > 0) {
          // 티어별 재료가 존재한다면, 각각 티어에 맞게 창고 데이터를 생성
          return (
            <div
              key={key}
              className={`${
                skipZero &&
                !materialExistsByTier.current[parseInt(key, 10)] &&
                "hidden"
              } flex flex-col gap-[2px]`}
            >
              <p className="leading-tight font-semibold text-xl text-gray-300 break-keep px-2">
                {key}티어
              </p>
              <div className="flex flex-row flex-wrap gap-2">
                {value.map((upgrade) => {
                  if (!skipZero || upgrade.count > 0) {
                    return (
                      <SingleMaterial
                        key={upgrade.material.id}
                        countableMaterial={upgrade}
                        readonly={readonly}
                      />
                    );
                  }
                })}
              </div>
            </div>
          );
        } else {
          return <></>;
        }
      });

    setTierLines(upgradeTierLines);
  }, [list, skipZero, readonly]);

  return (
    <div
      className={`${
        skipZero && !materialExists.current && "hidden"
      } flex flex-col items-start`}
    >
      <p className="leading-tight font-semibold text-2xl text-white break-keep">
        정예화 재료
      </p>
      <div className="w-full flex flex-col gap-4">
        {tierLines.map((tierLine) => tierLine)}
      </div>
    </div>
  );
}
