import { useInfiniteQuery } from "@tanstack/react-query";
import { machineQueryKeys } from "@/shared/api";
import type { MachineHistoryParamsType } from "../model/types";
import { getMachineHistory } from "./getMachineHistory";

const DEFAULT_PAGE_SIZE = 10;

export const useGetMachineHistory = (
  id: number | null,
  params?: MachineHistoryParamsType,
) => {
  const size = params?.size ?? DEFAULT_PAGE_SIZE;
  const historyParams = {
    size,
    startDate: params?.startDate,
    endDate: params?.endDate,
  };

  return useInfiniteQuery({
    queryKey: machineQueryKeys.getMachineHistory(id ?? 0, historyParams),
    queryFn: ({ pageParam }) =>
      getMachineHistory(id ?? 0, { page: pageParam, ...historyParams }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.pageNumber + 1,
    enabled: id !== null,
  });
};
