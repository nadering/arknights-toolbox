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
import { operatorReleaseEventList } from "@/data/operator/manual/operator-release-events";
import {
  type OperatorReleaseCategory,
  type OperatorReleaseEvent,
  type Server,
} from "@/data/operator/manual/operator-release-types";
import { type CharacterTable } from "./character-types";
import {
  CN_ACTIVITY_TABLE_PATH,
  CN_CHARACTER_TABLE_PATH,
  GLOBAL_ACTIVITY_TABLE_PATH,
  GLOBAL_CHARACTER_TABLE_PATH,
} from "../table-path";

/**
 * 이벤트 정보를 기반으로, 오퍼레이터가 어떤 이벤트에 출시되었는지와
 * 이벤트가 시작된 날짜가 언제인지를 생성하는 스크립트
 */

const RELEASE_INFO_OUTPUT_PATH =
  "src/data/operator/generated/operator-release-info-map.generated.ts";

const RELEASE_EVENT_OUTPUT_PATH =
  "src/data/operator/generated/operator-release-events.generated.ts";

const RELEASE_INFO_REPORT_OUTPUT_PATH =
  "src/data/operator/generated/operator-release-info-report.md";

const SERVER_OPEN_RELEASE_EVENT_ID = "server_open";
const UNMAPPED_FUTURE_RELEASE_EVENT_ID = "unmapped_future_release";

const SERVER_OPEN_RELEASE_ORDER = 1;
const MANUAL_RELEASE_EVENT_START_ORDER = SERVER_OPEN_RELEASE_ORDER + 1;

type UnknownRecord = Record<string, unknown>;

type GeneratedOperatorReleaseInfo = {
  eventId: string;
  eventName: string;
  category: OperatorReleaseCategory;
  order: number;
};

type GeneratedOperatorReleaseEvent = {
  id: string;
  name: string;
  category: OperatorReleaseEvent["category"];
  server: OperatorReleaseEvent["server"];
  source: OperatorReleaseEvent["source"];
  order: number;
  startTime: number | null;
  startDate: string | null;
  operatorIds: string[];
};

type GeneratedLatestOperatorReleaseEvent = {
  id: string;
  name: string;
  server: OperatorReleaseEvent["server"];
  serverLabel: string;
  order: number;
  startTime: number | null;
  startDate: string | null;
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

type MissingReleaseEventStartTime = {
  id: string;
  name: string;
  server: OperatorReleaseEvent["server"];
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

type GenerateReleaseEventResult = {
  releaseEventList: GeneratedOperatorReleaseEvent[];
  latestReleaseEventByServer: Record<
    Server,
    GeneratedLatestOperatorReleaseEvent
  >;
  missingReleaseEventStartTimeList: MissingReleaseEventStartTime[];
};

const SERVER_LABEL_BY_SERVER: Record<Server, string> = {
  future: "중국 서버",
  global: "글로벌 서버",
};

const TIME_ZONE_BY_SERVER: Record<Server, string> = {
  future: "Asia/Shanghai",
  global: "Asia/Seoul",
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

const getNumberValue = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  return null;
};

const isUnknownRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null;
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

const createManualReleaseOrder = (eventIndex: number) => {
  return (
    MANUAL_RELEASE_EVENT_START_ORDER +
    (operatorReleaseEventList.length - 1 - eventIndex)
  );
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
          return releaseInfoB.order - releaseInfoA.order;
        }

        return charIdA.localeCompare(charIdB);
      },
    ),
  );
};

const getActivityInfoRecord = (
  activityTable: UnknownRecord,
): Record<string, UnknownRecord> => {
  const basicInfo = activityTable.basicInfo;

  if (isUnknownRecord(basicInfo)) {
    return Object.fromEntries(
      Object.entries(basicInfo).filter(
        (entry): entry is [string, UnknownRecord] => {
          return isUnknownRecord(entry[1]);
        },
      ),
    );
  }

  return Object.fromEntries(
    Object.entries(activityTable).filter(
      (entry): entry is [string, UnknownRecord] => {
        return isUnknownRecord(entry[1]);
      },
    ),
  );
};

const getActivityStartTime = (
  activityInfoRecord: Record<string, UnknownRecord>,
  activityId: string,
) => {
  const activityInfo = activityInfoRecord[activityId];

  if (activityInfo === undefined) {
    return null;
  }

  return getNumberValue(activityInfo.startTime);
};

