import { LogOut } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E9EE] bg-[#FDFDFD]">
      <div className="layout-container flex h-16 items-center justify-between">
        <Image src="/logo.svg" alt="Washer" width={120} height={28} />

        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="text-[14px] font-medium text-[#4A4A4F]">
              3402 김민솔
            </p>
            <p className="mt-1 text-[14px] font-medium text-[#EF4B4F]">
              511호 | 관리자
            </p>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EA3B4240] text-[#EF4B4F] transition-colors hover:bg-[#FFEAEA]"
            aria-label="로그아웃"
          >
            <LogOut size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </header>
  );
}