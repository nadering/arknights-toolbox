"use client";

import { SingleMaterial } from "@common/depot";
import { CountableMaterial } from "@data/material";

/** 창고의 용문폐 */
export default function LMDLine({
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
  const lmd = list[0];

  return (
    <div
      key={lmd.material.id}
      className={`${
        skipZero && lmd.count == 0 && "hidden"
      } relative flex flex-col items-start gap-1`}
    >
      <p className="leading-tight font-semibold text-2xl text-white break-keep">
        용문폐
      </p>
      <div className="w-full flex flex-row flex-wrap gap-2">
        {(!skipZero || lmd.count > 0) && (
          <SingleMaterial
            countableMaterial={lmd}
            readonly={readonly}
            userDepotUse={userDepotUse}
          />
        )}
      </div>
    </div>
  );
}
