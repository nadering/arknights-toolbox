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

  useEffect(() => {
    // 사용자가 보유량 및 필요 재료를 모두 설정하지 않았으면, 메인 페이지로 리다이렉트
    let doRedirect = true;

    // 1. Atom에서 확인
    if (userDepotInitialized && userNeedInitialized) {
      doRedirect = false;
    }

    // 2. localStorage에서 확인
    const userDepotSaved = localStorage.getItem("userDepot");
    const userNeedSaved = localStorage.getItem("userNeed");
    if (userDepotSaved && userNeedSaved) {
      doRedirect = false;
    }

    // Atom과 localStorage에 모두 없다면 사용자가 설정하지 않았다는 것이므로, 메인 페이지로 리다이렉트
    if (doRedirect) { 
      router.push("/");
    }

  }, [userDepotInitialized, userNeedInitialized, router]);

  return <>{userDepotInitialized && userNeedInitialized && <ResultSetter />}</>;
}
