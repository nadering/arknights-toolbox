import { materialMap, type CountableMaterial } from "@/data/material";
import {
  type ParsedEliteMaterials,
  type ParsedMaterialCost,
} from "../parsers/parse-character-table";
import {
  type ParsedCommonSkillUpgradeMaterials,
  type ParsedSkillMasteryMaterials,
} from "../parsers/parse-skill-table";
import { type ParsedModuleMaterials } from "../parsers/parse-uniequip-table";

export type MaterialConversionWarning = {
  itemId: string;
  count: number;
  reason: string;
};

export type MaterialConversionContext = {
  warningList: MaterialConversionWarning[];
};

export type ConvertedEliteMaterials = {
  "0": CountableMaterial[];
  "1": CountableMaterial[];
  "2": CountableMaterial[];
};

export type ConvertedCommonSkillUpgradeMaterials = {
  "2": CountableMaterial[];
  "3": CountableMaterial[];
  "4": CountableMaterial[];
  "5": CountableMaterial[];
  "6": CountableMaterial[];
  "7": CountableMaterial[];
};

export type ConvertedSkillMasteryMaterials = {
  "8": CountableMaterial[];
  "9": CountableMaterial[];
  "10": CountableMaterial[];
};

export type ConvertedModuleMaterials = {
  "1": CountableMaterial[];
  "2": CountableMaterial[];
  "3": CountableMaterial[];
};

export const createMaterialConversionContext =
  (): MaterialConversionContext => {
    return {
      warningList: [],
    };
  };

export const convertMaterialCost = (
  context: MaterialConversionContext,
  materialCost: ParsedMaterialCost,
): CountableMaterial | null => {
  const material = materialMap.get(materialCost.itemId);

  if (material === undefined) {
    context.warningList.push({
      itemId: materialCost.itemId,
      count: materialCost.count,
      reason: "materialMap에서 itemId와 매칭되는 material을 찾을 수 없습니다.",
    });

    return null;
  }

  return {
    material,
    count: materialCost.count,
  };
};

export const convertMaterialCostList = (
  context: MaterialConversionContext,
  materialCostList: ParsedMaterialCost[],
): CountableMaterial[] => {
  return materialCostList
    .map((materialCost) => {
      return convertMaterialCost(context, materialCost);
    })
    .filter((materialCost): materialCost is CountableMaterial => {
      return materialCost !== null;
    });
};

export const convertEliteMaterials = (
  context: MaterialConversionContext,
  eliteMaterials: ParsedEliteMaterials,
): ConvertedEliteMaterials => {
  return {
    "0": convertMaterialCostList(context, eliteMaterials["0"]),
    "1": convertMaterialCostList(context, eliteMaterials["1"]),
    "2": convertMaterialCostList(context, eliteMaterials["2"]),
  };
};

export const convertCommonSkillUpgradeMaterials = (
  context: MaterialConversionContext,
  commonSkillUpgradeMaterials: ParsedCommonSkillUpgradeMaterials,
): ConvertedCommonSkillUpgradeMaterials => {
  return {
    "2": convertMaterialCostList(context, commonSkillUpgradeMaterials["2"]),
    "3": convertMaterialCostList(context, commonSkillUpgradeMaterials["3"]),
    "4": convertMaterialCostList(context, commonSkillUpgradeMaterials["4"]),
    "5": convertMaterialCostList(context, commonSkillUpgradeMaterials["5"]),
    "6": convertMaterialCostList(context, commonSkillUpgradeMaterials["6"]),
    "7": convertMaterialCostList(context, commonSkillUpgradeMaterials["7"]),
  };
};

export const convertSkillMasteryMaterials = (
  context: MaterialConversionContext,
  skillMasteryMaterials: ParsedSkillMasteryMaterials,
): ConvertedSkillMasteryMaterials => {
  return {
    "8": convertMaterialCostList(context, skillMasteryMaterials["8"]),
    "9": convertMaterialCostList(context, skillMasteryMaterials["9"]),
    "10": convertMaterialCostList(context, skillMasteryMaterials["10"]),
  };
};

export const convertModuleMaterials = (
  context: MaterialConversionContext,
  moduleMaterials: ParsedModuleMaterials,
): ConvertedModuleMaterials => {
  return {
    "1": convertMaterialCostList(context, moduleMaterials["1"]),
    "2": convertMaterialCostList(context, moduleMaterials["2"]),
    "3": convertMaterialCostList(context, moduleMaterials["3"]),
  };
};

export const convertSkillMasteryMaterialsBySkillId = (
  context: MaterialConversionContext,
  masteryBySkillId: Record<string, ParsedSkillMasteryMaterials>,
): Record<string, ConvertedSkillMasteryMaterials> => {
  return Object.fromEntries(
    Object.entries(masteryBySkillId).map(([skillId, skillMasteryMaterials]) => {
      return [
        skillId,
        convertSkillMasteryMaterials(context, skillMasteryMaterials),
      ];
    }),
  );
};

export const convertModuleMaterialsByType = (
  context: MaterialConversionContext,
  moduleMaterialsByType: Record<string, ParsedModuleMaterials>,
): Record<string, ConvertedModuleMaterials> => {
  return Object.fromEntries(
    Object.entries(moduleMaterialsByType).map(
      ([moduleType, moduleMaterials]) => {
        return [moduleType, convertModuleMaterials(context, moduleMaterials)];
      },
    ),
  );
};

export const assertNoMaterialConversionWarnings = (
  context: MaterialConversionContext,
) => {
  if (context.warningList.length === 0) {
    return;
  }

  const lines: string[] = ["material 변환 중 문제가 발생했습니다.", ""];

  lines.push("Missing materials:");

  context.warningList.forEach((warning) => {
    lines.push(
      `- itemId=${warning.itemId}, count=${warning.count}: ${warning.reason}`,
    );
  });

  lines.push("");

  throw new Error(lines.join("\n"));
};
