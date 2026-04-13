import { del, reservationUrl } from "@/shared/api";

export async function deleteReservation(id: number) {
  await del(reservationUrl.deleteReservation(id));
}