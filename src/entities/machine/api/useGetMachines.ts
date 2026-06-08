import { useQuery } from "@tanstack/react-query";
import { get, machineQueryKeys, machineUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { MachineResponseType } from "../model/types";

export const useGetMachines = (params: { floor?: number } = {}) => {
  return useQuery({
    queryKey: machineQueryKeys.getMachines(params),
    queryFn: async () => {
      const [washers, dryers] = await Promise.all([
        get<BaseResponseType<MachineResponseType>>(machineUrl.getMachines(), {
          params: { ...params, type: "WASHER" },
        }),
        get<BaseResponseType<MachineResponseType>>(machineUrl.getMachines(), {
          params: { ...params, type: "DRYER" },
        }),
      ]);

      return {
        ...washers,
        data: {
          machines: [...washers.data.machines, ...dryers.data.machines],
          totalCount: washers.data.totalCount + dryers.data.totalCount,
          totalPages: Math.max(washers.data.totalPages, dryers.data.totalPages),
          currentPage: washers.data.currentPage,
        },
      };
    },
  });
};
