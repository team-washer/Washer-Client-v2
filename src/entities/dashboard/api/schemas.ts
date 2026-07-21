import { z } from "zod";

export const dashboardSummarySchema = z.object({
  activeReservations: z.number(),
  pendingMalfunctionReports: z.number(),
  processingMalfunctionReports: z.number(),
  completedMalfunctionReports: z.number(),
  totalMachines: z.number(),
  malfunctionMachines: z.number(),
  suspendedStudents: z.number(),
});