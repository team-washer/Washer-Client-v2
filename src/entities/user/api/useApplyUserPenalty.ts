import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueryKeys } from "@/shared/api";
import { applyUserPenalty } from "./applyUserPenalty";

export function useApplyUserPenalty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, reason }: { userId: number; reason: string }) =>
      applyUserPenalty(userId, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
}
