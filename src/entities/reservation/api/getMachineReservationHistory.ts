import { axiosInstance } from "@/shared";
import type { BaseResponseType } from "@/shared/api/types";
import { mapMachineReservationHistory } from "../lib/mapReservationHistory";
import type {
  MachineReservationHistory,
  MachineReservationHistoryDTO,
} from "../model/types";

type GetMachineReservationHistoryPayload = {
  machines: MachineReservationHistoryDTO[];
};

export async function getMachineReservationHistory(
  machineName: string,
): Promise<MachineReservationHistory | null> {
  const response = (await axiosInstance.get(
    "/api/v2/admin/reservations/machines/history",
    {
      params: { machineName },
    },
  )) as BaseResponseType<GetMachineReservationHistoryPayload>;

  const machine = response.data.machines[0];

  if (!machine) return null;

  return mapMachineReservationHistory(machine);
}