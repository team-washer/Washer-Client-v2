import type { UserParamsType } from "@/entities/user";

export function getProxyReservationUserParams(search: string): UserParamsType {
  const term = search.trim();

  if (!term) return {};

  if (/^\d{3}$/.test(term)) {
    return { roomNumber: term };
  }

  if (/^\d+$/.test(term)) {
    return { studentId: term };
  }

  return { name: term };
}
