import { AlertCircle, CheckCircle } from "lucide-react";
import type {
  MachineConditionStatusDTO,
  MachineStatusOption,
} from "@/entities/machine";

interface MachineStatusOptionButtonProps {
  option: MachineStatusOption;
  isSelected: boolean;
  disabled?: boolean;
  onClick: (value: MachineConditionStatusDTO) => void;
}

export default function MachineStatusOptionButton({
  option,
  isSelected,
  disabled = false,
  onClick,
}: MachineStatusOptionButtonProps) {
  const isNormal = option.value === "NORMAL";

  return (
    <button
      type="button"
      onClick={() => onClick(option.value)}
      disabled={disabled}
      className={`flex items-center justify-between rounded-xl border-2 p-4 transition-all ${
        isSelected
          ? isNormal
            ? "border-[#4486FF] bg-[#F0F5FF]"
            : "border-[#EA3B42] bg-[#FFF1F1]"
          : "border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
      }`}
    >
      <div className="flex items-center gap-3">
        {isNormal ? (
          <CheckCircle
            size={24}
            className={isSelected ? "text-[#4486FF]" : "text-[#A1A1AA]"}
          />
        ) : (
          <AlertCircle
            size={24}
            className={isSelected ? "text-[#EA3B42]" : "text-[#A1A1AA]"}
          />
        )}

        <div className="text-left">
          <p className="font-semibold text-[#1F2937]">{option.title}</p>
          <p className="text-xs text-[#6B7280]">{option.description}</p>
        </div>
      </div>
    </button>
  );
}