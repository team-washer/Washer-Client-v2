import { useMutation, useQueryClient } from "@tanstack/react-query";
import { machineQueryKeys, machineUrl, put } from "@/shared/api";
import type { MachineConditionStatusDTO } from "../model/types";

export const useUpdateMachineStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: MachineConditionStatusDTO;
    }) => put(machineUrl.updateMachineStatus(id), { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: machineQueryKeys.all,
      });
    },
  });
};
