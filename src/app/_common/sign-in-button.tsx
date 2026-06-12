"use client";

import { EXP } from "@/data/material";
import { signInWithGoogle, signOutFromGoogle } from "@/lib/firebase/auth";
import {
  expAtom,
  makeEmptyDepot,
  operatorCollapsedAtom,
  selectedOperatorsAtom,
  selectedOperatorsMaterialAtom,
  userDepotAtom,
  userDepotInitializedAtom,
  userNeedAtom,
  userNeedInitializedAtom,
} from "@/store";
import { authUserAtom, logoutInProgressAtom } from "@/store/auth";
import { clearLocalUserData } from "@/tool";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { redirect } from "next/navigation";

/** 로그인, 로그아웃에 사용되는 버튼 컴포넌트 */
export default function SignInButton() {
  const authUser = useAtomValue(authUserAtom);
  const setLogoutInProgress = useSetAtom(logoutInProgressAtom);

  // 로그아웃 시 현재 localStorage에 저장되어 있던 데이터를 초기화하기 위함
  const setUserDepot = useSetAtom(userDepotAtom);
  const setUserDepotInitialized = useSetAtom(userDepotInitializedAtom);

  const setUserNeed = useSetAtom(userNeedAtom);
  const setUserNeedInitialized = useSetAtom(userNeedInitializedAtom);
  const setExp = useSetAtom(expAtom);

  const setSelectedOperators = useSetAtom(selectedOperatorsAtom);
  const setSelectedOperatorsMaterial = useSetAtom(
    selectedOperatorsMaterialAtom,
  );
  const setOperatorCollapsed = useSetAtom(operatorCollapsedAtom);

  // 로그인
  const handleLoginClick = async () => {
    await signInWithGoogle();
  };

  // 로그아웃
  const handleLogoutClick = async () => {
    setLogoutInProgress(true);

    try {
      await signOutFromGoogle();

      clearLocalUserData();

      setUserDepot(makeEmptyDepot());
      setUserDepotInitialized(false);

      setUserNeed(makeEmptyDepot());
      setUserNeedInitialized(false);

      setExp({ material: EXP, count: 0 });

      setSelectedOperators([]);
      setSelectedOperatorsMaterial([]);

      setOperatorCollapsed(false);

      // 로그아웃 시 메인 화면으로 이동
      redirect("/");
    } catch (error) {
      setLogoutInProgress(false);
      throw error;
    }
  };

  return (
    <button
      className={`group relative w-[28px] aspect-square translate-y-2 selection:bg-transparent`}
      onClick={authUser ? handleLogoutClick : handleLoginClick}
    >
      <Image
        className={`scale-110 transition:[filter_0s]
          ${
            authUser !== null
              ? "[filter:invert(100%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]"
              : "[filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]"
          }
          hover:[filter:invert(98%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]`}
        src="/images/others/user.png"
        alt="sign-in"
        fill
        sizes="10vw"
        draggable={false}
      />
      <p
        className="hidden absolute inset-x-auto top-0 right-0 z-10 px-3 py-[2px] bg-gray-900 text-gray-200 text-center text-nowrap
          rounded-lg translate-y-[135%] group-hover:block"
      >
        {authUser ? `로그아웃 (현재 계정: ${authUser.email})` : "로그인"}
      </p>
    </button>
  );
}
