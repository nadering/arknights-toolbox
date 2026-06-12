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
import {
  createDepotFromRawStorageData,
  createStorageData,
  normalizeSelectedOperators,
  normalizeSelectedOperatorsMaterial,
  calculateUserNeed,
  formatSavedAt,
  clearLocalUserData,
} from "@/tool";
import {
  createAppDataFromUserCloudData,
  createUserCloudData,
  readUserCloudData,
  saveUserCloudData,
  UserCloudData,
} from "@/lib/firebase/user-cloud-data";
import { StorageConflictModal } from "./_common/modal/storage-conflict-modal";

// localStorage에서 데이터를 불러올 때, 마지막으로 업데이트된 시간을 저장하는 키
const LOCAL_UPDATED_AT_KEY = "localUpdatedAt";

// localStorage와 Firebase 간 데이터 충돌이 발생했을 때, 사용자에게 선택지를 보여주기 위한 상태
type StorageConflictData = {
  localData: UserCloudData;
  cloudData: UserCloudData;
  localSavedAt: string;
  cloudSavedAt: string;
};

const createUserCloudDataSignature = (userCloudData: UserCloudData) => {
  return JSON.stringify({
    schemaVersion: userCloudData.schemaVersion,
    userDepot: userCloudData.userDepot,
    selectedOperators: userCloudData.selectedOperators,
    selectedOperatorsMaterial: userCloudData.selectedOperatorsMaterial,
    operatorCollapsed: userCloudData.operatorCollapsed,
  });
};

