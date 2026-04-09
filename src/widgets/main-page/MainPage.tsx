"use client";

import { useState } from "react";
import { WashingMachine } from "lucide-react";
import { useQueries } from "@tanstack/react-query";

import { getReports } from "@/entities/report/api/getReports";
import { getReservations } from "@/entities/reservation/api/getReservations";
import { getUsers } from "@/entities/user/api/getUsers";

import ReservationStatusPanel from "../reservations-page/ui/ReservationStatusPanel";
import ReservationHistoryModal from "../reservations-page/ui/ReservationHistoryModal";
import ReportsPanel from "../reports-page/ui/ReportsPanel";
import UserStatusPanel from "../users-page/ui/UserStatusPanel";

export default function MainPage() {
  const [selectedMachineName, setSelectedMachineName] = useState<string | null>(null);

  const results = useQueries({
    queries: [
      {
        queryKey: ["reports"],
        queryFn: getReports,
      },
      {
        queryKey: ["users"],
        queryFn: getUsers,
      },
      {
        queryKey: ["reservations"],
        queryFn: getReservations,
      },
    ],
  });

  const [reportsQuery, usersQuery, reservationsQuery] = results;

  const isLoading = results.some((query) => query.isLoading);
  const isError = results.some((query) => query.isError);

  if (isLoading) {
    return <div>불러오는 중...</div>;
  }

  if (isError) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

  const reports = reportsQuery.data ?? [];
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