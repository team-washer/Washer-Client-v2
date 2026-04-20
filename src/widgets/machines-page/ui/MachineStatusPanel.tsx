"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import type {
  AdminMachineItem,
  MachineType,
} from "@/entities/machine/model/types";
import MachineStatusBadge from "@/entities/machine/ui/MachineStatusBadge";
import { useGetReservationDetail } from "@/entities/reservation/api/useGetReservationDetail";
import { useGetReservations } from "@/entities/reservation/api/useGetReservations";
import type { ReservationItem } from "@/entities/reservation/model/types";
import StatusPanelShell from "@/shared/ui/admin/StatusPanelShell";
import StatusRowActions from "@/shared/ui/admin/StatusRowActions";
import ReservationHistoryModal from "@/widgets/reservations-page/ui/ReservationHistoryModal";
import MachineStatusModal from "./MachineStatusModal";

interface MachineStatusPanelProps {
  title: string;
  icon: ReactNode;
  machines: AdminMachineItem[];
  side?: "left" | "right";
}

function MachineIcon({ type }: { type: MachineType }) {
  const src =
    type === "WASHER" ? "/icons/washer-drop.svg" : "/icons/dryer-wave.svg";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center translate-y-0.5">
      <Image src={src} alt={type} width={28} height={28} />
    </div>
  );
}

function MachineRow({
  item,
  reservations,
  onHistory,
  onDelete,
}: {
  item: AdminMachineItem;
  reservations: ReservationItem[];
  onHistory: () => void;
  onDelete: () => void;
}) {
  const isUsing =
    item.availability === "IN_USE" || item.availability === "RESERVED";

  // 기기 ID와 매칭되는 예약 찾기
  const matchingReservation = useMemo(() => {
    if (!isUsing) return null;
    return reservations.find((res) => res.machineId === item.id);
  }, [isUsing, reservations, item.id]);

  // 실제 예약 ID를 사용하여 상세 정보 조회
  const { data: reservationResponse } = useGetReservationDetail(
    matchingReservation?.id ?? 0,
    Boolean(matchingReservation),
  );
  
  const reservation = reservationResponse?.data;

  // 타이머 로직
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!reservation) {
      setTimeLeft(null);
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();

      // 1. RESERVED 상태: createdAt 기준 3분 카운트다운
      if (reservation.status === "RESERVED") {
        const createdTime = new Date(reservation.createdAt).getTime();
        const threeMinutesLater = createdTime + 3 * 60 * 1000;
        return Math.max(0, Math.floor((threeMinutesLater - now) / 1000));
      }

      // 2. RUNNING 또는 IN_USE 상태: expectedCompletionTime 기준 남은 시간
      if (reservation.status === "RUNNING" || reservation.status === "IN_USE") {
        const endTime = new Date(reservation.expectedCompletionTime).getTime();
        return Math.max(0, Math.floor((endTime - now) / 1000));
      }

      return null;
    };

    // 초기값 설정
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      if (remaining !== null && remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [reservation]);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00:00";
    
    const hh = Math.floor(seconds / 3600);
    const mm = Math.floor((seconds % 3600) / 60);
    const ss = seconds % 60;

    if (hh > 0) {
      return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
    }
    return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#E9E9EE] py-4 last:border-b-0">
      <div className="flex min-w-0 items-start gap-4">
        <MachineIcon type={item.type} />

        <div className="min-w-0 flex flex-col justify-center">
          <div className="text-[15px] font-medium text-[#4A4A4F]">
            <p className="truncate">{item.name}</p>
            {isUsing && reservation && (
              <>
                <p className="text-[13px] font-normal text-[#4A4A4F]">
                  사용자:{" "}
                  <span className="font-semibold">{reservation.userName}</span>{" "}
                  ({reservation.userRoomNumber}호)
                </p>
                <p className="text-[12px] font-normal text-[#969696]">
                  남은 시간:{" "}
                  {timeLeft !== null && timeLeft > 0 ? (
                    <span className="font-semibold text-[#EA3B42]">
                      {formatTime(timeLeft)}
                    </span>
                  ) : (
                    "00:00"
                  )}
                </p>
              </>
            )}
          </div>

          {item.availability === "UNAVAILABLE" && (
            <p className="mt-1 text-sm text-[#EA3B42]">
              기기 고장으로 인하여 당분간 사용이 정지됩니다.
            </p>
          )}
        </div>
      </div>

      <StatusRowActions
        badge={
          <MachineStatusBadge
            status={item.status}
            availability={item.availability}
          />
        }
        onHistory={onHistory}
        onDelete={onDelete}
      />
    </div>
  );
}

export default function MachineStatusPanel({
  title,
  icon,
  machines,
  side = "right",
}: MachineStatusPanelProps) {
  const [selectedHistoryMachineName, setSelectedHistoryMachineName] = useState<
    string | null
  >(null);
  const [selectedStatusMachine, setSelectedStatusMachine] =
    useState<AdminMachineItem | null>(null);

  // 예약 목록 API(/api/v2/admin/reservations) 호출
  const { data: reservations } = useGetReservations();

  return (
    <div className="relative xl:h-full xl:min-h-0">
      <StatusPanelShell title={title} icon={icon}>
        {machines.map((item) => (
          <MachineRow
            key={item.id}
            item={item}
            reservations={reservations ?? []}
            onHistory={() =>
              setSelectedHistoryMachineName((prev) =>
                prev === item.name ? null : item.name,
              )
            }
            onDelete={() =>
              setSelectedStatusMachine((prev) =>
                prev?.id === item.id ? null : item,
              )
            }
          />
        ))}
      </StatusPanelShell>

      <ReservationHistoryModal
        machineName={selectedHistoryMachineName}
        onClose={() => setSelectedHistoryMachineName(null)}
        side={side}
      />

      <MachineStatusModal
        machine={selectedStatusMachine}
        onClose={() => setSelectedStatusMachine(null)}
        side={side}
      />
    </div>
  );
}
