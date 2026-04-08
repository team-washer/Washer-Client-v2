import { axiosInstance } from "@/shared/lib/axios";
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
  const response = await axiosInstance.get("/api/v2/admin/users") as GetUsersResponse;
  return mapUsers(response.data.users);
}