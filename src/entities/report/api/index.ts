import { useQuery } from "@tanstack/react-query";
import { get, reportQueryKeys } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { ReportParamsType, ReportResponseType } from "../model/types";

export const reportUrl = {
  getMalfunctionReports: () => "/api/v2/admin/malfunction-reports",
} as const;

export const useGetMalfunctionReports = (params: ReportParamsType) => {
  return useQuery({
    queryKey: reportQueryKeys.getMalfunctionReports(params),
    queryFn: () =>
      get<BaseResponseType<ReportResponseType>>(
        reportUrl.getMalfunctionReports(),
        {
          params,
        },
      ),
  });
};
