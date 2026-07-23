import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueryKeys } from "@/shared/api";
import { deleteUserPenalty } from "./deleteUserPenalty";

export function useDeleteUserPenalty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserPenalty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });

      alert("세탁 정지 해제가 완료되었습니다.");
    },
    onError: (error) => {
      alert(
        error instanceof Error
          ? error.message
          : "세탁 정지 해제 중 오류가 발생했습니다.",
      );
    },
  });
}
