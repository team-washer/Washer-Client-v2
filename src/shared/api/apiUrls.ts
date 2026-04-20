export const authUrl = {
  refresh: () => "/api/v2/auth/refresh",
  login: () => "/api/v2/auth/login",
} as const;

export const reportUrl = {
  getMalfunctionReports: () => "/api/v2/admin/malfunction-reports",
} as const;

// 개별 상수로 분리하여 확실하게 정의
const getMachines = () => "/api/v2/admin/machines";
const updateMachineStatus = (id: number) => `/api/v2/admin/machines/${id}/status`;

export const machineUrl = {
  getMachines,
  updateMachineStatus,
} as const;

export const reservationUrl = {
  getReservations: () => "/api/v2/admin/reservations",
  getReservationDetail: (id: number) => `/api/v2/reservations/${id}`,
  getMachineReservationHistory: () =>
    "/api/v2/admin/reservations/machines/history",
  deleteReservation: (id: number) => `/api/v2/admin/reservations/${id}`,
} as const;

export const userUrl = {
  getUsers: () => "/api/v2/admin/users",
  getMyInfo: () => "/api/v2/users/my",
} as const;
