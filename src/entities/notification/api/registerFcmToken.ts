import { normalizeApiError, notificationUrl, post } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";

export async function registerFcmToken(token: string): Promise<void> {
  try {
    await post<BaseResponseType<null>>(notificationUrl.registerFcmToken(), {
      token,
    });
  } catch (error) {
    throw normalizeApiError(error);
  }
}
