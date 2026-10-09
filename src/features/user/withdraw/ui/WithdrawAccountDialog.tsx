"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AppError } from "@/shared";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useWithdrawMyAccount } from "../api/useWithdrawMyAccount";

export default function WithdrawAccountDialog() {
  const [open, setOpen] = useState(false);
  const withdrawMutation = useWithdrawMyAccount();

  const handleWithdraw = () => {
    withdrawMutation.mutate(undefined, {
      onError: (error) => {
        toast.error("회원 탈퇴에 실패했습니다.", {
          description:
            error instanceof AppError
              ? error.message
              : "잠시 후 다시 시도해 주세요.",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">회원 탈퇴</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원 탈퇴</DialogTitle>
          <DialogDescription>
            계정을 탈퇴하면 예약 및 이용 정보에 더 이상 접근할 수 없습니다. 이
            작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={withdrawMutation.isPending}>
              취소
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={withdrawMutation.isPending}
            onClick={handleWithdraw}
          >
            {withdrawMutation.isPending ? "탈퇴 처리 중..." : "탈퇴하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
