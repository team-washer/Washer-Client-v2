"use client";

import { toast } from "sonner";
import { useDeleteMyReservation } from "@/entities/reservation";
import { Button } from "@/shared/ui/button";

interface CancelMyReservationButtonProps {
  reservationId: number;
}

const formatClock = (value: string): string | null => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function CancelMyReservationButton({
  reservationId,
}: CancelMyReservationButtonProps) {
  const { mutate, isPending } = useDeleteMyReservation();

  const handleCancel = () => {
    mutate(reservationId, {
      onSuccess: (result) => {
        const penaltyUntil =
          result.penaltyApplied && result.penaltyExpiresAt
            ? formatClock(result.penaltyExpiresAt)
            : null;

        toast.success("예약 취소 완료", {
          description: penaltyUntil
            ? `${penaltyUntil}까지 같은 종류의 기기를 다시 예약할 수 없습니다.`
            : "예약이 성공적으로 취소되었습니다.",
        });
      },
      onError: (error) => {
        toast.error("예약 취소 실패", {
          description: error.message || "예약 취소 중 오류가 발생했습니다.",
        });
      },
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleCancel}
      disabled={isPending}
      className="w-full border-red-500 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-500 dark:hover:bg-red-900/20"
    >
      {isPending ? "취소 중..." : "예약 취소"}
    </Button>
  );
}
