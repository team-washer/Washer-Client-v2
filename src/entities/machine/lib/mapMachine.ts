import { mapAvailabilityDeviceStatus } from "@/shared/lib";
import type {
  AdminMachineDTO,
  MachineAvailabilityStatusDTO,
  MachineConditionStatusDTO,
  MachineItem,
  MachineStatusLabel,
} from "../model/types";

function mapMachineStatusLabel(
  condition: MachineConditionStatusDTO,
  availability: MachineAvailabilityStatusDTO,
): MachineStatusLabel {
  if (condition === "MALFUNCTION") {
    return "고장";
  }

  switch (availability) {
    case "IN_USE":
      return "사용중";
    case "RESERVED":
      return "예약";
    case "AVAILABLE":
      return "미사용";
    case "UNAVAILABLE":
      return "사용 정지";
    default:
      return "확인필요";
  }
}

export function mapMachine(dto: AdminMachineDTO): MachineItem {
  return {
    id: dto.id,
    name: dto.name,
    type: dto.type,
    status: mapMachineStatusLabel(dto.status, dto.availability),
    condition: dto.status,
    availability: dto.availability,
    deviceStatus: mapAvailabilityDeviceStatus(dto.availability),
  };
}

export function mapMachines(dtos: AdminMachineDTO[]): MachineItem[] {
  return dtos.map(mapMachine);
}
