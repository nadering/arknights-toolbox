import fs from "node:fs";
import path from "node:path";
import {
  loadCnGamedataPath,
  loadGamedataPath,
} from "../operator-generator/loaders/load-gamedata-path";
import {
  createFilteredOperatorRecord,
  type CharacterForOperatorFilter,
  type ExcludedOperatorInfo,
} from "../operator-generator/parsers/filter-normal-operators";
import { operatorReleaseEventList } from "../../src/data/operator/manual/operator-release-events";
import {
  type OperatorReleaseCategory,
  type OperatorReleaseEvent,
} from "../../src/data/operator/manual/operator-release-types";
import { type CharacterTable } from "./character-types";

const GLOBAL_CHARACTER_TABLE_PATH = "kr/gamedata/excel/character_table.json";
const CN_CHARACTER_TABLE_PATH = "zh_CN/gamedata/excel/character_table.json";

const RELEASE_INFO_OUTPUT_PATH =
  "src/data/operator/generated/operator-release-info-map.generated.ts";

const RELEASE_INFO_REPORT_OUTPUT_PATH =
  "src/data/operator/generated/operator-release-info-report.md";

const SERVER_OPEN_RELEASE_EVENT_ID = "server_open";
const UNMAPPED_FUTURE_RELEASE_EVENT_ID = "unmapped_future_release";

type GeneratedOperatorReleaseInfo = {
  eventId: string;
  eventName: string;
  category: OperatorReleaseCategory;
  order: number;
};

type OperatorBasicInfo = {
  charId: string;
  name: string;
  profession: string;
  server: "global" | "future";
};

type ExcludedOperatorWithSource = ExcludedOperatorInfo & {
  source: "global" | "cn";
};

type DuplicateOperatorMapping = {
  charId: string;
  firstEventId: string;
  duplicatedEventId: string;
};

type UnknownManualOperatorMapping = {
  charId: string;
  eventId: string;
  eventName: string;
  order: number;
};

type EmptyReleaseEvent = {
  id: string;
  name: string;
  category: OperatorReleaseEvent["category"];
  order: number;
};

type CreateAllOperatorInfoResult = {
  allOperatorInfoList: OperatorBasicInfo[];
  allOperatorInfoByCharId: Record<string, OperatorBasicInfo>;
  excludedOperatorList: ExcludedOperatorWithSource[];
  manualIncludedOperatorList: OperatorBasicInfo[];
};

type OperatorServerCount = {
  globalOperatorCount: number;
  futureOperatorCount: number;
};

type ApplyManualReleaseEventsResult = {
  duplicateOperatorMappings: DuplicateOperatorMapping[];
  unknownManualOperatorMappings: UnknownManualOperatorMapping[];
  emptyReleaseEvents: EmptyReleaseEvent[];
};

type GenerateReleaseInfoResult = {
  releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo>;

  duplicateOperatorMappings: DuplicateOperatorMapping[];
  unknownManualOperatorMappings: UnknownManualOperatorMapping[];
  emptyReleaseEvents: EmptyReleaseEvent[];

  serverOpenOperatorList: OperatorBasicInfo[];
  unmappedFutureOperatorList: OperatorBasicInfo[];
  excludedOperatorList: ExcludedOperatorWithSource[];
  manualIncludedOperatorList: OperatorBasicInfo[];

  globalOperatorCount: number;
  futureOperatorCount: number;
};

const readLatestJsonFile = <TValue>(
  repositoryPath: string,
  filePath: string,
) => {
  const rawJson = fs.readFileSync(path.join(repositoryPath, filePath), "utf-8");

  return JSON.parse(rawJson) as TValue;
};

const createExcludedOperatorListWithSource = (
  excludedOperatorList: ExcludedOperatorInfo[],
  source: "global" | "cn",
): ExcludedOperatorWithSource[] => {
  return excludedOperatorList.map((operator) => {
    return {
      ...operator,
      source,
    };
  });
};

const getStringValue = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }

  return "";
};

const createOperatorBasicInfo = (
  charId: string,
  character: CharacterForOperatorFilter,
  server: "global" | "future",
): OperatorBasicInfo => {
  return {
    charId,
    name:
      getStringValue(character.name) ||
      getStringValue(character.appellation) ||
      charId,
    profession: character.profession ?? "",
    server,
  };
};

