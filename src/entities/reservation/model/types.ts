export type ReservationMachineType = "washer" | "dryer";

export type BadgeStatus = "예약중" | "사용중" | "확인필요";

export type ReservationHistoryStatus = "사용 완료" | "취소됨";

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
  status: "RESERVED" | "IN_USE" | "RUNNING" | "COMPLETED" | "CANCELLED";
  machineAvailability:
    | "IN_USE"
    | "RESERVED"
    | "AVAILABLE"
    | "UNAVAILABLE";
};

export type MachineReservationHistoryItemDTO = {
  roomNumber: string;
  reservedAt: string;
  actualCompletionTime: string | null;
  cancelledAt: string | null;
  status: "COMPLETED" | "CANCELLED" | "RESERVED" | "IN_USE";
};


export type MachineReservationHistoryDTO = {
  machineName: string;
  reservations: MachineReservationHistoryItemDTO[];
};

export interface ReservationHistoryItem {
  roomNumber: string;
  reservedAt: string;
  actionAt?: string;
  status: ReservationHistoryStatus;
}

export interface MachineReservationHistory {
  machineName: string;
  reservations: ReservationHistoryItem[];
}