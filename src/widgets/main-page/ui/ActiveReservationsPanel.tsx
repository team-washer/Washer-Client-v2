import Image from "next/image";
import { Droplet, Trash2 } from "lucide-react";

const reservations = [
  {
    id: 1,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    status: "사용중",
    type: "washer",
  },
  {
    id: 2,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    status: "사용중",
    type: "washer",
  },
  {
    id: 3,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    status: "사용중",
    type: "washer",
  },
  {
    id: 4,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    status: "대기중",
    type: "washer",
  },
  {
    id: 5,
    machine: "Washer-3F-L1 301호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약중",
    type: "washer",
  },
  {
    id: 6,
    machine: "Washer-3F-L1 301호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약중",
    type: "washer",
  },
];

const statusMap = {
  사용중: "bg-[#4D83F6]",
  대기중: "bg-[#8CB2FF]",
  예약중: "bg-[#8CB2FF]",
};

function ReservationMachineIcon({ type }: { type: string }) {
  const src =
    type === "washer" ? "/icons/washer-drop.svg" : "/icons/dryer-wave.svg";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center translate-y-0.5">
      <Image src={src} alt={type} width={28} height={28} />
    </div>
  );
}

export default function ActiveReservationsPanel() {
  return (
    <section className="rounded-2xl bg-[#FDFDFD] px-5 py-5">
      <div className="mb-5 flex items-center gap-2">
        <h2 className="text-[17px] font-medium text-[#4A4A4F]">
          활성화 된 예약
        </h2>
        <Droplet size={18} className="translate-y-px text-[#A4A4AA]" />
      </div>

      <div className="flex flex-col gap-5">
        {reservations.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <ReservationMachineIcon type={item.type} />

              <div className="min-w-0">
                <p className="text-[15px] font-basis text-[#4A4A4F]">
                  {item.machine}
                </p>

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

            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`inline-flex h-8 min-w-16 items-center justify-center rounded-full px-3 text-xs font-semibold text-white ${
                  statusMap[item.status as keyof typeof statusMap]
                }`}
              >
                {item.status}
              </span>

              <button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#EA3B42] px-3 text-sm font-medium text-white">
                <Trash2 size={16} strokeWidth={2.2} />
                강제 삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
