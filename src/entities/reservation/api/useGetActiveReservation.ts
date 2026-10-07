import { useQuery } from "@tanstack/react-query";
import { reservationQueryKeys } from "@/shared/api";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import { getActiveReservation } from "./getActiveReservation";

interface UseGetActiveReservationOptions {
  refetchInterval?: number;
}

export const useGetActiveReservation = (
  options?: UseGetActiveReservationOptions,
) => {
  return useQuery({
    staleTime: STALE_TIME.RESERVATION,
    queryKey: reservationQueryKeys.getActiveReservation(),
    queryFn: getActiveReservation,
    refetchInterval: options?.refetchInterval,
  });
};
