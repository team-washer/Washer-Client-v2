import type { MachineStatus } from "./types";

export const machineStatusStyleMap: Record<MachineStatus, string> = {
  사용중: "bg-[#4D83F6] text-white",
  미사용: "bg-[#A4A4AA] text-white",
  "사용 정지": "bg-[#8FB2FF] text-white",
  예약: "bg-[#AFC8FF] text-white",
  확인필요: "bg-[#EF3E45] text-white",
  고장: "bg-[#EF3E45] text-white",
  NORMAL: "bg-[#A4A4AA] text-white",
  MALFUNCTION: "bg-[#EF3E45] text-white",
};