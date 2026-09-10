import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueryKeys } from "@/shared/api";
import { extendUserPenalty } from "./extendUserPenalty";

export function useExtendUserPenalty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, days }: { userId: number; days: number }) =>
      extendUserPenalty(userId, days),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userQueryKeys.all }),
  });
}
