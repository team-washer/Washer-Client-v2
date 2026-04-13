import type {
    MachineReservationHistoryDTO,
    MachineReservationHistoryItemDTO,
    MachineReservationHistory,
    ReservationHistoryItem,
    ReservationHistoryStatus,
  } from "../model/historyTypes";
  
  // ===== 날짜 포맷 =====
  function formatDateTime(date: string | null): string | undefined {
    if (!date) return undefined;
  
    const value = new Date(date);
  
    if (Number.isNaN(value.getTime())) return undefined;
  
    return value.toLocaleString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  
  // ===== status 매핑 =====
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
  
  // ===== item 매핑 =====
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
  
  // ===== 전체 매핑 =====
  export function mapMachineReservationHistory(
    dto: MachineReservationHistoryDTO,
  ): MachineReservationHistory {
    return {
      machineName: dto.machineName,
      reservations: dto.reservations.map(mapHistoryItem),
    };
  }