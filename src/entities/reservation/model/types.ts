export type ReservationMachineType = "washer" | "dryer";

export type BadgeStatus = "예약중" | "사용중" | "확인필요";

export interface ReservationItem {
  id: number;
  machine: string;
  type: ReservationMachineType;

  // 시간 관련
  remain?: string;
  reserveAt?: string;
  expired?: string;

  // 기기 상태 텍스트
  deviceStatus?: string;

  // UI 배지/분기용 상태
  badgeStatus: BadgeStatus;
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
  status: "RESERVED" | "IN_USE" | "COMPLETED" | "CANCELLED";
  cancelledAt: string | null;
  machineAvailability: "IN_USE" | "RESERVED" | "AVAILABLE" | "UNAVAILABLE";
};