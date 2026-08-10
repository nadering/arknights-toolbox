import Operator from "./operator";
import { generatedOperatorList } from "./generated/operators.generated";

/** 전체 오퍼레이터 리스트 */
export const operatorList: Operator[] = generatedOperatorList;

/**
 * @deprecated
 * future 여부는 더 이상 number id로 판단하지 않고,
 * operator.server === "future"로 판단합니다.
 */
export const RECENT_OPERATOR_ID = "";
