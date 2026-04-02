import type { OccupancyStatus } from "./types";

export const occupancyStatusStyleMap: Record<OccupancyStatus, string> = {
  사용중: "bg-[#4D83F6]",
  예약중: "bg-[#4D83F6]",
  확인필요: "bg-[#EF4B4F]",
};