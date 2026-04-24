"use client";

import { useEffect, useMemo, useState } from "react";
import { formatRemainingTime } from "@/shared/lib";

export function useRemainingTime(targetTime?: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!targetTime) return;

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetTime]);

  return useMemo(() => {
    if (!targetTime) return undefined;

    return formatRemainingTime(targetTime, now);
  }, [targetTime, now]);
}
