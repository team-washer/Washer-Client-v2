"use client";

import { useMemo, useState } from "react";
import { useGetUsers } from "@/entities/user";
import UserFilterPanel from "./ui/UserFilterPanel";
import UserStatusPanel from "./ui/UserStatusPanel";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [floor, setFloor] = useState<number | undefined>();

  const { data: users = [], isLoading, isError } = useGetUsers();

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesFloor =
        floor === undefined || user.room.startsWith(floor.toString());

      const matchesSearch = user.name.includes(search);

      return matchesFloor && matchesSearch;
    });
  }, [users, search, floor]);

  const handleReset = () => {
    setSearch("");
    setFloor(undefined);
  };

  if (isLoading) {
    return <div>사용자 정보를 불러오는 중입니다.</div>;
  }

  if (isError) {
    return <div>사용자 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="admin-page-grid xl:grid-cols-[1.9fr_0.62fr]">
      <div className="admin-page-item">
        <UserStatusPanel users={filteredUsers} />
      </div>

      <div className="admin-page-item">
        <UserFilterPanel
          search={search}
          onSearchChange={setSearch}
          floor={floor}
          onFloorChange={setFloor}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
