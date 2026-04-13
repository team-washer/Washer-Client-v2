import { get, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapMachineReservationHistory } from "../lib/mapReservationHistory";
import type {
  MachineReservationHistory,
  MachineReservationHistoryDTO,
} from "../model/types";

type GetMachineReservationHistoryParamsType = {
  machineName?: string;
};

type GetMachineReservationHistoryPayload = {
  machines: MachineReservationHistoryDTO[];
};

export async function getMachineReservationHistory(
  params?: GetMachineReservationHistoryParamsType,
): Promise<MachineReservationHistory | null> {
  const response = await get<BaseResponseType<GetMachineReservationHistoryPayload>>(
    reservationUrl.getMachineReservationHistory(),
    {
      params,
    },
  );

  const machine = response.data.machines[0];

  if (!machine) return null;

  return mapMachineReservationHistory(machine);
}