import type { ReservationStatus } from "./types";

export const reservationStatusStyleMap: Record<ReservationStatus, string> = {
  사용중: "bg-[#4D83F6]",
  대기중: "bg-[#8CB2FF]",
  예약중: "bg-[#8CB2FF]",
};
