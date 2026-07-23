import { del, normalizeApiError, userUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";

export async function deleteUserPenalty(userId: number): Promise<void> {
  try {
    await del<BaseResponseType<null>>(userUrl.deleteUserPenalty(userId));
  } catch (error) {
    throw normalizeApiError(error);
  }
}
