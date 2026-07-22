import {
  del,
  normalizeApiError,
  reservationUrl,
} from "@/shared/api";

export async function deleteReservation(id: number): Promise<void> {
  try {
    await del(reservationUrl.deleteReservation(id));
  } catch (error) {
    throw normalizeApiError(error);
  }
}