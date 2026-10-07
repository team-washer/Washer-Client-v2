import test from "node:test";
import assert from "node:assert/strict";
import { machineStatusResponseSchema } from "../src/entities/machine/api/schemas.ts";
import {
  buildMachineFloorLayout,
  getMachineFloors,
  getMachineTypeFromName,
  getUserMachineStatusView,
  mapUserMachines,
  parseMachinePlacement,
  summarizeMachines,
} from "../src/entities/machine/lib/userMachine.ts";

const dto = {
  machineId: 1,
  name: "Washer-3F-L1",
  type: "WASHER",
  status: "NORMAL",
  availability: "IN_USE",
  operatingState: "run",
  jobState: "wash",
  switchStatus: "on",
  expectedCompletionTime: "2026-10-07T15:30:00",
  remainingMinutes: 42,
  reservationId: 10,
  userId: 7,
  roomNumber: "301",
};

const toMachines = (overrides) =>
  mapUserMachines(
    machineStatusResponseSchema.parse({
      machines: overrides.map((override) => ({ ...dto, ...override })),
      totalCount: overrides.length,
    }).machines,
  );

test("parses floor, position, and number from a machine name", () => {
  assert.deepEqual(parseMachinePlacement("Washer-3F-L1"), {
    floor: 3,
    position: "LEFT",
    number: 1,
  });
  assert.deepEqual(parseMachinePlacement("dryer-12f-r3"), {
    floor: 12,
    position: "RIGHT",
    number: 3,
  });
  assert.equal(parseMachinePlacement("Washer-1"), null);
});

test("accepts the cleaning availability and null device fields", () => {
  const [machine] = toMachines([
    {
      availability: "CLEANING",
      operatingState: null,
      expectedCompletionTime: null,
      remainingMinutes: null,
      reservationId: null,
      userId: null,
      roomNumber: null,
    },
  ]);

  assert.equal(machine.availability, "CLEANING");
  assert.equal(machine.reservationId, null);
  assert.deepEqual(getUserMachineStatusView(machine), {
    label: "통세척 중",
    tone: "cleaning",
  });
});

test("shows malfunction ahead of availability", () => {
  const [machine] = toMachines([
    { status: "MALFUNCTION", availability: "AVAILABLE" },
  ]);

  assert.deepEqual(getUserMachineStatusView(machine), {
    label: "고장",
    tone: "broken",
  });
});

test("builds a floor layout split by side and ordered L3 → L1", () => {
  const machines = toMachines([
    { machineId: 1, name: "Washer-3F-L1" },
    { machineId: 2, name: "Washer-3F-L3" },
    { machineId: 3, name: "Washer-3F-R2" },
    { machineId: 4, name: "Washer-4F-L1" },
    { machineId: 5, name: "Dryer-3F-L2", type: "DRYER" },
    { machineId: 6, name: "Washer-Lobby" },
  ]);

  const layout = buildMachineFloorLayout(machines, "WASHER", 3);
  assert.deepEqual(
    layout.left.map(({ id }) => id),
    [2, 1],
  );
  assert.deepEqual(
    layout.right.map(({ id }) => id),
    [3],
  );
  assert.deepEqual(
    layout.unplaced.map(({ id }) => id),
    [6],
  );
  assert.deepEqual(getMachineFloors(machines), [3, 4]);
});

test("summarizes machines of one type by availability", () => {
  const machines = toMachines([
    { machineId: 1, availability: "AVAILABLE" },
    { machineId: 2, availability: "IN_USE" },
    { machineId: 3, availability: "RESERVED" },
    { machineId: 4, availability: "AVAILABLE", status: "MALFUNCTION" },
    { machineId: 5, availability: "CLEANING" },
    {
      machineId: 6,
      name: "Dryer-3F-R1",
      type: "DRYER",
      availability: "AVAILABLE",
    },
  ]);

  assert.deepEqual(summarizeMachines(machines, "WASHER"), {
    total: 5,
    available: 1,
    inUse: 2,
    unavailable: 2,
  });
  assert.equal(summarizeMachines(machines, "DRYER").available, 1);
});

test("infers machine type from its name", () => {
  assert.equal(getMachineTypeFromName("Washer-3F-L1"), "WASHER");
  assert.equal(getMachineTypeFromName("dryer-2F-R1"), "DRYER");
  assert.equal(getMachineTypeFromName("Unknown-1"), null);
});
