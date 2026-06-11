import { get, userUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapUsers } from "../lib/mapUser";
import type {
  ManagedUserItem,
  UserParamsType,
  UserResponseType,
} from "../model/types";

export async function getUsers(
  params?: UserParamsType,
): Promise<ManagedUserItem[]> {
  const response = await get<BaseResponseType<UserResponseType>>(
    userUrl.getUsers(),
    {
      params,
    },
  );

  return mapUsers(response.data.users);
}