const formatDate = (timestamp: number, timeZone: string) => {
  const timestampMs = timestamp > 9999999999 ? timestamp : timestamp * 1000;

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(timestampMs));

  const year = parts.find((part) => {
    return part.type === "year";
  })?.value;
  const month = parts.find((part) => {
    return part.type === "month";
  })?.value;
  const day = parts.find((part) => {
    return part.type === "day";
  })?.value;

  if (year === undefined || month === undefined || day === undefined) {
    throw new Error(`날짜 변환에 실패했습니다. timestamp=${timestamp}`);
  }

  return `${year}-${month}-${day}`;
};

const createGeneratedReleaseEvent = (
  releaseEvent: OperatorReleaseEvent,
  eventIndex: number,
  activityInfoRecordByServer: Record<Server, Record<string, UnknownRecord>>,
): GeneratedOperatorReleaseEvent => {
  const order = createManualReleaseOrder(eventIndex);
  const startTime = getActivityStartTime(
    activityInfoRecordByServer[releaseEvent.server],
    releaseEvent.id,
  );

  return {
    id: releaseEvent.id,
    name: releaseEvent.name,
    category: releaseEvent.category,
    server: releaseEvent.server,
    source: releaseEvent.source,
    order,
    startTime,
    startDate:
      startTime === null
        ? null
        : formatDate(startTime, TIME_ZONE_BY_SERVER[releaseEvent.server]),
    operatorIds: releaseEvent.operatorIds,
  };
};

const createLatestReleaseEventByServer = (
  releaseEventList: GeneratedOperatorReleaseEvent[],
): Record<Server, GeneratedLatestOperatorReleaseEvent> => {
  const latestReleaseEventByServer: Partial<
    Record<Server, GeneratedLatestOperatorReleaseEvent>
  > = {};

  releaseEventList.forEach((releaseEvent) => {
    if (latestReleaseEventByServer[releaseEvent.server] !== undefined) {
      return;
    }

    latestReleaseEventByServer[releaseEvent.server] = {
      id: releaseEvent.id,
      name: releaseEvent.name,
      server: releaseEvent.server,
      serverLabel: SERVER_LABEL_BY_SERVER[releaseEvent.server],
      order: releaseEvent.order,
      startTime: releaseEvent.startTime,
      startDate: releaseEvent.startDate,
    };
  });

  const futureLatestReleaseEvent = latestReleaseEventByServer.future;
  const globalLatestReleaseEvent = latestReleaseEventByServer.global;

  if (futureLatestReleaseEvent === undefined) {
    throw new Error("중국 서버 최신 출시 이벤트를 찾을 수 없습니다.");
  }

  if (globalLatestReleaseEvent === undefined) {
    throw new Error("글로벌 서버 최신 출시 이벤트를 찾을 수 없습니다.");
  }

  return {
    future: futureLatestReleaseEvent,
    global: globalLatestReleaseEvent,
  };
};

const createGeneratedReleaseEventList = (
  activityInfoRecordByServer: Record<Server, Record<string, UnknownRecord>>,
): GenerateReleaseEventResult => {
  const releaseEventList = operatorReleaseEventList.map(
    (releaseEvent, eventIndex) => {
      return createGeneratedReleaseEvent(
        releaseEvent,
        eventIndex,
        activityInfoRecordByServer,
      );
    },
  );

  const missingReleaseEventStartTimeList = releaseEventList
    .filter((releaseEvent) => {
      return releaseEvent.startTime === null;
    })
    .map((releaseEvent) => {
      return {
        id: releaseEvent.id,
        name: releaseEvent.name,
        server: releaseEvent.server,
        order: releaseEvent.order,
      };
    });

  return {
    releaseEventList,
    latestReleaseEventByServer:
      createLatestReleaseEventByServer(releaseEventList),
    missingReleaseEventStartTimeList,
  };
};

/**
 * manual/operator-release-events.ts 배열 순서는 그대로 유지합니다.
 *
 * 현재 프로젝트 기준:
 * - operator-release-events.ts는 최신 이벤트 → 오래된 이벤트 순서로 작성합니다.
 * - order 1 = 서버 오픈
 * - 가장 오래된 manual 이벤트 = order 2
 * - 최신 manual 이벤트일수록 더 큰 order
 * - 사용자에게 보여줄 때는 order 내림차순으로 정렬합니다.
 */
