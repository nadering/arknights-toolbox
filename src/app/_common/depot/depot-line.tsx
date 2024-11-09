"use client";

import React, { useRef } from "react";
import { CountableMaterial } from "@/data/material";
import SingleMaterial from "./single-material";

/** 창고 데이터의 한 종류 전체를 담당하는 컴포넌트 */
export default function DepotLine({
  title,
  list,
  skipZero = false,
  readonly = false,
}: {
  title: string;
  list: CountableMaterial[];
  skipZero?: boolean;
  readonly?: boolean;
}) {
  /** 0개가 아닌 재료가 있는지 확인 */
  const materialExists = useRef(false);
  for (const countableMaterial of list) {
    if (countableMaterial.count > 0) {
      materialExists.current = true;
      break;
    }
  }

  return (
    <div
      className={`${
        skipZero && !materialExists.current && "hidden"
      } flex flex-col items-start gap-1`}
    >
      <p className="leading-tight font-semibold text-2xl text-white break-keep">
        {title}
      </p>
      <div className="w-full flex flex-row flex-wrap gap-2">
        {list.map((countableMaterial) => {
          if (!skipZero || countableMaterial.count > 0) {
            return (
              <SingleMaterial
                key={countableMaterial.material.id}
                countableMaterial={countableMaterial}
                readonly={readonly}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
