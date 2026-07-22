"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, type PropsWithChildren } from "react";
import { toast } from "sonner";
import {
  mapDashboard,
  useGetDashboardSummary,
} from "@/entities/dashboard";
import { useGetMyInfo } from "@/entities/user";
import {
  APP_ERROR_TYPE,
  AppError,
  clearAuthSession,
} from "@/shared";
import DashboardTabs from "../DashboardTabs";
import Header from "../Header";
import SummaryCards from "../SummaryCards";

export default function AdminLayout({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();

  const {
    data: myInfoData,
    error: myInfoError,
    isLoading: isMyInfoLoading,
    isError: isMyInfoError,
    refetch: refetchMyInfo,
  } = useGetMyInfo();

  const myInfo = myInfoData?.data;

  useEffect(() => {
    if (
      isMyInfoError &&
      myInfoError instanceof AppError &&
      myInfoError.type === APP_ERROR_TYPE.AUTHENTICATION
    ) {
      toast.error(myInfoError.message);

      clearAuthSession(queryClient);
      window.location.replace("/sign-in");
      return;
    }

    if (myInfo?.role === "USER") {
      toast.error("관리자만 접근 가능합니다.");
      window.location.replace("/app-download");
    }
  }, [
    myInfo,
    myInfoError,
    isMyInfoError,
    queryClient,
  ]);

  const {
    data: dashboardSummary,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useGetDashboardSummary({
    enabled: Boolean(
      myInfo &&
        myInfo.role !== "USER" &&
        !isMyInfoError,
    ),
  });

  const summaryItems = dashboardSummary
    ? mapDashboard(dashboardSummary)
    : [];

  const isAuthenticationError =
    myInfoError instanceof AppError &&
    myInfoError.type === APP_ERROR_TYPE.AUTHENTICATION;

  const isCheckingAccess =
    isMyInfoLoading ||
    isAuthenticationError ||
    myInfo?.role === "USER" ||
    (!myInfo && !isMyInfoError);

  if (isCheckingAccess) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#F4F5F9]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E9E9EE] border-t-blue-500" />
      </div>
    );
  }

  if (isMyInfoError) {
    const errorMessage =
      myInfoError instanceof AppError
        ? myInfoError.message
        : "사용자 정보를 불러오지 못했습니다.";

    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-[#F4F5F9]">
        <p className="text-sm text-gray-600">
          {errorMessage}
        </p>

        <button
          type="button"
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white"
          onClick={() => {
            void refetchMyInfo();
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <main className="bg-[#F4F5F9] xl:flex xl:h-screen xl:min-h-0 xl:flex-col">
      <Header />

      <section className="layout-container py-7 xl:flex xl:min-h-0 xl:flex-1 xl:flex-col">
        <div className="shrink-0">
          <div className="sticky top-16 z-40 mb-4 bg-[#F4F5F9] pb-4">
            <DashboardTabs />
          </div>

          <div className="mb-6">
            {isDashboardLoading ? (
              <div>불러오는 중...</div>
            ) : isDashboardError ? (
              <div>데이터를 불러오지 못했습니다.</div>
            ) : (
              <SummaryCards items={summaryItems} />
            )}
          </div>
        </div>

        <div className="xl:min-h-0 xl:flex-1">
          {children}
        </div>
      </section>
    </main>
  );
}