import { useMutation, useQueryClient } from "@tanstack/react-query";
import { machineQueryKeys } from "@/shared/api";
import { updateMachineStatus } from "./updateMachineStatus";

export const useUpdateMachineStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMachineStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: machineQueryKeys.all,
      });
    },
  });
};
