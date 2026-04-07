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
  const response = await fetch("/api/v2/admin/reservations", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("예약 데이터를 불러오지 못했습니다.");
  }

  const json: GetReservationsResponse = await response.json();

  return mapReservations(json.data.reservations);
}