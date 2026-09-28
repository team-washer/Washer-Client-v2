import { UserPlus } from "lucide-react";
import StatusRowActionButton from "@/shared/ui/admin/StatusRowActionButton";

interface ProxyReservationButtonProps {
  machineName: string;
  disabled?: boolean;
  onClick: () => void;
  triggerGroup?: string;
}

export default function ProxyReservationButton({
  machineName,
  disabled = false,
  onClick,
  triggerGroup,
}: ProxyReservationButtonProps) {
  return (
    <StatusRowActionButton
      ariaLabel={`${machineName} 대리 예약`}
      title="대리 예약"
      onClick={onClick}
      disabled={disabled}
      className="border-[#4D83F6] text-[#4D83F6]"
      triggerGroup={triggerGroup}
    >
      <UserPlus size={16} strokeWidth={2.2} />
    </StatusRowActionButton>
  );
}
