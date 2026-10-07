import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearAuthSession } from "@/shared";
import { withdrawMyAccount } from "./withdrawMyAccount";

export function useWithdrawMyAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdrawMyAccount,
    onSuccess: () => {
      clearAuthSession(queryClient);
      window.location.replace("/sign-in");
    },
  });
}
