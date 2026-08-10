"use client";

import { SingleMaterial } from "@common/depot";
import type { CountableMaterial, TierType } from "@data/material";

type UpgradeTier = Exclude<TierType, 6>;

type MaterialByTierType = {
  [key in UpgradeTier]: CountableMaterial[];
};

const UPGRADE_TIERS = [5, 4, 3, 2, 1] as const satisfies readonly UpgradeTier[];

/** 창고의 정예화 재료 목록 */
export default function UpgradeLine({
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
  const materialByTier = list.reduce<MaterialByTierType>(
    (result, upgrade) => {
      const tier = upgrade.material.tier;

      /**
       * 현재 6티어 재료는 순오리지늄 등의 특수 재료로,
       * 정예화 재료 목록에서는 제외
       */
      if (tier !== 6) {
        result[tier].push(upgrade);
      }

      return result;
    },
    {
      5: [],
      4: [],
      3: [],
      2: [],
      1: [],
    },
  );

  const materialExists = UPGRADE_TIERS.some((tier) =>
    materialByTier[tier].some((upgrade) => upgrade.count > 0),
  );

  const shouldHide = skipZero && !materialExists;

  return (
    <div className={`${shouldHide ? "hidden" : ""} flex flex-col items-start`}>
      <p className="text-2xl leading-tight font-semibold text-white break-keep">
        정예화 재료
      </p>

      <div className="flex w-full flex-col gap-4">
        {UPGRADE_TIERS.map((tier) => {
          const materials = materialByTier[tier];

          if (materials.length === 0) {
            return null;
          }

          const visibleMaterials = skipZero
            ? materials.filter((upgrade) => upgrade.count > 0)
            : materials;

          if (visibleMaterials.length === 0) {
            return null;
          }

          return (
            <div key={tier} className="flex flex-col gap-[2px]">
              <p className="px-2 text-xl leading-tight font-semibold text-gray-300 break-keep">
                {tier}티어
              </p>

              <div className="flex flex-row flex-wrap gap-2">
                {visibleMaterials.map((upgrade) => (
                  <SingleMaterial
                    key={upgrade.material.id}
                    countableMaterial={upgrade}
                    readonly={readonly}
                    userDepotUse={userDepotUse}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
