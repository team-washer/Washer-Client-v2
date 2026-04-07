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
  const response = await fetch("/api/v2/admin/users", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("사용자 데이터를 불러오지 못했습니다.");
  }

  const json: GetUsersResponse = await response.json();

  return mapUsers(json.data.users);
}