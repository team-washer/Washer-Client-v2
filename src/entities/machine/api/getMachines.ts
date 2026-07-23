import { get, machineUrl, normalizeApiError } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapMachines } from "../lib/mapMachine";
import type {
  MachineItem,
  MachineParamsType,
  MachineType,
} from "../model/types";
import { machineResponseSchema } from "./schemas";

async function getMachinesByType(
  machineType: MachineType,
  params?: MachineParamsType,
): Promise<MachineItem[]> {
  const response = await get<BaseResponseType<unknown>>(
    machineUrl.getMachines(),
    {
      params: {
        ...params,
        type: machineType,
      },
    },
  );

  const parsedData = machineResponseSchema.parse(response.data);

  return mapMachines(parsedData.machines);
}

export async function getMachines(
  params?: MachineParamsType,
): Promise<MachineItem[]> {
  try {
    const [washers, dryers] = await Promise.all([
      getMachinesByType("WASHER", params),
      getMachinesByType("DRYER", params),
    ]);

    return [...washers, ...dryers];
  } catch (error) {
    throw normalizeApiError(error);
  }
}
