import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reportQueryKeys } from "@/shared/api";
import { updateReportStatus } from "./updateReportStatus";

export function useUpdateReportStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReportStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reportQueryKeys.all,
      });

      alert("신고 상태가 변경되었습니다.");
    },
    onError: (error) => {
      alert(
        error instanceof Error
          ? error.message
          : "신고 상태 변경 중 오류가 발생했습니다.",
      );
    },
  });
}
