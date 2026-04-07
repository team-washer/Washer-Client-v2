import { api } from "@/shared/api/client";
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
  const { data } = await api.get<GetReservationsResponse>("/v2/admin/reservations");
  return mapReservations(data.data.reservations);
}