import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen bg-[#F4F5F9]">
      <section className="flex flex-1 items-center justify-center px-6">
        {children}
      </section>
    </main>
  );
}
