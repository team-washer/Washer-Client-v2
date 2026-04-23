import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reservationQueryKeys } from "@/shared/api";
import { deleteReservation } from "./deleteReservation";

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reservationQueryKeys.all,
      });
    },
  });
};