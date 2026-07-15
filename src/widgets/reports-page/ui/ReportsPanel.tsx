"use client";

import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import type { ReportItemType } from "@/entities/report";
import { useUpdateReportStatus, ReportStatusBadge } from "@/entities/report";
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
        <ReportActionButton item={item} />
      </div>
    </div>
  );
};

const ReportActionButton = ({ item }: { item: ReportItemType }) => {
  const { mutate: updateStatus, isPending } = useUpdateReportStatus();

  if (item.status === "RESOLVED") {
    return null;
  }

  const handleNextStatus = () => {
    if (item.status === "PENDING") {
      const confirmed = window.confirm(
        "처리중으로 변경된다면 기기가 고장 상태로 변경되고 처리 완료 상태가 되기 전까지는 사용이 불가능 합니다. 계속하시겠습니까?"
      );
      if (!confirmed) return;
      updateStatus({ id: item.id, status: "IN_PROGRESS" });
    } else if (item.status === "IN_PROGRESS") {
      updateStatus({ id: item.id, status: "RESOLVED" });
    }
  };

  const buttonText = item.status === "PENDING" ? "처리 시작" : "완료 처리";
  const buttonBg = item.status === "PENDING" ? "bg-[#4D83F6]" : "bg-[#20C997]";

  return (
    <button
      type="button"
      onClick={handleNextStatus}
      disabled={isPending}
      className={cn(
        "inline-flex h-7 min-w-16 cursor-pointer items-center justify-center rounded-full px-3 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
        buttonBg
      )}
    >
      {buttonText}
    </button>
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
