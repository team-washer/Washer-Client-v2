"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "메인", href: "/" },
  { label: "기기 관리", href: "/machines" },
  { label: "예약 관리", href: "/reservations" },
  { label: "사용자 관리", href: "/users" },
  { label: "신고 관리", href: "/reports" },
];

export default function DashboardTabs() {
  const pathname = usePathname();

  return (
    <nav className="grid grid-cols-5 gap-2 rounded-xl bg-[#FDFDFD] p-2">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              "flex h-10 items-center justify-center rounded-lg text-sm font-medium transition",
              isActive
                ? "bg-[#4d83f6] text-white"
                : "text-[#8b8b90] hover:bg-white/60",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
