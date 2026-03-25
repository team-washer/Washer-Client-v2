import type { PropsWithChildren } from "react";
import Header from "../Header";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-[#f3f3f5]">
      <Header />

      <section className="mx-auto w-full max-w-[1080px] px-6 py-7">
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;
