"use client";

import { useState, useMemo } from "react";
import { managedUsersMock } from "@/entities/user/model/mock";
import UserFilterPanel from "./ui/UserFilterPanel";
import UserStatusPanel from "./ui/UserStatusPanel";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [floor, setFloor] = useState<number | undefined>();

  const filteredUsers = useMemo(() => {
    return managedUsersMock.filter((user) => {
      // Filter by floor: Room starts with the floor number (e.g., '5' for '511호')
      const matchesFloor = floor === undefined || user.room.startsWith(floor.toString());
      
      // Filter by name (search)
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());

      return matchesFloor && matchesSearch;
    });
  }, [search, floor]);

  const handleReset = () => {
    setSearch("");
    setFloor(undefined);
  };

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