import { cn } from "@/shared/lib/cn";
import { occupancyStatusStyleMap } from "../model/status";
import { OccupancyStatus } from "../model/types";

interface Props {
    status: OccupancyStatus;
}

export default function ReservationStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-16 items-center justify-center rounded-full px-3 text-xs font-semibold text-white",
        occupancyStatusStyleMap[status],
      )}
    >
      {status}
    </span>
  );
}
