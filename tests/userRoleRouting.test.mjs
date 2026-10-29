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

test("keeps the admin dashboard as the default layout for staff", () => {
  for (const role of ["ADMIN", "DORMITORY_COUNCIL"]) {
    assert.equal(
      getRoleBasedLayoutState({ isPending: false, isError: false, role }),
      "admin",
    );
  }
});

test("allows all supported accounts to open an explicit user page", () => {
  for (const role of ["USER", "ADMIN", "DORMITORY_COUNCIL"]) {
    assert.equal(
      getRoleBasedLayoutState({
        isPending: false,
        isError: false,
        role,
        isUserPage: true,
      }),
      "user",
      `${role} should be allowed to use the laundry page`,
    );
  }
});

test("checks authentication and supported roles before opening a user page", () => {
  for (const input of [
    { isPending: false, isError: true, role: "ADMIN" },
    { isPending: false, isError: false },
    { isPending: false, isError: false, role: "UNKNOWN" },
  ]) {
    assert.equal(
      getRoleBasedLayoutState({ ...input, isUserPage: true }),
      "error",
    );
  }

  assert.equal(
    getRoleBasedLayoutState({
      isPending: true,
      isError: false,
      role: "ADMIN",
      isUserPage: true,
    }),
    "loading",
  );
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
