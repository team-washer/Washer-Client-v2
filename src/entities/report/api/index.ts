import { useQuery } from "@tanstack/react-query";
import { get, reportQueryKeys, reportUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { ReportParamsType, ReportResponseType } from "../model/types";


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
