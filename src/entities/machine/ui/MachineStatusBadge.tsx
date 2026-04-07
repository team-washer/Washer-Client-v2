import { cn } from "@/shared/lib/cn";
import { machineStatusStyleMap } from "../model/status";
import type { MachineStatus } from "../model/types";

interface Props {
  status: MachineStatus;
}

export default function MachineStatusBadge({ status }: Props) {
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-16 items-center justify-center rounded-full px-3 text-xs font-semibold text-white",
        machineStatusStyleMap[status],
      )}
    >
      {status}
    </span>
  );
}