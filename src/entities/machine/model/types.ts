import type { z } from "zod";
import type {
  adminMachineDTOSchema,
  machineAvailabilityStatusSchema,
  machineConditionStatusSchema,
  machinePositionSchema,
  machineResponseSchema,
  machineTypeSchema,
} from "../api/schemas";

// UI 타입
export type MachineStatusLabel =
  | "사용중"
  | "미사용"
  | "사용 정지"
  | "예약"
  | "확인필요"
  | "고장";

export interface MachineItem {
  id: number;
  name: string;
  type: MachineType;
  status: MachineStatusLabel;
  condition: MachineConditionStatusDTO;
  availability: MachineAvailabilityStatusDTO;
  deviceStatus?: string;
}

export interface MachineStatusOption {
  value: MachineConditionStatusDTO;
  title: string;
  description: string;
}

// API 응답 타입
export type MachineType = z.infer<typeof machineTypeSchema>;

export type MachineConditionStatusDTO = z.infer<
  typeof machineConditionStatusSchema
>;

export type MachineAvailabilityStatusDTO = z.infer<
  typeof machineAvailabilityStatusSchema
>;

export type MachinePosition = z.infer<typeof machinePositionSchema>;

export type AdminMachineDTO = z.infer<typeof adminMachineDTOSchema>;

export type MachineResponseType = z.infer<typeof machineResponseSchema>;

// 조회 파라미터
export interface MachineParamsType {
  floor?: number;
}
