import type { ReservationItem } from "./types";

export const reservationsMock: ReservationItem[] = [
  {
    id: 1,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    deviceStatus: "건조중",
    status: "사용중",
    type: "washer",
  },
  {
    id: 2,
    machine: "Dryer-3F-L3 301호",
    remain: "00:32:12",
    deviceStatus: "건조중",
    status: "사용중",
    type: "dryer",
  },
  {
    id: 3,
    machine: "Washer-3F-L1 301호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약중",
    type: "washer",
  },
  {
    id: 4,
    machine: "Washer-3F-L1 301호",
    status: "확인필요",
    type: "washer",
  },
];