import { get, normalizeApiError, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { MyReservation } from "../model/types";
import { roomActiveReservationsResponseSchema } from "./schemas";

export async function getRoomActiveReservations(): Promise<MyReservation[]> {
  try {
    const response = await get<BaseResponseType<unknown>>(
      reservationUrl.getRoomActiveReservations(),
    );

    return roomActiveReservationsResponseSchema.parse(response.data)
      .reservations;
  } catch (error) {
    throw normalizeApiError(error);
  }
}
