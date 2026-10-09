import type { PropsWithChildren } from "react";
import UserNavbar from "../UserNavbar";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <UserNavbar />
      {children}
    </div>
  );
}
