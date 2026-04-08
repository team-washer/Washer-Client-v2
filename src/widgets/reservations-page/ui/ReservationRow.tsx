"use client";

import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

import type {
  ReservationItem,
  ReservationMachineType,
} from "@/entities/reservation/model/types";
import ReservationStatusBadge from "@/entities/reservation/ui/ReservationStatusBadge";
import StatusRowActions from "@/shared/ui/admin/StatusRowActions";
import { useDeleteReservation } from "@/features/reservation/model/useDeleteReservation";

interface ReservationRowProps {
  item: ReservationItem;
}

function ReservationMachineIcon({ type }: { type: ReservationMachineType }) {
  const src =
    type === "washer" ? "/icons/washer-drop.svg" : "/icons/dryer-wave.svg";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center translate-y-0.5">
      <Image src={src} alt={type} width={28} height={28} />
    </div>
  );
}

export default function ReservationRow({ item }: ReservationRowProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteReservation, isPending } = useDeleteReservation();

  const handleReload = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["reservations"],
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm("이 예약을 강제 취소하시겠습니까?");
    if (!confirmed) return;

    deleteReservation(item.id);
  };

  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#E9E9EE] py-4 last:border-b-0">
      <div className="flex min-w-0 items-start gap-4">
        <ReservationMachineIcon type={item.type} />

        <div className="min-w-0">
          <p className="truncate text-[15px] text-[#4A4A4F]">{item.machine}</p>

          {item.badgeStatus === "사용중" && (
            <>
              <p className="mt-1 text-sm text-[#969696]">
                남은 시간: {item.remain}
              </p>
              {item.deviceStatus && (
                <p className="mt-1 text-sm text-[#969696]">
                  기기 상태: {item.deviceStatus}
                </p>
              )}
            </>
          )}

          {item.badgeStatus === "예약중" && (
            <>
              <p className="mt-1 text-sm text-[#969696]">
                예약 시간: {item.reserveAt}
              </p>
              <p className="mt-1 text-sm text-[#EA3B42]">
                예약 만료까지: {item.expired}
              </p>
            </>
          )}

          {item.badgeStatus === "확인필요" && (
            <p className="mt-1 text-sm text-[#EA3B42]">
              기기를 현재 사용할 수 없습니다.
            </p>
          )}
        </div>
      </div>

      <StatusRowActions
        badge={<ReservationStatusBadge badgeStatus={item.badgeStatus} />}
        onReload={handleReload}
        onDelete={handleDelete}
        disabled={isPending}
      />
    </div>
  );
}