import { User } from "lucide-react";
import type { ManagedUserItem } from "@/entities/user/model/types";
import StatusPanelShell from "@/shared/ui/admin/StatusPanelShell";
import UserRowActions from "./UserRowActions";

interface UserStatusPanelProps {
  users: ManagedUserItem[];
}

function UserRow({ item }: { item: ManagedUserItem }) {
  const isRestrictedCase = Boolean(item.remain);

  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#E9E9EE] py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="text-[15px] font-medium text-[#4A4A4F]">
          {item.name}
          <span className="ml-1 font-normal text-[#9A9AA0]">
            {item.room} · {item.studentNumber}
          </span>
        </p>

        {item.reason && (
          <p className="mt-1 text-sm text-[#9A9AA0]">{item.reason}</p>
        )}

        {item.warningCount ? (
          <p className="mt-1 text-sm text-[#9A9AA0]">
            경고: {item.warningCount}번
          </p>
        ) : null}

        {item.remain && (
          <p className="mt-1 text-sm text-[#9A9AA0]">
            남은 시간: {item.remain}
          </p>
        )}
      </div>

      <UserRowActions isRestrictedCase={isRestrictedCase} />
    </div>
  );
}

export default function UserStatusPanel({ users }: UserStatusPanelProps) {
  return (
    <StatusPanelShell
      title="활성화 된 예약"
      icon={<User size={18} className="translate-y-px text-[#A4A4AA]" />}
    >
      {users.map((item) => (
        <UserRow key={item.id} item={item} />
      ))}
    </StatusPanelShell>
  );
}