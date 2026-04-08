"use client";

import { useState } from "react";
import { useGetMalfunctionReports, type ReportStatusType } from "@/entities/report";
import ReportFilterPanel from "./ui/ReportFilterPanel";
import ReportsPanel from "./ui/ReportsPanel";

const ReportsPage = () => {
  const [status, setStatus] = useState<ReportStatusType | undefined>();

  const { data, isLoading, isError, refetch } = useGetMalfunctionReports({ status });

  const reports = data?.data.reports ?? [];

  return (
    <div className="admin-page-grid xl:grid-cols-[1.9fr_0.62fr]">
      <div className="admin-page-item">
        <ReportsPanel
          title="고장 신고 관리"
          reports={reports}
          variant="detail"
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
        />
      </div>

      <div className="admin-page-item">
        <ReportFilterPanel status={status} onStatusChange={setStatus} />
      </div>
    </div>
  );
};

export default ReportsPage;
