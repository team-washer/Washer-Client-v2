"use client";

import { useState } from "react";
import { Droplet, Waves } from "lucide-react";
import { useGetReservations } from "@/entities/reservation";
import ReservationHistoryModal from "./ui/ReservationHistoryModal";
import ReservationStatusPanel from "./ui/ReservationStatusPanel";

type HistoryOverlayState = {
  machineName: string;
  side: "left" | "right";
} | null;

export default function ReservationsPage() {
  const [historyOverlay, setHistoryOverlay] =
    useState<HistoryOverlayState>(null);

  const { data, isLoading, isError } = useGetReservations();

  if (isLoading) {
    return <div>불러오는 중...</div>;
  }

  if (isError) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

  const reservations = data ?? [];

  const dryerReservations = reservations.filter(
    (item) => item.type === "DRYER",
  );
  const washerReservations = reservations.filter(
    (item) => item.type === "WASHER",
  );

  return (
    <div className="admin-page-grid">
      <div className="relative admin-page-item">
        <ReservationStatusPanel
          title="건조기 예약 현황"
          icon={<Waves size={18} className="translate-y-px text-[#A4A4AA]" />}
          reservations={dryerReservations}
          onOpenHistory={(machineName) =>
            setHistoryOverlay({ machineName, side: "right" })
          }
        />

        {historyOverlay?.side === "right" && (
          <ReservationHistoryModal
            machineName={historyOverlay.machineName}
            side="right"
            onClose={() => setHistoryOverlay(null)}
          />
        )}
      </div>

      <div className="relative admin-page-item">
        <ReservationStatusPanel
          title="세탁기 예약 현황"
          icon={
            <Droplet size={18} className="translate-y-px text-[#A4A4AA]" />
          }
          reservations={washerReservations}
          onOpenHistory={(machineName) =>
            setHistoryOverlay({ machineName, side: "left" })
          }
        />

        {historyOverlay?.side === "left" && (
          <ReservationHistoryModal
            machineName={historyOverlay.machineName}
            side="left"
            onClose={() => setHistoryOverlay(null)}
          />
        )}
      </div>
    </div>
  );
}