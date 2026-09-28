import { Gavel, History } from "lucide-react";
import type { ReactNode } from "react";
import StatusRowActionButton from "./StatusRowActionButton";

interface StatusRowActionsProps {
  badge: ReactNode;
  extraAction?: ReactNode;
  onHistory?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
  triggerGroup?: string;
}

export default function StatusRowActions({
  badge,
  extraAction,
  onHistory,
  onDelete,
  disabled = false,
  triggerGroup,
}: StatusRowActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      {badge}

      <StatusRowActionButton
        ariaLabel="예약 히스토리"
        onClick={onHistory}
        disabled={disabled}
        className="border-[#B7B7BD] text-[#9A9AA0]"
        triggerGroup={triggerGroup}
      >
        <History size={16} strokeWidth={2.2} />
      </StatusRowActionButton>

      {extraAction}

      <StatusRowActionButton
        ariaLabel="기기 관리"
        onClick={onDelete}
        disabled={disabled}
        className="border-[#EF4B4F] text-[#EF4B4F]"
        triggerGroup={triggerGroup}
      >
        <Gavel size={16} strokeWidth={2.2} />
      </StatusRowActionButton>
    </div>
  );
}
