import { axiosInstance } from "@/shared";
import type { ApiResponse } from "@/shared/api/types";
import type { MachineReservationHistoryDTO } from "../model/types";

type GetMachineReservationHistoryPayload = {
  machines: MachineReservationHistoryDTO[];
};

export async function getMachineReservationHistory(
  machineName: string,
): Promise<MachineReservationHistoryDTO | null> {
  const response = (await axiosInstance.get(
    "/api/v2/admin/reservations/machines/history",
    {
      params: { machineName },
    },
  )) as ApiResponse<GetMachineReservationHistoryPayload>;

  return response.data.machines[0] ?? null;
}