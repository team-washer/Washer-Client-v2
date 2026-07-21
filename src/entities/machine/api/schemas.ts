import { z } from "zod";

// 기기 타입
export const machineTypeSchema = z.enum(["WASHER", "DRYER"]);

// 기기 고장 상태
export const machineConditionStatusSchema = z.enum([
  "NORMAL",
  "MALFUNCTION",
]);

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