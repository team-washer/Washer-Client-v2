import { useQuery } from "@tanstack/react-query";
import { reservationQueryKeys } from "@/shared/api";
import { getMachineReservationHistory } from "./getMachineReservationHistory";

export const useGetMachineReservationHistory = (
  machineName: string | null,
) => {
  return useQuery({
    queryKey: reservationQueryKeys.getMachineReservationHistory(machineName),
    queryFn: async () => {
      if (!machineName) return null;

      return getMachineReservationHistory({ machineName });
    },
    enabled: Boolean(machineName),
  });
};