const applyManualReleaseEvents = (
  releaseInfoByCharId: Record<string, GeneratedOperatorReleaseInfo>,
  allOperatorInfoByCharId: Record<string, OperatorBasicInfo>,
): ApplyManualReleaseEventsResult => {
  const duplicateOperatorMappings: DuplicateOperatorMapping[] = [];
  const unknownManualOperatorMappings: UnknownManualOperatorMapping[] = [];
  const emptyReleaseEvents: EmptyReleaseEvent[] = [];

  operatorReleaseEventList.forEach((releaseEvent, eventIndex) => {
    const order = createManualReleaseOrder(eventIndex);

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
  const unmappedFutureOrder =
    MANUAL_RELEASE_EVENT_START_ORDER + operatorReleaseEventList.length;

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
    order: SERVER_OPEN_RELEASE_ORDER,
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
 * order는 다음 기준을 따릅니다. (시간 오름차순)
 * - 서버 오픈: 1
 * - 가장 오래된 manual 이벤트: 2
 * - 최신 manual 이벤트일수록 더 큰 order
 * - 출시 이벤트 미지정 future 오퍼레이터는 manual 이벤트보다 큰 order
 *
 * 표시 순서는 order 내림차순입니다.
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

const createGeneratedReleaseEventFileContent = (
  releaseEventResult: GenerateReleaseEventResult,
) => {
  return `import {
  type OperatorReleaseCategory,
  type OperatorReleaseSource,
  type Server,
} from "../manual/operator-release-types";

export type GeneratedOperatorReleaseEvent = {
  id: string;
  name: string;
  category: OperatorReleaseCategory;
  server: Server;
  source: OperatorReleaseSource;
  order: number;
  startTime: number | null;
  startDate: string | null;
  operatorIds: string[];
};

export type GeneratedLatestOperatorReleaseEvent = {
  id: string;
  name: string;
  server: Server;
  serverLabel: string;
  order: number;
  startTime: number | null;
  startDate: string | null;
};

/**
 * manual/operator-release-events.ts와 activity_table.json을 기반으로
 * 자동 생성된 출시 이벤트 목록입니다.
 *
 * - 이벤트명과 오퍼레이터 매핑은 manual/operator-release-events.ts를 따릅니다.
 * - startTime/startDate는 각 서버의 activity_table.json에서 가져옵니다.
 * - 배열 순서는 manual/operator-release-events.ts와 동일하게 최신 이벤트 → 오래된 이벤트입니다.
 *
 * 직접 수정하지 말고 \`npm run generate:operator-release-info\`로 재생성하세요.
 */
export const generatedOperatorReleaseEventList: readonly GeneratedOperatorReleaseEvent[] = ${JSON.stringify(
    releaseEventResult.releaseEventList,
    null,
    2,
  )};

/**
 * 각 서버의 최신 출시 이벤트입니다.
 *
 * generatedOperatorReleaseEventList를 서버별로 처음 발견한 값입니다.
 */
export const latestOperatorReleaseEventByServer: Record<Server, GeneratedLatestOperatorReleaseEvent> = ${JSON.stringify(
    releaseEventResult.latestReleaseEventByServer,
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

const createMissingReleaseEventStartTimeSection = (
  missingReleaseEventStartTimeList: MissingReleaseEventStartTime[],
) => {
  const lines: string[] = [
    "## Missing Release Event Start Times",
    "",
    "> manual/operator-release-events.ts의 id와 activity_table.json의 key가 맞지 않거나, 해당 activity에 startTime이 없는 경우입니다.",
    "> 최신 이벤트 표시에서 startDate가 null로 생성될 수 있으므로 확인이 필요합니다.",
    "",
  ];

  if (missingReleaseEventStartTimeList.length === 0) {
    lines.push("- 없음");
    lines.push("");

    return lines;
  }

  missingReleaseEventStartTimeList.forEach((releaseEvent) => {
    lines.push(
      `- #${releaseEvent.order} [${releaseEvent.server}] \`${releaseEvent.id}\` / ${releaseEvent.name}`,
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

const createReport = (
  result: GenerateReleaseInfoResult,
  releaseEventResult: GenerateReleaseEventResult,
) => {
  const mappedOperatorCount = Object.keys(result.releaseInfoByCharId).length;
  const totalOperatorCount =
    result.globalOperatorCount + result.futureOperatorCount;

  const lines: string[] = [
    "# Operator Release Info Report",
    "",
    "> manual/operator-release-events.ts와 최신 character_table.json을 기반으로 생성한 출시 정보 보고서입니다.",
    "",
    `- Manual release events: ${operatorReleaseEventList.length}`,
    `- Manual release events missing startTime: ${releaseEventResult.missingReleaseEventStartTimeList.length}`,
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
    "## Latest Release Events",
    "",
    `- 중국 서버: ${releaseEventResult.latestReleaseEventByServer.future.name} (${releaseEventResult.latestReleaseEventByServer.future.startDate ?? "날짜 미지정"})`,
    `- 글로벌 서버: ${releaseEventResult.latestReleaseEventByServer.global.name} (${releaseEventResult.latestReleaseEventByServer.global.startDate ?? "날짜 미지정"})`,
    "",
    "## Order Rule",
    "",
    "- operator-release-events.ts는 최신 이벤트 → 오래된 이벤트 순서로 유지합니다.",
    "- order 1 = 서버 오픈",
    "- 가장 오래된 manual 이벤트 = order 2",
    "- 최신 manual 이벤트일수록 더 큰 order",
    "- 출시 이벤트 미지정 future 오퍼레이터는 manual 이벤트보다 큰 order",
    "- 사용자에게 보여주는 순서는 order 내림차순입니다.",
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

  lines.push(
    ...createMissingReleaseEventStartTimeSection(
      releaseEventResult.missingReleaseEventStartTimeList,
    ),
  );

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

  const globalActivityTable = readLatestJsonFile<UnknownRecord>(
    globalGamedataPath,
    GLOBAL_ACTIVITY_TABLE_PATH,
  );

  const cnActivityTable = readLatestJsonFile<UnknownRecord>(
    cnGamedataPath,
    CN_ACTIVITY_TABLE_PATH,
  );

  const activityInfoRecordByServer: Record<
    Server,
    Record<string, UnknownRecord>
  > = {
    global: getActivityInfoRecord(globalActivityTable),
    future: getActivityInfoRecord(cnActivityTable),
  };

  const releaseEventResult = createGeneratedReleaseEventList(
    activityInfoRecordByServer,
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

  writeGeneratedFile(
    RELEASE_EVENT_OUTPUT_PATH,
    createGeneratedReleaseEventFileContent(releaseEventResult),
  );

  writeGeneratedFile(
    RELEASE_INFO_REPORT_OUTPUT_PATH,
    createReport(result, releaseEventResult),
  );

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
  console.log(
    `startTime을 찾지 못한 출시 이벤트: ${releaseEventResult.missingReleaseEventStartTimeList.length}개`,
  );
  console.log(`=============================================`);
  console.log(
    `server_open 자동 분류 오퍼레이터: ${result.serverOpenOperatorList.length}개`,
  );
  console.log(`제외된 캐릭터: ${result.excludedOperatorList.length}개`);
  console.log(
    `중복 오퍼레이터 매핑: ${result.duplicateOperatorMappings.length}개`,
  );
  console.log(`=============================================`);
  console.log(
    `중국 서버 최신 이벤트: ${releaseEventResult.latestReleaseEventByServer.future.name} (${releaseEventResult.latestReleaseEventByServer.future.startDate ?? "날짜 미지정"})`,
  );
  console.log(
    `글로벌 서버 최신 이벤트: ${releaseEventResult.latestReleaseEventByServer.global.name} (${releaseEventResult.latestReleaseEventByServer.global.startDate ?? "날짜 미지정"})`,
  );
  console.log(`=============================================`);
  console.log(`생성 완료: ${RELEASE_INFO_OUTPUT_PATH}`);
  console.log(`생성 완료: ${RELEASE_EVENT_OUTPUT_PATH}`);
  console.log(`생성 완료: ${RELEASE_INFO_REPORT_OUTPUT_PATH}`);
};

main();
