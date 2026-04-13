import type { ManagedUserItem, UserDTO } from "../model/types";

function formatPenaltyRemain(minutes: number | null): string | undefined {
  if (!minutes || minutes <= 0) return undefined;

  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${remainMinutes}분`;
  }

  return `${remainMinutes}분`;
}

export function mapUser(dto: UserDTO): ManagedUserItem {
  return {
    id: dto.id,
    name: dto.name,
    room: `${dto.roomNumber}호`,
    studentNumber: dto.studentId,
    warningCount: dto.penaltyCount,

    reason: dto.penaltyReason ?? undefined,
    remain: formatPenaltyRemain(dto.penaltyRemainMinutes),
  };
}

export function mapUsers(dtos: UserDTO[]): ManagedUserItem[] {
  return dtos.map(mapUser);
}