import { useMutation, useQueryClient } from "@tanstack/react-query";
import { put, machineUrl } from "@/shared/api";
import type { MachineStatus } from "../model/types";

export const useUpdateMachineStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: MachineStatus }) =>
      put(machineUrl.updateMachineStatus(id), { status }),
    onSuccess: () => {
      // 'machines'와 'list'로 시작하는 모든 기기 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["machines", "list"],
      });
    },
  });
};
