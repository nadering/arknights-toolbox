"use client";

import type { CountableMaterial } from "@/data/material";
import SingleMaterial from "./single-material";

type DepotLineProps = {
  title: string;
  list: CountableMaterial[];
  skipZero?: boolean;
  readonly?: boolean;
  userDepotUse?: boolean;
};

/** 창고 데이터의 한 종류 전체를 담당하는 컴포넌트 */
export default function DepotLine({
  title,
  list,
  skipZero = false,
  readonly = false,
  userDepotUse = false,
}: DepotLineProps) {
  const materialExists = list.some(
    (countableMaterial) => countableMaterial.count > 0,
  );

  return (
    <div
      className={`${
        skipZero && !materialExists ? "hidden" : ""
      } flex flex-col items-start gap-1`}
    >
      <p className="text-2xl leading-tight font-semibold text-white break-keep">
        {title}
      </p>

      <div className="flex w-full flex-row flex-wrap gap-2">
        {list.map((countableMaterial) => {
          if (skipZero && countableMaterial.count <= 0) {
            return null;
          }

          return (
            <SingleMaterial
              key={countableMaterial.material.id}
              countableMaterial={countableMaterial}
              readonly={readonly}
              userDepotUse={userDepotUse}
            />
          );
        })}
      </div>
    </div>
  );
}
