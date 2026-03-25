const reservations = [
  {
    id: 1,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    status: "사용중",
    statusColor: "bg-[#4d83f6]",
  },
  {
    id: 2,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    status: "사용중",
    statusColor: "bg-[#4d83f6]",
  },
  {
    id: 3,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    status: "사용중",
    statusColor: "bg-[#4d83f6]",
  },
  {
    id: 4,
    machine: "Washer-3F-L1 301호",
    remain: "00:32:12",
    status: "사용 정지",
    statusColor: "bg-[#9ec0ff]",
  },
  {
    id: 5,
    machine: "Washer-3F-L1 301호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약 취소",
    statusColor: "bg-[#ef4b4f]",
  },
  {
    id: 6,
    machine: "Washer-3F-L1 301호",
    reserveAt: "25.8.18 21:35",
    expired: "00:02:32",
    status: "예약 취소",
    statusColor: "bg-[#ef4b4f]",
  },
];

export default function ActiveReservationsPanel() {
  return (
    <section className="rounded-2xl bg-[#ececef] px-5 py-5">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-[17px] font-semibold text-[#4a4a4f]">
          활성화 된 예약
        </h2>
        <span className="text-[#a4a4aa]">◔</span>
      </div>

      <div className="flex flex-col gap-4">
        {reservations.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[15px] font-medium text-[#4a4a4f]">
                {item.machine}
              </p>

              {item.remain ? (
                <p className="mt-1 text-sm text-[#9a9aa0]">
                  남은 시간: {item.remain}
                </p>
              ) : (
                <>
                  <p className="mt-1 text-sm text-[#9a9aa0]">
                    예약 시간: {item.reserveAt}
                  </p>
                  <p className="text-sm text-[#ef4b4f]">
                    예약 만료까지: {item.expired}
                  </p>
                </>
              )}
            </div>

            <span
              className={`inline-flex h-7 min-w-[68px] items-center justify-center rounded-full px-3 text-xs font-semibold text-white ${item.statusColor}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
