import test from "node:test";
import assert from "node:assert/strict";
import { machineReservationHistoryResponseSchema } from "../src/entities/reservation/api/schemas.ts";

test("machine reservation history accepts a running reservation", () => {
  const response = {
    machines: [
      {
        machineName: "Washer-4F-R2",
        reservations: [
          {
            roomNumber: "408",
            reservedAt: "2026-10-02T10:00:00",
            actualCompletionTime: null,
            cancelledAt: null,
            status: "RUNNING",
          },
        ],
      },
    ],
  };

  assert.doesNotThrow(() => {
    machineReservationHistoryResponseSchema.parse(response);
  });
});
