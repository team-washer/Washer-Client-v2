import type { ReportDTO, ReportItem, ReportMachineType, ReportStatus } from "../model/types";

function getMachineType(machineName: string): ReportMachineType {
  return machineName.toLowerCase().includes("dryer") ? "dryer" : "washer";
}

function mapReportStatus(status: ReportDTO["status"]): ReportStatus {
    switch (status) {
      case "PENDING":
        return "신고";
      case "IN_PROGRESS":
        return "처리중";
      case "RESOLVED":
        return "완료";
      default:
        return "신고";
    }
  }
function formatDateTime(date: string) {
  const value = new Date(date);

  return value.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function mapReport(dto: ReportDTO): ReportItem {
  return {
    id: dto.id,
    machine: dto.machineName,
    user: dto.reporterName,
    reason: dto.description,
    time: formatDateTime(dto.reportedAt),
    status: mapReportStatus(dto.status),
    type: getMachineType(dto.machineName),
  };
}

export function mapReports(dtos: ReportDTO[]): ReportItem[] {
  return dtos.map(mapReport);
}