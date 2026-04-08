"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReservation } from "@/entities/reservation/api/deleteReservation";

export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
  });
}