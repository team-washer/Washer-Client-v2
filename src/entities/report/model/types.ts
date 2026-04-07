export type ReportStatus = "신고" | "처리중" | "완료";
export type ReportMachineType = "washer" | "dryer";

export type ReportItem = {
  id: number;
  machine: string;
  user: string;
  time: string;
  reason: string;
  status: ReportStatus;
  type: ReportMachineType;
};

export type ReportDTO = {
  id: number;
  machineId: number;
  machineName: string;
  reporterId: number;
  reporterName: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED";
  reportedAt: string;
  processingStartedAt: string | null;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
};