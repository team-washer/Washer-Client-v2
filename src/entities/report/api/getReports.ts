import { mapReports } from "../lib/mapReport";
import type { ReportDTO, ReportItem } from "../model/types";
import { axiosInstance } from "@/shared";
import { ApiResponse } from "@/shared/api/types";

type GetReportsPayload = {
    reports: ReportDTO[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
};

export async function getReports(): Promise<ReportItem[]> {
  const response = await axiosInstance.get("/api/v2/admin/malfunction-reports") as ApiResponse<GetReportsPayload>;
  return mapReports(response.data.reports);
}