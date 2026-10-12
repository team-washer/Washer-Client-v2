export const authUrl = {
  refresh: () => "/api/v2/auth/refresh",
  login: () => "/api/v2/auth/login",
} as const;

export const reportUrl = {
  getMalfunctionReports: () => "/api/v2/admin/malfunction-reports",
  updateMalfunctionReportStatus: (id: number) =>
    `/api/v2/admin/malfunction-reports/${id}/status`,
  createMalfunctionReport: () => "/api/v2/malfunction-reports",
} as const;

// 개별 상수로 분리하여 확실하게 정의
const getMachines = () => "/api/v2/admin/machines";
const updateMachineStatus = (id: number) =>
  `/api/v2/admin/machines/${id}/status`;

export const machineUrl = {
  getMachines,
  updateMachineStatus,
  deleteMachine: (id: number) => `/api/v2/admin/machines/${id}`,
  getMachineStatuses: () => "/api/v2/machines/status",
  getMachineHistory: (id: number) => `/api/v2/machines/${id}/history`,
} as const;

export const reservationUrl = {
  getReservations: () => "/api/v2/admin/reservations",
  createProxyReservation: () => "/api/v2/admin/reservations",
  getReservationDetail: (id: number) => `/api/v2/reservations/${id}`,
  getMachineReservationHistory: () =>
    "/api/v2/admin/reservations/machines/history",
  deleteReservation: (id: number) => `/api/v2/admin/reservations/${id}`,
  createReservation: () => "/api/v2/reservations",
  cancelReservation: (id: number) => `/api/v2/reservations/${id}`,
  getActiveReservation: () => "/api/v2/reservations/active",
  getRoomActiveReservations: () => "/api/v2/reservations/active/room",
  getReservationAvailability: () => "/api/v2/reservations/availability",
  getMyReservationHistory: () => "/api/v2/reservations/history",
} as const;

export const userUrl = {
  getUsers: () => "/api/v2/admin/users",
  getMyInfo: () => "/api/v2/users/my",
  withdraw: () => "/api/v2/users/me",
  deleteUserPenalty: (userId: number) =>
    `/api/v2/admin/reservations/users/${userId}/penalty`,
  applyUserPenalty: (userId: number) =>
    `/api/v2/admin/reservations/users/${userId}/penalty`,
  extendUserPenalty: (userId: number) =>
    `/api/v2/admin/reservations/users/${userId}/penalty/block`,
} as const;

export const notificationUrl = {
  getNotifications: () => "/api/v2/notifications",
  deleteAllNotifications: () => "/api/v2/notifications",
} as const;

export const dashboardUrl = {
  getSummary: () => "/api/v2/admin/dashboard",
} as const;
