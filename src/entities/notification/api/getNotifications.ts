import { get, normalizeApiError, notificationUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import {
  normalizeNotificationListResponse,
  type Notification,
} from "../model/notification";

export async function getNotifications(): Promise<Notification[]> {
  try {
    const response = await get<BaseResponseType<unknown>>(
      notificationUrl.getNotifications(),
    );
    const notifications = normalizeNotificationListResponse(response);

    if (!notifications) {
      throw new Error("알림 목록 응답이 올바르지 않습니다.");
    }

    return notifications;
  } catch (error) {
    throw normalizeApiError(error);
  }
}
