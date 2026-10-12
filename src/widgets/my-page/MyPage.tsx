"use client";

import { UserRound } from "lucide-react";
import { useGetMyInfo } from "@/entities/user";
import { WithdrawAccountDialog } from "@/features/user/withdraw";
import { AppError } from "@/shared";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import {
  getAccountRoleLabel,
  getReservationAccessLabel,
} from "./lib/accountView";

export default function MyPage() {
  const { data, error, isPending, isError, refetch } = useGetMyInfo();
  const myInfo = data?.data;

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
    <main className="min-h-[calc(100vh-4rem)] bg-[#F8FAFF] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="text-sm font-medium text-[#6487DB]">ACCOUNT</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            마이페이지
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Washer 계정 정보를 확인하고 관리하세요.
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF2FF]">
              <UserRound className="h-7 w-7 text-[#6487DB]" />
            </div>
            <div>
              <CardTitle>{myInfo.name}</CardTitle>
              <p className="mt-1 text-sm text-gray-500">
                {myInfo.studentId} · {getAccountRoleLabel(myInfo.role)}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="학번" value={myInfo.studentId} />
              <InfoRow label="호실" value={`${myInfo.roomNumber}호`} />
              <InfoRow label="학년" value={`${myInfo.grade}학년`} />
              <InfoRow label="기숙사 층" value={`${myInfo.floor}층`} />
              <InfoRow label="패널티 횟수" value={`${myInfo.penaltyCount}회`} />
              <InfoRow
                label="예약 상태"
                value={getReservationAccessLabel(myInfo.canReserve)}
                valueClassName={
                  myInfo.canReserve ? "text-green-600" : "text-red-600"
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardHeader>
            <CardTitle className="text-base">계정 관리</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-gray-900">회원탈퇴</p>
                <p className="mt-1 text-sm text-gray-500">
                  계정과 관련된 데이터가 삭제되며 30일간 재가입이 제한됩니다.
                </p>
              </div>
              <WithdrawAccountDialog />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function InfoRow({
  label,
  value,
  valueClassName = "text-gray-900",
}: InfoRowProps) {
  return (
    <div className="rounded-lg bg-gray-50 px-4 py-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-1 font-medium ${valueClassName}`}>{value}</p>
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
