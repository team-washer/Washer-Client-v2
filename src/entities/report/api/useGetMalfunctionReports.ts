import { useQuery } from "@tanstack/react-query";
import { reportQueryKeys } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import type { ReportParamsType, ReportResponseType } from "../model/types";
import { getMalfunctionReports as fetchMalfunctionReports } from "./getMalfunctionReports";

export const useGetMalfunctionReports = (
  params?: ReportParamsType,
  initialData?: BaseResponseType<ReportResponseType>,
) => {
  const queryKey = reportQueryKeys.getMalfunctionReports(params || {});

  return useQuery({
    staleTime: STALE_TIME.REPORT,
    queryKey,
    queryFn: () => fetchMalfunctionReports(params),
    initialData,
  });
};
