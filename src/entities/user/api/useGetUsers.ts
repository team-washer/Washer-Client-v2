import { useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "@/shared/api";
import type { ManagedUserItem, UserParamsType } from "../model/types";
import { getUsers as fetchUsers } from "./getUsers";

export const useGetUsers = (
  params?: UserParamsType,
  initialData?: ManagedUserItem[],
) => {
  const queryKey = userQueryKeys.getUsers(params || {});

  return useQuery({
    queryKey,
    queryFn: () => fetchUsers(params),
    initialData,
  });
};
