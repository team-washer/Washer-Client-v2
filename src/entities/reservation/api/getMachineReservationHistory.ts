import {
  get,
  normalizeApiError,
  reservationUrl,
} from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapMachineReservationHistory } from "../lib/mapReservationHistory";
import type {
  MachineReservationHistory,
  MachineReservationHistoryParamsType,
} from "../model/historyTypes";
import { machineReservationHistoryResponseSchema } from "./schemas";

export async function getMachineReservationHistory(
  params?: MachineReservationHistoryParamsType,
): Promise<MachineReservationHistory | null> {
  try {
    const response = await get<BaseResponseType<unknown>>(
      reservationUrl.getMachineReservationHistory(),
      {
        params,
      },
    );

    const parsedData =
      machineReservationHistoryResponseSchema.parse(response.data);

    const machine = parsedData.machines[0];

    if (!machine) return null;

    return mapMachineReservationHistory(machine);
  } catch (error) {
    throw normalizeApiError(error);
  }
}