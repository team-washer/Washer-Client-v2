"use client";

import { useQuery } from "@tanstack/react-query";
import { getMachineReservationHistory } from "@/entities/reservation/api/getMachineReservationHistory";

interface ReservationHistoryModalProps {
  machineName: string | null;
  onClose: () => void;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[640px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#2B2B2F]">
            {machineName} 예약 히스토리
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-[#7A7A80]"
          >
            닫기
          </button>
        </div>

        {isLoading && (
          <p className="text-sm text-[#9A9AA0]">불러오는 중...</p>
        )}

        {isError && (
          <p className="text-sm text-[#EA3B42]">
            히스토리를 불러오지 못했습니다.
          </p>
        )}

        {!isLoading && !isError && (!data || data.reservations.length === 0) && (
          <p className="text-sm text-[#9A9AA0]">히스토리가 없습니다.</p>
        )}

        <div className="flex max-h-[420px] flex-col overflow-y-auto">
          {data?.reservations.map((item, index) => (
            <div
              key={`${item.roomNumber}-${item.reservedAt}-${index}`}
              className="border-b border-[#E9E9EE] py-3 last:border-b-0"
            >
              <p className="text-sm font-medium text-[#4A4A4F]">
                {item.roomNumber}호
              </p>
              <p className="mt-1 text-sm text-[#9A9AA0]">
                예약 시간: {item.reservedAt}
              </p>
              <p className="mt-1 text-sm text-[#9A9AA0]">
                상태: {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}