import type { ManagedUserItem } from "./types";

export const managedUsersMock: ManagedUserItem[] = [
  {
    id: 1,
    name: "김철수",
    room: "301호",
    studentNumber: "2404",
    warningCount: 1,
    reason: "세탁기 사용 시간 초과",
    remain: "1시간 20분",
  },
  {
    id: 2,
    name: "이영희",
    room: "302호",
    studentNumber: "2405",
    warningCount: 0,
  },
];