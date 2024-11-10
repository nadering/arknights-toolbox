"use client";

import React, { useState, useEffect } from "react";
import { SingleMaterial } from "@common/depot";
import { CountableMaterial, TierType } from "@data/material";

/** 창고의 정예화 재료 목록 */
export default function UpgradeLine({
  list,
  skipZero = false,
  readonly = false,
  userDepotUse = false,
}: {
  list: CountableMaterial[];
  skipZero?: boolean;
  readonly?: boolean;
  userDepotUse?: boolean;
}) {
  /** 티어별 재료 타입 */
  type MaterialByTierType = {
    [key in TierType]: CountableMaterial[];
  };

  /** 티어별 재료의 존재 여부 */
  const [materialExists, setMaterialExists] = useState<boolean>(false);
  const [materialExistsByTier, setMaterialExistsByTier] = useState<boolean[]>([
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
    // 티어별 재료가 없다고 가정
    setMaterialExists(false);
    const newMaterialExistsByTier = materialExistsByTier.map(() => false);

    // 티어별 재료를 초기화 및 재설정
    const materialByTier: MaterialByTierType = {
      5: [],
      4: [],
      3: [],
      2: [],
      1: [],
    };
    list.forEach((upgrade) => {
      materialByTier[upgrade.material.tier].push(upgrade);
      if (skipZero && upgrade.count > 0) {
        // 티어별 재료 존재 여부를 확인 후 설정
        setMaterialExists(true);
        newMaterialExistsByTier[upgrade.material.tier] = true;
      }
    });
    setMaterialExistsByTier(newMaterialExistsByTier);

    // 티어별 재료에 맞게 JSX 엘리먼트를 생성
    const upgradeTierLines = Object.entries(materialByTier)
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
                !newMaterialExistsByTier[parseInt(key, 10)] &&
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
                        userDepotUse={userDepotUse}
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, skipZero, readonly, userDepotUse]);

  return (
    <div
      className={`${
        skipZero && !materialExists && "hidden"
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
