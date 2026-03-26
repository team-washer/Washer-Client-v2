export type ReservationStatus = "사용중" | "대기중" | "예약중";

export type ReservationMachineType = "washer" | "dryer";

export interface ReservationItem {
  id: number;
  machine: string;
  remain?: string;
  reserveAt?: string;
  expired?: string;
  status: ReservationStatus;
  type: ReservationMachineType;
}
