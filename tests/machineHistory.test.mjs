import assert from "node:assert/strict";
import test from "node:test";
import { getRecentMachineHistoryRange } from "../src/widgets/user-machine-list/lib/machineHistory.ts";
import {
  getMachineHistoryErrorState,
  getMachineHistoryStatusLabel,
  groupMachineHistoryByDay,
} from "../src/widgets/user-machine-list/lib/machineHistoryPresentation.ts";

test("returns yesterday start and today end in Korean calendar time", () => {
  assert.deepEqual(
    getRecentMachineHistoryRange(new Date("2026-10-14T00:30:00Z")),
    {
      startDate: "2026-10-13T00:00:00",
      endDate: "2026-10-14T23:59:59",
    },
  );
});

test("uses the next Korean calendar date when UTC crosses midnight", () => {
  assert.deepEqual(
    getRecentMachineHistoryRange(new Date("2026-10-13T15:30:00Z")),
    {
      startDate: "2026-10-13T00:00:00",
      endDate: "2026-10-14T23:59:59",
    },
  );
});

test("handles a Korean calendar month and year boundary", () => {
  assert.deepEqual(
    getRecentMachineHistoryRange(new Date("2026-01-01T00:30:00Z")),
    {
      startDate: "2025-12-31T00:00:00",
      endDate: "2026-01-01T23:59:59",
    },
  );
});

test("maps every backend machine history status to its Korean label", () => {
  assert.deepEqual(
    ["RESERVED", "RUNNING", "COMPLETED", "CANCELLED"].map(
      getMachineHistoryStatusLabel,
    ),
    ["예약중", "사용중", "사용 완료", "취소됨"],
  );
});

test("groups machine history records under today and yesterday in Korean time", () => {
  const groups = groupMachineHistoryByDay(
    [
      {
        id: 1,
        userRoomNumber: "301",
        startTime: "2026-10-13T15:30:00Z",
        completionTime: "2026-10-14T09:00:00",
        status: "COMPLETED",
        createdAt: "2026-10-14T07:55:00",
      },
      {
        id: 2,
        userRoomNumber: "302",
        startTime: null,
        completionTime: "2026-10-13T23:30:00",
        status: "CANCELLED",
        createdAt: "2026-10-13T23:00:00",
      },
    ],
    {
      startDate: "2026-10-13T00:00:00",
      endDate: "2026-10-14T23:59:59",
    },
  );

  assert.deepEqual(
    groups.map(({ label, items }) => ({
      label,
      ids: items.map(({ id }) => id),
    })),
    [
      { label: "오늘", ids: [1] },
      { label: "어제", ids: [2] },
    ],
  );
});

test("keeps cached history visible when loading another page fails", () => {
  assert.equal(getMachineHistoryErrorState(true, 2), "pagination");
  assert.equal(getMachineHistoryErrorState(true, 0), "initial");
});
