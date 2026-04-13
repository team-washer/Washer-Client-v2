import { axiosInstance } from "@/shared";
import { mapReservations } from "../lib/mapReservation";
import type { ReservationDTO, ReservationItem } from "../model/types";
import { BaseResponseType } from "@/shared/api/types";


type GetReservationsPayload= {
    reservations: ReservationDTO[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
};

export async function getReservations(): Promise<ReservationItem[]> {
  const response = await axiosInstance.get("/api/v2/admin/reservations") as BaseResponseType<GetReservationsPayload>;
  return mapReservations(response.data.reservations);
}