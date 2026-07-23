import { useQuery } from "@tanstack/react-query";
import { dashboardQueryKeys } from "@/shared/api";
import { getDashboardSummary } from "./getDashboardSummary";

interface UseGetDashboardSummaryOptions {
  enabled?: boolean;
}

export const useGetDashboardSummary = ({
  enabled = true,
}: UseGetDashboardSummaryOptions = {}) => {
  return useQuery({
    queryKey: dashboardQueryKeys.summary(),
    queryFn: getDashboardSummary,
    enabled,
  });
};
