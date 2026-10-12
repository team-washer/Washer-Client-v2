import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFcmToken } from "@/entities/notification";
import { clearAuthSession } from "@/shared";
import { withdrawMyAccount } from "./withdrawMyAccount";

export function useWithdrawMyAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await deleteFcmToken();
      } catch {
        // 탈퇴 자체는 FCM 토큰 정리 실패와 무관하게 진행합니다.
      }
      await withdrawMyAccount();
    },
    onSuccess: () => {
      clearAuthSession(queryClient);
      window.location.replace("/sign-in");
    },
  });
}
