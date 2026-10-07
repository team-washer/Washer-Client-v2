import { get, normalizeApiError, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { MyReservation } from "../model/types";
import { myReservationDTOSchema } from "./schemas";

// 활성 예약이 없으면 204(본문 없음)가 오므로 null을 반환한다.
export async function getActiveReservation(): Promise<MyReservation | null> {
  try {
    const response = await get<BaseResponseType<unknown> | "">(
      reservationUrl.getActiveReservation(),
    );

    if (!response || response.data === null) return null;

    return myReservationDTOSchema.parse(response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
}
