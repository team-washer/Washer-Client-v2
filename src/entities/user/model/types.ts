export type UserRole = "ADMIN" | "USER" | "DORMITORY_COUNCIL";

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

export interface ManagedUserItem {
  id: number;
  name: string;
  room: string;
  roomNumber: string;
  reason?: string;
  warningCount?: number;
  remain?: string;
  studentNumber: number;
}
