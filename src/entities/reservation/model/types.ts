export type OccupancyStatus =
  | "예약중"        // 아직 시작 전 (점유 시작)
  | "사용중"      // 실제 사용 중 (점유 진행)
  | "확인필요";   // 오류/이상 (점유 + 문제)

export type ReservationMachineType = "washer" | "dryer";

export interface ReservationItem {
  id: number;
  machine: string;
  type: ReservationMachineType;

  // 시간 관련
  remain?: string;
  reserveAt?: string;
  expired?: string;

  // 기기 상태
  deviceStatus?: string;

  // 핵심
  status: OccupancyStatus;
}