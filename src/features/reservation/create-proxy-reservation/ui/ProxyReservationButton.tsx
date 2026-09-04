import { UserPlus } from "lucide-react";

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
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${machineName} 대리 예약`}
      title="대리 예약"
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[#4D83F6] text-[#4D83F6] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <UserPlus size={16} strokeWidth={2.2} />
    </button>
  );
}
