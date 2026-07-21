import { get, userUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import { mapUsers } from "../lib/mapUser";
import type {
  ManagedUserItem,
  UserParamsType,
} from "../model/types";
import { userResponseSchema } from "./schemas";

export async function getUsers(
  params?: UserParamsType,
): Promise<ManagedUserItem[]> {
  const response = await get<BaseResponseType<unknown>>(
    userUrl.getUsers(),
    {
      params,
    },
  );

  const parsedData = userResponseSchema.parse(response.data);

  return mapUsers(parsedData.users);
}