"use client";

import { SingleMaterial } from "@common/depot";
import { CountableMaterial } from "@data/material";

/** 창고의 용문폐 */
export default function LMDLine({
  list,
  skipZero = false,
  readonly = false,
}: {
  list: CountableMaterial[];
  skipZero?: boolean;
  readonly?: boolean;
}) {
  const lmd: CountableMaterial = list[0];

  return (
    <div
      className={`${
        skipZero && lmd.count == 0 && "hidden"
      } relative flex flex-col items-start gap-1`}
    >
      <p className="leading-tight font-semibold text-2xl text-white break-keep">
        용문폐
      </p>
      <div className="w-full flex flex-row flex-wrap gap-2">
        {list.map((countableMaterial) => {
          if (!skipZero || countableMaterial.count > 0) {
            return (
              <SingleMaterial
                key={countableMaterial.material.id}
                countableMaterial={countableMaterial}
                isLmd
                readonly={readonly}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
