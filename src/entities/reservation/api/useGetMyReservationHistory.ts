import { useInfiniteQuery } from "@tanstack/react-query";
import { reservationQueryKeys } from "@/shared/api";
import type { MyReservationHistoryParamsType } from "../model/types";
import { getMyReservationHistory } from "./getMyReservationHistory";

const DEFAULT_PAGE_SIZE = 20;

export const useGetMyReservationHistory = (
  params?: MyReservationHistoryParamsType,
) => {
  const queryParams = { size: DEFAULT_PAGE_SIZE, ...params };

  return useInfiniteQuery({
    queryKey: reservationQueryKeys.getMyReservationHistory(queryParams),
    queryFn: ({ pageParam }) =>
      getMyReservationHistory({ ...queryParams, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.pageNumber + 1,
  });
};
