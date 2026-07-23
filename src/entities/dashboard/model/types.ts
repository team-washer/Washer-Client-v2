import type { z } from "zod";
import type { dashboardSummarySchema } from "../api/schemas";

export type DashboardSummaryDTO = z.infer<typeof dashboardSummarySchema>;

export interface DashboardItem {
  label: string;
  value: string;
}
