"use client";

import { CountableMaterial } from "@/data/material";
import SingleMaterial from "./single-material";

/** 창고 데이터의 한 종류 전체를 담당하는 컴포넌트 */
export default function DepotLine({
  title,
  list,
  readonly = false,
}: {
  title: string;
  list: CountableMaterial[];
  readonly?: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-1">
      <p className="leading-tight font-semibold text-2xl text-white break-keep">
        {title}
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        {list.map((countableMaterial) => {
          return (
            <SingleMaterial
              key={countableMaterial.material.id}
              countableMaterial={countableMaterial}
              readonly={readonly}
            />
          );
        })}
      </div>
    </div>
  );
}
