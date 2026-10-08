"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserHomeKind, useGetMyInfo } from "@/entities/user";
import AdminLayout from "@/widgets/layout/admin-layout/ui/AdminLayout";
import UserLayout from "@/widgets/layout/user-layout/ui/UserLayout";

interface RoleBasedLayoutProps {
  children: React.ReactNode;
}

export default function RoleBasedLayout({ children }: RoleBasedLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending, isError } = useGetMyInfo();
  const isUser =
    !isPending &&
    !isError &&
    data?.data &&
    getUserHomeKind(data.data.role) === "user";

  useEffect(() => {
    if (isUser && pathname !== "/") {
      router.replace("/");
    }
  }, [isUser, pathname, router]);

  if (isPending) {
    return <RoleBasedLayoutFallback />;
  }

  if (isUser && pathname === "/") {
    return <UserLayout>{children}</UserLayout>;
  }

  if (isUser) {
    return <RoleBasedLayoutFallback />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

function RoleBasedLayoutFallback() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#F4F5F9]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E9E9EE] border-t-blue-500" />
    </main>
  );
}
