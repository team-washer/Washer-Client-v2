import { del, normalizeApiError, notificationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";

export async function deleteAllNotifications(): Promise<void> {
  try {
    await del<BaseResponseType<null>>(notificationUrl.deleteAllNotifications());
  } catch (error) {
    throw normalizeApiError(error);
  }
}
