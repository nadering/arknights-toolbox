"use client";

import { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  expAtom,
  makeEmptyDepot,
  operatorCollapsedAtom,
  OperatorMaterial,
  selectedOperatorsAtom,
  selectedOperatorsMaterialAtom,
  userDepotAtom,
  userDepotInitializedAtom,
  userNeedAtom,
  userNeedInitializedAtom,
  authInitializedAtom,
  authUserAtom,
  logoutInProgressAtom,
} from "@/store";
import { EXP } from "@/data/material";
import { Operator } from "@/data/operator";
import { calculateUserNeed } from "@/tool/calculate-user-need";
import {
  createDepotFromRawStorageData,
  createStorageData,
} from "@/tool/persisted-depot";
import {
  createAppDataFromUserCloudData,
  createUserCloudData,
  readUserCloudData,
  saveUserCloudData,
} from "@/lib/firebase/user-cloud-data";
import {
  normalizeSelectedOperators,
  normalizeSelectedOperatorsMaterial,
} from "@/tool/normalize-storage-data";

/** 저장소 불러오기 및 저장을 담당하는 클라이언트 레이아웃 컴포넌트 */
export default function StorageSetter() {
  // 로그인 및 유저 인증
  const authUser = useAtomValue(authUserAtom);
  const authInitialized = useAtomValue(authInitializedAtom);
  const [logoutInProgress, setLogoutInProgress] = useAtom(logoutInProgressAtom);

  // 사용자의 현재 재료 보유량
  const [userDepot, setUserDepot] = useAtom(userDepotAtom);
  const [userDepotInitialized, setUserDepotInitialized] = useAtom(
    userDepotInitializedAtom,
  );

  // 사용자의 필요 재료
  const setUserNeed = useSetAtom(userNeedAtom);
  const setUserNeedInitialized = useSetAtom(userNeedInitializedAtom);

  // 오퍼레이터 육성에 필요한 총 경험치
  const setExp = useSetAtom(expAtom);

  // 선택된 오퍼레이터
  const [selectedOperators, setSelectedOperators] = useAtom(
    selectedOperatorsAtom,
  );

  // 선택된 오퍼레이터의 육성 목표치
  const [selectedOperatorsMaterial, setSelectedOperatorsMaterial] = useAtom(
    selectedOperatorsMaterialAtom,
  );

  // 접기/펼치기 여부
  const [operatorCollapsed, setOperatorCollapsed] = useAtom(
    operatorCollapsedAtom,
  );

  // localStorage에서 값을 가져왔는지 여부
  const [localDataFetched, setLocalDataFetched] = useState(false);

  // Firestore에서 값을 가져왔는지 여부
  const [cloudDataFetched, setCloudDataFetched] = useState(false);

  // 동일 uid에 대해 Firestore 데이터를 여러 번 불러오지 않기 위한 Ref
  const cloudLoadedUidRef = useRef<string | null>(null);

  // Firestore 문서가 이미 존재하는지 여부
  // 기존 문서가 있으면 사용자가 데이터를 전부 지워도 빈 상태를 저장해야 하므로 필요함
  const cloudDocumentExistsRef = useRef(false);

  // localStorage에서 값을 불러옴
  useEffect(() => {
    let loadedSelectedOperators: number[] = [];
    let loadedSelectedOperatorsMaterial: OperatorMaterial[] = [];

    // 사용자의 현재 재료 보유량
    const userDepotSaved = localStorage.getItem("userDepot");

    if (userDepotSaved) {
      try {
        const restoredDepot = createDepotFromRawStorageData(userDepotSaved);

        setUserDepot(restoredDepot);
        setUserDepotInitialized(true);
      } catch {
        setUserDepot(makeEmptyDepot());
      }
    }

    // 선택된 오퍼레이터
    const selectedOperatorsSaved = localStorage.getItem("selectedOperators");

    if (selectedOperatorsSaved) {
      try {
        const savedObject = JSON.parse(selectedOperatorsSaved) as
          | Operator[]
          | number[];

        loadedSelectedOperators = normalizeSelectedOperators(savedObject);
        setSelectedOperators(loadedSelectedOperators);
      } catch {
        loadedSelectedOperators = [];
        setSelectedOperators([]);
      }
    }

    // 선택된 오퍼레이터의 육성 목표치
    const selectedOperatorsMaterialSaved = localStorage.getItem(
      "selectedOperatorsMaterial",
    );

    if (selectedOperatorsMaterialSaved) {
      try {
        const savedObject = JSON.parse(
          selectedOperatorsMaterialSaved,
        ) as OperatorMaterial[];

        loadedSelectedOperatorsMaterial =
          normalizeSelectedOperatorsMaterial(savedObject);

        setSelectedOperatorsMaterial(loadedSelectedOperatorsMaterial);
      } catch {
        loadedSelectedOperatorsMaterial = [];
        setSelectedOperatorsMaterial([]);
      }
    }

    // 접기/펼치기 여부
    const operatorCollapsedSaved = localStorage.getItem("operatorCollapsed");

    if (operatorCollapsedSaved) {
      try {
        setOperatorCollapsed(JSON.parse(operatorCollapsedSaved));
      } catch {
        setOperatorCollapsed(false);
      }
    }

    // 가져온 데이터를 기반으로, 필요 재료 계산 후 반영
    const { userNeed: newUserNeed, exp: newExp } = calculateUserNeed(
      loadedSelectedOperatorsMaterial,
    );

    setUserNeed(newUserNeed);
    setUserNeedInitialized(loadedSelectedOperatorsMaterial.length > 0);
    setExp({ material: EXP, count: newExp });

    // 더 이상 사용하지 않는 데이터 제거
    localStorage.removeItem("userNeed");
    localStorage.removeItem("exp");

    setLocalDataFetched(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 로그인 상태일 경우 Firestore에서 값을 불러옴
  useEffect(() => {
    const loadCloudData = async () => {
      if (!authInitialized) {
        return;
      }

      if (!localDataFetched) {
        return;
      }

      if (authUser === null) {
        cloudLoadedUidRef.current = null;
        cloudDocumentExistsRef.current = false;
        setCloudDataFetched(true);
        return;
      }

      if (cloudLoadedUidRef.current === authUser.uid) {
        return;
      }

      setCloudDataFetched(false);
      cloudLoadedUidRef.current = authUser.uid;

      const userCloudData = await readUserCloudData(authUser.uid);

      // Firestore에 계정 데이터가 없는 경우
      // 현재 localStorage에서 읽은 상태를 최초 클라우드 데이터로 저장
      if (userCloudData === null) {
        const hasLocalData =
          userDepotInitialized ||
          selectedOperators.length > 0 ||
          selectedOperatorsMaterial.length > 0 ||
          operatorCollapsed;

        if (hasLocalData) {
          const newUserCloudData = createUserCloudData({
            userDepot,
            selectedOperators,
            selectedOperatorsMaterial,
            operatorCollapsed,
          });

          await saveUserCloudData(authUser.uid, newUserCloudData);
          cloudDocumentExistsRef.current = true;
        } else {
          cloudDocumentExistsRef.current = false;
        }

        setCloudDataFetched(true);
        return;
      }

      // Firestore에 계정 데이터가 있는 경우
      // 현재 버전에서는 Firestore 데이터를 우선 사용
      const appData = createAppDataFromUserCloudData(userCloudData);

      setUserDepot(appData.userDepot);
      setUserDepotInitialized(true);

      setSelectedOperators(appData.selectedOperators);
      setSelectedOperatorsMaterial(appData.selectedOperatorsMaterial);
      setOperatorCollapsed(appData.operatorCollapsed);

      setUserNeed(appData.userNeed);
      setUserNeedInitialized(appData.selectedOperatorsMaterial.length > 0);
      setExp({ material: EXP, count: appData.exp });

      cloudDocumentExistsRef.current = true;
      setCloudDataFetched(true);
    };

    loadCloudData();
  }, [
    authInitialized,
    authUser,
    localDataFetched,
    userDepot,
    userDepotInitialized,
    selectedOperators,
    selectedOperatorsMaterial,
    operatorCollapsed,
    setUserDepot,
    setUserDepotInitialized,
    setSelectedOperators,
    setSelectedOperatorsMaterial,
    setOperatorCollapsed,
    setUserNeed,
    setUserNeedInitialized,
    setExp,
  ]);

  // 로그아웃 진행 중인지 확인
  useEffect(() => {
    if (!authInitialized) {
      return;
    }

    if (authUser !== null) {
      return;
    }

    if (!logoutInProgress) {
      return;
    }

    setLogoutInProgress(false);
  }, [authInitialized, authUser, logoutInProgress, setLogoutInProgress]);

  // 비로그인 상태일 때만 localStorage에 userDepot 저장
  useEffect(() => {
    if (logoutInProgress) {
      return;
    }

    if (!authInitialized) {
      return;
    }

    if (authUser !== null) {
      return;
    }

    if (!localDataFetched) {
      return;
    }

    if (!userDepotInitialized) {
      localStorage.removeItem("userDepot");
      return;
    }

    const storageData = createStorageData(userDepot);
    localStorage.setItem("userDepot", JSON.stringify(storageData));
  }, [
    authInitialized,
    authUser,
    logoutInProgress,
    localDataFetched,
    userDepot,
    userDepotInitialized,
  ]);

  // 비로그인 상태일 때만 localStorage에 selectedOperators 관련 데이터 저장
  useEffect(() => {
    if (logoutInProgress) {
      return;
    }

    if (!authInitialized) {
      return;
    }

    if (authUser !== null) {
      return;
    }

    if (!localDataFetched) {
      return;
    }

    if (selectedOperators.length === 0) {
      localStorage.removeItem("selectedOperators");
    } else {
      localStorage.setItem(
        "selectedOperators",
        JSON.stringify(selectedOperators),
      );
    }

    if (selectedOperatorsMaterial.length === 0) {
      localStorage.removeItem("selectedOperatorsMaterial");
    } else {
      localStorage.setItem(
        "selectedOperatorsMaterial",
        JSON.stringify(selectedOperatorsMaterial),
      );
    }
  }, [
    authInitialized,
    authUser,
    logoutInProgress,
    localDataFetched,
    selectedOperators,
    selectedOperatorsMaterial,
  ]);

  // 비로그인 상태일 때만 localStorage에 접기/펼치기 여부 저장
  useEffect(() => {
    if (logoutInProgress) {
      return;
    }

    if (!authInitialized) {
      return;
    }

    if (authUser !== null) {
      return;
    }

    if (!localDataFetched) {
      return;
    }

    if (!operatorCollapsed) {
      localStorage.removeItem("operatorCollapsed");
      return;
    }

    localStorage.setItem(
      "operatorCollapsed",
      JSON.stringify(operatorCollapsed),
    );
  }, [
    authInitialized,
    authUser,
    logoutInProgress,
    localDataFetched,
    operatorCollapsed,
  ]);

  // 로그인 상태일 때는 Firestore에 저장
  useEffect(() => {
    if (logoutInProgress) {
      return;
    }

    if (!authInitialized) {
      return;
    }

    if (authUser === null) {
      return;
    }

    if (!localDataFetched) {
      return;
    }

    if (!cloudDataFetched) {
      return;
    }

    const hasAnyDataToSave =
      userDepotInitialized ||
      selectedOperators.length > 0 ||
      selectedOperatorsMaterial.length > 0 ||
      operatorCollapsed;

    if (!cloudDocumentExistsRef.current && !hasAnyDataToSave) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const userCloudData = createUserCloudData({
        userDepot,
        selectedOperators,
        selectedOperatorsMaterial,
        operatorCollapsed,
      });

      saveUserCloudData(authUser.uid, userCloudData);
      cloudDocumentExistsRef.current = true;
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    authInitialized,
    authUser,
    logoutInProgress,
    localDataFetched,
    cloudDataFetched,
    userDepot,
    userDepotInitialized,
    selectedOperators,
    selectedOperatorsMaterial,
    operatorCollapsed,
  ]);

  return <></>;
}
