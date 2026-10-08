"use client";

import { AlertCircle, Calendar, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { isMachineReservable, useGetMachineStatuses } from "@/entities/machine";
import {
  useGetActiveReservation,
  useGetReservationAvailability,
  useGetRoomActiveReservations,
} from "@/entities/reservation";
import { AppError } from "@/shared/api";
import { useNow } from "@/shared/hooks/useNow";
import { usePullToRefresh } from "@/shared/hooks/usePullToRefresh";
import { formatKstDateTime } from "@/shared/lib/kstDateTime";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import MyReservationCard from "./ui/MyReservationCard";

const MACHINE_POLLING_MS = 30_000;
const RESERVATION_POLLING_MS = 10_000;
const REFRESH_COOLDOWN_SECONDS = 5;

export default function UserMainPage() {
  const now = useNow();
  const [refreshCooldown, setRefreshCooldown] = useState(0);

  const machinesQuery = useGetMachineStatuses({
    refetchInterval: MACHINE_POLLING_MS,
  });
  const roomReservationsQuery = useGetRoomActiveReservations({
    refetchInterval: RESERVATION_POLLING_MS,
  });
  const activeReservationQuery = useGetActiveReservation({
    refetchInterval: RESERVATION_POLLING_MS,
  });
  const availabilityQuery = useGetReservationAvailability({
    refetchInterval: MACHINE_POLLING_MS,
  });

  const machines = machinesQuery.data ?? [];
  const roomReservations = roomReservationsQuery.data ?? [];
  const myReservationId = activeReservationQuery.data?.id ?? null;
  const availability = availabilityQuery.data;

  useEffect(() => {
    if (refreshCooldown <= 0) return;
    const timer = window.setTimeout(
      () => setRefreshCooldown((value) => value - 1),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [refreshCooldown]);

  const handleRefresh = useCallback(async () => {
    if (refreshCooldown > 0) return;

    setRefreshCooldown(REFRESH_COOLDOWN_SECONDS);
    const results = await Promise.all([
      machinesQuery.refetch(),
      roomReservationsQuery.refetch(),
      activeReservationQuery.refetch(),
      availabilityQuery.refetch(),
    ]);
    const failed = results.find((result) => result.error);

    if (failed?.error) {
      toast.error("새로고침 실패", { description: failed.error.message });
      return;
    }
    toast.success("새로고침 완료", {
      description: "최신 정보로 업데이트되었습니다.",
    });
  }, [
    refreshCooldown,
    machinesQuery,
    roomReservationsQuery,
    activeReservationQuery,
    availabilityQuery,
  ]);

  const { pullDistance, isPulling, isRefreshing } = usePullToRefresh({
    onRefresh: handleRefresh,
    disabled: machinesQuery.isPending,
  });

  if (machinesQuery.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-4 h-8 w-8 animate-spin text-[#86A9FF]" />
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (machinesQuery.isError) {
    const isNotTarget =
      machinesQuery.error instanceof AppError &&
      machinesQuery.error.status === 451;

    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-8 w-8 text-red-500" />
          <p className="text-gray-600">
            {isNotTarget
              ? machinesQuery.error.message
              : "데이터를 불러오지 못했습니다."}
          </p>
        </div>
      </div>
    );
  }

  const totalMachines = machines.length;
  const availableMachines = machines.filter(isMachineReservable).length;
  const inUseMachines = machines.filter(
    (machine) =>
      machine.availability === "IN_USE" || machine.availability === "RESERVED",
  ).length;

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {(isPulling || isRefreshing) && (
        <div
          className="absolute -top-[100px] right-0 left-0 z-50 flex justify-center pt-20"
          style={{
            transform: `translateY(${Math.min(pullDistance * 0.5, 50)}px)`,
            transition: isPulling ? "none" : "transform 0.3s ease-out",
          }}
        >
          <div className="rounded-full border bg-white p-3 shadow-lg dark:bg-gray-800">
            <RefreshCw
              className={`h-6 w-6 text-[#86A9FF] ${isRefreshing ? "animate-spin" : ""}`}
            />
          </div>
        </div>
      )}

      <div
        className="container mx-auto space-y-6 px-4 py-6"
        style={{
          transform: `translateY(${Math.min(pullDistance, 100)}px)`,
          transition: isPulling ? "none" : "transform 0.3s ease-out",
        }}
      >
        {availability && !availability.canReserve && (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-400">
              <strong>서비스 이용 제한</strong>
              <br />
              {availability.penaltyExpiresAt && (
                <>
                  제한 해제: {formatKstDateTime(availability.penaltyExpiresAt)}
                  <br />
                </>
              )}
              사유: {availability.isBanned ? "호실 세탁 금지" : "예약 패널티"}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-3 gap-4">
          <StatCard label="전체" value={totalMachines} />
          <StatCard
            label="가능"
            value={availableMachines}
            className="text-green-600"
          />
          <StatCard
            label="사용중"
            value={inUseMachines}
            className="text-blue-600"
          />
        </div>

        {roomReservations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />내 예약 현황
              </CardTitle>
              <CardDescription>현재 활성화된 예약을 확인하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {roomReservations.map((reservation) => (
                <MyReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  machine={machines.find(
                    (machine) => machine.id === reservation.machineId,
                  )}
                  isMine={reservation.id === myReservationId}
                  now={now}
                />
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  className?: string;
}

function StatCard({ label, value, className = "" }: StatCardProps) {
  return (
    <Card className="text-center">
      <CardHeader className="pb-2">
        <CardDescription className="text-xs text-gray-500">
          {label}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className={`text-2xl font-bold ${className}`}>{value}대</div>
      </CardContent>
    </Card>
  );
}
