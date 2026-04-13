import { useQuery } from "@tanstack/react-query";
import { reportQueryKeys } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { ReportParamsType, ReportResponseType } from "../model/types";
import { getMalfunctionReports as fetchMalfunctionReports } from "./getMalfunctionReports";

export const useGetMalfunctionReports = (
  params?: ReportParamsType,
  initialData?: BaseResponseType<ReportResponseType>,
) => {
  const queryKey = reportQueryKeys.getMalfunctionReports(params || {});

  return useQuery({
    queryKey,
    queryFn: () => fetchMalfunctionReports(params),
    initialData,
  });
};
