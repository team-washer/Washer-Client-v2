import { Droplet, Waves } from "lucide-react";
import ReservationStatusPanel from "./ui/ReservationStatusPanel";
import { reservationsMock } from "@/entities/reservation/model/mock";

export default function ReservationsPage() {
  const dryerReservations = reservationsMock.filter(
    (item) => item.type === "dryer"
  );

  const washerReservations = reservationsMock.filter(
    (item) => item.type === "washer"
  );

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-2">
      <ReservationStatusPanel
        title="건조기 예약 현황"
        icon={<Waves size={18} className="translate-y-px text-[#A4A4AA]" />}
        reservations={dryerReservations}
      />

      <ReservationStatusPanel
        title="세탁기 예약 현황"
        icon={<Droplet size={18} className="translate-y-px text-[#A4A4AA]" />}
        reservations={washerReservations}
      />
    </div>
  );
}
