import { get, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapReservations } from "../lib/mapReservation";
import type {
  ReservationItem,
  ReservationParamsType,
  ReservationResponseType,
} from "../model/types";

export async function getReservations(
  params?: ReservationParamsType,
): Promise<ReservationItem[]> {
  const response = await get<BaseResponseType<ReservationResponseType>>(
    reservationUrl.getReservations(),
    {
      params,
    },
  );

  return mapReservations(response.data.reservations);
}
