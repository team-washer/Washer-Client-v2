import type { PropsWithChildren } from "react";
import RoleBasedLayout from "./RoleBasedLayout";

export default function AdminGroupLayout({ children }: PropsWithChildren) {
  return <RoleBasedLayout>{children}</RoleBasedLayout>;
}
