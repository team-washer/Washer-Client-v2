import { axiosInstance } from "@/shared/lib/axios";
import { mapUsers } from "../lib/mapUser";
import { ApiResponse } from "@/shared/api/types";
import type { ManagedUserItem, UserDTO } from "../model/types";

type GetUsersPayload = {
    users: UserDTO[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
};

export async function getUsers(): Promise<ManagedUserItem[]> {
  const response = await axiosInstance.get("/api/v2/admin/users") as ApiResponse<GetUsersPayload>;
  return mapUsers(response.data.users);
}