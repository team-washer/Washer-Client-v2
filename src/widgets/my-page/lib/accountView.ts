import type { UserRole } from "@/entities/user";

export const getAccountRoleLabel = (role: UserRole): string => {
  if (role === "ADMIN") return "관리자";
  if (role === "DORMITORY_COUNCIL") return "자치위원";
  return "사용자";
};

export const getReservationAccessLabel = (canReserve: boolean): string =>
  canReserve ? "예약 가능" : "예약 제한";
