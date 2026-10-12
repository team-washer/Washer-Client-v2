import type { PropsWithChildren } from "react";

export default function UserLayout({ children }: PropsWithChildren) {
  return <main className="min-h-screen">{children}</main>;
}
