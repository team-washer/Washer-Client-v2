import assert from "node:assert/strict";
import test from "node:test";

import { isPublicProxyPath } from "../src/shared/lib/publicProxyPaths.ts";

test("allows public PWA assets through the authentication proxy", () => {
  for (const pathname of [
    "/manifest.webmanifest",
    "/firebase-messaging-sw.js",
  ]) {
    assert.equal(isPublicProxyPath(pathname), true, pathname);
  }

  assert.equal(isPublicProxyPath("/machines"), false);
});
