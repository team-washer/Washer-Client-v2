import type { z } from "zod";
import type {
  userDTOSchema,
  userResponseSchema,
} from "../api/schemas";

// 사용자 권한 타입
export type UserRole = "ADMIN" | "USER" | "DORMITORY_COUNCIL";

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

// 내 정보 API 응답 타입
export interface MyInfoType {
  id: number;
  name: string;
  studentId: string;
  roomNumber: string;
  grade: number;
  floor: number;
  penaltyCount: number;
  createdAt: string;
  updatedAt: string;
  canReserve: boolean;
  penaltyExpiresAt: string;
  role: UserRole;
}