
import { z } from "zod";
import {
  machineAvailabilityStatusSchema,
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
export type ReservationDTOStatus = z.infer<
  typeof reservationStatusSchema
>;

export type MachineAvailabilityStatus = z.infer<
  typeof machineAvailabilityStatusSchema
>;

export type ReservationDTO = z.infer<typeof reservationDTOSchema>;

export type ReservationResponseType = z.infer<
  typeof reservationResponseSchema
>;

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