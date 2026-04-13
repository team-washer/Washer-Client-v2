import { get, userUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapUsers } from "../lib/mapUser";
import type { ManagedUserItem, UserDTO } from "../model/types";

type GetUsersPayload = {
  users: UserDTO[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export async function getUsers(): Promise<ManagedUserItem[]> {
  const response = await get<BaseResponseType<GetUsersPayload>>(
    userUrl.getUsers(),
  );

  return mapUsers(response.data.users);
}