import { useMutation, useQueryClient } from "@tanstack/react-query";
import { machineQueryKeys, reservationQueryKeys } from "@/shared/api";
import { cancelMyReservation } from "./cancelMyReservation";

export const useDeleteMyReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelMyReservation,
    onMutate: async () => {
      // 취소 중 먼저 출발한 polling 응답이 취소된 예약을 되살리지 않도록 진행 중인 조회를 멈춘다.
      await queryClient.cancelQueries({ queryKey: reservationQueryKeys.all });
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: reservationQueryKeys.all }),
        queryClient.invalidateQueries({ queryKey: machineQueryKeys.all }),
      ]);
    },
  });
};
