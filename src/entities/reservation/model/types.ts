import type { z } from "zod";
import type {
  machineAvailabilityStatusSchema,
  myReservationDTOSchema,
  myReservationHistoryItemSchema,
  myReservationHistoryPageSchema,
  reservationAvailabilitySchema,
  reservationCancellationSchema,
  reservationDTOSchema,
  reservationResponseSchema,
  reservationStatusSchema,
} from "../api/schemas";

// UI 모델 타입
export type ReservationStatusLabel =
  | "예약중"
  | "사용중"
  | "확인필요"
  | "사용 완료"
  | "취소됨";

export type ReservationMachineType = "WASHER" | "DRYER";

export interface ReservationItem {
  id: number;
  machineId: number;
  machine: string;
  userRoomNumber: string;
  type: ReservationMachineType;
  badgeStatus: ReservationStatusLabel;
  reserveAt?: string;
  deviceStatus?: string;
  expectedCompletionTime?: string;
  startTime?: string;
}

// API 응답 타입
export type ReservationDTOStatus = z.infer<typeof reservationStatusSchema>;

export type MachineAvailabilityStatus = z.infer<
  typeof machineAvailabilityStatusSchema
>;

export type ReservationDTO = z.infer<typeof reservationDTOSchema>;

export type ReservationResponseType = z.infer<typeof reservationResponseSchema>;

// 예약 목록 조회 요청 파라미터
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

// 사용자용 예약 타입
export type MyReservation = z.infer<typeof myReservationDTOSchema>;

export type ReservationAvailability = z.infer<
  typeof reservationAvailabilitySchema
>;

export type ReservationCancellation = z.infer<
  typeof reservationCancellationSchema
>;

export type MyReservationHistoryItem = z.infer<
  typeof myReservationHistoryItemSchema
>;

export type MyReservationHistoryPage = z.infer<
  typeof myReservationHistoryPageSchema
>;

export interface MyReservationHistoryParamsType {
  status?: ReservationDTOStatus;
  machineType?: ReservationMachineType;
  size?: number;
}

export type ReserveBlockReason =
  | "MACHINE_UNAVAILABLE"
  | "BANNED"
  | "PENALTY"
  | "ALREADY_RESERVED"
  | "ROOM_TYPE_TAKEN";

export interface ReserveContext {
  machineReservable: boolean;
  machineType: ReservationMachineType;
  canReserve: boolean;
  isBanned: boolean;
  hasMyActiveReservation: boolean;
  // 호실 활성 예약 각각의 기기 종류 (알 수 없으면 null)
  roomReservationTypes: (ReservationMachineType | null)[];
}