const createOperatorInfoByCharId = (
  operatorInfoList: OperatorBasicInfo[],
): Record<string, OperatorBasicInfo> => {
  return Object.fromEntries(
    operatorInfoList.map((operator) => {
      return [operator.charId, operator];
    }),
  );
};

const createManualOperatorIdList = () => {
  return Array.from(
    new Set(
      operatorReleaseEventList.flatMap((releaseEvent) => {
        return releaseEvent.operatorIds;
      }),
    ),
  ).sort((charIdA, charIdB) => {
    return charIdA.localeCompare(charIdB);
  });
};

/**
 * manual/operator-release-events.ts에 있는 charId는 출시순의 source of truth로 취급합니다.
 *
 * 필터에 걸렸더라도 raw character_table에 실제로 존재하면 releaseInfo 생성 대상에 포함합니다.
 * 단, raw global/CN 어디에도 없으면 Unknown Manual Operator Mappings로 남깁니다.
 */
const includeManualOperatorsFromRawTables = (
  globalOperatorRecord: Record<string, CharacterForOperatorFilter>,
  cnOperatorRecord: Record<string, CharacterForOperatorFilter>,
  globalCharacterTable: CharacterTable,
  cnCharacterTable: CharacterTable,
) => {
  const manualIncludedOperatorList: OperatorBasicInfo[] = [];

  createManualOperatorIdList().forEach((charId) => {
    if (
      globalOperatorRecord[charId] !== undefined ||
      cnOperatorRecord[charId] !== undefined
    ) {
      return;
    }

    const globalCharacter = globalCharacterTable[charId];
    const cnCharacter = cnCharacterTable[charId];

    if (globalCharacter !== undefined) {
      globalOperatorRecord[charId] = globalCharacter;
      manualIncludedOperatorList.push(
        createOperatorBasicInfo(charId, globalCharacter, "global"),
      );
      return;
    }

    if (cnCharacter !== undefined) {
      cnOperatorRecord[charId] = cnCharacter;
      manualIncludedOperatorList.push(
        createOperatorBasicInfo(charId, cnCharacter, "future"),
      );
    }
  });

  return manualIncludedOperatorList.sort((operatorA, operatorB) => {
    return operatorA.charId.localeCompare(operatorB.charId);
  });
};

const createAllOperatorInfoList = (
  globalCharacterTable: CharacterTable,
  cnCharacterTable: CharacterTable,
): CreateAllOperatorInfoResult => {
  const globalFilterResult = createFilteredOperatorRecord(globalCharacterTable);
  const cnFilterResult = createFilteredOperatorRecord(cnCharacterTable);

  const globalOperatorRecord = {
    ...globalFilterResult.operatorRecord,
  };

  const cnOperatorRecord = {
    ...cnFilterResult.operatorRecord,
  };

  const manualIncludedOperatorList = includeManualOperatorsFromRawTables(
    globalOperatorRecord,
    cnOperatorRecord,
    globalCharacterTable,
    cnCharacterTable,
  );

  const allCharIds = Array.from(
    new Set([
      ...Object.keys(globalOperatorRecord),
      ...Object.keys(cnOperatorRecord),
    ]),
  ).sort((charIdA, charIdB) => {
    const globalOperatorA = globalOperatorRecord[charIdA];
    const globalOperatorB = globalOperatorRecord[charIdB];

    const cnOperatorA = cnOperatorRecord[charIdA];
    const cnOperatorB = cnOperatorRecord[charIdB];

    const sortNameA = globalOperatorA?.name ?? cnOperatorA?.name ?? charIdA;
    const sortNameB = globalOperatorB?.name ?? cnOperatorB?.name ?? charIdB;

    return sortNameA.localeCompare(sortNameB);
  });

  const allOperatorInfoList = allCharIds.map((charId) => {
    const globalOperator = globalOperatorRecord[charId];
    const cnOperator = cnOperatorRecord[charId];
    const sourceOperator = globalOperator ?? cnOperator;

    return createOperatorBasicInfo(
      charId,
      sourceOperator ?? {},
      globalOperator === undefined ? "future" : "global",
    );
  });

  const includedCharIdSet = new Set(
    allOperatorInfoList.map((operator) => {
      return operator.charId;
    }),
  );

  const excludedOperatorList = [
    ...createExcludedOperatorListWithSource(
      globalFilterResult.excludedOperatorList,
      "global",
    ),
    ...createExcludedOperatorListWithSource(
      cnFilterResult.excludedOperatorList,
      "cn",
    ),
  ]
    .filter((operator) => {
      return !includedCharIdSet.has(operator.charId);
    })
    .sort((operatorA, operatorB) => {
      if (operatorA.source !== operatorB.source) {
        return operatorA.source.localeCompare(operatorB.source);
      }

      return operatorA.charId.localeCompare(operatorB.charId);
    });

  return {
    allOperatorInfoList,
    allOperatorInfoByCharId: createOperatorInfoByCharId(allOperatorInfoList),
    excludedOperatorList,
    manualIncludedOperatorList,
  };
};

