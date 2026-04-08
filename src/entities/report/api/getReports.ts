import { mapReports } from "../lib/mapReport";
import type { ReportDTO, ReportItem } from "../model/types";
import { axiosInstance } from "@/shared";

type GetReportsResponse = {
  status: string;
  code: number;
  message: string;
  data: {
    reports: ReportDTO[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
};

export async function getReports(): Promise<ReportItem[]> {
  const response = await axiosInstance.get("/api/v2/admin/malfunction-reports") as GetReportsResponse;
  return mapReports(response.data.reports);
}