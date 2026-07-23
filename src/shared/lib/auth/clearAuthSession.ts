import type { QueryClient } from "@tanstack/react-query";
import { COOKIE_KEYS } from "@/shared/constants/cookies";
import { deleteCookie } from "@/shared/utils/cookies";

export const clearAuthSession = (queryClient: QueryClient): void => {
  queryClient.clear();

  deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
  deleteCookie(COOKIE_KEYS.REFRESH_TOKEN);
};
