import { get, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapMachineReservationHistory } from "../lib/mapReservationHistory";
import type {
  MachineReservationHistory,
  MachineReservationHistoryParamsType,
  MachineReservationHistoryResponseType,
} from "../model/historyTypes";

export async function getMachineReservationHistory(
  params?: MachineReservationHistoryParamsType,
): Promise<MachineReservationHistory | null> {
  const response = await get<
    BaseResponseType<MachineReservationHistoryResponseType>
  >(reservationUrl.getMachineReservationHistory(), {
    params,
  });

  const machine = response.data.machines[0];

  if (!machine) return null;

  return mapMachineReservationHistory(machine);
}
