import {
    FilterPanelShell,
    FilterSearchField,
    FloorGenderFilters,
  } from "@/shared/ui/admin/Filter";
  
  export default function UserFilterPanel() {
    return (
      <FilterPanelShell>
        <FilterSearchField />
        <FloorGenderFilters />
      </FilterPanelShell>
    );
  }