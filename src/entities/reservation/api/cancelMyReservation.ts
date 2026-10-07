import { del, normalizeApiError, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { ReservationCancellation } from "../model/types";
import { reservationCancellationSchema } from "./schemas";

export async function cancelMyReservation(
  id: number,
): Promise<ReservationCancellation> {
  try {
    const response = await del<BaseResponseType<unknown>>(
      reservationUrl.cancelReservation(id),
    );

    return reservationCancellationSchema.parse(response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
}
