"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useApplyUserPenalty } from "@/entities/user";

interface ApplyUserPenaltyModalProps {
  open: boolean;
  userId: number;
  userName: string;
  room: string;
  onClose: () => void;
}

export default function ApplyUserPenaltyModal({
  open,
  userId,
  userName,
  room,
  onClose,
}: ApplyUserPenaltyModalProps) {
  const [reason, setReason] = useState("");
  const { mutateAsync, isPending } = useApplyUserPenalty();

  useEffect(() => {
    if (!open) setReason("");
  }, [open]);

  if (!open) return null;

  const trimmedReason = reason.trim();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!trimmedReason) return;

    try {
      await mutateAsync({ userId, reason: trimmedReason });
      toast.success("세탁 패널티가 부과되었습니다.");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "패널티 부과에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="presentation">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-[#4A4A4F]">세탁 패널티 부과</h2>
        <p className="mt-2 text-sm text-[#71717A]">
          {userName} · {room}호실에 48시간 세탁 예약 차단을 부과합니다.
        </p>
        <label htmlFor="penalty-reason" className="mt-5 block text-sm font-medium text-[#4A4A4F]">
          부과 사유
        </label>
        <textarea
          id="penalty-reason"
          value={reason}
          onChange={(event) => setReason(event.target.value.slice(0, 200))}
          placeholder="패널티를 부과하는 사유를 입력하세요."
          maxLength={200}
          required
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-[#E1E1E6] p-3 text-sm outline-none focus:border-[#EF4B4F]"
        />
        <p className="mt-1 text-right text-xs text-[#9A9AA0]">{reason.length}/200</p>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-full px-4 py-2 text-sm text-[#71717A]">
            취소
          </button>
          <button type="submit" disabled={isPending || !trimmedReason} className="rounded-full bg-[#EF4B4F] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
            {isPending ? "부과 중..." : "패널티 부과"}
          </button>
        </div>
      </form>
    </div>
  );
}
