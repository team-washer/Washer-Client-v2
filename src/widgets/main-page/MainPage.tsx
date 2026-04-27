"use client";

import { WashingMachine } from "lucide-react";
import { useState } from "react";

import { useGetMalfunctionReports } from "@/entities/report";
import { useGetReservations } from "@/entities/reservation";
import { useGetUsers } from "@/entities/user";
import ReportsPanel from "../reports-page/ui/ReportsPanel";
import ReservationHistoryModal from "../reservations-page/ui/ReservationHistoryModal";
import ReservationStatusPanel from "../reservations-page/ui/ReservationStatusPanel";
import UserStatusPanel from "../users-page/ui/UserStatusPanel";

export default function MainPage() {
  const [selectedMachineName, setSelectedMachineName] = useState<string | null>(
    null,
  );

  const reportsQuery = useGetMalfunctionReports();
  const usersQuery = useGetUsers();
  const reservationsQuery = useGetReservations();

  const isLoading =
    reportsQuery.isLoading ||
    usersQuery.isLoading ||
    reservationsQuery.isLoading;

  const isError =
    reportsQuery.isError || usersQuery.isError || reservationsQuery.isError;

  if (isLoading) {
    return <div>불러오는 중...</div>;
  }

  if (isError) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

  const reports = reportsQuery.data?.data.reports ?? [];
  const users = usersQuery.data ?? [];
  const reservations = reservationsQuery.data ?? [];

  return (
    <div className="admin-page-grid">
      <div className="relative admin-page-column">
        <div className="admin-page-fill">
          <ReportsPanel
            title="최근 고장 신고"
            reports={reports}
            variant="summary"
          />
        </div>

        <div className="admin-page-fill">
          <UserStatusPanel users={users} />
        </div>
      </div>

      <div className="relative admin-page-item">
        <ReservationHistoryModal
          machineName={selectedMachineName}
          onClose={() => setSelectedMachineName(null)}
          side="left"
        />
        <ReservationStatusPanel
          title="활성화 된 예약"
          icon={
            <WashingMachine
              size={18}
              className="translate-y-px text-[#A4A4AA]"
            />
          }
          reservations={reservations}
          onOpenHistory={setSelectedMachineName}
        />
      </div>
    </div>
  );
}
