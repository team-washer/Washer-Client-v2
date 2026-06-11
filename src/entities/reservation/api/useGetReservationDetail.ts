import { useQuery } from "@tanstack/react-query";
import { get, reservationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";

export interface ReservationDetailResponse {
  id: number;
  userId: number;
  userName: string;
  userRoomNumber: string;
  userStudentId: string;
  machineId: number;
  machineName: string;
  reservedAt: string;
  startTime: string;
  expectedCompletionTime: string;
  actualCompletionTime: string | null;
  status: string;
  cancelledAt: string | null;
  dayOfWeek: string;
  createdAt: string;
  updatedAt: string;
}

export const useGetReservationDetail = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["reservationDetail", id],
    queryFn: () =>
      get<BaseResponseType<ReservationDetailResponse>>(
        reservationUrl.getReservationDetail(id),
      ),
    enabled,
  });
};
