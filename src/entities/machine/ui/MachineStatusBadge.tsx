import { cn } from "@/shared/lib/cn";
import { machineStatusStyleMap } from "../model/status";
import type { AdminMachineItem, MachineStatus } from "../model/types";

interface Props {
  status: MachineStatus;
  availability?: AdminMachineItem["availability"];
}

const statusTextMap: Record<string, string> = {
  사용중: "사용중",
  미사용: "미사용",
  "사용 정지": "사용 정지",
  예약: "예약",
  확인필요: "확인필요",
  고장: "고장",
  NORMAL: "미사용",
  MALFUNCTION: "고장",
  // Availability mapping
  AVAILABLE: "미사용",
  IN_USE: "사용중",
  RESERVED: "예약된",
  UNAVAILABLE: "사용불가",
};

const availabilityStyleMap: Record<string, string> = {
  AVAILABLE: "bg-[#A4A4AA] text-white",   // Gray (미사용)
  IN_USE: "bg-[#4486FF] text-white",      // Blue (사용중)
  RESERVED: "bg-[#4486FF] text-white",    // Blue (예약된)
  UNAVAILABLE: "bg-[#EA3B42] text-white", // Red (사용불가)
};

export default function MachineStatusBadge({ status, availability }: Props) {
  const label = availability ? statusTextMap[availability] : statusTextMap[status];
  const style = availability ? availabilityStyleMap[availability] : machineStatusStyleMap[status];

  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-16 items-center justify-center rounded-full px-3 text-xs font-semibold",
        style,
      )}
    >
      {label}
    </span>
  );
}