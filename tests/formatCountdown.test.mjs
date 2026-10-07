import assert from "node:assert/strict";
import test from "node:test";
import { formatCountdown } from "../src/shared/lib/formatCountdown.ts";

test("formats remaining time as HH:MM:SS like the v1 user web", () => {
  assert.equal(formatCountdown(65_000), "00:01:05");
  assert.equal(formatCountdown(3_725_000), "01:02:05");
});

test("clamps negative remaining time to zero", () => {
  assert.equal(formatCountdown(-5_000), "00:00:00");
});
