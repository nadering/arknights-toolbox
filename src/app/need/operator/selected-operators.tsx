"use client";

import { useAtomValue } from "jotai";
import { selectedOperatorsAtom } from "@/store";
import SingleOperator from "./single-operator";
import { getOperatorById } from "@/tool";

/** 선택된 오퍼레이터 목록 */
export default function SelectedOperators() {
  // 선택된 오퍼레이터
  const selectedOperators = useAtomValue(selectedOperatorsAtom);

  return (
    <div className="w-full flex flex-row flex-wrap items-start gap-2">
      {[...selectedOperators].reverse().map((id) => {
        const operator = getOperatorById(id);

        if (operator !== undefined) {
          return <SingleOperator key={id} operator={operator} />;
        }
      })}
    </div>
  );
}
