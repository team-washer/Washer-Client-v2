import Image from "next/image";
import type { ReactNode } from "react";
import { Droplet, Trash2 } from "lucide-react";
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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="flex min-w-0 items-start gap-4">
        <ReservationMachineIcon type={item.type} />

        <div className="min-w-0">
          <p className="truncate text-[15px] text-[#4A4A4F]">{item.machine}</p>

          {item.remain ? (
            <p className="mt-1 text-sm text-[#969696]">
              남은 시간: {item.remain}
            </p>
          ) : (
            <>
              <p className="mt-1 text-sm text-[#969696]">
                예약 시간: {item.reserveAt}
              </p>
              <p className="mt-1 text-sm text-[#EA3B42]">
                예약 만료까지: {item.expired}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
        <ReservationStatusBadge status={item.status} />

        <button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#EA3B42] px-3 text-sm font-medium text-white">
          <Trash2 size={16} strokeWidth={2.2} />
          강제 삭제
        </button>
      </div>
    </div>
  );
}

export default function ReservationStatusPanel({
  title = "활성화 된 예약",
  icon = <Droplet size={18} className="translate-y-px text-[#A4A4AA]" />,
  reservations,
}: ReservationStatusPanelProps) {
  return (
    <section className="flex h-full min-h-[500px] flex-col rounded-2xl bg-[#FDFDFD] px-5 py-5">
      <div className="mb-5 flex items-center gap-2">
        <h2 className="text-[17px] font-medium text-[#4A4A4F]">{title}</h2>
        {icon}
      </div>

      <div className="flex flex-1 flex-col gap-5">
        {reservations.map((item) => (
          <ReservationRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
