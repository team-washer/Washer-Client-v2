"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { clearAuthSession } from "@/shared";

export function useLogout() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    clearAuthSession(queryClient);
    window.location.replace("/sign-in");
  }, [queryClient]);
}
