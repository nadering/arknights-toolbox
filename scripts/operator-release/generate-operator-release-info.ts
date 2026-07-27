import fs from "node:fs";
import path from "node:path";
import { operatorReleaseEventList } from "../../src/data/operator/manual/operator-release-events";
import { type OperatorReleaseEvent } from "../../src/data/operator/manual/operator-release-types";

const RELEASE_INFO_OUTPUT_PATH =
  "src/data/operator/generated/operator-release-info-map.generated.ts";

const RELEASE_INFO_REPORT_OUTPUT_PATH =
  "src/data/operator/generated/operator-release-info-report.md";

type GeneratedOperatorReleaseInfo = {
  eventId: string;
  eventName: string;
  category: OperatorReleaseEvent["category"];
  order: number;
};

type DuplicateOperatorMapping = {
  charId: string;
  firstEventId: string;
  duplicatedEventId: string;
};

type EmptyReleaseEvent = {
  id: string;
  name: string;
  category: OperatorReleaseEvent["category"];
  order: number;
};

type GenerateReleaseInfoResult = {
  releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo>;
  duplicateOperatorMappings: DuplicateOperatorMapping[];
  emptyReleaseEvents: EmptyReleaseEvent[];
};

/**
 * manual/operator-release-events.ts를 기준으로
 * 오퍼레이터별 출시 이벤트 정보를 생성합니다.
 */
const createOperatorReleaseInfoMap = (): GenerateReleaseInfoResult => {
  const releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo> = {};
  const duplicateOperatorMappings: DuplicateOperatorMapping[] = [];
  const emptyReleaseEvents: EmptyReleaseEvent[] = [];

  operatorReleaseEventList.forEach((releaseEvent, eventIndex) => {
    const order = eventIndex + 1;

    if (releaseEvent.operatorIds.length === 0) {
      emptyReleaseEvents.push({
        id: releaseEvent.id,
        name: releaseEvent.name,
        category: releaseEvent.category,
        order,
      });

      return;
    }

    releaseEvent.operatorIds.forEach((charId) => {
      const existingReleaseInfo = releaseInfoByCharId[charId];

      if (existingReleaseInfo !== undefined) {
        duplicateOperatorMappings.push({
          charId,
          firstEventId: existingReleaseInfo.eventId,
          duplicatedEventId: releaseEvent.id,
        });

        return;
      }

      releaseInfoByCharId[charId] = {
        eventId: releaseEvent.id,
        eventName: releaseEvent.name,
        category: releaseEvent.category,
        order,
      };
    });
  });

  return {
    releaseInfoByCharId: sortReleaseInfoMap(releaseInfoByCharId),
    duplicateOperatorMappings,
    emptyReleaseEvents,
  };
};

const sortReleaseInfoMap = (
  releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo>,
) => {
  return Object.fromEntries(
    Object.entries(releaseInfoByCharId).sort((a, b) => {
      const [, releaseInfoA] = a;
      const [, releaseInfoB] = b;

      if (releaseInfoA.order !== releaseInfoB.order) {
        return releaseInfoA.order - releaseInfoB.order;
      }

      return a[0].localeCompare(b[0]);
    }),
  );
};

const createGeneratedFileContent = (
  releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo>,
) => {
  return `import { type OperatorReleaseCategory } from "../manual/operator-release-types";

export type GeneratedOperatorReleaseInfo = {
  eventId: string;
  eventName: string;
  category: OperatorReleaseCategory;
  order: number;
};

/**
 * manual/operator-release-events.ts를 기반으로 자동 생성된 출시 정보 맵입니다.
 *
 * 직접 수정하지 말고 \`npm run generate:operator-release-info\`로 재생성하세요.
 */
export const operatorReleaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo> = ${JSON.stringify(
    releaseInfoByCharId,
    null,
    2,
  )};
`;
};

const createReport = (result: GenerateReleaseInfoResult) => {
  const mappedOperatorCount = Object.keys(result.releaseInfoByCharId).length;

  const lines: string[] = [
    "# Operator Release Info Report",
    "",
    "> manual/operator-release-events.ts를 기반으로 생성한 출시 정보 보고서입니다.",
    "",
    `- Total release events: ${operatorReleaseEventList.length}`,
    `- Mapped operators: ${mappedOperatorCount}`,
    `- Empty release events: ${result.emptyReleaseEvents.length}`,
    `- Duplicate operator mappings: ${result.duplicateOperatorMappings.length}`,
    "",
  ];

  if (result.emptyReleaseEvents.length > 0) {
    lines.push("## Empty Release Events");
    lines.push("");
    lines.push(
      "> operatorIds가 비어 있는 이벤트입니다. 실제 출시 오퍼레이터가 있다면 manual 파일에서 채워주세요.",
    );
    lines.push("");

    result.emptyReleaseEvents.forEach((releaseEvent) => {
      lines.push(
        `- #${releaseEvent.order} \`${releaseEvent.id}\` / ${releaseEvent.name} / ${releaseEvent.category}`,
      );
    });

    lines.push("");
  }

  if (result.duplicateOperatorMappings.length > 0) {
    lines.push("## Duplicate Operator Mappings");
    lines.push("");
    lines.push(
      "> 같은 charId가 여러 이벤트에 들어간 경우입니다. 첫 번째 매핑만 generated map에 반영됩니다.",
    );
    lines.push("");

    result.duplicateOperatorMappings.forEach((duplicateMapping) => {
      lines.push(
        `- \`${duplicateMapping.charId}\`: first=\`${duplicateMapping.firstEventId}\`, duplicated=\`${duplicateMapping.duplicatedEventId}\``,
      );
    });

    lines.push("");
  }

  return `${lines.join("\n")}\n`;
};

const writeGeneratedFile = (outputPath: string, content: string) => {
  const resolvedOutputPath = path.resolve(process.cwd(), outputPath);

  fs.mkdirSync(path.dirname(resolvedOutputPath), {
    recursive: true,
  });

  fs.writeFileSync(resolvedOutputPath, content, "utf-8");
};

const main = () => {
  const result = createOperatorReleaseInfoMap();

  writeGeneratedFile(
    RELEASE_INFO_OUTPUT_PATH,
    createGeneratedFileContent(result.releaseInfoByCharId),
  );

  writeGeneratedFile(RELEASE_INFO_REPORT_OUTPUT_PATH, createReport(result));

  console.log(
    `출시 정보 ${Object.keys(result.releaseInfoByCharId).length}개를 생성했습니다.`,
  );
  console.log(`빈 출시 이벤트: ${result.emptyReleaseEvents.length}개`);
  console.log(
    `중복 오퍼레이터 매핑: ${result.duplicateOperatorMappings.length}개`,
  );
  console.log(`생성 완료: ${RELEASE_INFO_OUTPUT_PATH}`);
  console.log(`생성 완료: ${RELEASE_INFO_REPORT_OUTPUT_PATH}`);
};

main();
