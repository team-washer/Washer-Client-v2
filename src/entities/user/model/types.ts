export interface ManagedUserItem {
  id: number;
  name: string;
  room: string;
  studentNumber: string;
  warningCount: number;
  reason?: string;
  remain?: string;
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