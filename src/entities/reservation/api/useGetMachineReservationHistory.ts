import { useQuery } from "@tanstack/react-query";
import { reservationQueryKeys } from "@/shared/api";
import type {
  MachineReservationHistory,
  MachineReservationHistoryParamsType,
} from "../model/historyTypes";
import { getMachineReservationHistory as fetchMachineReservationHistory } from "./getMachineReservationHistory";

export const useGetMachineReservationHistory = (
  params?: MachineReservationHistoryParamsType,
  initialData?: MachineReservationHistory | null,
) => {
  const machineName = params?.machineName ?? null;
  const queryKey =
    reservationQueryKeys.getMachineReservationHistory(machineName);

  return useQuery({
    queryKey,
    queryFn: () => fetchMachineReservationHistory(params),
    initialData,
    enabled: Boolean(machineName),
  });
};