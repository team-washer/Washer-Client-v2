import type {
  BadgeStatus,
  ReservationDTO,
  ReservationItem,
  ReservationMachineType,
} from "../model/types";

// ===== 기기 타입 =====
function getMachineType(machineName: string): ReservationMachineType {
  const upper = machineName.toUpperCase();

  if (upper.startsWith("D") || upper.includes("DRYER")) {
    return "DRYER";
  }

  return "WASHER";
}

// ===== 날짜 포맷 =====
function formatDateTime(date: string): string {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) return "-";

  return value.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// ===== 남은 시간 =====
function formatRemainTime(targetTime: string): string {
  const now = new Date();
  const target = new Date(targetTime);
  const diff = target.getTime() - now.getTime();

  if (Number.isNaN(target.getTime()) || diff <= 0) {
    return "00시간 00분";
  }

  const totalMinutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}시간 ${String(minutes).padStart(2, "0")}분`;
}

// ===== 기기 상태 텍스트 =====
function mapDeviceStatus(
  availability: ReservationDTO["machineAvailability"],
): string | undefined {
  switch (availability) {
    case "IN_USE":
      return "사용 중";
    case "RESERVED":
      return "예약됨";
    case "AVAILABLE":
      return "사용 가능";
    case "UNAVAILABLE":
      return "사용 불가";
    default:
      return undefined;
  }
}

// ===== badge 상태 =====
function mapBadgeStatus(dto: ReservationDTO): BadgeStatus {
  // 기기 이상 먼저 체크
  if (dto.machineAvailability === "UNAVAILABLE") {
    return "확인필요";
  }

  if (dto.status === "RESERVED") {
    return "예약중";
  }

  if (dto.status === "IN_USE" || dto.status === "RUNNING") {
    return "사용중";
  }

  return "예약중";
}

// ===== 메인 매핑 =====
export function mapReservation(dto: ReservationDTO): ReservationItem {
  const badgeStatus = mapBadgeStatus(dto);

  return {
    id: dto.id,
    machine: dto.machineName,
    type: getMachineType(dto.machineName),
    badgeStatus,

    // 사용중
    remain:
      badgeStatus === "사용중"
        ? formatRemainTime(dto.expectedCompletionTime)
        : undefined,

    deviceStatus:
      badgeStatus === "사용중"
        ? mapDeviceStatus(dto.machineAvailability)
        : undefined,

    // 예약중
    reserveAt:
      badgeStatus === "예약중"
        ? formatDateTime(dto.reservedAt)
        : undefined,

    expired:
      badgeStatus === "예약중"
        ? formatRemainTime(dto.startTime)
        : undefined,
  };
}

export function mapReservations(
  dtos: ReservationDTO[],
): ReservationItem[] {
  return dtos.map(mapReservation);
}