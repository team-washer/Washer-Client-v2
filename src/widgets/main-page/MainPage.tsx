import { WashingMachine } from "lucide-react";
import { reportsMock } from "@/entities/report/model/mock";
import { reservationsMock } from "@/entities/reservation/model/mock";
import { managedUsersMock } from "@/entities/user/model/mock";
import ReservationStatusPanel from "../reservations-page/ui/ReservationStatusPanel";
import ReportsPanel from "../reports-page/ui/ReportsPanel";
import UserStatusPanel from "../users-page/ui/UserStatusPanel";

export default function MainPage() {
  return (
    <div className="admin-page-grid">
      <div className="admin-page-column">
        <div className="admin-page-fill">
          <ReportsPanel
            title="최근 고장 신고"
            reports={reportsMock}
            variant="summary"
          />
        </div>

        <div className="admin-page-fill">
          <UserStatusPanel users={managedUsersMock} />
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
          reservations={reservationsMock}
        />
      </div>
    </div>
  );
}