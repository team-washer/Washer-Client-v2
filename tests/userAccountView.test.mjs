import assert from "node:assert/strict";
import test from "node:test";
import {
  getAccountRoleLabel,
  getReservationAccessLabel,
} from "../src/widgets/my-page/lib/accountView.ts";

test("maps account roles to Korean labels", () => {
  assert.equal(getAccountRoleLabel("USER"), "사용자");
  assert.equal(getAccountRoleLabel("ADMIN"), "관리자");
  assert.equal(getAccountRoleLabel("DORMITORY_COUNCIL"), "자치위원");
});

test("maps reservation access to an account status label", () => {
  assert.equal(getReservationAccessLabel(true), "예약 가능");
  assert.equal(getReservationAccessLabel(false), "예약 제한");
});
