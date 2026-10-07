import type { ReserveBlockReason } from "@/entities/reservation";

const formatClock = (value: string | null): string | null => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export function getReserveBlockMessage(
  reason: ReserveBlockReason,
  penaltyExpiresAt: string | null,
): string {
  switch (reason) {
    case "MACHINE_UNAVAILABLE":
      return "지금은 예약할 수 없는 기기입니다";
    case "BANNED":
      return "호실 세탁이 금지되어 예약할 수 없습니다";
    case "PENALTY": {
      const until = formatClock(penaltyExpiresAt);
      return until
        ? `패널티로 ${until}까지 예약할 수 없습니다`
        : "계정이 정지되어 예약할 수 없습니다";
    }
    case "ALREADY_RESERVED":
      return "이미 활성화된 예약이 있습니다";
    case "ROOM_TYPE_TAKEN":
      return "이미 호실에 활성화된 예약이 있습니다";
  }
}
