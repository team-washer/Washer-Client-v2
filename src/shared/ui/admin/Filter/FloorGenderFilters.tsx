import FilterChip from "./FilterChip";

interface FloorFiltersProps {
  selectedFloor?: number;
  onFloorChange?: (floor: number | undefined) => void;
}

export default function FloorGenderFilters({
  selectedFloor,
  onFloorChange,
}: FloorFiltersProps) {
  const handleFloorClick = (floor: number) => {
    if (onFloorChange) {
      onFloorChange(selectedFloor === floor ? undefined : floor);
    }
  };

  return (
    <div>
      <p className="admin-filter-label">층</p>
      <div className="admin-filter-options">
        <FilterChip
          label="3"
          active={selectedFloor === 3}
          onClick={() => handleFloorClick(3)}
        />
        <FilterChip
          label="4"
          active={selectedFloor === 4}
          onClick={() => handleFloorClick(4)}
        />
      </div>
    </div>
  );
}
