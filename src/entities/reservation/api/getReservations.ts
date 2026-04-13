import { get, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapReservations } from "../lib/mapReservation";
import type {
  ReservationDTO,
  ReservationItem,
  ReservationParamsType,
} from "../model/types";

type GetReservationsPayload = {
  reservations: ReservationDTO[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export async function getReservations(
  params?: ReservationParamsType,
): Promise<ReservationItem[]> {
  const response = await get<BaseResponseType<GetReservationsPayload>>(
    reservationUrl.getReservations(),
    {
      params,
    },
  );

  return mapReservations(response.data.reservations);
}