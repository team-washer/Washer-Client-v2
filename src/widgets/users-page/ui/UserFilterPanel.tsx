import {
    FilterPanelShell,
    FilterSearchField,
    FloorGenderFilters,
  } from "@/shared/ui/admin/Filter";
  
  interface UserFilterPanelProps {
  floor?: number;
  onFloorChange?: (floor: number | undefined) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
}

export default function UserFilterPanel({
  floor,
  onFloorChange,
  search,
  onSearchChange,
}: UserFilterPanelProps) {
  return (
    <FilterPanelShell>
      <FilterSearchField value={search} onChange={onSearchChange} />
      <FloorGenderFilters selectedFloor={floor} onFloorChange={onFloorChange} />
    </FilterPanelShell>
  );
}