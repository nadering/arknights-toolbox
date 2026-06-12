import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase/client";
import { Depot, OperatorMaterial, PersistedDepot } from "@/store";
import {
  createDepotFromStorageData,
  createStorageData,
} from "@/tool/persisted-depot";
import {
  normalizeSelectedOperators,
  normalizeSelectedOperatorsMaterial,
  calculateUserNeed,
} from "@/tool";

export const USER_COLLECTION_NAME = "users";

export type UserCloudData = {
  schemaVersion: 1;
  userDepot: PersistedDepot;
  selectedOperators: number[];
  selectedOperatorsMaterial: OperatorMaterial[];
  operatorCollapsed: boolean;
  updatedAt?: Timestamp | null;
};

export type AppDataFromUserCloudData = {
  userDepot: Depot;
  userNeed: Depot;
  exp: number;
  selectedOperators: number[];
  selectedOperatorsMaterial: OperatorMaterial[];
  operatorCollapsed: boolean;
};

type CreateUserCloudDataParams = {
  userDepot: Depot;
  selectedOperators: number[];
  selectedOperatorsMaterial: OperatorMaterial[];
  operatorCollapsed: boolean;
};

/**
 * 현재 앱 상태를 Firestore에 저장할 수 있는 UserCloudData 형태로 변환
 */
export const createUserCloudData = (
  params: CreateUserCloudDataParams,
): UserCloudData => {
  return {
    schemaVersion: 1,
    userDepot: createStorageData(params.userDepot),
    selectedOperators: params.selectedOperators,
    selectedOperatorsMaterial: params.selectedOperatorsMaterial,
    operatorCollapsed: params.operatorCollapsed,
  };
};

/**
 * Firestore에서 사용자 클라우드 데이터 읽기
 */
export const readUserCloudData = async (
  uid: string,
): Promise<UserCloudData | null> => {
  const userDocumentRef = doc(firestore, USER_COLLECTION_NAME, uid);
  const snapshot = await getDoc(userDocumentRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserCloudData;
};

/**
 * Firestore에 사용자 클라우드 데이터 저장
 */
export const saveUserCloudData = async (
  uid: string,
  userCloudData: UserCloudData,
): Promise<void> => {
  const userDocumentRef = doc(firestore, USER_COLLECTION_NAME, uid);

  await setDoc(userDocumentRef, {
    ...userCloudData,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Firestore에서 가져온 UserCloudData를, 앱에서 쓰는 상태 형태로 변환
 */
export const createAppDataFromUserCloudData = (
  userCloudData: UserCloudData,
): AppDataFromUserCloudData => {
  const userDepot = createDepotFromStorageData(userCloudData.userDepot);

  const selectedOperators = normalizeSelectedOperators(
    userCloudData.selectedOperators,
  );

  const selectedOperatorsMaterial = normalizeSelectedOperatorsMaterial(
    userCloudData.selectedOperatorsMaterial,
  );

  const calculationResult = calculateUserNeed(selectedOperatorsMaterial);

  return {
    userDepot,
    userNeed: calculationResult.userNeed,
    exp: calculationResult.exp,
    selectedOperators,
    selectedOperatorsMaterial,
    operatorCollapsed: userCloudData.operatorCollapsed,
  };
};
