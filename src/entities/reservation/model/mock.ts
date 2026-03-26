import type { ReservationItem } from "./types";

export const reservationsMock: ReservationItem[] = [
  {
    id: 1,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    status: "사용중",
    type: "washer",
  },
  {
    id: 2,
    machine: "Dryer-3F-L1 301호",
    remain: "00:18:41",
    status: "사용중",
    type: "dryer",
  },
  {
    id: 3,
    machine: "Washer-3F-L1 302호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약중",
    type: "washer",
  },
  {
    id: 4,
    machine: "Dryer-3F-L1 302호",
    remain: "00:09:43",
    status: "대기중",
    type: "dryer",
  },
  {
    id: 5,
    machine: "Washer-3F-L1 303호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약중",
    type: "washer",
  },
  {
    id: 6,
    machine: "Dryer-3F-L1 303호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약중",
    type: "dryer",
  },
];
