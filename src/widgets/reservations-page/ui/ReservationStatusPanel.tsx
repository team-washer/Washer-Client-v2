import type { ReactNode } from "react";
import type { ReservationItem } from "@/entities/reservation/model/types";
import StatusPanelShell from "@/shared/ui/admin/StatusPanelShell";
import ReservationRow from "./ReservationRow";

interface ReservationStatusPanelProps {
  title: string;
  icon: ReactNode;
  reservations: ReservationItem[];
}

export default function ReservationStatusPanel({
  title,
  icon,
  reservations,
}: ReservationStatusPanelProps) {
  return (
    <StatusPanelShell title={title} icon={icon}>
      {reservations.length === 0 ? (
        <div className="flex h-full items-center justify-center text-lg text-[#9A9AA0]">
          현재 활성화된 예약이 없습니다.
        </div>
      ) : (
        reservations.map((item) => (
          <ReservationRow key={item.id} item={item} />
        ))
      )}
    </StatusPanelShell>
  );
}