const countOperatorsByServer = (
  allOperatorInfoList: OperatorBasicInfo[],
): OperatorServerCount => {
  const globalOperatorCount = allOperatorInfoList.filter((operator) => {
    return operator.server === "global";
  }).length;

  const futureOperatorCount = allOperatorInfoList.filter((operator) => {
    return operator.server === "future";
  }).length;

  return {
    globalOperatorCount,
    futureOperatorCount,
  };
};

const sortReleaseInfoMap = (
  releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo>,
): Record<string, GeneratedOperatorReleaseInfo> => {
  return Object.fromEntries(
    Object.entries(releaseInfoByCharId).sort(
      ([charIdA, releaseInfoA], [charIdB, releaseInfoB]) => {
        if (releaseInfoA.order !== releaseInfoB.order) {
          return releaseInfoA.order - releaseInfoB.order;
        }

        return charIdA.localeCompare(charIdB);
      },
    ),
  );
};

/**
 * manual/operator-release-events.ts 배열 순서를 그대로 출시순 order로 사용합니다.
 *
 * 현재 프로젝트 기준:
 * - order 1 = 가장 최근 출시 이벤트
 * - order 숫자가 커질수록 오래된 이벤트
 * - server_open은 manual 이벤트 마지막 이후에 자동 배치
 */
const applyManualReleaseEvents = (
  releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo>,
  allOperatorInfoByCharId: Record<string, OperatorBasicInfo>,
): ApplyManualReleaseEventsResult => {
  const duplicateOperatorMappings: DuplicateOperatorMapping[] = [];
  const unknownManualOperatorMappings: UnknownManualOperatorMapping[] = [];
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
      if (allOperatorInfoByCharId[charId] === undefined) {
        unknownManualOperatorMappings.push({
          charId,
          eventId: releaseEvent.id,
          eventName: releaseEvent.name,
          order,
        });

        return;
      }

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
    duplicateOperatorMappings,
    unknownManualOperatorMappings,
    emptyReleaseEvents,
  };
};

const splitUnmappedOperators = (
  releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo>,
  allOperatorInfoList: OperatorBasicInfo[],
) => {
  const serverOpenOperatorList: OperatorBasicInfo[] = [];
  const unmappedFutureOperatorList: OperatorBasicInfo[] = [];

  allOperatorInfoList.forEach((operator) => {
    if (releaseInfoByCharId[operator.charId] !== undefined) {
      return;
    }

    if (operator.server === "global") {
      serverOpenOperatorList.push(operator);
      return;
    }

    unmappedFutureOperatorList.push(operator);
  });

  return {
    serverOpenOperatorList,
    unmappedFutureOperatorList,
  };
};

const applyAutoReleaseInfo = (
  releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo>,
  serverOpenOperatorList: OperatorBasicInfo[],
  unmappedFutureOperatorList: OperatorBasicInfo[],
) => {
  const hasUnmappedFutureOperators = unmappedFutureOperatorList.length > 0;

  const unmappedFutureOrder = operatorReleaseEventList.length + 1;
  const serverOpenOrder =
    operatorReleaseEventList.length + (hasUnmappedFutureOperators ? 2 : 1);

  const unmappedFutureReleaseInfo: GeneratedOperatorReleaseInfo = {
    eventId: UNMAPPED_FUTURE_RELEASE_EVENT_ID,
    eventName: "출시 이벤트 미지정",
    category: "other",
    order: unmappedFutureOrder,
  };

  const serverOpenReleaseInfo: GeneratedOperatorReleaseInfo = {
    eventId: SERVER_OPEN_RELEASE_EVENT_ID,
    eventName: "서버 오픈",
    category: "server_open",
    order: serverOpenOrder,
  };

  unmappedFutureOperatorList.forEach((operator) => {
    releaseInfoByCharId[operator.charId] = unmappedFutureReleaseInfo;
  });

  serverOpenOperatorList.forEach((operator) => {
    releaseInfoByCharId[operator.charId] = serverOpenReleaseInfo;
  });
};

