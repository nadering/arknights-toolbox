"use client";

import { SingleMaterial } from "@common/depot";
import { CountableMaterial } from "@data/material";
import { useEffect, useState } from "react";

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
  // 용문폐 보유량
  const [lmd, setLmd] = useState<CountableMaterial>(list[0]);

  useEffect(() => {
    setLmd(list[0]);
  }, [list]);

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
            isLmd
            readonly={readonly}
            userDepotUse={userDepotUse}
          />
        )}
      </div>
    </div>
  );
}
