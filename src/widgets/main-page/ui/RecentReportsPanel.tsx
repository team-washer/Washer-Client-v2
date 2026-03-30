import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import type {
  ReportItem,
  ReportMachineType,
} from "@/entities/report/model/types";
import ReportStatusBadge from "@/entities/report/ui/ReportStatusBadge";

interface RecentReportsPanelProps {
  reports: ReportItem[];
}

function ReportMachineIcon({ type }: { type: ReportMachineType }) {
  const src =
    type === "washer" ? "/icons/washer-drop.svg" : "/icons/dryer-wave.svg";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center">
      <Image src={src} alt={type} width={28} height={28} />
    </div>
  );
}

export default function RecentReportsPanel({
  reports,
}: RecentReportsPanelProps) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <h2 className="text-[17px] font-medium text-[#494949]">
          최근 고장 신고
        </h2>
        <TriangleAlert size={18} className="text-[#A4A4AA]" />
      </div>

      <div className="admin-panel-body flex flex-col gap-5">
        {reports.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex min-w-0 items-start gap-2">
              <div className="translate-y-0.5">
                <ReportMachineIcon type={item.type} />
              </div>

              <div className="min-w-0">
                <p className="text-[15px] font-medium text-[#4A4A4F]">
                  {item.machine}
                </p>
                <p className="mt-1 text-sm text-[#9A9AA0]">
                  {item.user} {item.time}
                </p>
              </div>
            </div>

            <ReportStatusBadge status={item.status} />
          </div>
        ))}
      </div>
    </section>
  );
}