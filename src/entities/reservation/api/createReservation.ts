import { normalizeApiError, post, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { MyReservation } from "../model/types";
import { myReservationDTOSchema } from "./schemas";

export async function createReservation(
  machineId: number,
): Promise<MyReservation> {
  try {
    const response = await post<BaseResponseType<unknown>>(
      reservationUrl.createReservation(),
      { machineId },
    );

    return myReservationDTOSchema.parse(response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
}
