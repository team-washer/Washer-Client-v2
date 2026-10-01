import test from "node:test";
import assert from "node:assert/strict";
import { getHistoryTimeField } from "../src/widgets/reservations-page/lib/getHistoryTimeField.ts";

test("history time field is shown for completed reservations", () => {
  assert.deepEqual(
    getHistoryTimeField("사용 완료", "2026. 10. 02. 11:30"),
    { label: "완료 시간", value: "2026. 10. 02. 11:30" },
  );
});

test("history time field is shown for cancelled reservations", () => {
  assert.deepEqual(
    getHistoryTimeField("취소됨", "2026. 10. 02. 11:30"),
    { label: "취소 시간", value: "2026. 10. 02. 11:30" },
  );
});

test("history time field is hidden for active reservations", () => {
  assert.equal(getHistoryTimeField("사용중", undefined), null);
  assert.equal(getHistoryTimeField("예약중", undefined), null);
});
