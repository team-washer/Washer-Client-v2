import { LogOut } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E9EE] bg-[#FDFDFD]">
      <div className="mx-auto flex h-16 w-full max-w-[1350px] items-center justify-between px-32">
        <Image src="/logo.svg" alt="Washer" width={120} height={28} />
        <button className="text-[#EF4B4F]">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
