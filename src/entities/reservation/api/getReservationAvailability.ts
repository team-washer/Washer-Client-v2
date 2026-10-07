import { get, normalizeApiError, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { ReservationAvailability } from "../model/types";
import { reservationAvailabilitySchema } from "./schemas";

export async function getReservationAvailability(): Promise<ReservationAvailability> {
  try {
    const response = await get<BaseResponseType<unknown>>(
      reservationUrl.getReservationAvailability(),
    );

    return reservationAvailabilitySchema.parse(response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
}
