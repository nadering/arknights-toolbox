import { describe, expect, it } from "vitest";
import fixture from "../fixtures/skadi-gamedata.json";
import { operatorById } from "@/data/operator/generated/operator-by-id.generated";
import { operatorOverrideList } from "@/data/operator/manual/operator-override";
import { materialMap, type CountableMaterial } from "@/data/material";
import { buildOperator, type OperatorBuildWarning } from "../../scripts/operator-generator/builders/build-operator";
import { createMaterialConversionContext, assertNoMaterialConversionWarnings } from "../../scripts/operator-generator/converters/convert-material-costs";
import { parseSkillTable } from "../../scripts/operator-generator/parsers/parse-skill-table";
import { createFilteredOperatorRecord } from "../../scripts/operator-generator/parsers/filter-normal-operators";

const skadi = operatorById[fixture.charId];
const build = (input = structuredClone(fixture)) => {
  const context = createMaterialConversionContext();
  const warnings: OperatorBuildWarning[] = [];
  const { operatorRecord } = createFilteredOperatorRecord({ [input.charId]: input.character });
  const operator = buildOperator({
    charId: input.charId,
    character: operatorRecord[input.charId],
    skillInfoById: parseSkillTable(input.skillTable),
    uniequipTable: input.uniequipTable,
    operatorOverride: operatorOverrideList.find(({ charId }) => charId === input.charId),
    materialConversionContext: context, server: "global", warningList: warnings,
  });
  return { operator, context, warnings };
};

describe("스카디 기준 데이터와 생성 파이프라인", () => {
  it("6성 스카디의 모든 메타데이터와 재료 수량을 고정된 기준과 비교한다", () => {
    // Material 클래스 전체 대신 ID/수량을 저장하여 데이터 변경을 읽기 쉽게 표시한다.
    const baseline = JSON.parse(JSON.stringify(skadi, (key, value) => key === "material" ? value.id : value));
    expect(baseline).toMatchSnapshot();
    expect(skadi).toMatchObject({ id: "char_263_skadi", name: "스카디", rarity: 6, class: "Guard" });
    expect(skadi.skillList).toHaveLength(3);
    expect(skadi.moduleList.map(({ type }) => type)).toEqual(["DRE-X", "DRE-Y"]);
  });

  it("원본 fixture → 필터 → 파서 → 재료 변환 → 빌더 결과가 generated 데이터와 같다", () => {
    const { operator, context, warnings } = build();
    const { releaseInfo, ...expected } = skadi;
    expect(releaseInfo.eventId).toBe("1stact");
    expect(operator).toEqual(expected);
    expect(warnings).toEqual([]);
    expect(() => assertNoMaterialConversionWarnings(context)).not.toThrow();
  });

  it("정예화·스킬·모듈의 모든 재료가 실제 창고 재료 ID와 연결된다", () => {
    const costs: CountableMaterial[][] = [
      ...Object.values(skadi.eliteMaterials),
      ...Object.values(skadi.skillUpgradeMaterials).flatMap(Object.values),
      ...Object.values(skadi.moduleMaterials ?? {}).flatMap(Object.values),
    ];
    for (const cost of costs) {
      for (const { material, count } of cost) {
        expect(materialMap.get(material.id)).toBe(material);
        expect(Number.isInteger(count) && count > 0).toBe(true);
      }
    }
    for (const skill of skadi.skillList) {
      expect(Object.keys(skadi.skillUpgradeMaterials[skill])).toEqual(["8", "9", "10"]);
    }
  });

  it("잘못된 재료 ID가 들어오면 배포 전 검증에서 실패한다", () => {
    const input = structuredClone(fixture);
    input.character.phases[1].evolveCost![0].id = "unknown-material";
    const { context } = build(input);
    expect(() => assertNoMaterialConversionWarnings(context)).toThrow("unknown-material");
  });

  it("스킬 테이블 누락을 경고로 보고한다", () => {
    const input = structuredClone(fixture);
    delete (input.skillTable as Record<string, unknown>)[input.character.skills[0].skillId];
    const { warnings } = build(input);
    expect(warnings).toEqual(expect.arrayContaining([expect.objectContaining({ type: "missing_skill", charId: fixture.charId })]));
  });
});
