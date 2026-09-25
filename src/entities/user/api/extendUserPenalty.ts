import { normalizeApiError, patch, userUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";

export async function extendUserPenalty(userId: number, days: number): Promise<void> {
  try {
    await patch<BaseResponseType<null>>(userUrl.extendUserPenalty(userId), { days });
  } catch (error) {
    throw normalizeApiError(error);
  }
}