const createOperatorReleaseInfoMap = (
  allOperatorInfoList: OperatorBasicInfo[],
  allOperatorInfoByCharId: Record<string, OperatorBasicInfo>,
  excludedOperatorList: ExcludedOperatorWithSource[],
  manualIncludedOperatorList: OperatorBasicInfo[],
): GenerateReleaseInfoResult => {
  const releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo> = {};

  const {
    duplicateOperatorMappings,
    unknownManualOperatorMappings,
    emptyReleaseEvents,
  } = applyManualReleaseEvents(releaseInfoByCharId, allOperatorInfoByCharId);

  const { serverOpenOperatorList, unmappedFutureOperatorList } =
    splitUnmappedOperators(releaseInfoByCharId, allOperatorInfoList);

  applyAutoReleaseInfo(
    releaseInfoByCharId,
    serverOpenOperatorList,
    unmappedFutureOperatorList,
  );

  const { globalOperatorCount, futureOperatorCount } =
    countOperatorsByServer(allOperatorInfoList);

  return {
    releaseInfoByCharId: sortReleaseInfoMap(releaseInfoByCharId),
    duplicateOperatorMappings,
    unknownManualOperatorMappings,
    emptyReleaseEvents,
    serverOpenOperatorList,
    unmappedFutureOperatorList,
    excludedOperatorList,
    manualIncludedOperatorList,
    globalOperatorCount,
    futureOperatorCount,
  };
};

const createGeneratedFileContent = (
  releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo>,
  serverOpenOperatorList: OperatorBasicInfo[],
  unmappedFutureOperatorList: OperatorBasicInfo[],
) => {
  return `import { type OperatorReleaseCategory } from "../manual/operator-release-types";

export type GeneratedOperatorReleaseInfo = {
  eventId: string;
  eventName: string;
  category: OperatorReleaseCategory;
  order: number;
};

export type GeneratedReleaseOperatorInfo = {
  charId: string;
  name: string;
  profession: string;
  server: "global" | "future";
};

/**
 * manual/operator-release-events.ts와 최신 character_table.json을 기반으로
 * 자동 생성된 출시 정보 맵입니다.
 *
 * order는 다음 기준을 따릅니다.
 * - 1: 가장 최근 출시 이벤트
 * - 숫자가 커질수록 오래된 이벤트
 * - server_open은 manual 이벤트 마지막 이후에 자동 배치됩니다.
 *
 * 직접 수정하지 말고 \`npm run generate:operator-release-info\`로 재생성하세요.
 */
export const operatorReleaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo> = ${JSON.stringify(
    releaseInfoByCharId,
    null,
    2,
  )};

/**
 * manual/operator-release-events.ts에 없어서 server_open으로 자동 분류된
 * 글로벌 오퍼레이터 목록입니다.
 */
export const serverOpenOperatorList: GeneratedReleaseOperatorInfo[] = ${JSON.stringify(
    serverOpenOperatorList,
    null,
    2,
  )};

/**
 * CN character_table에는 있지만 manual/operator-release-events.ts에서
 * 출시 이벤트를 찾지 못한 future 오퍼레이터 목록입니다.
 *
 * 가능하면 manual/operator-release-events.ts에 출시 이벤트를 추가해 주세요.
 */
export const unmappedFutureOperatorList: GeneratedReleaseOperatorInfo[] = ${JSON.stringify(
    unmappedFutureOperatorList,
    null,
    2,
  )};
`;
};

const createOperatorListSection = (
  title: string,
  description: string,
  operatorList: OperatorBasicInfo[],
) => {
  const lines: string[] = [title, "", description, ""];

  if (operatorList.length === 0) {
    lines.push("- 없음");
    lines.push("");

    return lines;
  }

  operatorList.forEach((operator) => {
    lines.push(
      `- \`${operator.charId}\` / ${operator.name} / ${operator.profession} / ${operator.server}`,
    );
  });

  lines.push("");

  return lines;
};

