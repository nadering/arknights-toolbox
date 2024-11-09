"use client";

import React, { useEffect, useState } from "react";

/** localStorage 같이 Client 단에서만 작동할 수 있는 기능이 있다면, 해당 컴포넌트로 감싸야 함 */
export default function ClientOnly({
  children,
  ...delegated
}: {
  children: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
