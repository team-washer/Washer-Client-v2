"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetUsers } from "@/entities/user";
import type { UserParamsType } from "@/entities/user";
import UserFilterPanel from "./ui/UserFilterPanel";
import UserStatusPanel from "./ui/UserStatusPanel";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roomSearch, setRoomSearch] = useState("");
  const [debouncedRoomSearch, setDebouncedRoomSearch] = useState("");
  const [floor, setFloor] = useState<number | undefined>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedRoomSearch(roomSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [search, roomSearch]);

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
