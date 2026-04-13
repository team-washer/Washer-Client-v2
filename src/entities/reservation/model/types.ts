export type OccupancyStatus =
  | "예약중"
  | "사용중"
  | "확인필요";

export type ReservationMachineType = "WASHER" | "DRYER";

export type ReservationDTOStatus =
  | "RESERVED"
  | "IN_USE"
  | "RUNNING"
  | "COMPLETED"
  | "CANCELLED";

export type MachineAvailabilityStatus =
  | "IN_USE"
  | "RESERVED"
  | "AVAILABLE"
  | "UNAVAILABLE";

export type BadgeStatus = "예약중" | "사용중" | "확인필요";

export interface ReservationParamsType {
  userName?: string;
  machineName?: string;
  status?: ReservationDTOStatus;
  startDate?: string;
  endDate?: string;
  machineType?: ReservationMachineType;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface ReservationItem {
  id: number;
  machine: string;
  type: ReservationMachineType;
  badgeStatus: BadgeStatus;
  remain?: string;
  reserveAt?: string;
  expired?: string;
  deviceStatus?: string;
}

export type ReservationDTO = {
  id: number;
  userId: number;
  userName: string;
  userRoomNumber: string;
  userStudentId: string;
  machineId: number;
  machineName: string;
  reservedAt: string;
  startTime: string;
  expectedCompletionTime: string;
  actualCompletionTime: string | null;
  cancelledAt: string | null;
  status: ReservationDTOStatus;
  machineAvailability: MachineAvailabilityStatus;
};

export interface ReservationResponseType {
  reservations: ReservationDTO[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}