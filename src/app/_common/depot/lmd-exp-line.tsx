"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { expAtom } from "@/store";
import { SingleMaterial } from "@common/depot";
import { CountableMaterial } from "@data/material";

/** 필요 재료의 용문폐 및 경험치 */
export default function LMDExpLine({
  list,
  skipZero = false,
  readonly = false,
}: {
  list: CountableMaterial[];
  skipZero?: boolean;
  readonly?: boolean;
}) {
  // 용문폐 소모량
  const [lmd, setLmd] = useState<CountableMaterial>(list[0]);

  // 경험치 소모량
  const exp = useAtomValue(expAtom);

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
        용문폐 및 경험치
      </p>
      <div className="w-full flex flex-row flex-wrap gap-2">
        {(!skipZero || lmd.count > 0) && (
          <SingleMaterial countableMaterial={lmd} isLmd readonly={readonly} />
        )}
        <SingleMaterial countableMaterial={exp} isLmd readonly={readonly} />
      </div>
    </div>
  );
}