const hasMeaningfulUserCloudData = (userCloudData: UserCloudData) => {
  return (
    Object.keys(userCloudData.userDepot.items).length > 0 ||
    userCloudData.selectedOperators.length > 0 ||
    userCloudData.selectedOperatorsMaterial.length > 0 ||
    userCloudData.operatorCollapsed
  );
};

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

  // 데이터 충돌 처리를 위한 상태
  const [storageConflictData, setStorageConflictData] =
    useState<StorageConflictData | null>(null);

  // Refs
  const cloudLoadedUidRef = useRef<string | null>(null); // 동일 uid에 대해 Firestore 데이터를 여러 번 불러오지 않기 위함
  const cloudReadyUidRef = useRef<string | null>(null); // 해당 uid에 대해 충돌 처리가 끝나서 저장해도 되는 상태인지 확인
  const cloudDocumentExistsRef = useRef(false); // Firestore 문서가 이미 존재하는지 여부
  const cloudBaselineSignatureRef = useRef<string | null>(null); // Firestore에서 가져온 데이터의 시그니처를 저장
  const localDataExistsRef = useRef(false); // localStorage에 저장된 데이터가 있는지 여부

  const createCurrentUserCloudData = () => {
    return createUserCloudData({
      userDepot,
      selectedOperators,
      selectedOperatorsMaterial,
      operatorCollapsed,
    });
  };

  // localStorage 데이터를 Firestore에 저장하는 함수
  const handleUseLocalDataClick = async () => {
    if (authUser === null) {
      return;
    }

    if (storageConflictData === null) {
      return;
    }

    const appData = createAppDataFromUserCloudData(
      storageConflictData.localData,
    );

    const normalizedLocalData = createUserCloudData({
      userDepot: appData.userDepot,
      selectedOperators: appData.selectedOperators,
      selectedOperatorsMaterial: appData.selectedOperatorsMaterial,
      operatorCollapsed: appData.operatorCollapsed,
    });

    await saveUserCloudData(authUser.uid, normalizedLocalData);

    setUserDepot(appData.userDepot);
    setUserDepotInitialized(true);

    setSelectedOperators(appData.selectedOperators);
    setSelectedOperatorsMaterial(appData.selectedOperatorsMaterial);
    setOperatorCollapsed(appData.operatorCollapsed);

    setUserNeed(appData.userNeed);
    setUserNeedInitialized(appData.selectedOperatorsMaterial.length > 0);
    setExp({ material: EXP, count: appData.exp });

    clearLocalUserData();

    cloudDocumentExistsRef.current = true;
    cloudLoadedUidRef.current = authUser.uid;
    cloudReadyUidRef.current = authUser.uid;
    cloudBaselineSignatureRef.current =
      createUserCloudDataSignature(normalizedLocalData);
    localDataExistsRef.current = false;

    setStorageConflictData(null);
    setCloudDataFetched(true);
  };

  // Firestore 데이터를 localStorage에 저장하는 함수
  const handleUseCloudDataClick = () => {
    if (authUser === null) {
      return;
    }

    if (storageConflictData === null) {
      return;
    }

    const appData = createAppDataFromUserCloudData(
      storageConflictData.cloudData,
    );

    const normalizedCloudData = createUserCloudData({
      userDepot: appData.userDepot,
      selectedOperators: appData.selectedOperators,
      selectedOperatorsMaterial: appData.selectedOperatorsMaterial,
      operatorCollapsed: appData.operatorCollapsed,
    });

    setUserDepot(appData.userDepot);
    setUserDepotInitialized(true);

    setSelectedOperators(appData.selectedOperators);
    setSelectedOperatorsMaterial(appData.selectedOperatorsMaterial);
    setOperatorCollapsed(appData.operatorCollapsed);

    setUserNeed(appData.userNeed);
    setUserNeedInitialized(appData.selectedOperatorsMaterial.length > 0);
    setExp({ material: EXP, count: appData.exp });

    clearLocalUserData();

    cloudDocumentExistsRef.current = true;
    cloudLoadedUidRef.current = authUser.uid;
    cloudReadyUidRef.current = authUser.uid;
    cloudBaselineSignatureRef.current =
      createUserCloudDataSignature(normalizedCloudData);
    localDataExistsRef.current = false;

    setStorageConflictData(null);
    setCloudDataFetched(true);
  };

  // localStorage에서 값을 불러옴
  useEffect(() => {
    let loadedSelectedOperators: number[] = [];
    let loadedSelectedOperatorsMaterial: OperatorMaterial[] = [];
    let localDataExists = false;

    const userDepotSaved = localStorage.getItem("userDepot");

    if (userDepotSaved) {
      try {
        const restoredDepot = createDepotFromRawStorageData(userDepotSaved);

        setUserDepot(restoredDepot);
        setUserDepotInitialized(true);
        localDataExists = true;
      } catch {
        setUserDepot(makeEmptyDepot());
      }
    }

    const selectedOperatorsSaved = localStorage.getItem("selectedOperators");

    if (selectedOperatorsSaved) {
      try {
        const savedObject = JSON.parse(selectedOperatorsSaved) as
          | Operator[]
          | number[];

        loadedSelectedOperators = normalizeSelectedOperators(savedObject);
        setSelectedOperators(loadedSelectedOperators);

        if (loadedSelectedOperators.length > 0) {
          localDataExists = true;
        }
      } catch {
        loadedSelectedOperators = [];
        setSelectedOperators([]);
      }
    }

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

        if (loadedSelectedOperatorsMaterial.length > 0) {
          localDataExists = true;
        }
      } catch {
        loadedSelectedOperatorsMaterial = [];
        setSelectedOperatorsMaterial([]);
      }
    }

    const operatorCollapsedSaved = localStorage.getItem("operatorCollapsed");

    if (operatorCollapsedSaved) {
      try {
        const parsedOperatorCollapsed = JSON.parse(operatorCollapsedSaved);

        setOperatorCollapsed(parsedOperatorCollapsed);

        if (parsedOperatorCollapsed) {
          localDataExists = true;
        }
      } catch {
        setOperatorCollapsed(false);
      }
    }

    const { userNeed: newUserNeed, exp: newExp } = calculateUserNeed(
      loadedSelectedOperatorsMaterial,
    );

    setUserNeed(newUserNeed);
    setUserNeedInitialized(loadedSelectedOperatorsMaterial.length > 0);
    setExp({ material: EXP, count: newExp });

    localStorage.removeItem("userNeed");
    localStorage.removeItem("exp");

    localDataExistsRef.current = localDataExists;

    setLocalDataFetched(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 로그인 상태일 경우 Firestore에서 값을 불러옴
  useEffect(() => {
    const loadCloudData = async () => {
      if (logoutInProgress) {
        return;
      }

      if (!authInitialized) {
        return;
      }

      if (!localDataFetched) {
        return;
      }

      if (authUser === null) {
        cloudLoadedUidRef.current = null;
        cloudReadyUidRef.current = null;
        cloudDocumentExistsRef.current = false;
        cloudBaselineSignatureRef.current = null;

        setStorageConflictData(null);
        setCloudDataFetched(true);
        return;
      }

      if (storageConflictData !== null) {
        return;
      }

      if (cloudLoadedUidRef.current === authUser.uid) {
        return;
      }

      cloudLoadedUidRef.current = authUser.uid;
      cloudReadyUidRef.current = null;
      cloudDocumentExistsRef.current = false;
      cloudBaselineSignatureRef.current = null;
      setCloudDataFetched(false);

      try {
        const userCloudData = await readUserCloudData(authUser.uid);
        const localData = createCurrentUserCloudData();
        const hasLocalData = hasMeaningfulUserCloudData(localData);

        if (userCloudData === null) {
          if (hasLocalData) {
            await saveUserCloudData(authUser.uid, localData);
            clearLocalUserData();

            cloudDocumentExistsRef.current = true;
            localDataExistsRef.current = false;
          } else {
            cloudDocumentExistsRef.current = false;
          }

          cloudReadyUidRef.current = authUser.uid;
          cloudBaselineSignatureRef.current =
            createUserCloudDataSignature(localData);

          setCloudDataFetched(true);
          return;
        }

        if (hasLocalData) {
          const localSavedAt = formatSavedAt(
            localStorage.getItem(LOCAL_UPDATED_AT_KEY),
          );

          const cloudSavedAt = formatSavedAt(userCloudData.updatedAt);

          setStorageConflictData({
            localData,
            cloudData: userCloudData,
            localSavedAt,
            cloudSavedAt,
          });

          cloudDocumentExistsRef.current = true;
          cloudReadyUidRef.current = null;
          setCloudDataFetched(false);
          return;
        }

        const appData = createAppDataFromUserCloudData(userCloudData);

        const normalizedCloudData = createUserCloudData({
          userDepot: appData.userDepot,
          selectedOperators: appData.selectedOperators,
          selectedOperatorsMaterial: appData.selectedOperatorsMaterial,
          operatorCollapsed: appData.operatorCollapsed,
        });

        setUserDepot(appData.userDepot);
        setUserDepotInitialized(true);

        setSelectedOperators(appData.selectedOperators);
        setSelectedOperatorsMaterial(appData.selectedOperatorsMaterial);
        setOperatorCollapsed(appData.operatorCollapsed);

        setUserNeed(appData.userNeed);
        setUserNeedInitialized(appData.selectedOperatorsMaterial.length > 0);
        setExp({ material: EXP, count: appData.exp });

        cloudDocumentExistsRef.current = true;
        cloudReadyUidRef.current = authUser.uid;
        cloudBaselineSignatureRef.current =
          createUserCloudDataSignature(normalizedCloudData);

        setCloudDataFetched(true);
      } catch (error) {
        console.error(error);

        cloudLoadedUidRef.current = null;
        cloudReadyUidRef.current = null;
        cloudDocumentExistsRef.current = false;
        cloudBaselineSignatureRef.current = null;
        setCloudDataFetched(false);
      }
    };

    loadCloudData();
  }, [
    logoutInProgress,
    authInitialized,
    authUser,
    localDataFetched,
    storageConflictData,
    userDepot,
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

  // localStorage에 데이터 저장
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

    const localData = createCurrentUserCloudData();
    const hasLocalData = hasMeaningfulUserCloudData(localData);

    localDataExistsRef.current = hasLocalData;

    const storageData = createStorageData(userDepot);

    if (Object.keys(storageData.items).length === 0) {
      localStorage.removeItem("userDepot");
    } else {
      localStorage.setItem("userDepot", JSON.stringify(storageData));
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

    if (!operatorCollapsed) {
      localStorage.removeItem("operatorCollapsed");
    } else {
      localStorage.setItem(
        "operatorCollapsed",
        JSON.stringify(operatorCollapsed),
      );
    }

    if (!hasLocalData) {
      localStorage.removeItem(LOCAL_UPDATED_AT_KEY);
      return;
    }

    localStorage.setItem(LOCAL_UPDATED_AT_KEY, new Date().toISOString());
  }, [
    logoutInProgress,
    authInitialized,
    authUser,
    localDataFetched,
    userDepot,
    selectedOperators,
    selectedOperatorsMaterial,
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

    if (storageConflictData !== null) {
      return;
    }

    if (cloudReadyUidRef.current !== authUser.uid) {
      return;
    }

    const currentUserCloudData = createCurrentUserCloudData();
    const currentSignature = createUserCloudDataSignature(currentUserCloudData);

    if (cloudBaselineSignatureRef.current === currentSignature) {
      return;
    }

    const hasAnyDataToSave = hasMeaningfulUserCloudData(currentUserCloudData);

    if (!cloudDocumentExistsRef.current && !hasAnyDataToSave) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      saveUserCloudData(authUser.uid, currentUserCloudData).then(() => {
        cloudDocumentExistsRef.current = true;
        cloudBaselineSignatureRef.current = currentSignature;
      });
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    logoutInProgress,
    authInitialized,
    authUser,
    localDataFetched,
    cloudDataFetched,
    storageConflictData,
    userDepot,
    selectedOperators,
    selectedOperatorsMaterial,
    operatorCollapsed,
  ]);

  return (
    <StorageConflictModal
      isOpen={storageConflictData !== null}
      localSavedAt={storageConflictData?.localSavedAt ?? "기록 없음"}
      cloudSavedAt={storageConflictData?.cloudSavedAt ?? "기록 없음"}
      onUseLocalData={handleUseLocalDataClick}
      onUseCloudData={handleUseCloudDataClick}
    />
  );
}
