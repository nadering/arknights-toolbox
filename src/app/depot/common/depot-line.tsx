"use client";

import { CountableMaterial } from "@/data/material";
import SingleMaterial from "./single-material";

export default function DepotLine({
  title,
  list,
}: {
  title: string;
  list: CountableMaterial[];
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
            />
          );
        })}
      </div>
    </div>
  );
}
