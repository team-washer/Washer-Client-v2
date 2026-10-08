"use client";

import { useEffect, useState } from "react";

// 초 단위 카운트다운을 위해 현재 시각을 주기적으로 갱신한다.
// 서버 렌더와 hydration 시각이 달라 결과가 어긋나지 않도록 mount 전에는 null을 반환한다.
export function useNow(intervalMs = 1000): number | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);

  return now;
}
