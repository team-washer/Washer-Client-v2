import type { MachineStatus } from "./types";

export const machineStatusStyleMap: Record<MachineStatus, string> = {
  사용중: "bg-[#4486FF] text-white",
  미사용: "bg-[#A4A4AA] text-white",
  "사용 정지": "bg-[#4486FF] text-white",
  예약: "bg-[#4486FF] text-white",
  확인필요: "bg-[#EA3B42] text-white",
  고장: "bg-[#EA3B42] text-white",
  NORMAL: "bg-[#A4A4AA] text-white",
  MALFUNCTION: "bg-[#EA3B42] text-white",
};