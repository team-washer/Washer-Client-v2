interface UserRowActionsProps {
  isRestrictedCase?: boolean;
}

export default function UserRowActions({
  isRestrictedCase = false,
}: UserRowActionsProps) {
  if (isRestrictedCase) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="inline-flex h-7 min-w-[54px] items-center justify-center rounded-full bg-[#EF4B4F] px-3 text-xs font-semibold text-white"
        >
          연장
        </button>

        <button
          type="button"
          className="inline-flex h-7 min-w-[54px] items-center justify-center rounded-full bg-[#4D83F6] px-3 text-xs font-semibold text-white"
        >
          해제
        </button>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        className="inline-flex h-7 min-w-[76px] items-center justify-center rounded-full bg-[#EF4B4F] px-3 text-xs font-semibold text-white"
      >
        세탁 정지
      </button>
    </div>
  );
}