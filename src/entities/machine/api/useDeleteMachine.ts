import { useMutation, useQueryClient } from "@tanstack/react-query";
import { machineQueryKeys } from "@/shared/api";
import { deleteMachine } from "./deleteMachine";

export const useDeleteMachine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMachine,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: machineQueryKeys.all,
      });
    },
  });
};
