"use client";

import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { COOKIE_KEYS } from "@/shared";
import { deleteCookie } from "@/shared/utils/cookies";

export default function Header() {
  const queryClient = useQueryClient();
  const handleLogout = () => {
    queryClient.clear();

    deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
    deleteCookie(COOKIE_KEYS.REFRESH_TOKEN);

    toast.success("로그아웃 되었습니다.");

    // 페이지 새로고침
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E9EE] bg-[#FDFDFD]">
      <div className="layout-container flex h-16 items-center justify-between px-4">
        <Image src="/logo.svg" alt="Washer" width={120} height={28} />
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#EF4B4F] hover:opacity-80 transition-opacity cursor-pointer"
          title="로그아웃"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
