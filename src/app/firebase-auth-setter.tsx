"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSetAtom } from "jotai";
import { firebaseAuth } from "@/lib/firebase/client";
import { authInitializedAtom, authUserAtom } from "@/store/auth";

/** Firebase 인증 상태를 설정하는 컴포넌트 */
export default function AuthStateSetter() {
  const setAuthUser = useSetAtom(authUserAtom);
  const setAuthInitialized = useSetAtom(authInitializedAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user === null) {
        setAuthUser(null);
        setAuthInitialized(true);
        return;
      }

      setAuthUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      setAuthInitialized(true);
    });

    return () => {
      unsubscribe();
    };
  }, [setAuthUser, setAuthInitialized]);

  return null;
}
