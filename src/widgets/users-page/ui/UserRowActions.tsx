import { useState } from "react";
import { useDeleteUserPenalty } from "@/entities/user";
import type { UserRole } from "@/entities/user";
import { ApplyUserPenaltyModal } from "@/features/user/apply-penalty";
import { ExtendUserPenaltyModal } from "@/features/user/extend-penalty";

interface UserRowActionsProps {
  userId: number;
  userName: string;
  room: string;
  role?: UserRole;
  isRestrictedCase?: boolean;
}

export default function UserRowActions({ userId, userName, room, role, isRestrictedCase = false }: UserRowActionsProps) {
  const { mutate: deleteUserPenalty, isPending } = useDeleteUserPenalty();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const canApplyPenalty = role === "ADMIN" || role === "DORMITORY_COUNCIL";
  const canManagePenalty = role === "ADMIN";

  const handleRelease = () => {
    if (!window.confirm("이 사용자의 세탁 정지(패널티)를 해제하시겠습니까?")) return;
    deleteUserPenalty(userId);
  };

  if (!canApplyPenalty) return null;

  return (
    <>
      <div className="flex shrink-0 items-center gap-2">
        <button type="button" onClick={() => setIsApplyModalOpen(true)} className="inline-flex h-7 min-w-[76px] cursor-pointer items-center justify-center rounded-full bg-[#EF4B4F] px-3 text-xs font-semibold text-white transition-opacity hover:opacity-90">
            세탁 정지
        </button>
        {isRestrictedCase && canManagePenalty && (
          <>
            <button type="button" onClick={() => setIsExtendModalOpen(true)} className="inline-flex h-7 min-w-[54px] cursor-pointer items-center justify-center rounded-full bg-[#EF4B4F] px-3 text-xs font-semibold text-white">연장</button>
            <button type="button" onClick={handleRelease} disabled={isPending} className="inline-flex h-7 min-w-[54px] cursor-pointer items-center justify-center rounded-full bg-[#4D83F6] px-3 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">해제</button>
          </>
        )}
      </div>
      <ApplyUserPenaltyModal open={isApplyModalOpen} userId={userId} userName={userName} room={room} onClose={() => setIsApplyModalOpen(false)} />
      <ExtendUserPenaltyModal open={isExtendModalOpen} userId={userId} userName={userName} onClose={() => setIsExtendModalOpen(false)} />
    </>
  );
}
