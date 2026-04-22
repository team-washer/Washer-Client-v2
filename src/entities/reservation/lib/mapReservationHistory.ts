import { formatDateTime } from "@/shared/lib";
import type {
  MachineReservationHistoryDTO,
  MachineReservationHistoryItemDTO,
  MachineReservationHistory,
  ReservationHistoryItem,
  ReservationHistoryStatus,
} from "../model/historyTypes";

function mapHistoryStatus(
  status: MachineReservationHistoryItemDTO["status"],
): ReservationHistoryStatus {
  switch (status) {
    case "CANCELLED":
      return "취소됨";
    case "COMPLETED":
      return "사용 완료";
    default:
      return "사용 완료";
  }
}

function mapHistoryItem(
  dto: MachineReservationHistoryItemDTO,
): ReservationHistoryItem {
  const status = mapHistoryStatus(dto.status);

  return {
    roomNumber: dto.roomNumber,
    reservedAt: formatDateTime(dto.reservedAt) ?? "-",
    actionAt:
      status === "취소됨"
        ? formatDateTime(dto.cancelledAt)
        : formatDateTime(dto.actualCompletionTime),
    status,
  };
}

export function mapMachineReservationHistory(
  dto: MachineReservationHistoryDTO,
): MachineReservationHistory {
  return {
    machineName: dto.machineName,
    reservations: dto.reservations.map(mapHistoryItem),
  };
}