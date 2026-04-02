import { Search } from "lucide-react";

export default function ReportFilterPanel() {
  return (
    <section className="admin-panel">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-medium text-[#4A4A4F]">필터</h2>
        <button
          type="button"
          className="text-sm font-medium text-[#B0B0B6]"
        >
          초기화
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <div className="relative">
          <input
            type="text"
            placeholder="학생 이름, 학번을 입력해주세요"
            className="h-11 w-full rounded-xl border border-[#D9D9DE] bg-white pl-4 pr-11 text-sm text-[#4A4A4F] outline-none placeholder:text-[#B0B0B6]"
          />
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9AA0]"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-[#4A4A4F]">상태</p>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex h-8 min-w-[52px] items-center justify-center rounded-lg border border-[#D9D9DE] bg-white px-3 text-sm text-[#7A7A80]">
              대기
            </button>
            <button className="inline-flex h-8 min-w-[60px] items-center justify-center rounded-lg border border-[#D9D9DE] bg-white px-3 text-sm text-[#7A7A80]">
              처리중
            </button>
            <button className="inline-flex h-8 min-w-[78px] items-center justify-center rounded-lg border border-[#D9D9DE] bg-white px-3 text-sm text-[#7A7A80]">
              처리 완료
            </button>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-[#4A4A4F]">층</p>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex h-8 min-w-[40px] items-center justify-center rounded-lg border border-[#D9D9DE] bg-white px-3 text-sm text-[#7A7A80]">
              2
            </button>
            <button className="inline-flex h-8 min-w-[40px] items-center justify-center rounded-lg bg-[#4D83F6] px-3 text-sm text-white">
              3
            </button>
            <button className="inline-flex h-8 min-w-[40px] items-center justify-center rounded-lg border border-[#D9D9DE] bg-white px-3 text-sm text-[#7A7A80]">
              4
            </button>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-[#4A4A4F]">성별</p>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex h-8 min-w-[52px] items-center justify-center rounded-lg border border-[#D9D9DE] bg-white px-3 text-sm text-[#7A7A80]">
              남자
            </button>
            <button className="inline-flex h-8 min-w-[52px] items-center justify-center rounded-lg border border-[#D9D9DE] bg-white px-3 text-sm text-[#7A7A80]">
              여자
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}