"use client";

import { Droplet, Waves } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getReservations } from "@/entities/reservation/api/getReservations";
import ReservationStatusPanel from "./ui/ReservationStatusPanel";

export default function ReservationsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });

  if (isLoading) {
    return <div>불러오는 중...</div>;
  }

  if (isError) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

  const reservations = data ?? [];

  const dryerReservations = reservations.filter((item) => item.type === "dryer");
  const washerReservations = reservations.filter((item) => item.type === "washer");

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