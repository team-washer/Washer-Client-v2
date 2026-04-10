import { Droplet, Waves } from "lucide-react";
import { reservationsMock } from "@/entities/reservation/model/mock";
import ReservationStatusPanel from "./ui/ReservationStatusPanel";

export default function ReservationsPage() {
  const dryerReservations = reservationsMock.filter(
    (item) => item.type === "DRYER",
  );

  const washerReservations = reservationsMock.filter(
    (item) => item.type === "WASHER",
  );

  return (
    <div className="admin-page-grid">
      <div className="admin-page-item">
        <ReservationStatusPanel
          title="건조기 예약 현황"
          icon={<Waves size={18} className="translate-y-px text-[#A4A4AA]" />}
          reservations={dryerReservations}
        />
      </div>

      <div className="admin-page-item">
        <ReservationStatusPanel
          title="세탁기 예약 현황"
          icon={<Droplet size={18} className="translate-y-px text-[#A4A4AA]" />}
          reservations={washerReservations}
        />
      </div>
    </div>
  );
}