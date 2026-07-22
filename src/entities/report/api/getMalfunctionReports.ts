import {
  get,
  normalizeApiError,
  reportUrl,
} from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type {
  ReportParamsType,
  ReportResponseType,
} from "../model/types";
import { reportResponseSchema } from "./schemas";

export const getMalfunctionReports = async (
  params?: ReportParamsType,
): Promise<BaseResponseType<ReportResponseType>> => {
  try {
    const response = await get<BaseResponseType<unknown>>(
      reportUrl.getMalfunctionReports(),
      {
        params,
      },
    );

    const parsedData = reportResponseSchema.parse(response.data);

    return {
      ...response,
      data: parsedData,
    };
  } catch (error) {
    throw normalizeApiError(error);
  }
};