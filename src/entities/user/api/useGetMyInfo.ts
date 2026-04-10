import { useQuery } from "@tanstack/react-query";
import { get, userQueryKeys, userUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { MyInfoType } from "../model/types";

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: userQueryKeys.getMyInfo(),
    queryFn: () => get<BaseResponseType<MyInfoType>>(userUrl.getMyInfo()),
  });
};
