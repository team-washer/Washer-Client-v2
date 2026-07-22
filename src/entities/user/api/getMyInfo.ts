import {
  get,
  normalizeApiError,
  userUrl,
} from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { MyInfoType } from "../model/types";
import { myInfoSchema } from "./schemas";

export async function getMyInfo(): Promise<BaseResponseType<MyInfoType>> {
  try {
    const response = await get<BaseResponseType<unknown>>(
      userUrl.getMyInfo(),
    );

    const parsedData = myInfoSchema.parse(response.data);

    return {
      ...response,
      data: parsedData,
    };
  } catch (error) {
    throw normalizeApiError(error);
  }
}