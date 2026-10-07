"use client";

import { useEffect, useState } from "react";

// 초 단위 카운트다운을 위해 현재 시각을 주기적으로 갱신한다.
export function useNow(intervalMs = 1000): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);

  return now;
}
