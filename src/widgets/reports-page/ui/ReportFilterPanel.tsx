import type { ReportStatusType } from "@/entities/report";
import {
  FilterChip,
  FilterPanelShell,
  FilterSearchField,
  FloorGenderFilters,
} from "@/shared/ui/admin/Filter";

interface ReportFilterPanelProps {
  status: ReportStatusType | undefined;
  onStatusChange: (status: ReportStatusType | undefined) => void;
  search: string;
  onSearchChange: (value: string) => void;
  floor: number | undefined;
  onFloorChange: (floor: number | undefined) => void;
  onReset: () => void;
}

const ReportFilterPanel = ({
  status,
  onStatusChange,
  search,
  onSearchChange,
  floor,
  onFloorChange,
  onReset,
}: ReportFilterPanelProps) => {
  return (
    <FilterPanelShell onReset={onReset}>
      <FilterSearchField value={search} onChange={onSearchChange} />

      <div>
        <p className="admin-filter-label">상태</p>
        <div className="admin-filter-options">
          <FilterChip
            label="대기"
            minWidthClass="min-w-[62px]"
            active={status === "PENDING"}
            onClick={() => onStatusChange(status === "PENDING" ? undefined : "PENDING")}
          />
          <FilterChip
            label="처리중"
            minWidthClass="min-w-[62px]"
            active={status === "IN_PROGRESS"}
            onClick={() => onStatusChange(status === "IN_PROGRESS" ? undefined : "IN_PROGRESS")}
          />
          <FilterChip
            label="처리 완료"
            minWidthClass="min-w-[80px]"
            active={status === "RESOLVED"}
            onClick={() => onStatusChange(status === "RESOLVED" ? undefined : "RESOLVED")}
          />
        </div>
      </div>

      <FloorGenderFilters selectedFloor={floor} onFloorChange={onFloorChange} />
    </FilterPanelShell>
  );
};


export default ReportFilterPanel;