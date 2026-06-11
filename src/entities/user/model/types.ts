export type UserRole = "ADMIN" | "USER" | "DORMITORY_COUNCIL";

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

export type UserDTO = {
  id: number;
  name: string;
  studentId: string;
  roomNumber: string;
  grade: number;
  floor: number;
  penaltyCount: number;
  penaltyRemainMinutes: number | null;
  penaltyReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface UserResponseType {
  users: UserDTO[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface ManagedUserItem {
  id: number;
  name: string;
  room: string;
  studentNumber: string;
  warningCount: number;
  reason?: string;
  remain?: string;
}

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
