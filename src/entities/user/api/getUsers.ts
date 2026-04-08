import { axiosInstance } from "@/shared";
import { mapUsers } from "../lib/mapUser";
import type { ManagedUserItem, UserDTO } from "../model/types";

type GetUsersResponse = {
  status: string;
  code: number;
  message: string;
  data: {
    users: UserDTO[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
};

export async function getUsers(): Promise<ManagedUserItem[]> {
  const { data } = await axiosInstance.get<GetUsersResponse>("/v2/admin/users");
  return mapUsers(data.data.users);
}