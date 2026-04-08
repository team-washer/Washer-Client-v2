import type {
  BadgeStatus,
  ReservationDTO,
  ReservationItem,
  ReservationMachineType,
} from "../model/types";

function getMachineType(machineName: string): ReservationMachineType {
  const upperName = machineName.toUpperCase();

  if (upperName.startsWith("D") || upperName.includes("DRYER")) {
    return "dryer";
  }

  return "washer";
}

function formatDateTime(date: string): string {
  const value = new Date(date);

  return value.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatRemainTime(targetTime: string): string {
  const now = new Date();
  const target = new Date(targetTime);
  const diff = target.getTime() - now.getTime();

  if (Number.isNaN(target.getTime()) || diff <= 0) {
    return "00시간 00분";
  }

  const totalMinutes = Math.floor(diff / 1000 / 60);
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");

  return `${hours}시간 ${minutes}분`;
}

function isActiveReservation(dto: ReservationDTO): boolean {
  return dto.status === "RESERVED" || dto.status === "IN_USE";
}

function mapBadgeStatus(dto: ReservationDTO): BadgeStatus {
  if (dto.machineAvailability === "UNAVAILABLE") {
    return "확인필요";
  }

  if (dto.status === "IN_USE") {
    return "사용중";
  }

  return "예약중";
}

function mapDeviceStatus(
  availability: ReservationDTO["machineAvailability"],
): string | undefined {
  switch (availability) {
    case "IN_USE":
      return "사용중";
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

export function mapReservation(dto: ReservationDTO): ReservationItem {
  const badgeStatus = mapBadgeStatus(dto);

  return {
    id: dto.id,
    machine: dto.machineName,
    type: getMachineType(dto.machineName),
    badgeStatus,
    remain:
      badgeStatus === "사용중"
        ? formatRemainTime(dto.expectedCompletionTime)
        : undefined,
    reserveAt:
      badgeStatus === "예약중"
        ? formatDateTime(dto.reservedAt)
        : undefined,
    expired:
      badgeStatus === "예약중"
        ? formatRemainTime(dto.startTime)
        : undefined,
    deviceStatus:
      badgeStatus === "사용중"
        ? mapDeviceStatus(dto.machineAvailability)
        : undefined,
  };
}

export function mapReservations(dtos: ReservationDTO[]): ReservationItem[] {
  return dtos.map(mapReservation);
}

