import { useMutation, useQueryClient } from "@tanstack/react-query";
import { del, machineUrl } from "@/shared/api";

export const useDeleteMachine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => del(machineUrl.deleteMachine(id)),
    onSuccess: () => {
      // 'machines'와 'list'로 시작하는 모든 기기 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["machines", "list"],
      });
    },
  });
};
