import test from "node:test";
import assert from "node:assert/strict";
import { getPushSupportState } from "../src/shared/lib/pushSupport.ts";

test("푸시 설정과 브라우저 지원이 모두 있으면 ready 상태를 반환한다", () => {
  assert.equal(
    getPushSupportState({
      isBrowser: true,
      hasNotificationApi: true,
      permission: "default",
      isFirebaseSupported: true,
      hasVapidKey: true,
    }),
    "ready",
  );
});

test("브라우저 알림 권한이 거부되면 denied 상태를 반환한다", () => {
  assert.equal(
    getPushSupportState({
      isBrowser: true,
      hasNotificationApi: true,
      permission: "denied",
      isFirebaseSupported: true,
      hasVapidKey: true,
    }),
    "denied",
  );
});

test("Firebase 또는 VAPID 설정이 없으면 not-configured 상태를 반환한다", () => {
  assert.equal(
    getPushSupportState({
      isBrowser: true,
      hasNotificationApi: true,
      permission: "default",
      isFirebaseSupported: true,
      hasVapidKey: false,
    }),
    "not-configured",
  );
});

test("브라우저 API가 없으면 unsupported 상태를 반환한다", () => {
  assert.equal(
    getPushSupportState({
      isBrowser: false,
      hasNotificationApi: false,
      permission: "default",
      isFirebaseSupported: false,
      hasVapidKey: true,
    }),
    "unsupported",
  );
});
