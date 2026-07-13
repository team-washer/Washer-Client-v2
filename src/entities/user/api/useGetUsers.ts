import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "@/shared/api";
import { STALE_TIME } from "@/shared/constants/queryOptions";
import type { ManagedUserItem, UserParamsType } from "../model/types";
import { getUsers as fetchUsers } from "./getUsers";

export const useGetUsers = (
  params?: UserParamsType,
  initialData?: ManagedUserItem[],
) => {
  const queryKey = userQueryKeys.getUsers(params || {});

  return useQuery({
    staleTime: STALE_TIME.USER,
    queryKey,
    queryFn: () => fetchUsers(params),
    initialData,
    placeholderData: keepPreviousData,
  });
};
