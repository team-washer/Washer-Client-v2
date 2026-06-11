import { useMutation, useQueryClient } from "@tanstack/react-query";
import { del, machineQueryKeys, machineUrl } from "@/shared/api";

export const useDeleteMachine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => del(machineUrl.deleteMachine(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: machineQueryKeys.all,
      });
    },
  });
};
