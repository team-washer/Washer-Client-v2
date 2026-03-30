import { History, Trash2 } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import type {
  ReservationItem,
  ReservationMachineType,
} from "@/entities/reservation/model/types";
import ReservationStatusBadge from "@/entities/reservation/ui/ReservationStatusBadge";

interface ReservationStatusPanelProps {
  title: string;
  icon: ReactNode;
  reservations: ReservationItem[];
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

function ReservationRow({ item }: { item: ReservationItem }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#E9E9EE] py-4 last:border-b-0">
      <div className="flex min-w-0 items-start gap-4">
        <ReservationMachineIcon type={item.type} />

        <div className="min-w-0">
          <p className="truncate text-[15px] text-[#4A4A4F]">{item.machine}</p>

          {item.status === "사용중" && (
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

          {item.status === "예약중" && (
            <>
              <p className="mt-1 text-sm text-[#969696]">
                예약 시간: {item.reserveAt}
              </p>
              <p className="mt-1 text-sm text-[#EA3B42]">
                예약 만료까지: {item.expired}
              </p>
            </>
          )}

          {item.status === "확인필요" && (
            <p className="mt-1 text-sm text-[#EA3B42]">
              기기에 이상이 감지되었습니다.
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ReservationStatusBadge status={item.status} />

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#B7B7BD] text-[#9A9AA0]"
        >
          <History size={16} strokeWidth={2.2} />
        </button>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#EF4B4F] text-[#EF4B4F]"
        >
          <Trash2 size={16} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}

export default function ReservationStatusPanel({
  title,
  icon,
  reservations,
}: ReservationStatusPanelProps) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <h2 className="text-[17px] font-medium text-[#4A4A4F]">{title}</h2>
        {icon}
      </div>

      <div className="admin-panel-body flex flex-col">
        {reservations.map((item) => (
          <ReservationRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}