"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  expAtom,
  makeEmptyDepot,
  selectedOperatorsAtom,
  selectedOperatorsMaterialAtom,
  userDepotAtom,
  userDepotInitializedAtom,
  userNeedAtom,
  userNeedInitializedAtom,
} from "@/store";
import { EXP } from "@/data/material";

/** localStorage 불러오기 및 저장을 담당하는 클라이언트 레이아웃 컴포넌트 */
export default function LocalStorageSetter() {
  // 사용자의 현재 재료 보유량
  const [userDepot, setUserDepot] = useAtom(userDepotAtom);

  // 사용자의 필요 재료
  const [userNeed, setUserNeed] = useAtom(userNeedAtom);

  // 오퍼레이터 육성에 필요한 총 경험치
  const [exp, setExp] = useAtom(expAtom);

  // 창고 및 육성 재화 설정 여부
  const [userDepotInitialized, setUserDepotInitialized] = useAtom(
    userDepotInitializedAtom
  );
  const [userNeedInitialized, setUserNeedInitialized] = useAtom(
    userNeedInitializedAtom
  );

  // 선택된 오퍼레이터
  const [selectedOperators, setSelectedOperators] = useAtom(
    selectedOperatorsAtom
  );

  // 선택된 오퍼레이터의 육성 재화
  const [selectedOperatorsMaterial, setSelectedOperatorsMaterial] = useAtom(
    selectedOperatorsMaterialAtom
  );

  // localStorage에서 값을 가져왔는지 여부
  const [dataFetched, setDataFetched] = useState(false);

  // localStorage에서 값을 불러옴
  useEffect(() => {
    // 사용자의 현재 재료 보유량
    const userDepotSaved = localStorage.getItem("userDepot");
    if (userDepotSaved) {
      try {
        setUserDepot(JSON.parse(userDepotSaved));
        setUserDepotInitialized(true);
      } catch {
        setUserDepot(makeEmptyDepot());
      }
    }

    // 사용자의 필요 재료
    const userNeedSaved = localStorage.getItem("userNeed");
    if (userNeedSaved) {
      try {
        setUserNeed(JSON.parse(userNeedSaved));
        setUserNeedInitialized(true);
      } catch {
        setUserNeed(makeEmptyDepot());
      }
    }

    // 오퍼레이터 육성에 필요한 총 경험치
    const expSaved = localStorage.getItem("exp");
    if (expSaved) {
      try {
        setExp(JSON.parse(expSaved));
      } catch {
        setExp({ material: EXP, count: 0 });
      }
    }

    // 선택된 오퍼레이터의 육성 재화
    const selectedOperatorsMaterialSaved = localStorage.getItem(
      "selectedOperatorsMaterial"
    );
    if (selectedOperatorsMaterialSaved) {
      try {
        setSelectedOperatorsMaterial(
          JSON.parse(selectedOperatorsMaterialSaved)
        );
      } catch {
        setSelectedOperatorsMaterial([]);
      }
    }

    // 선택된 오퍼레이터
    const selectedOperatorsSaved = localStorage.getItem("selectedOperators");
    if (selectedOperatorsSaved) {
      try {
        setSelectedOperators(JSON.parse(selectedOperatorsSaved));
      } catch {
        setSelectedOperators([]);
      }
    }

    // 데이터를 가져왔음을 알림
    setDataFetched(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // localStorage에 값을 저장
  useEffect(() => {
    if (dataFetched) {
      if (userDepotInitialized) {
        localStorage.setItem("userDepot", JSON.stringify(userDepot));
      }
    }
  }, [dataFetched, userDepot, userDepotInitialized]);

  useEffect(() => {
    if (dataFetched) {
      if (userNeedInitialized) {
        localStorage.setItem("userNeed", JSON.stringify(userNeed));
        localStorage.setItem("exp", JSON.stringify(exp));
      }
    }
  }, [dataFetched, userNeed, exp, userNeedInitialized]);

  useEffect(() => {
    if (dataFetched) {
      localStorage.setItem(
        "selectedOperators",
        JSON.stringify(selectedOperators)
      );
      localStorage.setItem(
        "selectedOperatorsMaterial",
        JSON.stringify(selectedOperatorsMaterial)
      );
    }
  }, [dataFetched, selectedOperators, selectedOperatorsMaterial]);

  return <></>;
}
