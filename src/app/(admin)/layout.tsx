import type { PropsWithChildren } from "react";
import AdminLayout from "@/widgets/layout/admin-layout/ui/AdminLayout";

export default function AdminGroupLayout({ children }: PropsWithChildren) {
  return <AdminLayout>{children}</AdminLayout>;
}
