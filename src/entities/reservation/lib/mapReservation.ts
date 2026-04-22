import {
  formatDateTime,
  formatRemainingTime,
  mapAvailabilityDeviceStatus,
} from "@/shared/lib";
import type {
  ReservationStatusLabel,
  ReservationDTO,
  ReservationItem,
  ReservationMachineType,
} from "../model/types";

function getMachineType(machineName: string): ReservationMachineType {
  const upper = machineName.toUpperCase();

  if (upper.startsWith("D") || upper.includes("DRYER")) {
    return "DRYER";
  }

  return "WASHER";
}

function mapBadgeStatus(dto: ReservationDTO): ReservationStatusLabel {
  if (dto.machineAvailability === "UNAVAILABLE") {
    return "확인필요";
  }

  if (dto.status === "RESERVED") {
    return "예약중";
  }

  if (dto.status === "RUNNING") {
    return "사용중";
  }

  return "확인필요";
}

export function mapReservation(dto: ReservationDTO): ReservationItem {
  const badgeStatus = mapBadgeStatus(dto);

  return {
    id: dto.id,
    machineId: dto.machineId,
    machine: dto.machineName,
    type: getMachineType(dto.machineName),
    badgeStatus,
    remain:
      badgeStatus === "사용중"
        ? formatRemainingTime(dto.expectedCompletionTime)
        : undefined,
    deviceStatus:
      badgeStatus === "사용중"
        ? mapAvailabilityDeviceStatus(dto.machineAvailability)
        : undefined,
    reserveAt:
      badgeStatus === "예약중"
        ? formatDateTime(dto.reservedAt)
        : undefined,
    expired:
      badgeStatus === "예약중"
        ? formatRemainingTime(dto.startTime)
        : undefined,
  };
}

export function mapReservations(dtos: ReservationDTO[]): ReservationItem[] {
  return dtos.map(mapReservation);
}