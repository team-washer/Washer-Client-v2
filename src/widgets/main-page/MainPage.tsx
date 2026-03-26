import { Droplet } from "lucide-react";
import { reportsMock } from "@/entities/report/model/mock";
import { reservationsMock } from "@/entities/reservation/model/mock";
import type { ReservationItem } from "@/entities/reservation/model/types";
import { managedUsersMock } from "@/entities/user/model/mock";
import ReservationStatusPanel from "../reservations-page/ui/ReservationStatusPanel";
import RecentReportsPanel from "./ui/RecentReportsPanel";
import UserManagementPanel from "./ui/UserManagementPanel";

const reservations: ReservationItem[] = [
  {
    id: 1,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    status: "사용중",
    type: "washer",
  },
  {
    id: 2,
    machine: "Dryer-3F-L1 301호",
    remain: "00:18:41",
    status: "사용중",
    type: "dryer",
  },
  {
    id: 3,
    machine: "Washer-3F-L1 302호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약중",
    type: "washer",
  },
];

export default function MainPage() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="flex flex-col gap-4">
        <RecentReportsPanel reports={reportsMock} />
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
