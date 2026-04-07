import FilterChip from "./FilterChip";

export default function FloorGenderFilters() {
  return (
    <>
      <div>
        <p className="admin-filter-label">층</p>
        <div className="admin-filter-options">
          <FilterChip label="2" />
          <FilterChip label="3" active />
          <FilterChip label="4" />
        </div>
      </div>

      <div>
        <p className="admin-filter-label">성별</p>
        <div className="admin-filter-options">
          <FilterChip label="남자" minWidthClass="min-w-[48px]" />
          <FilterChip label="여자" minWidthClass="min-w-[48px]" />
        </div>
      </div>
    </>
  );
}