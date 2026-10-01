"use client";

import type { ReservationHistoryItem } from "@/entities/reservation";
import ReservationStatusBadge from "@/entities/reservation/ui/ReservationStatusBadge";
import { getHistoryTimeField } from "../lib/getHistoryTimeField";

interface ReservationHistoryCardProps {
  machineName: string;
  item: ReservationHistoryItem;
}

export default function ReservationHistoryCard({
  machineName,
  item,
}: ReservationHistoryCardProps) {
  const timeField = getHistoryTimeField(item.status, item.actionAt);

  return (
    <div className="rounded-xl border border-[#D4D4D8] bg-white px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[15px] font-medium text-[#4A4A4F]">{machineName}</p>
        <ReservationStatusBadge label={item.status} />
      </div>

      <div className="border-t border-[#ECECEC] pt-3">
        <div className="grid grid-cols-[90px_1fr] gap-y-2 text-[14px] text-[#555]">
          <span>예약호실</span>
          <span className="text-right text-[#8B8B8B]">{item.roomNumber}호</span>

          <span>예약시간</span>
          <span className="text-right text-[#8B8B8B]">{item.reservedAt}</span>

          {timeField && (
            <>
              <span>{timeField.label}</span>
              <span className="text-right text-[#8B8B8B]">
                {timeField.value}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
