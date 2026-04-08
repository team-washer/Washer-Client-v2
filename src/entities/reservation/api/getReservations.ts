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
  const { data } = await axiosInstance.get<GetReservationsResponse>("/v2/admin/reservations");
  return mapReservations(data.data.reservations);
}