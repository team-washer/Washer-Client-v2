import { useQuery } from "@tanstack/react-query";
import { reservationQueryKeys } from "@/shared/api";
import { getReservations } from "./getReservations";
import type { ReservationParamsType } from "../model/types";

export const useGetReservations = (params?: ReservationParamsType) => {
  return useQuery({
    queryKey: reservationQueryKeys.getReservations(params),
    queryFn: () => getReservations(params),
  });
};