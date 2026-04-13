import { useQuery } from "@tanstack/react-query";
import { reservationQueryKeys } from "@/shared/api";
import type {
  ReservationItem,
  ReservationParamsType,
} from "../model/types";
import { getReservations as fetchReservations } from "./getReservations";

export const useGetReservations = (
  params?: ReservationParamsType,
  initialData?: ReservationItem[],
) => {
  const queryKey = reservationQueryKeys.getReservations(params || {});

  return useQuery({
    queryKey,
    queryFn: () => fetchReservations(params),
    initialData,
  });
};