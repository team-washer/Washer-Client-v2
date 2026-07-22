import { useQuery } from "@tanstack/react-query";
import { machineQueryKeys } from "@/shared/api";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import type { MachineParamsType } from "../model/types";
import { getMachines as fetchMachines } from "./getMachines";

interface UseGetMachinesOptions {
  enabled?: boolean;
}

export const useGetMachines = (
  params?: MachineParamsType,
  options?: UseGetMachinesOptions,
) => {
  const queryKey = machineQueryKeys.getMachines(params ?? {});

  return useQuery({
    staleTime: STALE_TIME.MACHINE,
    queryKey,
    queryFn: () => fetchMachines(params),
    enabled: options?.enabled,
  });
};