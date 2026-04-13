import { ReservationParamsType } from "@/entities/reservation/model/types";

export const reportQueryKeys = {
  getMalfunctionReports: (params?: { status?: string; [key: string]: any }) =>
    ["reports", "list", params] as const,
  getReportById: (id: number) => ["reports", "detail", id] as const,
} as const;

export const machineQueryKeys = {
  getMachines: (params: { floor?: number; [key: string]: any }) =>
    ["machines", "list", params] as const,
} as const;

export const userQueryKeys = {
  getUsers: (params?: { [key: string]: any }) => ["users", "list", params] as const,
  getMyInfo: () => ["users", "my"] as const,
} as const;


export const reservationQueryKeys = {
  getReservations: (params?: ReservationParamsType) =>
    ["reservations", "list", params] as const,
  getMachineReservationHistory: (machineName: string | null) =>
    ["reservations", "history", machineName] as const,
} as const;