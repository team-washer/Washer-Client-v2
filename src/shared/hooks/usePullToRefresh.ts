"use client";

import { useCallback, useEffect, useState } from "react";

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  disabled?: boolean;
}

// 모바일에서 화면 맨 위에서 아래로 당기면 onRefresh를 실행한다.
export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  disabled = false,
}: UsePullToRefreshOptions) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (disabled || window.scrollY > 0) return;
      setStartY(event.touches[0].clientY);
    },
    [disabled],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (disabled || window.scrollY > 0 || startY === 0) return;

      const distance = event.touches[0].clientY - startY;
      if (distance <= 0) return;

      event.preventDefault();
      const resistedDistance = Math.min(distance * 0.5, 100);
      setPullDistance(resistedDistance);
      setIsPulling(resistedDistance > threshold * 0.5);
    },
    [disabled, startY, threshold],
  );

  const handleTouchEnd = useCallback(async () => {
    if (disabled) return;

    if (isPulling && pullDistance > threshold * 0.5) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }

    setPullDistance(0);
    setIsPulling(false);
    setStartY(0);
  }, [disabled, isPulling, pullDistance, threshold, onRefresh]);

  useEffect(() => {
    if (disabled) return;

    const onTouchStart = (event: TouchEvent) => handleTouchStart(event);
    const onTouchMove = (event: TouchEvent) => handleTouchMove(event);
    const onTouchEnd = () => {
      void handleTouchEnd();
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [disabled, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { pullDistance, isPulling, isRefreshing };
}
