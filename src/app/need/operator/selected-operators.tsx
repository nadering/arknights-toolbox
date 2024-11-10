"use client";

import { useAtomValue } from "jotai";
import { selectedOperatorsAtom } from "@/store";
import SingleOperator from "./single-operator";

/** 선택된 오퍼레이터 목록 */
export default function SelectedOperators() {
  const selectedOperators = useAtomValue(selectedOperatorsAtom);

  return (
    <div className="w-full flex flex-row flex-wrap items-start gap-2">
      {[...selectedOperators].reverse().map((operator) => {
        return <SingleOperator key={operator.id} operator={operator} />;
      })}
    </div>
  );
}
