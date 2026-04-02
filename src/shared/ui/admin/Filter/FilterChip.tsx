import { cn } from "@/shared/lib/cn";

interface FilterChipProps {
  label: string;
  active?: boolean;
  minWidthClass?: string;
  onClick?: () => void;
}

export default function FilterChip({
  label,
  active = false,
  minWidthClass = "min-w-[44px]",
  onClick,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-[9px] px-5 text-[13px] font-medium transition-colors",
        minWidthClass,
        active
          ? "border border-[#4D83F6] bg-[#4D83F6] text-white"
          : "border border-[#969696] bg-white text-[#8C8C93]"
      )}
    >
      {label}
    </button>
  );
}