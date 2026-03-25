import type { PropsWithChildren } from "react";
import Header from "../Header";
import DashboardTabs from "../DashboardTabs";
export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-[#F4F5F9]">
      <Header />

      <section className="mx-auto w-full max-w-[1350px] px-8 py-7">
        <div className="sticky top-16 z-40 mb-4 bg-[#F4F5F9] pb-4">
          <DashboardTabs />
        </div>

        {children}
      </section>
    </main>
  );
}
