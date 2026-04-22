import { useMutation, useQueryClient } from "@tanstack/react-query";
import { put } from "@/shared/api/http";
import { machineUrl } from "@/shared/api/apiUrls";
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
        queryKey: ["machines", "list"],
      });
    },
  });
};