import { useQuery } from "@tanstack/react-query";
import { get, userQueryKeys, userUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import type { MyInfoType } from "../model/types";

export const useGetMyInfo = () => {
  return useQuery({
    staleTime: STALE_TIME.MY_INFO,
    queryKey: userQueryKeys.getMyInfo(),
    queryFn: () => get<BaseResponseType<MyInfoType>>(userUrl.getMyInfo()),
  });
};
