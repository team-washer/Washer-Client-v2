import { get, reportUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { ReportParamsType, ReportResponseType } from "../model/types";

export const getMalfunctionReports = async (
  params?: ReportParamsType,
): Promise<BaseResponseType<ReportResponseType>> => {
  const response = await get<BaseResponseType<ReportResponseType>>(
    reportUrl.getMalfunctionReports(),
    {
      params,
    },
  );
  return response;
};
