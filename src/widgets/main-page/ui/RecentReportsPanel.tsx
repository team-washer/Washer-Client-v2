import Image from "next/image";
import { TriangleAlert } from "lucide-react";

const reports = [
  {
    id: 1,
    machine: "Washer-3F-L1",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "신고",
    type: "washer",
  },
  {
    id: 2,
    machine: "Washer-3F-L1",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "처리중",
    type: "washer",
  },
  {
    id: 3,
    machine: "Dryer-3F-L2",
    user: "김민솔",
    time: "26.03.13 (21:30)",
    status: "완료",
    type: "dryer",
  },
];

const statusMap = {
  신고: "bg-[#EA3B42]",
  처리중: "bg-[#4486FF]",
  완료: "bg-[#85B0FF]",
};

function ReportMachineIcon({ type }: { type: string }) {
  const src =
    type === "washer" ? "/icons/washer-drop.svg" : "/icons/dryer-wave.svg";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center">
      <Image src={src} alt={type} width={28} height={28} />
    </div>
  );
}

export default function RecentReportsPanel() {
  return (
    <section className="rounded-2xl bg-[#FDFDFD] px-5 py-5">
      <div className="mb-5 flex items-center gap-2">
        <h2 className="text-[17px] font-medium text-[#494949]">
          최근 고장 신고
        </h2>
        <TriangleAlert size={18} className="text-[#A4A4AA]" />
      </div>

      <div className="flex flex-col gap-5">
        {reports.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex min-w-0 items-start gap-2">
              <div className="translate-y-0.5">
                <ReportMachineIcon type={item.type} />
              </div>

              <div className="min-w-0">
                <p className="text-[15px] font-medium text-[#4A4A4F]">
                  {item.machine}
                </p>
                <p className="mt-1 text-sm text-[#9A9AA0]">
                  {item.user} {item.time}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex h-7 min-w-[50px] shrink-0 items-center justify-center rounded-full px-3 text-xs font-medium text-white ${
                statusMap[item.status as keyof typeof statusMap]
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
