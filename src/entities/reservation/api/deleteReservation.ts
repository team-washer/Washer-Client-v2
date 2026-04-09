import { axiosInstance } from "@/shared";

export async function deleteReservation(id: number) {
  await axiosInstance.delete(`/api/v2/admin/reservations/${id}`);
}