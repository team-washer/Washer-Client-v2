import { useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "@/shared/api";
import { getUsers } from "./getUsers";

export const useGetUsers = () => {
  return useQuery({
    queryKey: userQueryKeys.getUsers(),
    queryFn: getUsers,
  });
};