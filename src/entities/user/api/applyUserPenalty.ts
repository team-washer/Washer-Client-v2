import { normalizeApiError, post, userUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";

interface ApplyUserPenaltyRequest {
  reason: string;
}

export async function applyUserPenalty(
  userId: number,
  request: ApplyUserPenaltyRequest,
): Promise<void> {
  try {
    await post<BaseResponseType<null>>(
      userUrl.applyUserPenalty(userId),
      request,
    );
  } catch (error) {
    throw normalizeApiError(error);
  }
}
