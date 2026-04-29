export type ReservationHistoryStatus = "사용 완료" | "취소됨";

export interface MachineReservationHistoryParamsType {
  machineName?: string;
}

export interface MachineReservationHistoryResponseType {
  machines: MachineReservationHistoryDTO[];
}

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
