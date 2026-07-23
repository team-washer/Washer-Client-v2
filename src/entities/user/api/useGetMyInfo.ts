import { useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "@/shared/api";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import { getMyInfo as fetchMyInfo } from "./getMyInfo";

export const useGetMyInfo = () => {
  return useQuery({
    staleTime: STALE_TIME.MY_INFO,
    queryKey: userQueryKeys.getMyInfo(),
    queryFn: fetchMyInfo,
  });
};
