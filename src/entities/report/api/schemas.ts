import { z } from "zod";

// 고장 신고 상태
export const reportStatusSchema = z.enum([
  "PENDING",
  "IN_PROGRESS",
  "RESOLVED",
]);

// 고장 신고 한 건의 API 응답 구조
export const reportItemSchema = z.object({
  id: z.number(),
  machineId: z.number(),
  machineName: z.string(),
  reporterId: z.number(),
  reporterName: z.string(),
  description: z.string(),
  status: reportStatusSchema,
  reportedAt: z.string(),
  processingStartedAt: z.string().nullable(),
  resolvedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// 고장 신고 목록 API의 data 응답 구조
export const reportResponseSchema = z.object({
  reports: z.array(reportItemSchema),
  totalCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});