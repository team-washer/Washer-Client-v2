import type { ReactNode } from "react";

interface StatusPanelShellProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function StatusPanelShell({
  title,
  icon,
  children,
}: StatusPanelShellProps) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-header justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[16px] font-semibold leading-6 text-[#4A4A4F]">
            {title}
          </h2>
          {icon}
        </div>
      </div>

      <div className="admin-panel-body">{children}</div>
    </section>
  );
}
