import { get, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapReservations } from "../lib/mapReservation";
import { reservationResponseSchema } from './schemas';

import type {
  ReservationItem,
  ReservationMachineType,
  ReservationParamsType,
} from "../model/types";

async function getReservationsByMachineType(
  machineType: ReservationMachineType,
  params?: ReservationParamsType,
): Promise<ReservationItem[]> {
  const response = await get<BaseResponseType<unknown>>(
    reservationUrl.getReservations(),
    {
      params: {
        ...params,
        machineType,
      },
    },
  );

  const parsedData = reservationResponseSchema.parse(response.data);

  return mapReservations(parsedData.reservations, machineType);
}

export async function getReservations(
  params?: ReservationParamsType,
): Promise<ReservationItem[]> {
  const [washers, dryers] = await Promise.all([
    getReservationsByMachineType("WASHER", params),
    getReservationsByMachineType("DRYER", params),
  ]);

  return [...washers, ...dryers];
}

