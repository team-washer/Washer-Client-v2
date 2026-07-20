import { formatDateTime, mapAvailabilityDeviceStatus } from "@/shared/lib";
import type {
  ReservationDTO,
  ReservationItem,
  ReservationMachineType,
  ReservationStatusLabel,
} from "../model/types";

function mapBadgeStatus(dto: ReservationDTO): ReservationStatusLabel {
  if (dto.status === "CANCELLED") {
    return "취소됨";
  }

  if (dto.status === "COMPLETED") {
    return "사용 완료";
  }

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

export function mapReservation(
  dto: ReservationDTO,
  machineType: ReservationMachineType,
): ReservationItem {
  const badgeStatus = mapBadgeStatus(dto);

  return {
    id: dto.id,
    machineId: dto.machineId,
    machine: dto.machineName,
    userRoomNumber: dto.userRoomNumber,
    type: machineType,
    badgeStatus,
    reserveAt:
      badgeStatus === "예약중" ? formatDateTime(dto.reservedAt) : undefined,
    deviceStatus:
      badgeStatus === "사용중"
        ? mapAvailabilityDeviceStatus(dto.machineAvailability)
        : undefined,
    expectedCompletionTime:
      badgeStatus === "사용중" ? dto.expectedCompletionTime : undefined,
    startTime: badgeStatus === "예약중" ? dto.startTime : undefined,
  };
}

export function mapReservations(
  dtos: ReservationDTO[],
  machineType: ReservationMachineType,
): ReservationItem[] {
  return dtos.map((dto) => mapReservation(dto, machineType));
}