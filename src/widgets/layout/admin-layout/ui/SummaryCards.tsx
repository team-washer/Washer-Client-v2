"use client";

import { useQuery } from "@tanstack/react-query";
import { getMalfunctionReports } from "@/entities/report";

export default function SummaryCards() {
  const { data: summaryData } = useQuery({
    queryKey: ["admin", "summary"],
    queryFn: async () => {
      const [malfunctionData] = await Promise.all([
        getMalfunctionReports(),
        //나중에 다른 함수 추가
      ]);

      return {
        malfunctionData,
      };
    },
  });

  const malfunctionDataLength = summaryData?.malfunctionData?.data?.reports.length ?? 0;

  const summaryItems = [
    { label: "총 기기수", value: "24대" },
    { label: "예약 활성화", value: "6대" },
    { label: "고장 신고", value: `${malfunctionDataLength}건` },
    { label: "세탁정지", value: "4명" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {summaryItems.map((item) => (
        <article
          key={item.label}
          className="rounded-xl bg-[#FDFDFD] px-6 py-5 text-center"
        >
          <p className=" text-[#969696]">{item.label}</p>
          <strong className="mt-1 block text-2xl font-medium text-[#494949]">
            {item.value}
          </strong>
        </article>
      ))}
    </div>
  );
}
