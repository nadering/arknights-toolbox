"use client";

import { Provider } from "jotai";

/** Jotai를 사용하기 위해 웹을 Provider로 감싸주는 컴포넌트 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
