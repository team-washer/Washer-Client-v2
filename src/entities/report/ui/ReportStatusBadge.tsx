import { cn } from "@/shared/lib/cn";
import type { ReportStatusType } from "../model/types";
import { reportStatusStyleMap, reportStatusLabelMap } from "../model/status";

interface ReportStatusBadgeProps {
  status: ReportStatusType;
}

const ReportStatusBadge = ({ status }: ReportStatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-[50px] shrink-0 items-center justify-center rounded-full px-3 text-xs font-medium text-white",
        reportStatusStyleMap[status]
      )}
    >
      {reportStatusLabelMap[status]}
    </span>
  );
};

export default ReportStatusBadge;
