import {
    machineUrl,
    normalizeApiError,
    put,
  } from "@/shared/api";
  import type { MachineConditionStatusDTO } from "../model/types";
  
  type UpdateMachineStatusParams = {
    id: number;
    status: MachineConditionStatusDTO;
  };
  
  export async function updateMachineStatus({
    id,
    status,
  }: UpdateMachineStatusParams): Promise<void> {
    try {
      await put(machineUrl.updateMachineStatus(id), {
        status,
      });
    } catch (error) {
      throw normalizeApiError(error);
    }
  }