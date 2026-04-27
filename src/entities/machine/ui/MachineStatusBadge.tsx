import { cn } from "@/shared/lib/cn";
import { machineStatusStyleMap } from "../model/status";
import type { MachineStatusLabel } from "../model/types";

interface Props {
  status: MachineStatusLabel;
}

export default function MachineStatusBadge({ status }: Props) {
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-16 items-center justify-center rounded-full px-3 text-xs font-semibold",
        machineStatusStyleMap[status],
      )}
    >
      {status}
    </span>
  );
}
