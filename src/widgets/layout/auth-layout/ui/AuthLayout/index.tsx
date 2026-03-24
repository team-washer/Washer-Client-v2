import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex min-h-screen bg-[#f6f7fb]">
      <section className="flex flex-1 items-center justify-center px-6">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
