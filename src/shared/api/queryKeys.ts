import { ReservationParamsType } from "@/entities/reservation/model/types";
import { UserParamsType } from "@/entities/user";

export const reportQueryKeys = {
  all: ["reports"] as const,
  getMalfunctionReports: (params?: { status?: string; [key: string]: any }) =>
    ["reports", "list", params] as const,
  getReportById: (id: number) => ["reports", "detail", id] as const,
} as const;

export const machineQueryKeys = {
  all: ["machines"] as const,
  getMachines: (params: { floor?: number; [key: string]: any } = {}) =>
    ["machines", "list", params] as const,
} as const;

export const userQueryKeys = {
  all: ["users"] as const,
  getUsers: (params?: UserParamsType) => ["users", "list", params] as const,
  getMyInfo: () => ["users", "my"] as const,
} as const;

export const reservationQueryKeys = {
  all: ["reservations"] as const,
  getReservations: (params?: ReservationParamsType) =>
    ["reservations", "list", params] as const,
  getMachineReservationHistory: (machineName: string | null) =>
    ["reservations", "history", machineName] as const,
} as const;