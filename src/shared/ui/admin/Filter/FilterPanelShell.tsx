import type { ReactNode } from "react";

interface FilterPanelShellProps {
  children: ReactNode;
  title?: string;
  actionLabel?: string;
  onReset?: () => void;
}

export default function FilterPanelShell({
  children,
  title = "필터",
  actionLabel = "초기화",
  onReset,
}: FilterPanelShellProps) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-header justify-between">
        <h2 className="text-[16px] font-semibold leading-6 text-[#4A4A4F]">
          {title}
        </h2>

        <button
          type="button"
          onClick={onReset}
          className="text-[13px] font-medium text-[#C0C0C6] transition-colors hover:text-[#8E8E95]"
        >
          {actionLabel}
        </button>
      </div>

      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}