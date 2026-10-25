import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-dvh bg-[#F4F5F9]">
      <section className="flex w-full flex-1 items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
        {children}
      </section>
    </main>
  );
}
