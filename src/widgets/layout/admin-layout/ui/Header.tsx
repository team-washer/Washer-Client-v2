import { LogOut } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E9EE] bg-[#FDFDFD]">
      <div className="layout-container flex h-16 items-center justify-between">
        <Image src="/logo.svg" alt="Washer" width={120} height={28} />
        <button className="text-[#EF4B4F]">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
