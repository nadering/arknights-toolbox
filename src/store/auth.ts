import { atom } from "jotai";

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export const authUserAtom = atom<AuthUser | null>(null);
export const authInitializedAtom = atom<boolean>(false);

export const logoutInProgressAtom = atom<boolean>(false);
