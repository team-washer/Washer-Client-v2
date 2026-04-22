import { useQuery } from "@tanstack/react-query";
import { get, machineQueryKeys, machineUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { MachineResponseType } from "../model/types";

export * from "./useUpdateMachineStatus";
export * from "./useDeleteMachine";

export const useGetMachines = (params: { floor?: number } = {}) => {
  return useQuery({
    queryKey: machineQueryKeys.getMachines(params),
    queryFn: () =>
      get<BaseResponseType<MachineResponseType>>(machineUrl.getMachines(), {
        params,  
      }),
  });
};
