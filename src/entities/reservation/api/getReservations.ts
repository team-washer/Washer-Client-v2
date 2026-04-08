import { axiosInstance } from "@/shared";
import { mapReservations } from "../lib/mapReservation";
import type { ReservationDTO, ReservationItem } from "../model/types";

type GetReservationsResponse = {
  status: string;
  code: number;
  message: string;
  data: {
    reservations: ReservationDTO[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
};

export async function getReservations(): Promise<ReservationItem[]> {
  const response = await axiosInstance.get("/api/v2/admin/reservations") as GetReservationsResponse;
  return mapReservations(response.data.reservations);
}