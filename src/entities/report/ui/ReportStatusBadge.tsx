import { cn } from "@/shared/lib/cn";
import type { ReportStatus } from "../model/type";
import { reportStatusStyleMap } from "../model/status";

interface ReportStatusBadgeProps {
  status: ReportStatus;
}

export default function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-[50px] shrink-0 items-center justify-center rounded-full px-3 text-xs font-medium text-white",
        reportStatusStyleMap[status]
      )}
    >
      {status}
    </span>
  );
}
