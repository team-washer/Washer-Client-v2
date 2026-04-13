"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReservation } from "@/entities/reservation/api/deleteReservation";
import { reservationQueryKeys } from "@/shared";

export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: reservationQueryKeys.getReservations(),
      });
    },
  });
}