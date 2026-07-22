import {
  dashboardUrl,
  get,
  normalizeApiError,
} from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { DashboardSummaryDTO } from "../model/types";
import { dashboardSummarySchema } from "./schemas";

export async function getDashboardSummary(): Promise<DashboardSummaryDTO> {
  try {
    const response = await get<BaseResponseType<unknown>>(
      dashboardUrl.getSummary(),
    );

    return dashboardSummarySchema.parse(response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
}