"use client";

import { Bell, LoaderCircle, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import {
  useDeleteAllNotifications,
  useGetNotifications,
  type Notification,
} from "@/entities/notification";
import { EnablePushNotificationsButton } from "@/features/notification/enable-push";
import { AppError } from "@/shared";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

const notificationLabels: Record<Notification["type"], string> = {
  COMPLETION: "완료",
  MALFUNCTION: "이상 감지",
  WARNING: "경고",
  INTERRUPTION: "중단",
  AUTO_CANCELLED: "자동 취소",
  PAUSE_TIMEOUT: "일시정지 초과",
  STARTED: "시작",
  TIMEOUT_WARNING: "취소 경고",
  CANCELLATION_BLOCKED: "예약 차단",
  CANCELLATION_BLOCK_EXTENDED: "예약 차단 연장",
};

export default function NotificationsPage() {
  const notificationsQuery = useGetNotifications();
  const deleteNotifications = useDeleteAllNotifications();
  const notifications = notificationsQuery.data ?? [];

  const handleDeleteAll = useCallback(() => {
    if (notifications.length === 0) return;

    const confirmed = window.confirm("모든 알림을 삭제할까요?");
    if (!confirmed) return;

    deleteNotifications.mutate(undefined, {
      onSuccess: () => {
        toast.success("알림을 모두 삭제했습니다.");
      },
      onError: (error) => {
        toast.error(
          error instanceof AppError
            ? error.message
            : "알림 삭제 중 오류가 발생했습니다.",
        );
      },
    });
  }, [deleteNotifications, notifications.length]);

  if (notificationsQuery.isPending) {
    return <NotificationsFallback message="알림을 불러오는 중..." loading />;
  }

  if (notificationsQuery.isError) {
    return (
      <NotificationsFallback
        message={
          notificationsQuery.error instanceof AppError
            ? notificationsQuery.error.message
            : "알림을 불러오지 못했습니다."
        }
        onRetry={() => {
          void notificationsQuery.refetch();
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6487DB]">INBOX</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              알림
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Washer에서 발생한 알림을 확인하세요.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <EnablePushNotificationsButton />
            <Button
              variant="outline"
              onClick={handleDeleteAll}
              disabled={
                deleteNotifications.isPending || notifications.length === 0
              }
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              {deleteNotifications.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Trash2 />
              )}
              전체 삭제
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-[#6487DB]" />
              알림 목록
              <span className="text-sm font-normal text-gray-500">
                ({notifications.length})
              </span>
            </CardTitle>
            <CardDescription>
              최근 알림은 최대 30개까지 표시됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <div className="py-12 text-center">
                <Bell className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-3 text-sm text-gray-500">
                  새로운 알림이 없습니다.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <article
                    key={notification.id}
                    className="flex gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDF2FF]">
                      <Bell className="h-4 w-4 text-[#6487DB]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {notificationLabels[notification.type]}
                        </p>
                        <time
                          className="text-xs text-gray-400"
                          dateTime={notification.createdAt}
                        >
                          {formatNotificationDate(notification.createdAt)}
                        </time>
                      </div>
                      <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-600">
                        {notification.message}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

interface NotificationsFallbackProps {
  message: string;
  loading?: boolean;
  onRetry?: () => void;
}

function NotificationsFallback({
  message,
  loading = false,
  onRetry,
}: NotificationsFallbackProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="space-y-4 text-center">
        {loading && (
          <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-[#86A9FF]" />
        )}
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

function formatNotificationDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
