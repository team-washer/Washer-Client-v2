import assert from "node:assert/strict";
import test from "node:test";
import {
  formatKstClock,
  parseKstDateTime,
} from "../src/shared/lib/kstDateTime.ts";

test("parses offset-less backend times as Korea time", () => {
  assert.equal(
    parseKstDateTime("2026-10-07T15:00:00").toISOString(),
    "2026-10-07T06:00:00.000Z",
  );
});

test("keeps an explicit offset", () => {
  assert.equal(
    parseKstDateTime("2026-10-07T06:00:00Z").toISOString(),
    "2026-10-07T06:00:00.000Z",
  );
});

test("formats the clock in Korea time regardless of runtime timezone", () => {
  assert.equal(formatKstClock("2026-10-07T15:05:00"), "15:05");
  assert.equal(formatKstClock(null), null);
  assert.equal(parseKstDateTime("not-a-date"), null);
});
