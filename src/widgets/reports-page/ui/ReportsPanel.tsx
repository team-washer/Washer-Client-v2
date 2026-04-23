import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import type { ReportItemType } from "@/entities/report";
import { ReportStatusBadge } from "@/entities/report";
import StatusPanelShell from "@/shared/ui/admin/StatusPanelShell";
import { Button } from "@/shared/ui/button";

interface ReportsPanelProps {
  title: string;
  reports: ReportItemType[];
  variant?: "summary" | "detail";
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

const ReportMachineIcon = ({ machineName }: { machineName: string }) => {
  const isWasher = machineName.toUpperCase().includes("WASHER");
  const src = isWasher ? "/icons/washer-drop.svg" : "/icons/dryer-wave.svg";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center translate-y-0.5">
      <Image
        src={src}
        alt={isWasher ? "WASHER" : "DRYER"}
        width={28}
        height={28}
      />
    </div>
  );
};

const ReportRow = ({
  item,
  variant,
}: {
  item: ReportItemType;
  variant: "summary" | "detail";
}) => {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-start gap-4">
        <ReportMachineIcon machineName={item.machineName} />

        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium text-[#4A4A4F]">
            {item.machineName}
          </p>

          {variant === "summary" ? (
            <p className="mt-1 text-sm text-[#9A9AA0]">
              {item.reporterName} {new Date(item.reportedAt).toLocaleString()}
            </p>
          ) : (
            <>
              <p className="mt-1 text-sm text-[#9A9AA0]">
                신고자: {item.reporterName}
              </p>
              <p className="mt-1 text-sm text-[#9A9AA0]">
                신고 사유: {item.description}
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
};

const ReportsPanel = ({
  title,
  reports,
  variant = "detail",
  isLoading,
  isError,
  onRetry,
}: ReportsPanelProps) => {
  return (
    <StatusPanelShell
      title={title}
      icon={<TriangleAlert size={18} className="text-[#A4A4AA]" />}
    >
      <div className="relative min-h-[200px]">
        {isLoading && (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-gray-500 font-medium animate-pulse">
              데이터를 불러오는 중...
            </p>
          </div>
        )}

        {isError && (
          <div className="flex h-[200px] flex-col items-center justify-center gap-4">
            <p className="text-sm text-red-500 font-medium">
              데이터를 불러오는 중 오류가 발생했습니다.
            </p>
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry}>
                다시 시도
              </Button>
            )}
          </div>
        )}

        {!isLoading && !isError && reports.length === 0 && (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-gray-500 font-medium">
              신고 내역이 없습니다.
            </p>
          </div>
        )}

        {!isLoading && !isError && reports.length > 0 && (
          <div className="sidebar-scrollbar max-h-full overflow-y-auto divide-y divide-[#E9E9EE]">
            {reports.map((item) => (
              <ReportRow key={item.id} item={item} variant={variant} />
            ))}
          </div>
        )}
      </div>
    </StatusPanelShell>
  );
};

export default ReportsPanel;
