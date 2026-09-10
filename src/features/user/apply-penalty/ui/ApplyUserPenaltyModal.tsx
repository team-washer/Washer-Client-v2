"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useApplyUserPenalty } from "@/entities/user";
import { applyUserPenaltySchema, type ApplyUserPenaltyFormValues } from "../model/schema";

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
  const { mutateAsync, isPending } = useApplyUserPenalty();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ApplyUserPenaltyFormValues>({
    resolver: zodResolver(applyUserPenaltySchema),
    defaultValues: { reason: "" },
  });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  if (!open) return null;

  const onSubmit = async ({ reason }: ApplyUserPenaltyFormValues) => {
    try {
      await mutateAsync({ userId, reason });
      toast.success("세탁 패널티가 부과되었습니다.");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "패널티 부과에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="presentation">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" noValidate>
        <h2 className="text-lg font-semibold text-[#4A4A4F]">세탁 패널티 부과</h2>
        <p className="mt-2 text-sm text-[#71717A]">
          {userName} · {room}호실에 48시간 세탁 예약 차단을 부과합니다.
        </p>
        <label htmlFor="penalty-reason" className="mt-5 block text-sm font-medium text-[#4A4A4F]">
          부과 사유
        </label>
        <textarea
          id="penalty-reason"
          {...register("reason")}
          placeholder="패널티를 부과하는 사유를 입력하세요."
          maxLength={200}
          required
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-[#E1E1E6] p-3 text-sm outline-none focus:border-[#EF4B4F]"
        />
        {errors.reason && <p className="mt-1 text-xs text-[#EF4B4F]">{errors.reason.message}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-full px-4 py-2 text-sm text-[#71717A]">
            취소
          </button>
          <button type="submit" disabled={isPending} className="rounded-full bg-[#EF4B4F] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
            {isPending ? "부과 중..." : "패널티 부과"}
          </button>
        </div>
      </form>
    </div>
  );
}
