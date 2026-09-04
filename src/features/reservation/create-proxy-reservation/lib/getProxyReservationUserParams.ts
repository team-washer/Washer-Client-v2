import type { ManagedUserItem, UserParamsType } from "@/entities/user";

export function getProxyReservationUserParams(
  search: string,
): UserParamsType[] {
  const term = search.trim();

  if (!term) return [{}];

  if (/^\d+$/.test(term)) {
    const params: UserParamsType[] = [{ studentId: term }];

    if (/^\d{3}$/.test(term)) {
      params.push({ roomNumber: term });
    }

    return params;
  }

  return [{ name: term }];
}

export function mergeProxyReservationUsers(
  groups: ManagedUserItem[][],
): ManagedUserItem[] {
  return Array.from(
    new Map(groups.flat().map((user) => [user.id, user])).values(),
  );
}
