import {
  generatedOperatorList,
  type GeneratedOperator,
} from "./operators.generated";

/**
 * operator id로 operator를 빠르게 조회하기 위한 generated map입니다.
 *
 * 직접 수정하지 말고 npm run generate:operators로 재생성하세요.
 */
export const operatorById: Record<string, GeneratedOperator> = Object.fromEntries(
  generatedOperatorList.map((operator) => {
    return [operator.id, operator];
  }),
);
