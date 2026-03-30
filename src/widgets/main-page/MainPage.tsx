import { WashingMachine } from "lucide-react";
import { reportsMock } from "@/entities/report/model/mock";
import { reservationsMock } from "@/entities/reservation/model/mock";
import { managedUsersMock } from "@/entities/user/model/mock";
import ReservationStatusPanel from "../reservations-page/ui/ReservationStatusPanel";
import RecentReportsPanel from "./ui/RecentReportsPanel";
import UserManagementPanel from "./ui/UserManagementPanel";

export default function MainPage() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:h-full xl:min-h-0 xl:grid-cols-2">
      <div className="flex flex-col gap-4 xl:min-h-0">
        <div className="xl:min-h-0 xl:flex-1">
          <RecentReportsPanel reports={reportsMock} />
        </div>

        <div className="xl:min-h-0 xl:flex-1">
          <UserManagementPanel users={managedUsersMock} />
        </div>
      </div>

      <div className="xl:min-h-0">
        <ReservationStatusPanel
          title="활성화 된 예약"
          icon={<WashingMachine size={18} className="translate-y-px text-[#A4A4AA]" />}
          reservations={reservationsMock}
        />
      </div>
    </div>
  );
}