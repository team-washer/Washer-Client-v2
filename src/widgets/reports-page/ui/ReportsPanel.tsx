import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import type { ReportItem, ReportMachineType } from "@/entities/report/model/types";
import ReportStatusBadge from "@/entities/report/ui/ReportStatusBadge";
import StatusPanelShell from "@/shared/ui/admin/StatusPanelShell";

interface ReportsPanelProps {
  title: string;
  reports: ReportItem[];
  variant?: "summary" | "detail";
}

function ReportMachineIcon({ type }: { type: ReportMachineType }) {
  const src =
    type === "washer" ? "/icons/washer-drop.svg" : "/icons/dryer-wave.svg";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center translate-y-0.5">
      <Image src={src} alt={type} width={28} height={28} />
    </div>
  );
}

function ReportRow({
  item,
  variant,
}: {
  item: ReportItem;
  variant: "summary" | "detail";
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#E9E9EE] py-4 last:border-b-0">
      <div className="flex min-w-0 items-start gap-4">
        <ReportMachineIcon type={item.type} />

        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium text-[#4A4A4F]">
            {item.machine}
          </p>

          {variant === "summary" ? (
            <p className="mt-1 text-sm text-[#9A9AA0]">
              {item.user} {item.time}
            </p>
          ) : (
            <>
              <p className="mt-1 text-sm text-[#9A9AA0]">
                신고자: {item.user}
              </p>
              <p className="mt-1 text-sm text-[#9A9AA0]">
                신고 사유: {item.reason}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ReportStatusBadge status={item.status} />
      </div>
    </div>
  );
}

export default function ReportsPanel({
  title,
  reports,
  variant = "detail",
}: ReportsPanelProps) {
  return (
    <StatusPanelShell
      title={title}
      icon={<TriangleAlert size={18} className="text-[#A4A4AA]" />}
    >
      {reports.map((item) => (
        <ReportRow key={item.id} item={item} variant={variant} />
      ))}
    </StatusPanelShell>
  );
}