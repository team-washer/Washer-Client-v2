import assert from "node:assert/strict";
import test from "node:test";
import {
  getQueryParamNumber,
  updateQueryParams,
} from "../src/shared/lib/queryParams.ts";

test("updateQueryParams preserves unrelated params and removes empty filters", () => {
  const current = new URLSearchParams("tab=users&search=old&floor=3");

  const next = updateQueryParams(current, {
    search: "",
    floor: undefined,
    status: "PENDING",
  });

  assert.equal(next.toString(), "tab=users&status=PENDING");
  assert.equal(current.toString(), "tab=users&search=old&floor=3");
});

test("getQueryParamNumber returns only finite integer values", () => {
  const params = new URLSearchParams("floor=4&invalid=3.5&empty=");

  assert.equal(getQueryParamNumber(params, "floor"), 4);
  assert.equal(getQueryParamNumber(params, "invalid"), undefined);
  assert.equal(getQueryParamNumber(params, "empty"), undefined);
  assert.equal(getQueryParamNumber(params, "missing"), undefined);
});
