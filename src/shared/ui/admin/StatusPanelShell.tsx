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
      <div className="admin-panel-header">
        <h2 className="text-[17px] font-medium text-[#4A4A4F]">{title}</h2>
        {icon}
      </div>

      <div className="admin-panel-body flex flex-col">
        {children}
      </div>
    </section>
  );
}