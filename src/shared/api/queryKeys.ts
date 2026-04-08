export const reportQueryKeys = {
  getMalfunctionReports: (params: { status?: string; [key: string]: any }) =>
    ["reports", "list", params] as const,
  getReportById: (id: number) => ["reports", "detail", id] as const,
} as const;

export const machineQueryKeys = {
  getMachines: (params: { floor?: number; [key: string]: any }) =>
    ["machines", "list", params] as const,
} as const;

