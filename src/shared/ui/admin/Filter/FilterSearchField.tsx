import { Search } from "lucide-react";

interface FilterSearchFieldProps {
  placeholder?: string;
}

export default function FilterSearchField({
  placeholder = "학생 이름, 학번을 입력해주세요",
}: FilterSearchFieldProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="h-[50px] w-full rounded-xl border border-[#BFC0C6] bg-white pl-4 pr-10 text-[14px] text-[#4A4A4F] outline-none placeholder:text-[#B4B4BA]"
      />
      <Search
        size={17}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8F8F96]"
      />
    </div>
  );
}