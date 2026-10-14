import assert from "node:assert/strict";
import test from "node:test";
import { getRecentMachineHistoryRange } from "../src/widgets/user-machine-list/lib/machineHistory.ts";

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
