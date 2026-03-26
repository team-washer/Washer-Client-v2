import RecentReportsPanel from "./ui/RecentReportsPanel";
import UserManagementPanel from "./ui/UserManagementPanel";
import { Droplet } from "lucide-react";
import ReservationStatusPanel from "../reservations-page/ui/ReservationStatusPanel";
import { managedUsersMock } from "@/entities/user/model/mock";
import { reservationsMock } from "@/entities/reservation/model/mock";

export default function MainPage() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="flex flex-col gap-4">
        <RecentReportsPanel />
        <UserManagementPanel users={managedUsersMock} />
      </div>

      <ReservationStatusPanel
        title="활성화 된 예약"
        icon={<Droplet size={18} className="translate-y-px text-[#A4A4AA]" />}
        reservations={reservationsMock}
      />
    </div>
  );
}
