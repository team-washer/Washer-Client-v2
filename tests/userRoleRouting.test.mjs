import assert from "node:assert/strict";
import test from "node:test";
import { getUserHomeKind } from "../src/entities/user/lib/roleRouting.ts";

test("routes USER accounts to the user home", () => {
  assert.equal(getUserHomeKind("USER"), "user");
});

test("routes staff accounts to the admin home", () => {
  assert.equal(getUserHomeKind("ADMIN"), "admin");
  assert.equal(getUserHomeKind("DORMITORY_COUNCIL"), "admin");
});
