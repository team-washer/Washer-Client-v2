"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { UserParamsType } from "@/entities/user";
import { useGetUsers } from "@/entities/user";
import {
  createQuerySyncTracker,
  getQueryParamNumber,
  updateQueryParams,
} from "@/shared/lib/queryParams";
import UserFilterPanel from "./ui/UserFilterPanel";
import UserStatusPanel from "./ui/UserStatusPanel";

export default function UsersPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const querySyncTracker = useRef(createQuerySyncTracker());
  const skipQuerySync = useRef(false);
  const [queryHydrationVersion, setQueryHydrationVersion] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roomSearch, setRoomSearch] = useState("");
  const [debouncedRoomSearch, setDebouncedRoomSearch] = useState("");
  const [floor, setFloor] = useState<number | undefined>();

  useEffect(() => {
    const query = searchParams.toString();
    const navigationSource = querySyncTracker.current.observe(query);

    if (navigationSource === "internal") {
      return;
    }

    const querySearch = searchParams.get("search") ?? "";
    const queryRoomSearch = searchParams.get("room") ?? "";
    const queryFloor = getQueryParamNumber(searchParams, "floor");

    setSearch(querySearch);
    setDebouncedSearch(querySearch);
    setRoomSearch(queryRoomSearch);
    setDebouncedRoomSearch(queryRoomSearch);
    setFloor(queryFloor === 3 || queryFloor === 4 ? queryFloor : undefined);
    skipQuerySync.current = true;
    setQueryHydrationVersion((version) => version + 1);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRoomSearch(roomSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [roomSearch]);

  useEffect(() => {
    if (skipQuerySync.current) {
      skipQuerySync.current = false;
      return;
    }

    if (queryHydrationVersion === 0) {
      return;
    }

    const currentQuery = querySyncTracker.current.getCurrentQuery();
    const nextSearchParams = updateQueryParams(
      new URLSearchParams(currentQuery),
      {
        search: debouncedSearch,
        room: debouncedRoomSearch,
        floor,
      },
    );
    const nextQuery = nextSearchParams.toString();

    if (querySyncTracker.current.request(nextQuery)) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }
  }, [
    debouncedRoomSearch,
    debouncedSearch,
    floor,
    pathname,
    queryHydrationVersion,
    router,
  ]);

  const queryParams = useMemo(() => {
    const params: UserParamsType = {};
    if (floor !== undefined) {
      params.floor = floor;
    }
    const term = debouncedSearch.trim();
    if (term) {
      if (/^\d+$/.test(term)) {
        params.studentId = term;
      } else {
        params.name = term;
      }
    }

    const roomTerm = debouncedRoomSearch.trim();
    if (roomTerm && /^\d{3}$/.test(roomTerm)) {
      params.roomNumber = roomTerm;
    }

    return params;
  }, [debouncedSearch, debouncedRoomSearch, floor]);

  const { data: users = [], isLoading, isError } = useGetUsers(queryParams);

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setRoomSearch("");
    setDebouncedRoomSearch("");
    setFloor(undefined);
  };

  // Remove early returns so the filter panel doesn't unmount

  return (
    <div className="admin-page-grid xl:grid-cols-[1.9fr_0.62fr]">
      <div className="admin-page-item relative min-h-[300px]">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm font-medium text-gray-500">
            사용자 정보를 불러오는 중입니다...
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center text-sm font-medium text-red-500">
            사용자 정보를 불러오지 못했습니다.
          </div>
        ) : (
          <UserStatusPanel users={users} />
        )}
      </div>

      <div className="admin-page-item">
        <UserFilterPanel
          search={search}
          onSearchChange={setSearch}
          roomSearch={roomSearch}
          onRoomSearchChange={setRoomSearch}
          floor={floor}
          onFloorChange={setFloor}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
