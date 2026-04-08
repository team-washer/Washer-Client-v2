"use client";

import { useState, useMemo } from "react";
import { useGetMalfunctionReports, type ReportStatusType } from "@/entities/report";
import { useGetMachines } from "@/entities/machine";
import ReportFilterPanel from "./ui/ReportFilterPanel";
import ReportsPanel from "./ui/ReportsPanel";

const ReportsPage = () => {
  const [status, setStatus] = useState<ReportStatusType | undefined>();
  const [search, setSearch] = useState("");
  const [floor, setFloor] = useState<number | undefined>();

  const { data: reportsData, isLoading: isReportsLoading, isError: isReportsError, refetch: refetchReports } = useGetMalfunctionReports({
    status,
  });

  const { data: machinesData, isLoading: isMachinesLoading } = useGetMachines({
    floor,
  });

  const reports = reportsData?.data.reports ?? [];
  const machines = machinesData?.data.machines ?? [];

  const filteredReports = useMemo(() => {
    let result = reports;

    // Filter by floor if selected
    if (floor !== undefined) {
      const machineIdsOnFloor = new Set(machines.map((m) => m.id));
      result = result.filter((report) => machineIdsOnFloor.has(report.machineId));
    }

    // Filter by search
    if (search) {
      result = result.filter((report) =>
        report.reporterName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return result;
  }, [reports, machines, floor, search]);

  const isLoading = isReportsLoading || (floor !== undefined && isMachinesLoading);

  return (
    <div className="admin-page-grid xl:grid-cols-[1.9fr_0.62fr]">
      <div className="admin-page-item">
        <ReportsPanel
          title="고장 신고 관리"
          reports={filteredReports}
          variant="detail"
          isLoading={isLoading}
          isError={isReportsError}
          onRetry={refetchReports}
        />
      </div>

      <div className="admin-page-item">
        <ReportFilterPanel
          status={status}
          onStatusChange={setStatus}
          search={search}
          onSearchChange={setSearch}
          floor={floor}
          onFloorChange={setFloor}
        />
      </div>
    </div>
  );
};


export default ReportsPage;
