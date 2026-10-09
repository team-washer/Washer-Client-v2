import test from "node:test";
import assert from "node:assert/strict";
import { normalizeNotificationListResponse } from "../src/entities/notification/model/notification.ts";

const validResponse = {
  notifications: [
    {
      id: 1,
      type: "COMPLETION",
      message: "WASHER-3F-L1의 세탁이 완료되었습니다.",
      createdAt: "2026-03-30T14:30:00",
    },
  ],
};

test("정규화 함수는 백엔드의 직접 알림 목록을 반환한다", () => {
  assert.deepEqual(
    normalizeNotificationListResponse(validResponse),
    validResponse.notifications,
  );
});

test("정규화 함수는 전역 응답 래퍼 안의 알림 목록을 반환한다", () => {
  assert.deepEqual(
    normalizeNotificationListResponse({
      status: 200,
      code: "SUCCESS",
      message: "알림 목록 조회 성공",
      data: validResponse,
    }),
    validResponse.notifications,
  );
});

test("정규화 함수는 잘못된 알림 목록 응답을 거부한다", () => {
  assert.equal(
    normalizeNotificationListResponse({ notifications: [{ id: 1 }] }),
    null,
  );
});
