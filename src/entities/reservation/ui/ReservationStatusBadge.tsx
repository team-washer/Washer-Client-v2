import { cn } from "@/shared/lib/cn";
import { statusColorMap } from "../model/status";
interface Props {
  label: keyof typeof statusColorMap;
}

export default function ReservationStatusBadge({ label }: Props) {
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-16 items-center justify-center rounded-full px-3 text-xs font-semibold text-white",
        statusColorMap[label],
      )}
    >
      {label}
    </span>
  );
}