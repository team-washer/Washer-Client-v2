import FilterPanelShell, {
    FilterChip,
  } from "@/shared/ui/admin/FilterPanelShell";
  
  export default function ReportFilterPanel() {
    return (
      <FilterPanelShell>
        <div>
          <p className="mb-3 text-[14px] font-medium text-[#4A4A4F]">상태</p>
          <div className="flex flex-wrap gap-2">
            <FilterChip label="대기" minWidthClass="min-w-[62px]" />
            <FilterChip label="처리중" minWidthClass="min-w-[62px]" />
            <FilterChip label="처리 완료" minWidthClass="min-w-[80px]" />
          </div>
        </div>
      </FilterPanelShell>
    );
  }