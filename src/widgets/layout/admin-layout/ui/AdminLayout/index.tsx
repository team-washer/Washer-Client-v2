"use client";

import type { PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";

import { getDashboardSummary } from "@/entities/dashboard";
import { mapDashboard } from "@/entities/dashboard";
import DashboardTabs from "../DashboardTabs";
import Header from "../Header";
import SummaryCards from "../SummaryCards";

export default function AdminLayout({ children }: PropsWithChildren) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary,
  });

  const summaryItems = data ? mapDashboard(data) : [];

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

        <div className="xl:min-h-0 xl:flex-1">
          {children}
        </div>
      </section>
    </main>
  );
}