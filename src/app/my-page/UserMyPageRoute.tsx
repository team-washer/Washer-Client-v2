"use client";

import MyPage from "@/widgets/my-page/MyPage";
import UserRouteGuard from "@/widgets/layout/user-layout/ui/UserRouteGuard";

export default function UserMyPageRoute() {
  return (
    <UserRouteGuard>
      <MyPage />
    </UserRouteGuard>
  );
}