const createUnknownManualOperatorSection = (
  unknownManualOperatorMappings: UnknownManualOperatorMapping[],
) => {
  const lines: string[] = [
    "## Unknown Manual Operator Mappings",
    "",
    "> manual/operator-release-events.ts에는 있지만, raw global/CN character_table 또는 필터 포함 목록에서 찾지 못한 charId입니다.",
    "> 오타이거나, 현재 참조 중인 game data 버전에 아직 없는 오퍼레이터일 가능성이 있습니다.",
    "",
  ];

  if (unknownManualOperatorMappings.length === 0) {
    lines.push("- 없음");
    lines.push("");

    return lines;
  }

  unknownManualOperatorMappings.forEach((mapping) => {
    lines.push(
      `- #${mapping.order} \`${mapping.eventId}\` / ${mapping.eventName} / \`${mapping.charId}\``,
    );
  });

  lines.push("");

  return lines;
};

const createEmptyReleaseEventSection = (
  emptyReleaseEvents: EmptyReleaseEvent[],
) => {
  const lines: string[] = [
    "## Empty Release Events",
    "",
    "> operatorIds가 비어 있는 이벤트입니다. 실제 출시 오퍼레이터가 있다면 manual 파일에서 채워주세요.",
    "",
  ];

  if (emptyReleaseEvents.length === 0) {
    lines.push("- 없음");
    lines.push("");

    return lines;
  }

  emptyReleaseEvents.forEach((releaseEvent) => {
    lines.push(
      `- #${releaseEvent.order} \`${releaseEvent.id}\` / ${releaseEvent.name} / ${releaseEvent.category}`,
    );
  });

  lines.push("");

  return lines;
};

const createExcludedOperatorSection = (
  excludedOperatorList: ExcludedOperatorWithSource[],
) => {
  const lines: string[] = [
    "## Excluded Operators",
    "",
    "> 구조 기반 필터 또는 manual/operator-exclusions.ts에 의해 제외된 캐릭터입니다.",
    "> manual/operator-release-events.ts에 들어간 charId는 raw character_table에 존재하는 경우 이 목록에서 제외하고 releaseInfo 생성 대상에 포함합니다.",
    "",
  ];

  if (excludedOperatorList.length === 0) {
    lines.push("- 없음");
    lines.push("");

    return lines;
  }

  excludedOperatorList.forEach((operator) => {
    lines.push(
      `- [${operator.source}] \`${operator.charId}\` / ${operator.name} / ${operator.profession} / ${operator.rarity}`,
    );
    lines.push(`  - reasons: ${operator.reasons.join(", ")}`);
  });

  lines.push("");

  return lines;
};

const createDuplicateOperatorMappingSection = (
  duplicateOperatorMappings: DuplicateOperatorMapping[],
) => {
  const lines: string[] = [
    "## Duplicate Operator Mappings",
    "",
    "> 같은 charId가 여러 이벤트에 들어간 경우입니다. 첫 번째 매핑만 generated map에 반영됩니다.",
    "",
  ];

  if (duplicateOperatorMappings.length === 0) {
    lines.push("- 없음");
    lines.push("");

    return lines;
  }

  duplicateOperatorMappings.forEach((duplicateMapping) => {
    lines.push(
      `- \`${duplicateMapping.charId}\`: first=\`${duplicateMapping.firstEventId}\`, duplicated=\`${duplicateMapping.duplicatedEventId}\``,
    );
  });

  lines.push("");

  return lines;
};

