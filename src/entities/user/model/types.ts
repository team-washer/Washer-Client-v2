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