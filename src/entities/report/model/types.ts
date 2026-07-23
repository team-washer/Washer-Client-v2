import type { z } from "zod";
import type {
  reportItemSchema,
  reportResponseSchema,
  reportStatusSchema,
} from "../api/schemas";

// API 응답 타입
export type ReportStatusType = z.infer<typeof reportStatusSchema>;

export type ReportItemType = z.infer<typeof reportItemSchema>;

export type ReportResponseType = z.infer<typeof reportResponseSchema>;

// 고장 신고 목록 조회 요청 파라미터
export interface ReportParamsType {
  status?: ReportStatusType;
}
