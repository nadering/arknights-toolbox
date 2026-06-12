import { signInWithPopup, signOut } from "firebase/auth";
import { firebaseAuth, googleProvider } from "@/lib/firebase/client";

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(firebaseAuth, googleProvider);

  return result.user;
};

export const signOutFromGoogle = async () => {
  await signOut(firebaseAuth);
};
