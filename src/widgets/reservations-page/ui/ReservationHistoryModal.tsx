"use client";

import { History, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMachineReservationHistory } from "@/entities/reservation/api/getMachineReservationHistory";

interface ReservationHistoryModalProps {
  machineName: string | null;
  onClose: () => void;
}

function HistoryStatusBadge({ status }: { status: "사용 완료" | "취소됨" }) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-medium text-white ${
        status === "취소됨" ? "bg-[#EA3B42]" : "bg-[#4486FF]"
      }`}
    >
      {status}
    </span>
  );
}

export default function ReservationHistoryModal({
  machineName,
  onClose,
}: ReservationHistoryModalProps) {
  const open = Boolean(machineName);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reservation-history", machineName],
    queryFn: () => getMachineReservationHistory(machineName as string),
    enabled: open,
  });

  if (!open || !machineName) return null;

  return (
    <div className="absolute inset-0 z-30 rounded-2xl bg-[#FDFDFD]">
      <div className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-[#FDFDFD] px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[#4A4A4F]">
            <h2 className="text-[18px] font-medium">
              {machineName} 히스토리
            </h2>
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
            <p className="py-8 text-sm text-[#9A9AA0]">
              히스토리가 없습니다.
            </p>
          )}

          {!isLoading && !isError && data && data.reservations.length > 0 && (
            <div className="flex flex-col gap-4">
              {data.reservations.map((item, index) => (
                <div
                  key={`${item.roomNumber}-${item.reservedAt}-${index}`}
                  className="rounded-xl border border-[#D4D4D8] bg-white px-4 py-4"
                >
                
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[15px] font-medium text-[#4A4A4F]">
                      {data.machineName}
                    </p>
                    <HistoryStatusBadge status={item.status} />
                  </div>

                  <div className="border-t border-[#ECECEC] pt-3">
                    <div className="grid grid-cols-[90px_1fr] gap-y-2 text-[14px] text-[#555]">

                      <span>예약호실</span>
                      <span className="text-right text-[#8B8B8B]">
                        {item.roomNumber}호
                      </span>

                      <span>예약시간</span>
                      <span className="text-right text-[#8B8B8B]">
                        {item.reservedAt}
                      </span>

                      <span>
                        {item.status === "취소됨" ? "취소 시간" : "완료 시간"}
                      </span>
                      <span className="text-right text-[#8B8B8B]">
                        {item.actionAt ?? "-"}
                      </span>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}