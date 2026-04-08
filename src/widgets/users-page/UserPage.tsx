import { useState } from "react";
import { managedUsersMock } from "@/entities/user/model/mock";
import UserFilterPanel from "./ui/UserFilterPanel";
import UserStatusPanel from "./ui/UserStatusPanel";

export default function UsersPage() {
  const [floor, setFloor] = useState<number | undefined>();
  const [search, setSearch] = useState("");

  return (
    <div className="admin-page-grid xl:grid-cols-[1.9fr_0.62fr]">
      <div className="admin-page-item">
        <UserStatusPanel users={managedUsersMock} />
      </div>

      <div className="admin-page-item">
        <UserFilterPanel
          floor={floor}
          onFloorChange={setFloor}
          search={search}
          onSearchChange={setSearch}
        />
      </div>
    </div>
  );
}