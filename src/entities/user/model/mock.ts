import type { ManagedUserItem } from "./types";

export const managedUsersMock: ManagedUserItem[] = [
  {
    id: 1,
    name: "김민솔",
    room: "511호",
    roomNumber: "3403",
    reason: "사유: 예약 정지 2회 이상",
    remain: "00:32:12",
    studentNumber: 3303,
  },
  {
    id: 2,
    name: "이하늘",
    room: "402호",
    roomNumber: "3404",
    warningCount: 2,
    studentNumber: 3304,
  },
  {
    id: 3,
    name: "박지성",
    room: "305호",
    roomNumber: "3405",
    warningCount: 1,
    studentNumber: 3305,
  },
  {
    id: 4,
    name: "최유진",
    room: "508호",
    roomNumber: "3406",
    warningCount: 0,
    studentNumber: 3306,
  },
  {
    id: 5,
    name: "정우성",
    room: "210호",
    roomNumber: "3407",
    warningCount: 3,
    studentNumber: 3307,
  },
];