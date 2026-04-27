import type { DashboardItem, DashboardSummaryDTO } from "../model/types";

export function mapDashboard(summary: DashboardSummaryDTO): DashboardItem[] {
  return [
    { label: "총 기기수", value: `${summary.totalMachines}대` },
    { label: "예약 활성화", value: `${summary.activeReservations}대` },
    {
      label: "고장 신고",
      value: `${
        summary.pendingMalfunctionReports + summary.processingMalfunctionReports
      }건`,
    },
    { label: "세탁정지", value: `${summary.suspendedStudents}명` },
  ];
}
