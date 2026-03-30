import type { PropsWithChildren } from "react";
import DashboardTabs from "../DashboardTabs";
import Header from "../Header";
import SummaryCards from "../SummaryCards";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <main className="bg-[#F4F5F9] xl:flex xl:h-screen xl:min-h-0 xl:flex-col">
      <Header />

      <section className="layout-container py-7 xl:flex xl:min-h-0 xl:flex-1 xl:flex-col">
        <div className="shrink-0">
          <div className="sticky top-16 z-40 mb-4 bg-[#F4F5F9] pb-4">
            <DashboardTabs />
          </div>

          <div className="mb-6">
            <SummaryCards />
          </div>
        </div>

        <div className="xl:min-h-0 xl:flex-1">
          {children}
        </div>
      </section>
    </main>
  );
}