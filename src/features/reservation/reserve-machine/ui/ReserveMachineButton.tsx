"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { UserMachine } from "@/entities/machine";
import {
  RESERVED_TIMEOUT_MINUTES,
  type ReserveBlockReason,
  usePostReservation,
} from "@/entities/reservation";
import { Button } from "@/shared/ui/button";
import { getReserveBlockMessage } from "../lib/reserveBlockMessage";

interface ReserveMachineButtonProps {
  machine: UserMachine;
  // 예약 가능 여부를 아직 확인하지 못했으면 undefined
  blockReason: ReserveBlockReason | null | undefined;
  penaltyExpiresAt: string | null;
}

export default function ReserveMachineButton({
  machine,
  blockReason,
  penaltyExpiresAt,
}: ReserveMachineButtonProps) {
  const { mutate, isPending } = usePostReservation();
  const isRestricted = blockReason === "BANNED" || blockReason === "PENALTY";

  const handleReserve = () => {
    if (blockReason) {
      toast.error("예약 불가", {
        description: getReserveBlockMessage(blockReason, penaltyExpiresAt),
      });
      return;
    }

    mutate(machine.id, {
      onSuccess: () => {
        toast.success("예약 성공", {
          description: `${machine.type === "WASHER" ? "세탁기" : "건조기"}가 예약되었습니다. ${RESERVED_TIMEOUT_MINUTES}분 이내에 기기를 시작해주세요.`,
        });
      },
      onError: (error) => {
        toast.error("예약 실패", { description: error.message });
      },
    });
  };

  return (
    <Button
      onClick={handleReserve}
      disabled={isPending || blockReason !== null}
      className="flex-1 bg-[#86A9FF] py-2 text-sm text-white hover:bg-[#6487DB] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          예약 중...
        </>
      ) : (
        <>
          <CheckCircle className="mr-2 h-4 w-4" />
          {isRestricted ? "정지됨" : "예약하기"}
        </>
      )}
    </Button>
  );
}
