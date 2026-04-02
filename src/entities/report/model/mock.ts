import type { ReportItem } from "./types";

export const reportsMock: ReportItem[] = [
  {
    id: 1,
    machine: "Washer-3F-L1",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "신고",
    type: "washer",
  },
  {
    id: 2,
    machine: "Washer-3F-L1",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "처리중",
    type: "washer",
  },
  {
    id: 3,
    machine: "Dryer-3F-L2",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "완료",
    type: "dryer",
  },
  {
    id: 4,
    machine: "Dryer-3F-L2",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "완료",
    type: "dryer",
  },
  {
    id: 5,
    machine: "Dryer-3F-L2",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "완료",
    type: "dryer",
  },
];
