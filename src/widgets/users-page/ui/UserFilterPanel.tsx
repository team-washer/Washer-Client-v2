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
  roomSearch: string;
  onRoomSearchChange: (value: string) => void;
  onReset: () => void;
}

export default function UserFilterPanel({
  floor,
  onFloorChange,
  search,
  onSearchChange,
  roomSearch,
  onRoomSearchChange,
  onReset,
}: UserFilterPanelProps) {
  return (
    <FilterPanelShell onReset={onReset}>
      <div className="flex flex-col gap-3">
        <FilterSearchField value={search} onChange={onSearchChange} />
        <FilterSearchField
          placeholder="호실을 입력해주세요 (예: 420)"
          value={roomSearch}
          onChange={onRoomSearchChange}
        />
      </div>
      <FloorGenderFilters selectedFloor={floor} onFloorChange={onFloorChange} />
    </FilterPanelShell>
  );
}
