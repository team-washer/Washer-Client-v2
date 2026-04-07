import { WashingMachine } from "lucide-react";
import { getReports } from "@/entities/report/api/getReports";
import { getReservations } from "@/entities/reservation/api/getReservations";
import { getUsers } from "@/entities/user/api/getUsers";

import ReservationStatusPanel from "../reservations-page/ui/ReservationStatusPanel";
import ReportsPanel from "../reports-page/ui/ReportsPanel";
import UserStatusPanel from "../users-page/ui/UserStatusPanel";

export default async function MainPage() {
  const [reports, users, reservations] = await Promise.all([
    getReports(),
    getUsers(),
    getReservations(),
  ]);

  return (
    <div className="admin-page-grid">
      <div className="admin-page-column">
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

      <div className="admin-page-item">
        <ReservationStatusPanel
          title="활성화 된 예약"
          icon={
            <WashingMachine
              size={18}
              className="translate-y-px text-[#A4A4AA]"
            />
          }
          reservations={reservations}
        />
      </div>
    </div>
  );
}