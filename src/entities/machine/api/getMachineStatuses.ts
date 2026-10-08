import { get, machineUrl, normalizeApiError } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapUserMachines } from "../lib/userMachine";
import type { UserMachine } from "../model/types";
import { machineStatusResponseSchema } from "./schemas";

export async function getMachineStatuses(): Promise<UserMachine[]> {
  try {
    const response = await get<BaseResponseType<unknown>>(
      machineUrl.getMachineStatuses(),
    );

    const parsedData = machineStatusResponseSchema.parse(response.data);

    return mapUserMachines(parsedData.machines);
  } catch (error) {
    throw normalizeApiError(error);
  }
}
