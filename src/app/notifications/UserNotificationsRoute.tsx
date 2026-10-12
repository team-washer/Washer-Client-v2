"use client";

import UserRouteGuard from "@/widgets/layout/user-layout/ui/UserRouteGuard";
import NotificationsPage from "@/widgets/notifications/NotificationsPage";

export default function UserNotificationsRoute() {
  return (
    <UserRouteGuard>
      <NotificationsPage />
    </UserRouteGuard>
  );
}
