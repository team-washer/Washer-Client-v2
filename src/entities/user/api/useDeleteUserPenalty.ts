import { useMutation, useQueryClient } from "@tanstack/react-query";
import { del, userUrl, userQueryKeys } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";

export function useDeleteUserPenalty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      await del<BaseResponseType<null>>(userUrl.deleteUserPenalty(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
      alert("세탁 정지 해제가 완료되었습니다.");
    },
    onError: () => {
      alert("세탁 정지 해제 중 오류가 발생했습니다.");
    },
  });
}
