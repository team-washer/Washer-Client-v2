import type { UserMachine } from "@/entities/machine";

export type MachineCardStatusKey =
  | "AVAILABLE"
  | "RESERVED"
  | "IN_USE"
  | "CLEANING"
  | "UNAVAILABLE"
  | "BROKEN";

export interface MachineCardStatus {
  key: MachineCardStatusKey;
  color: string;
  text: string;
}

// v1 사용자 웹의 기기 상태 배지 색과 문구를 따른다.
export function getMachineCardStatus(machine: UserMachine): MachineCardStatus {
  if (machine.condition === "MALFUNCTION") {
    return { key: "BROKEN", color: "bg-red-500", text: "고장" };
  }

  switch (machine.availability) {
    case "AVAILABLE":
      return { key: "AVAILABLE", color: "bg-green-500", text: "사용가능" };
    case "RESERVED":
      return { key: "RESERVED", color: "bg-yellow-500", text: "예약됨" };
    case "IN_USE":
      return { key: "IN_USE", color: "bg-blue-500", text: "사용중" };
    case "CLEANING":
      return { key: "CLEANING", color: "bg-cyan-500", text: "통세척 중" };
    case "UNAVAILABLE":
      return { key: "UNAVAILABLE", color: "bg-gray-500", text: "사용 불가" };
  }
}

export const MACHINE_STATUS_LEGEND: Pick<
  MachineCardStatus,
  "color" | "text"
>[] = [
  { color: "bg-green-500", text: "사용가능" },
  { color: "bg-yellow-500", text: "예약됨" },
  { color: "bg-blue-500", text: "사용중" },
  { color: "bg-cyan-500", text: "통세척 중" },
  { color: "bg-red-500", text: "고장" },
];

export function getPositionCode(machine: UserMachine): string | null {
  if (!machine.placement) return null;
  const side = machine.placement.position === "LEFT" ? "L" : "R";
  return `${side}${machine.placement.number}`;
}
