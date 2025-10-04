import { operatorList } from "@/data/operator";

/** ID에 따른 오퍼레이터 정보를 반환 */
export const getOperatorById = (id: number) => {
  return operatorList.find((operator) => operator.id === id);
};
