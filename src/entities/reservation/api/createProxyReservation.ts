import { normalizeApiError, post, reservationUrl } from "@/shared/api";

interface CreateProxyReservationParams {
  userId: number;
  machineId: number;
}

export async function createProxyReservation(
  params: CreateProxyReservationParams,
): Promise<void> {
  try {
    await post(reservationUrl.createProxyReservation(), params);
  } catch (error) {
    throw normalizeApiError(error);
  }
}
