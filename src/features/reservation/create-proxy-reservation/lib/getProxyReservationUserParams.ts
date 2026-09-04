import type { ManagedUserItem, UserParamsType } from "@/entities/user";

export function getProxyReservationUserParams(
  search: string,
): UserParamsType[] {
  const term = search.trim();

  if (!term) return [{}];

  if (/^\d+$/.test(term)) {
    if (term.length <= 3) {
      const roomParams: UserParamsType =
        term.length === 3
          ? { roomNumber: term }
          : { floor: Number(term[0]), size: 200 };

      return [roomParams, { studentId: term }];
    }

    return [{ studentId: term }];
  }

  return [{ name: term }];
}

export function mergeProxyReservationUsers(
  groups: ManagedUserItem[][],
  search: string,
): ManagedUserItem[] {
  const term = search.trim();
  const isRoomPrioritySearch = /^\d{1,3}$/.test(term);

  if (isRoomPrioritySearch && groups.length > 1) {
    const [roomCandidates, ...studentGroups] = groups;
    const roomMatches = roomCandidates.filter((user) =>
      user.room.startsWith(term),
    );

    return Array.from(
      new Map(
        [...roomMatches, ...studentGroups.flat()].map((user) => [
          user.id,
          user,
        ]),
      ).values(),
    );
  }

  return Array.from(
    new Map(groups.flat().map((user) => [user.id, user])).values(),
  );
}
