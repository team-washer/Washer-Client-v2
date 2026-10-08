import test from "node:test";
import assert from "node:assert/strict";
import {
  myReservationDTOSchema,
  myReservationHistoryPageSchema,
  reservationAvailabilitySchema,
  reservationCancellationSchema,
  roomActiveReservationsResponseSchema,
} from "../src/entities/reservation/api/schemas.ts";
import {
  getReservedDeadline,
  getReserveBlockReason,
} from "../src/entities/reservation/lib/myReservation.ts";

const reservationResponse = {
  id: 10,
  userId: 7,
  userName: "홍길동",
  userRoomNumber: "301",
  userStudentId: "2301",
  machineId: 1,
  machineName: "Washer-3F-L1",
  reservedAt: "2026-10-07T15:00:00",
  startTime: null,
  expectedCompletionTime: null,
  actualCompletionTime: null,
  status: "RESERVED",
  cancelledAt: null,
  dayOfWeek: "WEDNESDAY",
  createdAt: "2026-10-07T15:00:00",
  updatedAt: "2026-10-07T15:00:00",
};

test("parses a user reservation without the admin-only availability field", () => {
  const reservation = myReservationDTOSchema.parse(reservationResponse);

  assert.equal(reservation.id, 10);
  assert.equal(reservation.status, "RESERVED");
  assert.equal(reservation.startTime, null);
});

test("rejects a removed v1 reservation status", () => {
  assert.equal(
    myReservationDTOSchema.safeParse({
      ...reservationResponse,
      status: "CONFIRMED",
    }).success,
    false,
  );
});

test("parses room active reservations including an empty list", () => {
  assert.equal(
    roomActiveReservationsResponseSchema.parse({
      reservations: [reservationResponse],
    }).reservations.length,
    1,
  );
  assert.deepEqual(
    roomActiveReservationsResponseSchema.parse({ reservations: [] })
      .reservations,
    [],
  );
});

test("parses availability and cancellation results", () => {
  assert.deepEqual(
    reservationAvailabilitySchema.parse({
      canReserve: false,
      penaltyExpiresAt: "2026-10-07T15:05:00",
      isBanned: false,
    }),
    {
      canReserve: false,
      penaltyExpiresAt: "2026-10-07T15:05:00",
      isBanned: false,
    },
  );

  assert.equal(
    reservationCancellationSchema.parse({
      success: true,
      message: "예약이 취소되었습니다.",
      penaltyApplied: true,
      penaltyExpiresAt: "2026-10-07T15:10:00",
    }).penaltyApplied,
    true,
  );
});

test("parses my reservation history page", () => {
  const page = myReservationHistoryPageSchema.parse({
    content: [
      {
        id: 4,
        userRoomNumber: "301",
        userStudentId: "2301",
        machineName: "Dryer-3F-R1",
        machineType: "DRYER",
        startTime: null,
        completionTime: null,
        status: "CANCELLED",
        createdAt: "2026-10-07T15:00:00",
      },
    ],
    pageNumber: 0,
    pageSize: 20,
    totalElements: 1,
    totalPages: 1,
    last: true,
  });

  assert.equal(page.content[0].machineType, "DRYER");
  assert.equal(page.last, true);
});

test("computes the auto-cancel deadline five minutes after reservedAt", () => {
  const reservedAt = "2026-10-07T15:00:00";
  assert.equal(
    getReservedDeadline(reservedAt) - new Date(reservedAt).getTime(),
    5 * 60_000,
  );
  assert.equal(getReservedDeadline("not-a-date"), null);
});

const allowed = {
  machineReservable: true,
  machineType: "WASHER",
  canReserve: true,
  isBanned: false,
  hasMyActiveReservation: false,
  roomReservationTypes: ["DRYER"],
};

test("allows a reservation when every rule passes", () => {
  assert.equal(getReserveBlockReason(allowed), null);
});

test("orders reserve block reasons by priority", () => {
  assert.equal(
    getReserveBlockReason({
      ...allowed,
      machineReservable: false,
      isBanned: true,
    }),
    "MACHINE_UNAVAILABLE",
  );
  assert.equal(
    getReserveBlockReason({ ...allowed, canReserve: false, isBanned: true }),
    "BANNED",
  );
  assert.equal(
    getReserveBlockReason({ ...allowed, canReserve: false }),
    "PENALTY",
  );
  assert.equal(
    getReserveBlockReason({ ...allowed, hasMyActiveReservation: true }),
    "ALREADY_RESERVED",
  );
  assert.equal(
    getReserveBlockReason({ ...allowed, roomReservationTypes: ["WASHER"] }),
    "ROOM_TYPE_TAKEN",
  );
});
