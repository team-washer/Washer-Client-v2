import { useQuery } from "@tanstack/react-query";
import { machineQueryKeys } from "@/shared/api";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import { getMachineStatuses } from "./getMachineStatuses";

interface UseGetMachineStatusesOptions {
  // 실시간 현황 화면에서 주기적으로 다시 조회할 간격(ms)
  refetchInterval?: number;
}

export const useGetMachineStatuses = (
  options?: UseGetMachineStatusesOptions,
) => {
  return useQuery({
    staleTime: STALE_TIME.MACHINE,
    queryKey: machineQueryKeys.getMachineStatuses(),
    queryFn: getMachineStatuses,
    refetchInterval: options?.refetchInterval,
  });
};
