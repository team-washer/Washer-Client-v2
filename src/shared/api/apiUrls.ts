export const authUrl = {
  refresh: () => "/api/v2/auth/refresh",
  login: () => "/api/v2/auth/login",
} as const;

export const reportUrl = {
  getMalfunctionReports: () => "/api/v2/admin/malfunction-reports",
} as const;

export const machineUrl = {
  getMachines: () => "/api/v2/admin/machines",
} as const;

export const reservationUrl = {
  getReservations: () => "/api/v2/admin/reservations",
} as const;

export const userUrl = {
  getUsers: () => "/api/v2/admin/users",
  getMyInfo: () => "/api/v2/users/my",
} as const;
