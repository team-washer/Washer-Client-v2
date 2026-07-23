import type { z } from "zod";
import type {
  myInfoSchema,
  userDTOSchema,
  userResponseSchema,
  userRoleSchema,
} from "../api/schemas";

// 사용자 권한 타입
export type UserRole = z.infer<typeof userRoleSchema>;

// 사용자 목록 조회 요청 파라미터
export interface UserParamsType {
  name?: string;
  studentId?: string;
  roomNumber?: string;
  grade?: number;
  floor?: number;
  page?: number;
  size?: number;
  sort?: string[];
}

// API 응답 타입
export type UserDTO = z.infer<typeof userDTOSchema>;

export type UserResponseType = z.infer<typeof userResponseSchema>;

export type MyInfoType = z.infer<typeof myInfoSchema>;

// UI 모델 타입
export interface ManagedUserItem {
  id: number;
  name: string;
  room: string;
  studentNumber: string;
  warningCount: number;
  reason?: string;
  remain?: string;
}
