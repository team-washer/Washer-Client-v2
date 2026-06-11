import { useMutation, useQueryClient } from "@tanstack/react-query";
import { put, reportUrl, reportQueryKeys } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { ReportStatusType } from "../model/types";

export function useUpdateReportStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: ReportStatusType }) => {
      await put<BaseResponseType<null>>(reportUrl.updateMalfunctionReportStatus(id), {
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reportQueryKeys.all,
      });
      alert("신고 상태가 변경되었습니다.");
    },
    onError: () => {
      alert("신고 상태 변경 중 오류가 발생했습니다.");
    },
  });
}
