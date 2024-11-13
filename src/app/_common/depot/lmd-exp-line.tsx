"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { expAtom } from "@/store";
import { SingleMaterial } from "@common/depot";
import { CountableMaterial } from "@data/material";

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
  // 용문폐 소모량
  const [lmd, setLmd] = useState<CountableMaterial>(list[0]);

  // 경험치 소모량으로, 별도로 지정된 경험치 데이터인 expData가 있다면 사용하지 않음
  const exp = useAtomValue(expAtom);

  // 선택된 경험치 소모량
  const [selectedExp, setSelectedExp] = useState(expData ? expData : exp);

  // 용문폐 설정
  useEffect(() => {
    setLmd(list[0]);
  }, [list]);

  // 경험치 설정
  useEffect(() => {
    if (expData) {
      setSelectedExp(expData);
    } else {
      setSelectedExp(exp);
    }
  }, [exp, expData]);

  return (
    <div
      key={lmd.material.id}
      className={`${
        skipZero && lmd.count <= 0 && selectedExp.count <= 0 && "hidden"
      } relative flex flex-col items-start gap-1`}
    >
      <p className="leading-tight font-semibold text-2xl text-white break-keep">
        용문폐 및 경험치
      </p>
      <div className="w-full flex flex-row flex-wrap gap-2">
        {(!skipZero || lmd.count > 0) && (
          <SingleMaterial countableMaterial={lmd} isLmd readonly={readonly} />
        )}
        {(!skipZero || selectedExp.count > 0) && (
          <SingleMaterial
            countableMaterial={selectedExp}
            isLmd
            readonly={readonly}
          />
        )}
      </div>
    </div>
  );
}
