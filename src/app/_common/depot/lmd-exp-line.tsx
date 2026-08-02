"use client";

import { useAtomValue } from "jotai";
import { expAtom } from "@/store";
import { SingleMaterial } from "@common/depot";
import type { CountableMaterial } from "@data/material";

/** 필요 재료의 용문폐 및 경험치 */
export default function LMDExpLine({
  list,
  expData,
  skipZero = false,
  readonly = false,
}: {
  list: CountableMaterial[];
  expData?: CountableMaterial;
  skipZero?: boolean;
  readonly?: boolean;
}) {
  const exp = useAtomValue(expAtom);

  const lmd = list[0];
  const selectedExp = expData ?? exp;

  if (!lmd) {
    return null;
  }

  const shouldHide = skipZero && lmd.count <= 0 && selectedExp.count <= 0;

  return (
    <div
      className={`${
        shouldHide ? "hidden" : ""
      } relative flex flex-col items-start gap-1`}
    >
      <p className="text-2xl leading-tight font-semibold text-white break-keep">
        용문폐 및 경험치
      </p>

      <div className="flex w-full flex-row flex-wrap gap-2">
        {(!skipZero || lmd.count > 0) && (
          <SingleMaterial countableMaterial={lmd} readonly={readonly} />
        )}

        {(!skipZero || selectedExp.count > 0) && (
          <SingleMaterial countableMaterial={selectedExp} readonly={readonly} />
        )}
      </div>
    </div>
  );
}
