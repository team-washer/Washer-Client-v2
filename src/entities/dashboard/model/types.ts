export type DashboardSummaryDTO = {
    activeReservations: number;
    pendingMalfunctionReports: number;
    processingMalfunctionReports: number;
    completedMalfunctionReports: number;
    totalMachines: number;
    malfunctionMachines: number;
    suspendedStudents: number;
  };
  
  export type DashboardItem = {
    label: string;
    value: string;
  };