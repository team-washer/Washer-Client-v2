import { Search } from "lucide-react";
import type { ReactNode } from "react";

interface FilterPanelShellProps {
  children?: ReactNode;
}

export function FilterChip({
  label,
  active = false,
  minWidthClass = "min-w-[44px]",
}: {
  label: string;
  active?: boolean;
  minWidthClass?: string;
}) {
  return (
    <button
      type="button"
      className={[
        "inline-flex h-[30px] items-center justify-center rounded-[9px] px-3 text-[13px] font-medium transition-colors",
        minWidthClass,
        active
          ? "border border-[#4D83F6] bg-[#4D83F6] text-white"
          : "border border-[#D5D5DB] bg-white text-[#8C8C93]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function FilterPanelShell({
  children,
}: FilterPanelShellProps) {
  return (
    <section className="admin-panel flex h-full min-h-0 flex-col rounded-3xl px-5 py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold leading-6 text-[#4A4A4F]">
          필터
        </h2>

        <button
          type="button"
          className="text-[13px] font-medium text-[#C0C0C6] transition-colors hover:text-[#8E8E95]"
        >
          초기화
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-5">
        <div className="relative">
          <input
            type="text"
            placeholder="학생 이름, 학번을 입력해주세요"
            className="h-[42px] w-full rounded-[10px] border border-[#BFC0C6] bg-white pl-4 pr-10 text-[14px] text-[#4A4A4F] outline-none placeholder:text-[#B4B4BA]"
          />
          <Search
            size={17}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8F8F96]"
          />
        </div>

        {children}

        <div>
          <p className="mb-3 text-[14px] font-medium text-[#4A4A4F]">층</p>
          <div className="flex flex-wrap gap-2">
            <FilterChip label="2" />
            <FilterChip label="3" active />
            <FilterChip label="4" />
          </div>
        </div>

        <div>
          <p className="mb-3 text-[14px] font-medium text-[#4A4A4F]">성별</p>
          <div className="flex flex-wrap gap-2">
            <FilterChip label="남자" minWidthClass="min-w-[48px]" />
            <FilterChip label="여자" minWidthClass="min-w-[48px]" />
          </div>
        </div>
      </div>
    </section>
  );
}