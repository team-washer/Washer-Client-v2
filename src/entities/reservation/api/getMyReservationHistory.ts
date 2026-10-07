import { get, normalizeApiError, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type {
  MyReservationHistoryPage,
  MyReservationHistoryParamsType,
} from "../model/types";
import { myReservationHistoryPageSchema } from "./schemas";

export async function getMyReservationHistory(
  params: MyReservationHistoryParamsType & { page: number },
): Promise<MyReservationHistoryPage> {
  try {
    const response = await get<BaseResponseType<unknown>>(
      reservationUrl.getMyReservationHistory(),
      { params },
    );

    return myReservationHistoryPageSchema.parse(response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
}
