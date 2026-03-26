import { Droplet, Waves } from "lucide-react";
import type { ReservationItem } from "@/entities/reservation/model/types";
import ReservationStatusPanel from "./ui/ReservationStatusPanel";

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
    remain: "00:12:11",
    status: "대기중",
    type: "washer",
  },
  {
    id: 4,
    machine: "Dryer-3F-L1 302호",
    remain: "00:09:43",
    status: "대기중",
    type: "dryer",
  },
  {
    id: 5,
    machine: "Washer-3F-L1 303호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약중",
    type: "washer",
  },
  {
    id: 6,
    machine: "Dryer-3F-L1 303호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약중",
    type: "dryer",
  },
];

export default function ReservationsPage() {
  const dryerReservations = reservations.filter(
    (item) => item.type === "dryer",
  );

  const washerReservations = reservations.filter(
    (item) => item.type === "washer",
  );

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 items-stretch">
      <ReservationStatusPanel
        title="활성화 된 예약"
        icon={<Waves size={18} className="translate-y-px text-[#A4A4AA]" />}
        reservations={dryerReservations}
      />

      <ReservationStatusPanel
        title="활성화 된 예약"
        icon={<Droplet size={18} className="translate-y-px text-[#A4A4AA]" />}
        reservations={washerReservations}
      />
    </div>
  );
}
