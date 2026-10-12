"use client";

import { Bell, Home, LogOut, Shirt, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { useGetNotifications } from "@/entities/notification";
import { useGetMyInfo } from "@/entities/user";
import { useLogout } from "@/features/auth/logout";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";
import { toast } from "sonner";

const navigationItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/my-page", label: "마이페이지", icon: User },
  { href: "/notifications", label: "알림", icon: Bell },
] as const;

export default function UserNavbar() {
  const pathname = usePathname();
  const logout = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: myInfoData } = useGetMyInfo();
  const { data: notifications = [] } = useGetNotifications();
  const myInfo = myInfoData?.data;

  const handleLogout = useCallback(() => {
    setIsLoggingOut(true);
    toast.success("로그아웃 되었습니다.");
    logout();
  }, [logout]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-2 px-3 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-md px-1 py-1 text-[#6487DB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86A9FF]"
          aria-label="Washer 홈"
        >
          <Shirt className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="ml-1.5 text-lg font-bold sm:ml-2 sm:text-xl">
            Washer
          </span>
        </Link>

        <div className="ml-1 flex min-w-0 flex-1 items-center gap-0.5 sm:ml-4 sm:gap-1">
          {navigationItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            const notificationCount = notifications.length;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex min-w-0 items-center gap-1 rounded-md px-2 py-2 text-xs font-medium transition-colors sm:gap-1.5 sm:px-3 sm:text-sm",
                  isActive
                    ? "bg-[#A8C2FF] text-[#6487DB]"
                    : "text-gray-600 hover:bg-[#EDF2FF]",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden truncate sm:inline">{label}</span>
                {href === "/notifications" && notificationCount > 0 && (
                  <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] leading-none text-white">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden text-right leading-tight md:block">
            <p className="text-sm font-semibold text-gray-700">
              {myInfo ? `${myInfo.studentId} ${myInfo.name}` : "사용자"}
            </p>
            {myInfo?.roomNumber && (
              <p className="mt-1 text-xs text-gray-500">
                {myInfo.roomNumber}호
              </p>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-red-100 hover:bg-red-200 sm:h-9 sm:w-9"
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-label="로그아웃"
          >
            <LogOut className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
