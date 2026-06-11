"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, type PropsWithChildren } from "react";
import { toast } from "sonner";
import { COOKIE_KEYS } from "@/shared";
import { deleteCookie } from "@/shared/utils/cookies";
import { useGetMyInfo } from "@/entities/user";
import { getDashboardSummary, mapDashboard } from "@/entities/dashboard";
import DashboardTabs from "../DashboardTabs";
import Header from "../Header";
import SummaryCards from "../SummaryCards";

export default function AdminLayout({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const { data: myInfoData, isLoading: isMyInfoLoading } = useGetMyInfo();
  const myInfo = myInfoData?.data;

  useEffect(() => {
    if (myInfo && myInfo.role === "USER") {
      toast.error("관리자만 접근 가능합니다.");
      queryClient.clear();
      deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
      deleteCookie(COOKIE_KEYS.REFRESH_TOKEN);
      window.location.href = "/app-download";
    }
  }, [myInfo, queryClient]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary,
    enabled: !!myInfo && myInfo.role !== "USER",
  });

  const summaryItems = data ? mapDashboard(data) : [];

  if (isMyInfoLoading || (myInfo && myInfo.role === "USER")) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#F4F5F9]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E9E9EE] border-t-blue-500" />
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
            {isLoading ? (
              <div>불러오는 중...</div>
            ) : isError ? (
              <div>데이터를 불러오지 못했습니다.</div>
            ) : (
              <SummaryCards items={summaryItems} />
            )}
          </div>
        </div>

        <div className="xl:min-h-0 xl:flex-1">{children}</div>
      </section>
    </main>
  );
}
