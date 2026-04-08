export const reportQueryKeys = {
  getMalfunctionReports: (params: { status?: string; [key: string]: any }) =>
    ["reports", "list", params] as const,
  getReportById: (id: number) => ["reports", "detail", id] as const,
} as const;
