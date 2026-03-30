import { WashingMachine } from "lucide-react";
import { reportsMock } from "@/entities/report/model/mock";
import { reservationsMock } from "@/entities/reservation/model/mock";
import { managedUsersMock } from "@/entities/user/model/mock";
import ReservationStatusPanel from "../reservations-page/ui/ReservationStatusPanel";
import RecentReportsPanel from "./ui/RecentReportsPanel";
import UserManagementPanel from "./ui/UserManagementPanel";

export default function MainPage() {
  return (
    <div className="admin-page-grid">
      <div className="admin-page-column">
        <div className="admin-page-fill">
          <RecentReportsPanel reports={reportsMock} />
        </div>

        <div className="admin-page-fill">
          <UserManagementPanel users={managedUsersMock} />
        </div>
      </div>

      <div className="admin-page-item">
        <ReservationStatusPanel
          title="활성화 된 예약"
          icon={<WashingMachine size={18} className="translate-y-px text-[#A4A4AA]" />}
          reservations={reservationsMock}
        />
      </div>
    </div>
  );
}