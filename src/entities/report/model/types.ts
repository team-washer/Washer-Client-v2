export type ReportStatus = "신고" | "처리중" | "완료";

export type ReportMachineType = "washer" | "dryer";

export interface ReportItem {
  id: number;
  machine: string;
  user: string;
  time?: string;
  reason?: string,
  status: ReportStatus;
  type: ReportMachineType;
}
