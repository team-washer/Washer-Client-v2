"use client";

import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getRoleBasedLayoutState, useGetMyInfo } from "@/entities/user";
import { APP_ERROR_TYPE, AppError, clearAuthSession } from "@/shared";
import AdminLayout from "@/widgets/layout/admin-layout/ui/AdminLayout";
import UserLayout from "@/widgets/layout/user-layout/ui/UserLayout";

interface RoleBasedLayoutProps {
  children: React.ReactNode;
}

export default function RoleBasedLayout({ children }: RoleBasedLayoutProps) {
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

    if (layoutState === "user" && pathname !== "/") {
      router.replace("/");
    }
  }, [error, layoutState, pathname, queryClient, router]);

  if (layoutState === "loading") {
    return <RoleBasedLayoutFallback />;
  }

  if (layoutState === "error") {
    return (
      <RoleBasedAccessFallback
        error={error}
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (layoutState === "user" && pathname === "/") {
    return <UserLayout>{children}</UserLayout>;
  }

  if (layoutState === "user") {
    return <RoleBasedLayoutFallback />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

function RoleBasedLayoutFallback() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#F4F5F9]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E9E9EE] border-t-blue-500" />
    </main>
  );
}

interface RoleBasedAccessFallbackProps {
  error: unknown;
  onRetry: () => void;
}

function RoleBasedAccessFallback({
  error,
  onRetry,
}: RoleBasedAccessFallbackProps) {
  const message =
    error instanceof AppError
      ? error.message
      : "사용자 정보를 확인하지 못했습니다.";

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-[#F4F5F9]">
      <p className="text-sm text-gray-600">{message}</p>
      <button
        type="button"
        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white"
        onClick={onRetry}
      >
        다시 시도
      </button>
    </main>
  );
}
