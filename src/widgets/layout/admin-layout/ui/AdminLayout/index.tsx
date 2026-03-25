import type { PropsWithChildren } from "react";
import Header from "../Header";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-[#F4F5F9]">
      <Header />

      <section className="mx-auto w-full max-w-[1350px] px-32 py-7">
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;
