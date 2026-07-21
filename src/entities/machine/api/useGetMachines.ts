import { useQuery } from "@tanstack/react-query";
import { machineQueryKeys } from "@/shared/api";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import type { MachineParamsType } from "../model/types";
import { getMachines as fetchMachines } from "./getMachines";

export const useGetMachines = (params?: MachineParamsType) => {
  const queryKey = machineQueryKeys.getMachines(params || {});

  return useQuery({
    staleTime: STALE_TIME.MACHINE,
    queryKey,
    queryFn: () => fetchMachines(params),
  });
};