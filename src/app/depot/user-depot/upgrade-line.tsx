"use client";

import React, { useState, useEffect, useRef } from "react";
import { SingleMaterial } from "@/app/depot/common";
import { CountableMaterial, TierType } from "@/data/material";


/** 창고의 정예화 재료 목록 */
export default function UpgradeLine({ list }: { list: CountableMaterial[] }) {
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
    });

    // 티어별 재료에 맞게 JSX 엘리먼트를 생성
    const upgradeTierLines = Object.entries(materialByTier.current)
      .reverse()
      .map((materials) => {
        const key = materials[0];
        const value = materials[1];

        if (value.length > 0) {
          return (
            <div key={key} className="flex flex-col gap-[2px]">
              <p className="leading-tight font-semibold text-xl text-gray-300 break-keep px-2">
                {key}티어
              </p>
              <div className="flex flex-row flex-wrap gap-2">
                {value.map((upgrade) => {
                  return (
                    <SingleMaterial
                      key={upgrade.material.id}
                      countableMaterial={upgrade}
                    />
                  );
                })}
              </div>
            </div>
          );
        } else {
          return <></>;
        }
      });

    setTierLines(upgradeTierLines);
  }, [list]);

  return (
    <div className="flex flex-col items-start">
      <p className="leading-tight font-semibold text-2xl text-white break-keep">
        정예화 재료
      </p>
      <div className="flex flex-col gap-4">
        {tierLines.map((tierLine) => tierLine)}
      </div>
    </div>
  );
}
