import type {
  MachineFloorLayout,
  MachinePlacement,
  MachineStatusDTO,
  MachineSummary,
  MachineType,
  UserMachine,
  UserMachineStatusView,
} from "../model/types";

const PLACEMENT_PATTERN = /^.+-(\d+)F-([LR])(\d+)$/i;

// "Washer-3F-L1" → { floor: 3, position: "LEFT", number: 1 }
export function parseMachinePlacement(name: string): MachinePlacement | null {
  const match = PLACEMENT_PATTERN.exec(name.trim());
  if (!match) return null;

  return {
    floor: Number(match[1]),
    position: match[2].toUpperCase() === "L" ? "LEFT" : "RIGHT",
    number: Number(match[3]),
  };
}

export function getMachineTypeFromName(name: string): MachineType | null {
  if (/^washer/i.test(name.trim())) return "WASHER";
  if (/^dryer/i.test(name.trim())) return "DRYER";
  return null;
}

export function mapUserMachine(dto: MachineStatusDTO): UserMachine {
  return {
    id: dto.machineId,
    name: dto.name,
    type: dto.type,
    condition: dto.status,
    availability: dto.availability,
    operatingState: dto.operatingState,
    jobState: dto.jobState,
    expectedCompletionTime: dto.expectedCompletionTime,
    remainingMinutes: dto.remainingMinutes,
    reservationId: dto.reservationId,
    roomNumber: dto.roomNumber,
    placement: parseMachinePlacement(dto.name),
  };
}

export function mapUserMachines(dtos: MachineStatusDTO[]): UserMachine[] {
  return dtos.map(mapUserMachine);
}

export function isMachineReservable(machine: UserMachine): boolean {
  return machine.condition === "NORMAL" && machine.availability === "AVAILABLE";
}

export function getUserMachineStatusView(
  machine: UserMachine,
): UserMachineStatusView {
  if (machine.condition === "MALFUNCTION") {
    return { label: "고장", tone: "broken" };
  }

  switch (machine.availability) {
    case "AVAILABLE":
      return { label: "예약 가능", tone: "available" };
    case "RESERVED":
      return { label: "예약됨", tone: "reserved" };
    case "IN_USE":
      return { label: "사용 중", tone: "inUse" };
    case "CLEANING":
      return { label: "통세척 중", tone: "cleaning" };
    case "UNAVAILABLE":
      return { label: "사용 불가", tone: "unavailable" };
  }
}

export function getMachineFloors(machines: UserMachine[]): number[] {
  const floors = new Set<number>();
  for (const machine of machines) {
    if (machine.placement) floors.add(machine.placement.floor);
  }
  return [...floors].sort((a, b) => a - b);
}

// 한 층의 기기를 좌/우로 나누고, 기존 배치도처럼 번호 내림차순(L3 → L1)으로 정렬한다.
export function buildMachineFloorLayout(
  machines: UserMachine[],
  type: MachineType,
  floor: number,
): MachineFloorLayout {
  const layout: MachineFloorLayout = { left: [], right: [], unplaced: [] };

  for (const machine of machines) {
    if (machine.type !== type) continue;
    if (!machine.placement) {
      layout.unplaced.push(machine);
      continue;
    }
    if (machine.placement.floor !== floor) continue;
    layout[machine.placement.position === "LEFT" ? "left" : "right"].push(
      machine,
    );
  }

  const byNumberDesc = (a: UserMachine, b: UserMachine) =>
    (b.placement?.number ?? 0) - (a.placement?.number ?? 0);
  layout.left.sort(byNumberDesc);
  layout.right.sort(byNumberDesc);

  return layout;
}

export function summarizeMachines(
  machines: UserMachine[],
  type: MachineType,
): MachineSummary {
  const summary: MachineSummary = {
    total: 0,
    available: 0,
    inUse: 0,
    unavailable: 0,
  };

  for (const machine of machines) {
    if (machine.type !== type) continue;
    summary.total += 1;

    if (isMachineReservable(machine)) {
      summary.available += 1;
    } else if (
      machine.condition === "NORMAL" &&
      (machine.availability === "IN_USE" || machine.availability === "RESERVED")
    ) {
      summary.inUse += 1;
    } else {
      summary.unavailable += 1;
    }
  }

  return summary;
}
