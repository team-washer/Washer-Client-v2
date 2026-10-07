import { useQuery } from "@tanstack/react-query";
import { reservationQueryKeys } from "@/shared/api";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import { getReservationAvailability } from "./getReservationAvailability";

interface UseGetReservationAvailabilityOptions {
  refetchInterval?: number;
}

export const useGetReservationAvailability = (
  options?: UseGetReservationAvailabilityOptions,
) => {
  return useQuery({
    staleTime: STALE_TIME.RESERVATION,
    queryKey: reservationQueryKeys.getReservationAvailability(),
    queryFn: getReservationAvailability,
    refetchInterval: options?.refetchInterval,
  });
};
