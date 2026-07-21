import { z } from "zod";

// 사용자 한 명의 API 응답 구조
export const userDTOSchema = z.object({
  id: z.number(),
  name: z.string(),
  studentId: z.string(),
  roomNumber: z.string(),
  grade: z.number(),
  floor: z.number(),
  penaltyCount: z.number(),
  penaltyRemainMinutes: z.number().nullable(),
  penaltyReason: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// 사용자 목록 API의 data 응답 구조
export const userResponseSchema = z.object({
  users: z.array(userDTOSchema),
  totalCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});