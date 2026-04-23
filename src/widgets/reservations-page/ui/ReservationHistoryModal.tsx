"use client";

import { History, X } from "lucide-react";
import { useRef } from "react";
import { useGetMachineReservationHistory } from "@/entities/reservation";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import ReservationHistoryCard from "./ReservationHistoryCard";

interface ReservationHistoryModalProps {
  machineName: string | null;
  onClose: () => void;
  side?: "left" | "right";
}

export default function ReservationHistoryModal({
  machineName,
  onClose,
  side = "right",
}: ReservationHistoryModalProps) {
  const isOpen = Boolean(machineName);
  const panelRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useGetMachineReservationHistory(
    machineName ? { machineName } : undefined,
  );
  
  useOutsideClick(panelRef, onClose, isOpen);

  if (!isOpen || !machineName) return null;

  const overlayPositionClass =
    side === "right"
      ? "absolute left-[calc(100%+16px)] top-0 h-full w-full"
      : "absolute right-[calc(100%+16px)] top-0 h-full w-full";

  return (
    <div className={`${overlayPositionClass} z-30`}>
      <div
        ref={panelRef}
        className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-[#FDFDFD] px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      >
        <div className="mb-4 flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-2 text-[#4A4A4F]">
            <h2 className="text-[18px] font-medium">{machineName} 히스토리</h2>
            <History size={18} className="text-[#A1A1AA]" />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#A1A1AA] transition hover:bg-[#ECECEC]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {isLoading && (
            <p className="py-8 text-sm text-[#9A9AA0]">불러오는 중...</p>
          )}

          {isError && (
            <p className="py-8 text-sm text-[#EA3B42]">
              히스토리를 불러오지 못했습니다.
            </p>
          )}

          {!isLoading && !isError && (!data || data.reservations.length === 0) && (
            <p className="py-8 text-sm text-[#9A9AA0]">히스토리가 없습니다.</p>
          )}

          {!isLoading && !isError && data && data.reservations.length > 0 && (
            <div className="flex flex-col gap-4">
              {data.reservations.map((item, index) => (
                <ReservationHistoryCard
                  key={`${item.roomNumber}-${item.reservedAt}-${index}`}
                  machineName={data.machineName}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}