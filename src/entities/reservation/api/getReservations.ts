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
  const [washersResponse, dryersResponse] = await Promise.all([
    get<BaseResponseType<ReservationResponseType>>(
      reservationUrl.getReservations(),
      {
        params: { ...params, machineType: "WASHER" },
      },
    ),
    get<BaseResponseType<ReservationResponseType>>(
      reservationUrl.getReservations(),
      {
        params: { ...params, machineType: "DRYER" },
      },
    ),
  ]);

  const washers = mapReservations(washersResponse.data.reservations);
  const dryers = mapReservations(dryersResponse.data.reservations);

  return [...washers, ...dryers];
}
