import { z } from "zod";

// 예약 상태
export const reservationStatusSchema = z.enum([
  "RESERVED",
  "RUNNING",
  "COMPLETED",
  "CANCELLED",
]);

// 기기 사용 가능 상태
export const machineAvailabilityStatusSchema = z.enum([
  "IN_USE",
  "RESERVED",
  "AVAILABLE",
  "UNAVAILABLE",
]);

// 예약 한 건의 API 응답 구조
export const reservationDTOSchema = z.object({
  id: z.number(),
  userId: z.number(),
  userName: z.string(),
  userRoomNumber: z.string(),
  userStudentId: z.string(),
  machineId: z.number(),
  machineName: z.string(),
  reservedAt: z.string(),

  startTime: z.string().nullable(),
  expectedCompletionTime: z.string().nullable(),
  actualCompletionTime: z.string().nullable(),
  cancelledAt: z.string().nullable(),

  status: reservationStatusSchema,
  machineAvailability: machineAvailabilityStatusSchema,
});

// 예약 목록 API의 data 응답 구조
export const reservationResponseSchema = z.object({
  reservations: z.array(reservationDTOSchema),
  totalCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

// 예약 히스토리 한 건의 응답 구조
export const machineReservationHistoryItemSchema = z.object({
  roomNumber: z.string(),
  reservedAt: z.string(),
  actualCompletionTime: z.string().nullable(),
  cancelledAt: z.string().nullable(),
  status: z.enum([
    "COMPLETED",
    "CANCELLED",
    "RESERVED",
    "IN_USE",
  ]),
});

// 기기별 예약 히스토리 응답 구조
export const machineReservationHistorySchema = z.object({
  machineName: z.string(),
  reservations: z.array(machineReservationHistoryItemSchema),
});

// 예약 히스토리 API의 data 응답 구조
export const machineReservationHistoryResponseSchema = z.object({
  machines: z.array(machineReservationHistorySchema),
});