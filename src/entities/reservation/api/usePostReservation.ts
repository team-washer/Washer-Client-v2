import { useMutation, useQueryClient } from "@tanstack/react-query";
import { machineQueryKeys, reservationQueryKeys } from "@/shared/api";
import { createReservation } from "./createReservation";

export const usePostReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReservation,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: reservationQueryKeys.all }),
        queryClient.invalidateQueries({ queryKey: machineQueryKeys.all }),
      ]);
    },
  });
};
