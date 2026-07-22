"use client";

import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { toast } from "sonner";
import { useGetMyInfo } from "@/entities/user";
import { clearAuthSession } from "@/shared";

export default function Header() {
  const queryClient = useQueryClient();
  const { data: myInfoData } = useGetMyInfo();

  const myInfo = myInfoData?.data;

  const handleLogout = useCallback(() => {
    clearAuthSession(queryClient);
    window.location.replace("/sign-in");
  }, [queryClient]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E9EE] bg-[#FDFDFD]">
      <div className="layout-container flex h-16 items-center justify-between px-4">
        <Image src="/logo.svg" alt="Washer" width={120} height={28} />

        <div className="flex items-center gap-3">
          {myInfo && (
            <div className="text-right leading-tight">
              <p className="text-[14px] font-semibold text-[#4A4A4F]">
                {myInfo.studentId} {myInfo.name}
              </p>

              <p className="mt-1 text-[14px] font-semibold text-[#EF4B4F]">
                {myInfo.roomNumber}호 |{" "}
                {myInfo.role !== "USER" ? "관리자" : "사용자"}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              toast.success("로그아웃 되었습니다.");
              handleLogout();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EA3B4240] text-[#EF4B4F] transition-colors hover:bg-[#FFEAEA]"
            aria-label="로그아웃"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}