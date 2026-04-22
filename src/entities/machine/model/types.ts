export type MachineType = "WASHER" | "DRYER";

export type MachineConditionStatusDTO = "NORMAL" | "MALFUNCTION";

export type MachineAvailabilityStatusDTO =
  | "AVAILABLE"
  | "IN_USE"
  | "RESERVED"
  | "UNAVAILABLE";

export type MachineStatusLabel =
  | "사용중"
  | "미사용"
  | "사용 정지"
  | "예약"
  | "확인필요"
  | "고장";

export type MachinePosition = "LEFT" | "RIGHT";

export interface MachineItem {
  id: number;
  name: string;
  type: MachineType;
  status: MachineStatusLabel;
  condition: MachineConditionStatusDTO;
  availability: MachineAvailabilityStatusDTO;
  deviceStatus?: string;
}

export interface AdminMachineDTO {
  id: number;
  name: string;
  type: MachineType;
  floor: number;
  position: MachinePosition;
  number: number;
  status: MachineConditionStatusDTO;
  availability: MachineAvailabilityStatusDTO;
  deviceId: string;
}

export interface MachineResponseType {
  machines: AdminMachineDTO[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface MachineStatusOption {
  value: MachineConditionStatusDTO;
  title: string;
  description: string;
}