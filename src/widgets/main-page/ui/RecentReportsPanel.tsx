const reports = [
  {
    id: 1,
    machine: "Washer-3F-L1",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "신고",
    statusColor: "bg-[#ef4b4f]",
  },
  {
    id: 2,
    machine: "Washer-3F-L1",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "처리중",
    statusColor: "bg-[#4d83f6]",
  },
  {
    id: 3,
    machine: "Dryer-3F-L2",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "완료",
    statusColor: "bg-[#8cb2ff]",
  },
];

export default function RecentReportsPanel() {
  return (
    <section className="rounded-2xl bg-[#ececef] px-5 py-5">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-[17px] font-semibold text-[#4a4a4f]">
          최근 고장 신고
        </h2>
        <span className="text-[#a4a4aa]">⚠</span>
      </div>

      <div className="flex flex-col gap-4">
        {reports.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="text-[15px] font-medium text-[#4a4a4f]">
                {item.machine}
              </p>
              <p className="mt-1 text-sm text-[#9a9aa0]">
                {item.user} {item.time}
              </p>
            </div>

            <span
              className={`inline-flex h-7 min-w-[54px] items-center justify-center rounded-full px-3 text-xs font-semibold text-white ${item.statusColor}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
