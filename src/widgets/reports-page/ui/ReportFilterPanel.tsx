import FilterPanelShell from "@/shared/ui/admin/FilterPanelShell";

export default function ReportFilterPanel() {
  return (
    <FilterPanelShell>
      <div>
        <p className="mb-3 text-sm font-medium text-[#4A4A4F]">상태</p>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex h-9 min-w-[52px] items-center justify-center rounded-lg border border-[#D9D9DE] bg-white px-3 text-sm text-[#7A7A80]">
            대기
          </button>
          <button className="inline-flex h-9 min-w-[60px] items-center justify-center rounded-lg border border-[#D9D9DE] bg-white px-3 text-sm text-[#7A7A80]">
            처리중
          </button>
          <button className="inline-flex h-9 min-w-[78px] items-center justify-center rounded-lg border border-[#D9D9DE] bg-white px-3 text-sm text-[#7A7A80]">
            처리 완료
          </button>
        </div>
      </div>
    </FilterPanelShell>
  );
}