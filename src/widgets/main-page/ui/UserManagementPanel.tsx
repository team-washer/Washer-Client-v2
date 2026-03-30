import { User } from "lucide-react";
import type { ManagedUserItem } from "@/entities/user/model/types";

interface UserManagementPanelProps {
  users: ManagedUserItem[];
}

export default function UserManagementPanel({
  users,
}: UserManagementPanelProps) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <h2 className="text-[17px] font-medium text-[#494949]">사용자 관리</h2>
        <User size={18} className="translate-y-px text-[#A4A4AA]" />
      </div>

      <div className="admin-panel-body flex flex-col gap-5">
        {users.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[15px] font-medium text-[#4A4A4F]">
                {item.room} {item.name}
              </p>
              <p className="mt-1 text-sm text-[#9A9AA0]">{item.reason}</p>
              <p className="mt-1 text-sm text-[#9A9AA0]">
                남은 시간: {item.remain}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button className="inline-flex h-7 min-w-[54px] items-center justify-center rounded-full bg-[#EF4B4F] px-3 text-xs font-semibold text-white">
                연장
              </button>
              <button className="inline-flex h-7 min-w-[54px] items-center justify-center rounded-full bg-[#4D83F6] px-3 text-xs font-semibold text-white">
                해제
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}