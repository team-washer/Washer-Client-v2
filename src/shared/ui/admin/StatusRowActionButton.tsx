import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface StatusRowActionButtonProps {
  children: ReactNode;
  ariaLabel: string;
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function StatusRowActionButton({
  children,
  ariaLabel,
  title,
  onClick,
  disabled = false,
  className,
}: StatusRowActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      className={cn(
        "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
