import { Clock, Home } from "lucide-react";
import type { MachineHistoryItemDTO } from "@/entities/machine";
import ReservationStatusBadge from "@/entities/reservation/ui/ReservationStatusBadge";
import { formatKstClock } from "@/shared/lib/kstDateTime";
import { getMachineHistoryStatusLabel } from "../lib/machineHistoryPresentation";

interface MachineHistoryCardProps {
  machineName: string;
  item: MachineHistoryItemDTO;
}

export default function MachineHistoryCard({
  machineName,
  item,
}: MachineHistoryCardProps) {
  const statusLabel = getMachineHistoryStatusLabel(item.status);
  const actionTime =
    item.status === "COMPLETED"
      ? { label: "완료 시간", value: item.completionTime }
      : item.status === "CANCELLED"
        ? { label: "취소 시간", value: item.completionTime }
        : null;

  return (
    <article className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {machineName}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Home className="h-3.5 w-3.5" />
            {item.userRoomNumber}호
          </p>
        </div>
        <ReservationStatusBadge label={statusLabel} />
      </div>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 border-t pt-3 text-sm">
        <dt className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          시작 시간
        </dt>
        <dd className="text-right font-medium">
          {formatKstClock(item.startTime) ?? "-"}
        </dd>

        {actionTime && (
          <>
            <dt className="text-muted-foreground">{actionTime.label}</dt>
            <dd className="text-right font-medium">
              {formatKstClock(actionTime.value) ?? "-"}
            </dd>
          </>
        )}
      </dl>
    </article>
  );
}
