import { cn } from "@/shared/lib/cn";
import { occupancyStatusStyleMap } from "../model/status";
import type { BadgeStatus } from "../model/types";

interface Props {
  badgeStatus: BadgeStatus;
}

export default function ReservationStatusBadge({ badgeStatus }: Props) {
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-16 items-center justify-center rounded-full px-3 text-xs font-semibold text-white",
        occupancyStatusStyleMap[badgeStatus],
      )}
    >
      {badgeStatus}
    </span>
  );
}