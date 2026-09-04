import { UserPlus } from "lucide-react";
import StatusRowActionButton from "@/shared/ui/admin/StatusRowActionButton";

interface ProxyReservationButtonProps {
  machineName: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function ProxyReservationButton({
  machineName,
  disabled = false,
  onClick,
}: ProxyReservationButtonProps) {
  return (
    <StatusRowActionButton
      ariaLabel={`${machineName} 대리 예약`}
      title="대리 예약"
      onClick={onClick}
      disabled={disabled}
      className="border-[#4D83F6] text-[#4D83F6]"
    >
      <UserPlus size={16} strokeWidth={2.2} />
    </StatusRowActionButton>
  );
}
