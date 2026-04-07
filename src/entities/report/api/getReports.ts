import { api } from "@/shared/api/client";
import { mapReports } from "../lib/mapReport";
import type { ReportDTO, ReportItem } from "../model/types";

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
  const { data } = await api.get<GetReportsResponse>("/v2/admin/malfunction-reports");
  return mapReports(data.data.reports);
}