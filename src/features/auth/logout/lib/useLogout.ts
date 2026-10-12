"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { deleteFcmToken } from "@/entities/notification";
import { clearAuthSession } from "@/shared";

export function useLogout() {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    try {
      await deleteFcmToken();
    } catch {
      // FCM 토큰 정리 실패가 로그아웃을 막아서는 안 됩니다.
    }
    clearAuthSession(queryClient);
    window.location.replace("/sign-in");
  }, [queryClient]);
}
