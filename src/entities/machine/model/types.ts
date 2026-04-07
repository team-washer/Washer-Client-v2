export type MachineType = "washer" | "dryer";

export type MachineStatus =
  | "사용중"
  | "미사용"
  | "사용 정지"
  | "예약"
  | "확인필요"
  | "고장";

export interface MachineItem {
  id: number;
  machine: string;
  type: MachineType;
  status: MachineStatus;
  deviceStatus?: string;
  remain?: string;
  reserveAt?: string;
}