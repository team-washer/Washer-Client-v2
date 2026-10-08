import type { ReserveBlockReason, ReserveContext } from "../model/types";

// RESERVED 상태 예약은 예약 시각부터 이 시간 안에 기기를 시작하지 않으면 자동 취소된다.
export const RESERVED_TIMEOUT_MINUTES = 5;

// 자동 취소 시각(epoch ms). reservedAt은 한국 시간으로 해석한 값을 받는다.
export function getReservedDeadline(reservedAt: Date | null): number | null {
  if (!reservedAt) return null;
  return reservedAt.getTime() + RESERVED_TIMEOUT_MINUTES * 60_000;
}

// 백엔드 예약 규칙을 미리 안내하기 위한 판단이며, 최종 판단은 서버 응답을 따른다.
export function getReserveBlockReason(
  context: ReserveContext,
): ReserveBlockReason | null {
  if (!context.machineReservable) return "MACHINE_UNAVAILABLE";
  if (context.isBanned) return "BANNED";
  if (!context.canReserve) return "PENALTY";
  if (context.hasMyActiveReservation) return "ALREADY_RESERVED";
  if (context.roomReservationTypes.includes(context.machineType)) {
    return "ROOM_TYPE_TAKEN";
  }
  return null;
}
