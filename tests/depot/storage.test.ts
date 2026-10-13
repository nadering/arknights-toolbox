import { describe, expect, it, vi } from "vitest";
import { makeEmptyDepot } from "@/store/depot";
import { LMD, orirock, guardChip } from "@/data/material";
import { makeDepotWithJSON, setDepotMaterialById } from "@/tool/set-depot";
import { createStorageData, createDepotFromRawStorageData, isPersistedDepot } from "@/tool/persisted-depot";

describe("창고 입력 및 저장/복원", () => {
  it("각 빈 창고의 수량은 독립적이다", () => {
    const a = makeEmptyDepot();
    const b = makeEmptyDepot();
    setDepotMaterialById(LMD.id, 100, a);
    expect(b.LMD[0].count).toBe(0);
  });

  it("JSON으로 여러 종류의 재료를 가져와 저장/복원해도 수량을 보존한다", () => {
    const items = { [LMD.id]: 210000, [orirock.id]: 45, [guardChip.id]: 5 };
    const depot = makeDepotWithJSON(JSON.stringify(items));
    expect(depot).not.toBeNull();
    const saved = createStorageData(depot!);
    expect(saved).toEqual({ schemaVersion: 2, items });
    expect(createStorageData(createDepotFromRawStorageData(JSON.stringify(saved)))).toEqual(saved);
  });

  it("수량 설정과 추가를 구별한다", () => {
    const depot = makeEmptyDepot();
    setDepotMaterialById(orirock.id, 5, depot);
    setDepotMaterialById(orirock.id, 3, depot, true);
    expect(createStorageData(depot).items[orirock.id]).toBe(8);
    setDepotMaterialById(orirock.id, 2, depot);
    expect(createStorageData(depot).items[orirock.id]).toBe(2);
  });

  it.each(["{broken", '{"unknown-id":1}', "null", "[]", "123", `{"${LMD.id}":"3"}`, `{"${LMD.id}":-1}`, `{"${LMD.id}":1.5}`])("잘못된 JSON 입력은 창고를 반환하지 않는다: %s", (input) => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    expect(makeDepotWithJSON(input)).toBeNull();
  });

  it("구 용문폐 ID를 변환하고 최신 ID가 있으면 최신 수량을 우선한다", () => {
    const restore = (items: Record<string, number>) => createStorageData(createDepotFromRawStorageData(JSON.stringify({ schemaVersion: 2, items })));
    expect(restore({ lmd: 20 }).items).toEqual({ [LMD.id]: 20 });
    expect(restore({ lmd: 20, [LMD.id]: 50 }).items).toEqual({ [LMD.id]: 50 });
  });

  it("레거시 창고를 복원하고 알 수 없는 재료는 제외한다", () => {
    const old = { Upgrade: [{ material: { id: orirock.id }, count: 7 }, { material: { id: "removed" }, count: 4 }] };
    expect(createStorageData(createDepotFromRawStorageData(JSON.stringify(old))).items).toEqual({ [orirock.id]: 7 });
  });

  it.each([null, {}, { schemaVersion: 2, items: { x: "3" } }, { schemaVersion: 2, items: { x: Infinity } }])("잘못된 저장 형식은 거부한다", (value) => {
    expect(isPersistedDepot(value)).toBe(false);
  });
});
