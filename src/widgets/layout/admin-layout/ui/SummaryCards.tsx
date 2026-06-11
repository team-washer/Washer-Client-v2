interface SummaryCardItem {
  label: string;
  value: string;
}

interface SummaryCardsProps {
  items: SummaryCardItem[];
}

export default function SummaryCards({ items }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-xl bg-[#FDFDFD] px-6 py-5 text-center"
        >
          <p className="text-[#969696]">{item.label}</p>
          <strong className="mt-1 block text-2xl font-medium text-[#494949]">
            {item.value}
          </strong>
        </article>
      ))}
    </div>
  );
}
