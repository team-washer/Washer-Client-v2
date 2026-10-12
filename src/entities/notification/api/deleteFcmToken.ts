import { del, normalizeApiError, notificationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";

export async function deleteFcmToken(): Promise<void> {
  try {
    await del<BaseResponseType<null>>(notificationUrl.deleteFcmToken());
  } catch (error) {
    throw normalizeApiError(error);
  }
}
