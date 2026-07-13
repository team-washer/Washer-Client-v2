import { useQuery } from "@tanstack/react-query";
import { reservationQueryKeys } from "@/shared/api";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import type { ReservationItem, ReservationParamsType } from "../model/types";
import { getReservations as fetchReservations } from "./getReservations";

export const useGetReservations = (
  params?: ReservationParamsType,
  initialData?: ReservationItem[],
) => {
  const queryKey = reservationQueryKeys.getReservations(params || {});

  return useQuery({
    staleTime: STALE_TIME.RESERVATION,
    queryKey,
    queryFn: () => fetchReservations(params),
    initialData,
  });
};
