import { describe, expect, it } from "vitest";
import { calculateUserNeed } from "@/tool/calculate-user-need";
import { createStorageData } from "@/tool/persisted-depot";
import type { OperatorTarget } from "@/store/operator";

const target = (changes: Partial<OperatorTarget> = {}): OperatorTarget => ({
  currentElite: 2, targetElite: 2, currentLevel: 90, targetLevel: 90,
  skillLevels: [], moduleLevels: [], ...changes,
});
const calculate = (goal: OperatorTarget) => calculateUserNeed([{ id: "char_263_skadi", rarity: 6, target: goal }]);

describe("스카디 육성 필요량과 창고 연결", () => {
  it("육성 목표가 같으면 재료와 경험치가 필요하지 않다", () => {
    const result = calculate(target());
    expect(result.exp).toBe(0);
    expect(createStorageData(result.userNeed).items).toEqual({});
  });

  it("0정예 1레벨 → 2정예 90레벨의 정예화와 레벨 비용을 합산한다", () => {
    const result = calculate(target({ currentElite: 0, currentLevel: 1 }));
    expect(result.exp).toBe(1111400);
    expect(createStorageData(result.userNeed).items).toEqual({
      "4001": 1334796, "3221": 5, "30062": 5, "30032": 5,
      "3223": 4, "30135": 4, "30014": 9,
    });
  });

  it("세 스킬의 공통 1 → 7레벨 비용을 한 번만 더한다", () => {
    const result = calculate(target({ skillLevels: [0, 1, 2].map((index) => ({ index, name: "", current: 1, target: 7 })) }));
    expect(createStorageData(result.userNeed).items).toEqual({
      "3301": 9, "30061": 4, "30031": 4, "3302": 24,
      "30012": 7, "30022": 4, "30052": 4, "30053": 6,
      "3303": 8, "30063": 3, "30023": 5,
    });
  });

  it("세 스킬의 마스터리 비용은 각각 합산한다", () => {
    const result = calculate(target({ skillLevels: [0, 1, 2].map((index) => ({ index, name: "", current: 7, target: 10 })) }));
    const items = createStorageData(result.userNeed).items;
    expect(items["3303"]).toBe(99);
    expect(items["30125"]).toBe(12);
    expect(items["30014"]).toBe(17);
    expect(result.exp).toBe(0);
  });

  it("두 모듈의 0 → 3레벨 비용을 합산한다", () => {
    const result = calculate(target({ moduleLevels: ["DRE-X", "DRE-Y"].map((type) => ({ type, name: "", current: 0, target: 3 })) }));
    expect(createStorageData(result.userNeed).items).toEqual({
      "4001": 600000, "mod_unlock_token": 24, "mod_update_token_1": 120,
      "mod_update_token_2": 40, "30135": 5, "30125": 5, "30145": 8,
    });
  });

  it("모듈 해금 레벨에 도달하지 않으면 모듈 비용을 포함하지 않는다", () => {
    const result = calculate(target({ currentLevel: 59, targetLevel: 59, moduleLevels: [{ type: "DRE-X", name: "", current: 0, target: 3 }] }));
    expect(createStorageData(result.userNeed).items).toEqual({});
  });
});
