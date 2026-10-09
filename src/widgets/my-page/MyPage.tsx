"use client";

import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { toast } from "sonner";
import { useGetMyInfo } from "@/entities/user";
import { useLogout } from "@/features/auth/logout";
import { WithdrawAccountDialog } from "@/features/user/withdraw";
import { AppError } from "@/shared";
import { formatKstDateTime } from "@/shared/lib/kstDateTime";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  getAccountRoleLabel,
  getReservationAccessLabel,
} from "./lib/accountView";

export default function MyPage() {
  const { data, error, isPending, isError, refetch } = useGetMyInfo();
  const logout = useLogout();
  const myInfo = data?.data;

  const handleLogout = useCallback(() => {
    toast.success("로그아웃 되었습니다.");
    logout();
  }, [logout]);

  if (isPending) {
    return <MyPageFallback message="사용자 정보를 불러오는 중..." />;
  }

  if (isError || !myInfo) {
    return (
      <MyPageFallback
        message={
          error instanceof AppError
            ? error.message
            : "사용자 정보를 불러오지 못했습니다."
        }
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft />
              홈으로
            </Link>
          </Button>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut />
            로그아웃
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardDescription>내 계정</CardDescription>
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="text-2xl">{myInfo.name}</CardTitle>
              <Badge variant="secondary">
                {getAccountRoleLabel(myInfo.role)}
              </Badge>
            </div>
            <CardDescription>{myInfo.studentId}</CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <ProfileItem label="호실" value={`${myInfo.roomNumber}호`} />
            <ProfileItem label="학년" value={`${myInfo.grade}학년`} />
            <ProfileItem label="층" value={`${myInfo.floor}층`} />
            <ProfileItem
              label="예약 상태"
              value={getReservationAccessLabel(myInfo.canReserve)}
            />
            <ProfileItem label="패널티" value={`${myInfo.penaltyCount}회`} />
            <ProfileItem
              label="가입일"
              value={formatKstDateTime(myInfo.createdAt) ?? "-"}
            />
          </CardContent>
        </Card>

        {myInfo.penaltyExpiresAt && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">예약 제한 안내</CardTitle>
              <CardDescription>예약이 제한된 상태입니다.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              제한 해제: {formatKstDateTime(myInfo.penaltyExpiresAt)}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">계정 관리</CardTitle>
            <CardDescription>
              로그아웃하거나 Washer 계정을 탈퇴할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={handleLogout}>
              로그아웃
            </Button>
            <WithdrawAccountDialog />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

interface ProfileItemProps {
  label: string;
  value: string;
}

function ProfileItem({ label, value }: ProfileItemProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

interface MyPageFallbackProps {
  message: string;
  onRetry?: () => void;
}

function MyPageFallback({ message, onRetry }: MyPageFallbackProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">{message}</p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            다시 시도
          </Button>
        )}
      </div>
    </main>
  );
}
