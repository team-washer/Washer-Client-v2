import assert from "node:assert/strict";
import test from "node:test";
import {
  getRoleBasedLayoutState,
  getUserHomeKind,
} from "../src/entities/user/lib/roleRouting.ts";

test("routes USER accounts to the user home", () => {
  assert.equal(getUserHomeKind("USER"), "user");
});

test("routes staff accounts to the admin home", () => {
  assert.equal(getUserHomeKind("ADMIN"), "admin");
  assert.equal(getUserHomeKind("DORMITORY_COUNCIL"), "admin");
});

test("does not route an unsupported role to the admin home", () => {
  assert.equal(getUserHomeKind("UNKNOWN"), null);
});

test("keeps the layout in a loading state while the role is pending", () => {
  assert.equal(
    getRoleBasedLayoutState({ isPending: true, isError: false }),
    "loading",
  );
});

test("fails closed when role lookup fails or returns no role", () => {
  assert.equal(
    getRoleBasedLayoutState({ isPending: false, isError: true }),
    "error",
  );
  assert.equal(
    getRoleBasedLayoutState({ isPending: false, isError: false }),
    "error",
  );
  assert.equal(
    getRoleBasedLayoutState({
      isPending: false,
      isError: false,
      role: "UNKNOWN",
    }),
    "error",
  );
});
