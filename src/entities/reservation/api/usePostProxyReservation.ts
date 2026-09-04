import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  dashboardQueryKeys,
  machineQueryKeys,
  reservationQueryKeys,
} from "@/shared/api";
import { createProxyReservation } from "./createProxyReservation";

export const usePostProxyReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProxyReservation,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: reservationQueryKeys.all }),
        queryClient.invalidateQueries({ queryKey: machineQueryKeys.all }),
        queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all }),
      ]);
    },
  });
};
