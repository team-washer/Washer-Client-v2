import { z } from "zod";

// 기기 타입
export const machineTypeSchema = z.enum(["WASHER", "DRYER"]);

// 기기 고장 상태
export const machineConditionStatusSchema = z.enum(["NORMAL", "MALFUNCTION"]);

// 기기 사용 가능 상태
export const machineAvailabilityStatusSchema = z.enum([
  "AVAILABLE",
  "IN_USE",
  "RESERVED",
  "UNAVAILABLE",
]);

// 기기 배치 위치
export const machinePositionSchema = z.enum(["LEFT", "RIGHT"]);

// 기기 한 건의 API 응답 구조
export const adminMachineDTOSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: machineTypeSchema,
  floor: z.number(),
  position: machinePositionSchema,
  number: z.number(),
  status: machineConditionStatusSchema,
  availability: machineAvailabilityStatusSchema,
  deviceId: z.string(),
});

// 기기 목록 API의 data 응답 구조
export const machineResponseSchema = z.object({
  machines: z.array(adminMachineDTOSchema),
  totalCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

// 사용자용 기기 사용 가능 상태 (통세척 중 포함)
export const userMachineAvailabilitySchema = z.enum([
  "AVAILABLE",
  "IN_USE",
  "RESERVED",
  "CLEANING",
  "UNAVAILABLE",
]);

// 사용자용 기기 현황 한 건의 API 응답 구조
export const machineStatusDTOSchema = z.object({
  machineId: z.number(),
  name: z.string(),
  type: machineTypeSchema,
  status: machineConditionStatusSchema,
  availability: userMachineAvailabilitySchema,
  operatingState: z.string().nullable(),
  jobState: z.string().nullable(),
  switchStatus: z.string().nullable(),
  expectedCompletionTime: z.string().nullable(),
  remainingMinutes: z.number().nullable(),
  reservationId: z.number().nullable(),
  userId: z.number().nullable(),
  roomNumber: z.string().nullable(),
});

// 사용자용 기기 현황 API의 data 응답 구조
export const machineStatusResponseSchema = z.object({
  machines: z.array(machineStatusDTOSchema),
  totalCount: z.number(),
});

// 기기별 이용 이력 한 건의 응답 구조
export const machineHistoryItemDTOSchema = z.object({
  id: z.number(),
  userRoomNumber: z.string(),
  startTime: z.string().nullable(),
  completionTime: z.string().nullable(),
  status: z.enum(["RESERVED", "RUNNING", "COMPLETED", "CANCELLED"]),
  createdAt: z.string(),
});

// 기기별 이용 이력 API의 data 응답 구조
export const machineHistoryPageSchema = z.object({
  content: z.array(machineHistoryItemDTOSchema),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
  last: z.boolean(),
});
