export type ReportStatusType = "PENDING" | "IN_PROGRESS" | "RESOLVED";

export interface ReportItemType {
  id: number;
  machineId: number;
  machineName: string;
  reporterId: number;
  reporterName: string;
  description: string;
  status: ReportStatusType;
  reportedAt: string;
  processingStartedAt: string | null;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReportParamsType {
  status?: ReportStatusType;
}

export interface ReportResponseType {
  reports: ReportItemType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
