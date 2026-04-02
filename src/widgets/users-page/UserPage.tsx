import { managedUsersMock } from "@/entities/user/model/mock";
import UserFilterPanel from "./ui/UserFilterPanel";
import UserStatusPanel from "./ui/UserStatusPanel";

export default function UsersPage() {
  return (
    <div className="admin-page-grid xl:grid-cols-[1.9fr_0.62fr]">
      <div className="admin-page-item">
        <UserStatusPanel users={managedUsersMock} />
      </div>

      <div className="admin-page-item">
        <UserFilterPanel />
      </div>
    </div>
  );
}