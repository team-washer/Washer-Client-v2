import { useQuery } from "@tanstack/react-query";
import { notificationQueryKeys } from "@/shared/api";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import { getNotifications } from "./getNotifications";

export function useGetNotifications() {
  return useQuery({
    queryKey: notificationQueryKeys.list(),
    queryFn: getNotifications,
    staleTime: STALE_TIME.NOTIFICATION,
  });
}
