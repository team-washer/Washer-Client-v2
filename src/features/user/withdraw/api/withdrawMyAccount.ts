import { del, normalizeApiError, userUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";

export async function withdrawMyAccount(): Promise<void> {
  try {
    await del<BaseResponseType<null>>(userUrl.withdraw());
  } catch (error) {
    throw normalizeApiError(error);
  }
}
