"use client";

import { RefreshCw, Shirt, Wind } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getMachineTypeFromName,
  isMachineReservable,
  type MachineType,
  type UserMachine,
  useGetMachineStatuses,
} from "@/entities/machine";
import {
  getReserveBlockReason,
  getReservedDeadline,
  type ReserveBlockReason,
  useGetActiveReservation,
  useGetReservationAvailability,
  useGetRoomActiveReservations,
} from "@/entities/reservation";
import { useNow } from "@/shared/hooks/useNow";
import { parseKstDateTime } from "@/shared/lib/kstDateTime";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { getPositionCode } from "../lib/machineCardStatus";
import LayoutModal from "./LayoutModal";
import MachineCard from "./MachineCard";

interface MachineListProps {
  type: MachineType;
  // 기기별 고장 신고 · 히스토리 버튼
  renderActions?: (machine: UserMachine) => ReactNode;
}

const MACHINE_POLLING_MS = 30_000;
const RESERVATION_POLLING_MS = 10_000;
const REFRESH_COOLDOWN_SECONDS = 5;

const typeLabel = { WASHER: "세탁기", DRYER: "건조기" } as const;

export default function MachineList({ type, renderActions }: MachineListProps) {
  const now = useNow();
  const [refreshCooldown, setRefreshCooldown] = useState(0);

  const machinesQuery = useGetMachineStatuses({
    refetchInterval: MACHINE_POLLING_MS,
  });
  const availabilityQuery = useGetReservationAvailability({
    refetchInterval: MACHINE_POLLING_MS,
  });
  const activeReservationQuery = useGetActiveReservation({
    refetchInterval: RESERVATION_POLLING_MS,
  });
  const roomReservationsQuery = useGetRoomActiveReservations({
    refetchInterval: RESERVATION_POLLING_MS,
  });

  const allMachines = machinesQuery.data ?? [];
  const availability = availabilityQuery.data;
  const roomReservations = roomReservationsQuery.data ?? [];
  // 호실 예약에는 룸메이트 예약도 포함되므로, 본인 예약은 활성 예약 ID로 판별한다.
  const myReservationId = activeReservationQuery.data?.id ?? null;
  const isContextReady =
    availabilityQuery.isSuccess &&
    activeReservationQuery.isSuccess &&
    roomReservationsQuery.isSuccess;

  useEffect(() => {
    if (refreshCooldown <= 0) return;
    const timer = window.setTimeout(
      () => setRefreshCooldown((value) => value - 1),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [refreshCooldown]);

  const handleRefresh = async () => {
    if (refreshCooldown > 0) return;

    setRefreshCooldown(REFRESH_COOLDOWN_SECONDS);
    const results = await Promise.all([
      machinesQuery.refetch(),
      availabilityQuery.refetch(),
      activeReservationQuery.refetch(),
      roomReservationsQuery.refetch(),
    ]);

    if (results.some((result) => result.error)) {
      toast.error("새로고침 실패", {
        description: "데이터를 불러오는 중 오류가 발생했습니다.",
      });
      return;
    }
    toast.success("새로고침 완료", {
      description: `${typeLabel[type]} 정보가 업데이트되었습니다.`,
    });
  };

  const getBlockReason = (
    machine: UserMachine,
  ): ReserveBlockReason | null | undefined => {
    if (!isContextReady || !availability) return undefined;

    return getReserveBlockReason({
      machineReservable: isMachineReservable(machine),
      machineType: machine.type,
      canReserve: availability.canReserve,
      isBanned: availability.isBanned,
      hasMyActiveReservation: activeReservationQuery.data !== null,
      // 호실 예약 응답에는 기기 종류가 없어 machineId로 기기 목록에서 찾고, 없을 때만 이름으로 추정한다.
      roomReservationTypes: roomReservations.map(
        (reservation) =>
          allMachines.find((item) => item.id === reservation.machineId)?.type ??
          getMachineTypeFromName(reservation.machineName),
      ),
    });
  };

  const getMyRoomReservedDeadline = (machine: UserMachine): number | null => {
    const reservation = roomReservations.find(
      (item) => item.machineId === machine.id && item.status === "RESERVED",
    );
    return reservation
      ? getReservedDeadline(parseKstDateTime(reservation.reservedAt))
      : null;
  };

  const machines = allMachines.filter((machine) => machine.type === type);
  const Icon = type === "WASHER" ? Shirt : Wind;

  if (machines.length === 0) {
    return (
      <div className="py-8 text-center">
        <Icon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <p className="mb-4 text-gray-500">
          접근 가능한 {typeLabel[type]}가 없습니다.
        </p>
        <p className="text-sm text-gray-400">관리자에게 문의하세요.</p>
      </div>
    );
  }

  const machinesByFloor = new Map<number, UserMachine[]>();
  for (const machine of machines) {
    const floor = machine.placement?.floor ?? 0;
    machinesByFloor.set(floor, [
      ...(machinesByFloor.get(floor) ?? []),
      machine,
    ]);
  }
  const floors = [...machinesByFloor.keys()].sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {floors.map((floor) => {
        const floorMachines = (machinesByFloor.get(floor) ?? []).sort((a, b) =>
          (getPositionCode(a) ?? a.name).localeCompare(
            getPositionCode(b) ?? b.name,
          ),
        );

        return (
          <div key={floor} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-[#6487DB] dark:text-white">
                  {floor > 0 ? `${floor}층 ` : ""}
                  {typeLabel[type]}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {floorMachines.length}대
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => void handleRefresh()}
                  disabled={refreshCooldown > 0}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${refreshCooldown > 0 ? "animate-spin" : ""}`}
                  />
                  <span className="hidden sm:inline">
                    {refreshCooldown > 0 ? `${refreshCooldown}초` : "새로고침"}
                  </span>
                </Button>
                {floor > 0 && (
                  <LayoutModal
                    floor={floor}
                    machines={allMachines.filter(
                      (machine) => machine.placement?.floor === floor,
                    )}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {floorMachines.map((machine) => (
                <MachineCard
                  key={machine.id}
                  machine={machine}
                  now={now}
                  isMyReservation={
                    myReservationId !== null &&
                    machine.reservationId === myReservationId
                  }
                  myRoomReservedDeadline={getMyRoomReservedDeadline(machine)}
                  blockReason={getBlockReason(machine)}
                  penaltyExpiresAt={availability?.penaltyExpiresAt ?? null}
                  actions={renderActions?.(machine)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
