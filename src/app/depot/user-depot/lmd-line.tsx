"use client";

import { SingleMaterial } from "@/app/depot/common";
import { CountableMaterial } from "@/data/material";

/** 창고의 용문폐 */
export default function LMDLine({
  list,
}: {
  list: CountableMaterial[];
}) {
  return (
    <div className="relative flex flex-col items-start gap-1">
      <p className="leading-tight font-semibold text-2xl text-white break-keep">
        용문폐
      </p>
      <div className="w-full flex flex-row flex-wrap gap-2">
        {list.map((countableMaterial) => {
          return (
            <SingleMaterial
              key={countableMaterial.material.id}
              countableMaterial={countableMaterial}
              isLmd
            />
          );
        })}
      </div>
    </div>
  );
}
