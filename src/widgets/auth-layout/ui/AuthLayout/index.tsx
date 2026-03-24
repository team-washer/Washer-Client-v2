import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex min-h-screen bg-[#f6f7fb]">
      <section className="flex flex-1 items-center justify-center px-6">
        {children}
      </section>

      <aside className="pointer-events-none fixed right-8 top-8 flex w-[320px] flex-col gap-4">
        <div className="rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                i
              </div>
              <p className="text-sm font-medium text-[#333]">
                로그인이 완료되었습니다
              </p>
            </div>
            <button
              type="button"
              className="pointer-events-auto text-lg leading-none text-[#777]"
            >
              ×
            </button>
          </div>
          <div className="h-1 w-full rounded-b-xl bg-green-600" />
        </div>

        <div className="rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                !
              </div>
              <p className="text-sm font-medium text-[#333]">
                비밀번호 혹은 이메일이 맞지 않습니다
              </p>
            </div>
            <button
              type="button"
              className="pointer-events-auto text-lg leading-none text-[#777]"
            >
              ×
            </button>
          </div>
          <div className="h-1 w-full rounded-b-xl bg-red-500" />
        </div>
      </aside>
    </main>
  );
};

export default AuthLayout;
