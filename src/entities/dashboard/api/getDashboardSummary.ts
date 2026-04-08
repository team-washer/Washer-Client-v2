import { axiosInstance } from "@/shared";
import type { ApiResponse } from "@/shared/api/types";

import type { DashboardSummaryDTO } from "../model/types";

export async function getDashboardSummary(): Promise<DashboardSummaryDTO> {
  const response = (await axiosInstance.get(
    "/api/v2/admin/dashboard",
  )) as ApiResponse<DashboardSummaryDTO>;

  return response.data;
}