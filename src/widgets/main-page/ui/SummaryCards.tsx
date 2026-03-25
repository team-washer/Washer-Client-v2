const summaryItems = [
  { label: "총 기기수", value: "24대" },
  { label: "예약 활성화", value: "6대" },
  { label: "고장 신고", value: "3대" },
  { label: "세탁정지", value: "4명" },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {summaryItems.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl bg-[#ececef] px-6 py-5 text-center"
        >
          <p className="text-sm text-[#8c8c92]">{item.label}</p>
          <strong className="mt-2 block text-[18px] font-bold text-[#3e3e43]">
            {item.value}
          </strong>
        </article>
      ))}
    </div>
  );
}
