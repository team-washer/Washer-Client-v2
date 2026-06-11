import type { ReportStatusType } from "./types";

export const reportStatusStyleMap: Record<ReportStatusType, string> = {
  PENDING: "bg-[#EA3B42]",
  IN_PROGRESS: "bg-[#4486FF]",
  RESOLVED: "bg-[#85B0FF]",
};

export const reportStatusLabelMap: Record<ReportStatusType, string> = {
  PENDING: "대기",
  IN_PROGRESS: "처리중",
  RESOLVED: "처리 완료",
};
