import { History, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

interface StatusRowActionsProps {
  badge: ReactNode;
  onHistory?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
}

export default function StatusRowActions({
  badge,
  onHistory,
  onDelete,
  disabled = false,
}: StatusRowActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      {badge}

      <button
        type="button"
        onClick={onHistory}
        disabled={disabled}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#B7B7BD] text-[#9A9AA0] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <History size={16} strokeWidth={2.2} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={disabled}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#EF4B4F] text-[#EF4B4F] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
}