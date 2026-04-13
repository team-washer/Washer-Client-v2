export type MachineType = "WASHER" | "DRYER";

export type MachineStatus =
  | "사용중"
  | "미사용"
  | "사용 정지"
  | "예약"
  | "확인필요"
  | "고장"
  | "NORMAL"
  | "MALFUNCTION";

export interface MachineItem {
  id: number;
  machine: string;
  type: MachineType;
  status: MachineStatus;
  deviceStatus?: string;
  remain?: string;
  reserveAt?: string;
}

export interface AdminMachineItem {
  id: number;
  name: string;
  type: MachineType;
  floor: number;
  position: "LEFT" | "RIGHT";
  number: number;
  status: string;
  availability: "AVAILABLE" | "UNAVAILABLE";
  deviceId: string;
}

export interface MachineResponseType {
  machines: AdminMachineItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}