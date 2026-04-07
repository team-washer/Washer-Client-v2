import { History, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

interface StatusRowActionsProps {
  badge: ReactNode;
}

export default function StatusRowActions({
  badge,
}: StatusRowActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      {badge}
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#B7B7BD] text-[#9A9AA0]"
      >
        <History size={16} strokeWidth={2.2} />
      </button>

      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#EF4B4F] text-[#EF4B4F]"
      >
        <Trash2 size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
}