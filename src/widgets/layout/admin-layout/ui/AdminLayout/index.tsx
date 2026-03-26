import type { PropsWithChildren } from "react";
import DashboardTabs from "../DashboardTabs";
import Header from "../Header";
import SummaryCards from "../SummaryCards";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-[#F4F5F9]">
      <Header />

      <section className="layout-container py-7">
        <div className="sticky top-16 z-40 mb-4 bg-[#F4F5F9] pb-4">
          <DashboardTabs />
        </div>

        <div className="mb-6">
          <SummaryCards />
        </div>

        {children}
      </section>
    </main>
  );
}
