"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useExtendUserPenalty } from "@/entities/user";

interface ExtendUserPenaltyModalProps {
  open: boolean;
  userId: number;
  userName: string;
  onClose: () => void;
}

export default function ExtendUserPenaltyModal({ open, userId, userName, onClose }: ExtendUserPenaltyModalProps) {
  const [days, setDays] = useState(1);
  const { mutateAsync, isPending } = useExtendUserPenalty();

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutateAsync({ userId, days });
      toast.success("예약 차단 기간이 연장되었습니다.");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "예약 차단 기간 연장에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-[#4A4A4F]">패널티 기간 연장</h2>
        <p className="mt-2 text-sm text-[#71717A]">{userName} 사용자의 예약 차단 기간을 연장합니다.</p>
        <label htmlFor="penalty-days" className="mt-5 block text-sm font-medium text-[#4A4A4F]">연장 일수</label>
        <input id="penalty-days" type="number" min={1} max={30} value={days} onChange={(event) => setDays(Number(event.target.value))} required className="mt-2 w-full rounded-xl border border-[#E1E1E6] p-3 text-sm outline-none focus:border-[#EF4B4F]" />
        <p className="mt-1 text-xs text-[#9A9AA0]">1~30일까지 입력할 수 있습니다.</p>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-full px-4 py-2 text-sm text-[#71717A]">취소</button>
          <button type="submit" disabled={isPending || days < 1 || days > 30} className="rounded-full bg-[#EF4B4F] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{isPending ? "연장 중..." : "연장"}</button>
        </div>
      </form>
    </div>
  );
}
