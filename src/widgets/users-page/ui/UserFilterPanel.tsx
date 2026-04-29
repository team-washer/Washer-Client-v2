import {
  FilterPanelShell,
  FilterSearchField,
  FloorGenderFilters,
} from "@/shared/ui/admin/Filter";

interface UserFilterPanelProps {
  floor: number | undefined;
  onFloorChange: (floor: number | undefined) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export default function UserFilterPanel({
  floor,
  onFloorChange,
  search,
  onSearchChange,
  onReset,
}: UserFilterPanelProps) {
  return (
    <FilterPanelShell onReset={onReset}>
      <FilterSearchField value={search} onChange={onSearchChange} />
      <FloorGenderFilters selectedFloor={floor} onFloorChange={onFloorChange} />
    </FilterPanelShell>
  );
}
