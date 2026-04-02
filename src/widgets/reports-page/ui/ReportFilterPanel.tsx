import {
    FilterChip,
    FilterPanelShell,
    FilterSearchField,
    FloorGenderFilters,
  } from "@/shared/ui/admin/Filter";
  
  export default function ReportFilterPanel() {
    return (
      <FilterPanelShell>
        <FilterSearchField />
  
        <div>
          <p className="admin-filter-label">상태</p>
          <div className="admin-filter-options">
            <FilterChip label="대기" minWidthClass="min-w-[62px]" />
            <FilterChip label="처리중" minWidthClass="min-w-[62px]" />
            <FilterChip label="처리 완료" minWidthClass="min-w-[80px]" />
          </div>
        </div>
  
        <FloorGenderFilters />
      </FilterPanelShell>
    );
  }