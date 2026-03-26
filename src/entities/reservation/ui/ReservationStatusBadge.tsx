import { cn } from "@/shared/lib/cn";
import type { ReservationStatus } from "../model/types";
import { reservationStatusStyleMap } from "../model/status";

interface ReservationStatusBadgeProps {
  status: ReservationStatus;
}

export default function ReservationStatusBadge({
  status,
}: ReservationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-16 items-center justify-center rounded-full px-3 text-xs font-semibold text-white",
        reservationStatusStyleMap[status]
      )}
    >
      {status}
    </span>
  );
}
