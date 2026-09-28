"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetMachines } from "@/entities/machine";
import {
  type ReportStatusType,
  useGetMalfunctionReports,
} from "@/entities/report";
import {
  createQuerySyncTracker,
  getQueryParamNumber,
  updateQueryParams,
} from "@/shared/lib/queryParams";
import ReportFilterPanel from "./ui/ReportFilterPanel";
import ReportsPanel from "./ui/ReportsPanel";

const ReportsPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const querySyncTracker = useRef(createQuerySyncTracker());
  const skipQuerySync = useRef(false);
  const [queryHydrationVersion, setQueryHydrationVersion] = useState(0);
  const [status, setStatus] = useState<ReportStatusType | undefined>();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [floor, setFloor] = useState<number | undefined>();

  useEffect(() => {
    const query = searchParams.toString();
    const navigationSource = querySyncTracker.current.observe(query);

    if (navigationSource === "internal") {
      return;
    }

    const queryStatus = searchParams.get("status");
    const nextStatus: ReportStatusType | undefined =
      queryStatus === "PENDING" ||
      queryStatus === "IN_PROGRESS" ||
      queryStatus === "RESOLVED"
        ? queryStatus
        : undefined;
    const querySearch = searchParams.get("search") ?? "";
    const queryFloor = getQueryParamNumber(searchParams, "floor");

    setStatus(nextStatus);
    setSearch(querySearch);
    setDebouncedSearch(querySearch);
    setFloor(queryFloor === 3 || queryFloor === 4 ? queryFloor : undefined);
    skipQuerySync.current = true;
    setQueryHydrationVersion((version) => version + 1);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (skipQuerySync.current) {
      skipQuerySync.current = false;
      return;
    }

    if (queryHydrationVersion === 0) {
      return;
    }

    const currentQuery = querySyncTracker.current.getCurrentQuery();
    const nextSearchParams = updateQueryParams(
      new URLSearchParams(currentQuery),
      {
        search: debouncedSearch,
        status,
        floor,
      },
    );
    const nextQuery = nextSearchParams.toString();

    if (querySyncTracker.current.request(nextQuery)) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }
  }, [debouncedSearch, floor, pathname, queryHydrationVersion, router, status]);

  const {
    data: reportsData,
    isLoading: isReportsLoading,
    isError: isReportsError,
    refetch: refetchReports,
  } = useGetMalfunctionReports({
    status,
  });

  const { data: machines = [], isLoading: isMachinesLoading } = useGetMachines(
    {
      floor,
    },
    {
      enabled: floor !== undefined,
    },
  );

  const isLoading =
    isReportsLoading || (floor !== undefined && isMachinesLoading);

  const reports = reportsData?.data.reports ?? [];

  const filteredReports = useMemo(() => {
    let result = reports;

    // Filter by floor if selected
    if (floor !== undefined) {
      const machineIdsOnFloor = new Set(machines.map((machine) => machine.id));

      result = result.filter((report) =>
        machineIdsOnFloor.has(report.machineId),
      );
    }

    // Filter by search
    if (debouncedSearch) {
      const normalizedSearch = debouncedSearch.toLowerCase();

      result = result.filter((report) =>
        report.reporterName.toLowerCase().includes(normalizedSearch),
      );
    }

    return result;
  }, [reports, machines, floor, debouncedSearch]);

  const handleReset = () => {
    setStatus(undefined);
    setSearch("");
    setDebouncedSearch("");
    setFloor(undefined);
  };

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
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default ReportsPage;
