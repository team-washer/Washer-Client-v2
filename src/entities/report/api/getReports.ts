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
  const response = await fetch("/api/v2/admin/malfunction-reports", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("최근 고장 신고 데이터를 불러오지 못했습니다.");
  }

  const json: GetReportsResponse = await response.json();
  return mapReports(json.data.reports);
}