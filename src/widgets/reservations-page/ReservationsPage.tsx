import { Droplet, Waves } from "lucide-react";
import { reservationsMock } from "@/entities/reservation/model/mock";
import ReservationStatusPanel from "./ui/ReservationStatusPanel";

export default function ReservationsPage() {
  const dryerReservations = reservationsMock.filter(
    (item) => item.type === "dryer",
  );

  const washerReservations = reservationsMock.filter(
    (item) => item.type === "washer",
  );

  return (
    <div className="grid grid-cols-1 gap-4 xl:h-full xl:min-h-0 xl:grid-cols-2">
      <div className="xl:min-h-0">
        <ReservationStatusPanel
          title="활성화 된 예약"
          icon={<Waves size={18} className="translate-y-px text-[#A4A4AA]" />}
          reservations={dryerReservations}
        />
      </div>

      <div className="xl:min-h-0">
        <ReservationStatusPanel
          title="활성화 된 예약"
          icon={<Droplet size={18} className="translate-y-px text-[#A4A4AA]" />}
          reservations={washerReservations}
        />
      </div>
    </div>
  );
}