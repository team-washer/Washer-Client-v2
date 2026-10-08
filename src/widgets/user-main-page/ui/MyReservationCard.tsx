"use client";

import { Building, Clock, Shirt, Wind, Zap } from "lucide-react";
import {
  getJobStateInfo,
  getMachineTypeFromName,
  type UserMachine,
} from "@/entities/machine";
import {
  getReservedDeadline,
  type MyReservation,
  RESERVED_TIMEOUT_MINUTES,
} from "@/entities/reservation";
import { CancelMyReservationButton } from "@/features/reservation/cancel-my-reservation";
import { formatCountdown } from "@/shared/lib";
import { formatKstClock, parseKstDateTime } from "@/shared/lib/kstDateTime";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

interface MyReservationCardProps {
  reservation: MyReservation;
  machine?: UserMachine;
  isMine: boolean;
  // mount 전에는 null (카운트다운 숨김)
  now: number | null;
}

const statusInfo = {
  RESERVED: {
    color: "bg-yellow-500",
    text: "예약됨",
    description: `${RESERVED_TIMEOUT_MINUTES}분 이내에 기기를 시작해주세요`,
    icon: Clock,
  },
  RUNNING: {
    color: "bg-green-500",
    text: "사용 중",
    description: "현재 사용 중입니다",
    icon: Zap,
  },
} as const;

const getRemainingMs = (
  reservation: MyReservation,
  now: number | null,
): number => {
  if (now === null) return 0;

  if (reservation.status === "RESERVED") {
    const deadline = getReservedDeadline(
      parseKstDateTime(reservation.reservedAt),
    );
    return deadline === null ? 0 : deadline - now;
  }

  const completion = parseKstDateTime(reservation.expectedCompletionTime);
  return completion ? completion.getTime() - now : 0;
};

export default function MyReservationCard({
  reservation,
  machine,
  isMine,
  now,
}: MyReservationCardProps) {
  const type = machine?.type ?? getMachineTypeFromName(reservation.machineName);
  const isWasher = type !== "DRYER";
  const operatingStateInfo = getJobStateInfo(
    isWasher ? "WASHER" : "DRYER",
    machine?.jobState ?? null,
  );
  const status =
    reservation.status === "RUNNING" ? statusInfo.RUNNING : statusInfo.RESERVED;
  const StatusIcon = status.icon;
  const remainingMs = getRemainingMs(reservation, now);

  return (
    <Card className="overflow-hidden border-[#EDF2FF] dark:border-gray-700">
      <CardHeader className="bg-[#F5F8FF] py-3 dark:bg-gray-700">
        <CardTitle className="flex items-center justify-between text-base text-[#6487DB] dark:text-[#86A9FF]">
          <div className="flex items-center">
            {isWasher ? (
              <Shirt className="mr-2 h-5 w-5 text-[#86A9FF]" />
            ) : (
              <Wind className="mr-2 h-5 w-5 text-[#86A9FF]" />
            )}
            {reservation.machineName}
          </div>
          <Badge className={`${status.color} border-0 text-white`}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {status.text}
          </Badge>
        </CardTitle>
        <CardDescription className="text-xs dark:text-gray-400">
          {isWasher ? "세탁기" : "건조기"} 예약
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <div
          className={`mb-3 rounded-md border p-2 ${operatingStateInfo.color}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">{operatingStateInfo.icon}</span>
            <div className="flex-1">
              <div className="text-xs font-medium">
                기기 상태: {operatingStateInfo.text}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {operatingStateInfo.description}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center text-sm">
            <Building className="mr-2 h-4 w-4 text-[#86A9FF]" />
            <span className="text-gray-600 dark:text-gray-400">호실:</span>
            <span className="ml-1 font-medium dark:text-white">
              {reservation.userRoomNumber}
            </span>
          </div>

          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-[#86A9FF]" />
            <span className="text-gray-600 dark:text-gray-400">
              {reservation.status === "RUNNING" ? "시작 시간:" : "예약 시간:"}
            </span>
            <span className="ml-1 font-medium dark:text-white">
              {formatKstClock(
                reservation.status === "RUNNING"
                  ? reservation.startTime
                  : reservation.reservedAt,
              ) ?? "-"}
            </span>
          </div>

          {remainingMs > 0 && (
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-[#86A9FF]" />
              <span className="text-gray-600 dark:text-gray-400">
                남은 시간:
              </span>
              <span className="ml-1 font-medium text-red-600 dark:text-red-400">
                {formatCountdown(remainingMs)}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4 rounded border border-blue-200 bg-blue-50 p-2 dark:border-blue-800 dark:bg-blue-900/20">
          <p className="text-xs text-blue-700 dark:text-blue-400">
            {status.description}
          </p>
        </div>

        {isMine && reservation.status === "RESERVED" && (
          <>
            <Separator className="my-3 dark:bg-gray-700" />
            <CancelMyReservationButton reservationId={reservation.id} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
