"use client";

import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRoleBasedLayoutState, useGetMyInfo } from "@/entities/user";
import { APP_ERROR_TYPE, AppError, clearAuthSession } from "@/shared";
import { Button } from "@/shared/ui/button";
import UserLayout from "@/widgets/layout/user-layout/ui/UserLayout";
import NotificationsPage from "@/widgets/notifications/NotificationsPage";

export default function UserNotificationsRoute() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, error, isPending, isError, refetch } = useGetMyInfo();
  const layoutState = getRoleBasedLayoutState({
    isPending,
    isError,
    role: data?.data?.role,
  });

  useEffect(() => {
    if (
      layoutState === "error" &&
      error instanceof AppError &&
      error.type === APP_ERROR_TYPE.AUTHENTICATION
    ) {
      clearAuthSession(queryClient);
      router.replace("/sign-in");
      return;
    }

    if (layoutState === "admin" && pathname === "/notifications") {
      router.replace("/");
    }
  }, [error, layoutState, pathname, queryClient, router]);

  if (layoutState === "loading" || layoutState === "admin") {
    return <NotificationsRouteFallback message="접근 권한을 확인하는 중..." />;
  }

  if (layoutState === "error") {
    return (
      <NotificationsRouteFallback
        message={
          error instanceof AppError
            ? error.message
            : "사용자 정보를 확인하지 못했습니다."
        }
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <UserLayout>
      <NotificationsPage />
    </UserLayout>
  );
}

interface NotificationsRouteFallbackProps {
  message: string;
  onRetry?: () => void;
}

function NotificationsRouteFallback({
  message,
  onRetry,
}: NotificationsRouteFallbackProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">{message}</p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            다시 시도
          </Button>
        )}
      </div>
    </main>
  );
}
