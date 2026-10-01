type ReservationHistoryStatus = "사용 완료" | "사용중" | "예약중" | "취소됨";

interface HistoryTimeField {
  label: "완료 시간" | "취소 시간";
  value: string;
}

export function getHistoryTimeField(
  status: ReservationHistoryStatus,
  actionAt?: string,
): HistoryTimeField | null {
  switch (status) {
    case "사용 완료":
      return { label: "완료 시간", value: actionAt ?? "-" };
    case "취소됨":
      return { label: "취소 시간", value: actionAt ?? "-" };
    default:
      return null;
  }
}
