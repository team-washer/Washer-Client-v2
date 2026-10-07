import { useQuery } from "@tanstack/react-query";
import { reservationQueryKeys } from "@/shared/api";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import { getRoomActiveReservations } from "./getRoomActiveReservations";

interface UseGetRoomActiveReservationsOptions {
  refetchInterval?: number;
}

export const useGetRoomActiveReservations = (
  options?: UseGetRoomActiveReservationsOptions,
) => {
  return useQuery({
    staleTime: STALE_TIME.RESERVATION,
    queryKey: reservationQueryKeys.getRoomActiveReservations(),
    queryFn: getRoomActiveReservations,
    refetchInterval: options?.refetchInterval,
  });
};
