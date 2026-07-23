import { useDeleteUserPenalty } from "@/entities/user";

interface UserRowActionsProps {
  userId: number;
  isRestrictedCase?: boolean;
}

export default function UserRowActions({
  userId,
  isRestrictedCase = false,
}: UserRowActionsProps) {
  const { mutate: deleteUserPenalty, isPending } = useDeleteUserPenalty();

  const handleStopLaundry = () => {
    alert("아직 준비 중인 기능입니다.");
  };

  const handleExtend = () => {
    alert("아직 준비 중인 기능입니다.");
  };

  const handleRelease = () => {
    const confirmed = window.confirm(
      "이 사용자의 세탁 정지(패널티)를 해제하시겠습니까?",
    );
    if (!confirmed) return;

    deleteUserPenalty(userId);
  };

  if (isRestrictedCase) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={handleExtend}
          className="inline-flex h-7 min-w-[54px] cursor-pointer items-center justify-center rounded-full bg-[#EF4B4F] px-3 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          연장
        </button>

        <button
          type="button"
          onClick={handleRelease}
          disabled={isPending}
          className="inline-flex h-7 min-w-[54px] cursor-pointer items-center justify-center rounded-full bg-[#4D83F6] px-3 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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
        onClick={handleStopLaundry}
        className="inline-flex h-7 min-w-[76px] cursor-pointer items-center justify-center rounded-full bg-[#EF4B4F] px-3 text-xs font-semibold text-white transition-opacity hover:opacity-90"
      >
        세탁 정지
      </button>
    </div>
  );
}
