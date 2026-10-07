import assert from "node:assert/strict";
import test from "node:test";
import { getJobStateInfo } from "../src/entities/machine/lib/jobStateInfo.ts";

test("maps washer and dryer job states like the v1 user web", () => {
  assert.equal(getJobStateInfo("WASHER", "rinse").text, "헹굼 중");
  assert.equal(getJobStateInfo("DRYER", "drying").text, "건조 중");
  assert.equal(getJobStateInfo("DRYER", "finished").text, "완료");
});

test("falls back to idle for unknown or missing job states", () => {
  assert.equal(getJobStateInfo("WASHER", null).text, "대기 중");
  assert.equal(getJobStateInfo("WASHER", "unknownState").text, "대기 중");
  assert.equal(getJobStateInfo("DRYER", "finish").text, "대기 중");
});
