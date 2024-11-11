"use client";

import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userDepotInitializedAtom, userNeedInitializedAtom } from "@/store";
import { useEffect } from "react";
import ResultSetter from "./result-setter";

export default function ResultPage() {
  // 조건에 맞지 않으면 리다이렉트시키기 위한 라우터
  const router = useRouter();

  // 사용자가 보유량 및 필요 재료를 모두 설정했을 때, 페이지에 접근 가능
  const userDepotInitialized = useAtomValue(userDepotInitializedAtom);
  const userNeedInitialized = useAtomValue(userNeedInitializedAtom);

  const canAccessResult = userDepotInitialized && userNeedInitialized;

  useEffect(() => {
    // 사용자가 보유량 및 필요 재료를 모두 설정하지 않았으면, 메인 페이지로 리다이렉트
    if (!canAccessResult) router.push("/");
  }, [canAccessResult, router]);

  return <>{canAccessResult ? <ResultSetter /> : <></>} </>;
}