const createReport = (result: GenerateReleaseInfoResult) => {
  const mappedOperatorCount = Object.keys(result.releaseInfoByCharId).length;
  const totalOperatorCount =
    result.globalOperatorCount + result.futureOperatorCount;

  const lines: string[] = [
    "# Operator Release Info Report",
    "",
    "> manual/operator-release-events.ts와 최신 character_table.json을 기반으로 생성한 출시 정보 보고서입니다.",
    "",
    `- Manual release events: ${operatorReleaseEventList.length}`,
    `- Total operators: ${totalOperatorCount}`,
    `  - Global operators: ${result.globalOperatorCount}`,
    `  - Future operators: ${result.futureOperatorCount}`,
    `- Mapped operators: ${mappedOperatorCount}`,
    `- Unmapped future operators: ${result.unmappedFutureOperatorList.length}`,
    `- Unknown manual operator mappings: ${result.unknownManualOperatorMappings.length}`,
    `- Empty release events: ${result.emptyReleaseEvents.length}`,
    `- Excluded operators: ${result.excludedOperatorList.length}`,
    `- Server open operators: ${result.serverOpenOperatorList.length}`,
    `- Duplicate operator mappings: ${result.duplicateOperatorMappings.length}`,
    `- Manual-included filtered operators: ${result.manualIncludedOperatorList.length}`,
    "",
    "## Order Rule",
    "",
    "- order 1 = 가장 최근 출시 이벤트",
    "- order 숫자가 커질수록 오래된 이벤트",
    "- server_open은 manual 이벤트 마지막 이후에 자동 배치됩니다.",
    "",
  ];

  lines.push(
    ...createOperatorListSection(
      "## Unmapped Future Operators",
      "> CN character_table에는 있지만 manual/operator-release-events.ts에서 출시 이벤트를 찾지 못한 future 오퍼레이터입니다. 가능하면 manual 파일에 출시 이벤트를 추가해 주세요.",
      result.unmappedFutureOperatorList,
    ),
  );

  lines.push(
    ...createUnknownManualOperatorSection(result.unknownManualOperatorMappings),
  );

  lines.push(
    ...createDuplicateOperatorMappingSection(result.duplicateOperatorMappings),
  );

  lines.push(...createEmptyReleaseEventSection(result.emptyReleaseEvents));

  lines.push(...createExcludedOperatorSection(result.excludedOperatorList));

  lines.push(
    ...createOperatorListSection(
      "## Server Open Operators",
      "> manual/operator-release-events.ts에 없어서 server_open으로 자동 분류된 글로벌 오퍼레이터입니다.",
      result.serverOpenOperatorList,
    ),
  );

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
  const globalGamedataPath = loadGamedataPath();
  const cnGamedataPath = loadCnGamedataPath();

  const globalCharacterTable = readLatestJsonFile<CharacterTable>(
    globalGamedataPath,
    GLOBAL_CHARACTER_TABLE_PATH,
  );

  const cnCharacterTable = readLatestJsonFile<CharacterTable>(
    cnGamedataPath,
    CN_CHARACTER_TABLE_PATH,
  );

  const {
    allOperatorInfoList,
    allOperatorInfoByCharId,
    excludedOperatorList,
    manualIncludedOperatorList,
  } = createAllOperatorInfoList(globalCharacterTable, cnCharacterTable);

  const result = createOperatorReleaseInfoMap(
    allOperatorInfoList,
    allOperatorInfoByCharId,
    excludedOperatorList,
    manualIncludedOperatorList,
  );

  writeGeneratedFile(
    RELEASE_INFO_OUTPUT_PATH,
    createGeneratedFileContent(
      result.releaseInfoByCharId,
      result.serverOpenOperatorList,
      result.unmappedFutureOperatorList,
    ),
  );

  writeGeneratedFile(RELEASE_INFO_REPORT_OUTPUT_PATH, createReport(result));

  console.log(
    `출시 정보 ${Object.keys(result.releaseInfoByCharId).length}개를 생성했습니다.`,
  );
  console.log(`글로벌 오퍼레이터: ${result.globalOperatorCount}개`);
  console.log(`미래시 오퍼레이터: ${result.futureOperatorCount}개`);
  console.log(
    `출시 이벤트 미지정된 미래시 오퍼레이터: ${result.unmappedFutureOperatorList.length}개`,
  );
  console.log(`=============================================`);
  console.log(
    `manual 기준으로 필터 제외에서 복구한 오퍼레이터: ${result.manualIncludedOperatorList.length}개`,
  );
  console.log(`=============================================`);
  console.log(
    `manual에 있지만 raw character_table에 없는 오퍼레이터: ${result.unknownManualOperatorMappings.length}개`,
  );
  console.log(`빈 출시 이벤트: ${result.emptyReleaseEvents.length}개`);
  console.log(`=============================================`);
  console.log(
    `server_open 자동 분류 오퍼레이터: ${result.serverOpenOperatorList.length}개`,
  );
  console.log(`제외된 캐릭터: ${result.excludedOperatorList.length}개`);
  console.log(
    `중복 오퍼레이터 매핑: ${result.duplicateOperatorMappings.length}개`,
  );
  console.log(`=============================================`);
  console.log(`생성 완료: ${RELEASE_INFO_OUTPUT_PATH}`);
  console.log(`생성 완료: ${RELEASE_INFO_REPORT_OUTPUT_PATH}`);
};

main();
