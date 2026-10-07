"use client";

import { AlertTriangle, Clock, Home, MapPin, Shirt, Wind } from "lucide-react";
import type { ReactNode } from "react";
import { getJobStateInfo, type UserMachine } from "@/entities/machine";
import type { ReserveBlockReason } from "@/entities/reservation";
import {
  getReserveBlockMessage,
  ReserveMachineButton,
} from "@/features/reservation/reserve-machine";
import { formatCountdown } from "@/shared/lib";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import {
  getMachineCardStatus,
  getPositionCode,
} from "../lib/machineCardStatus";

interface MachineCardProps {
  machine: UserMachine;
  now: number;
  isMyRoomMachine: boolean;
  // 우리 호실 예약이면 예약 만료 시각(epoch ms)
  myRoomReservedDeadline: number | null;
  blockReason: ReserveBlockReason | null | undefined;
  penaltyExpiresAt: string | null;
  // 고장 신고 · 히스토리 버튼 자리
  actions?: ReactNode;
}

export default function MachineCard({
  machine,
  now,
  isMyRoomMachine,
  myRoomReservedDeadline,
  blockReason,
  penaltyExpiresAt,
  actions,
}: MachineCardProps) {
  const status = getMachineCardStatus(machine);
  const operatingStateInfo = getJobStateInfo(machine.type, machine.jobState);
  const isWasher = machine.type === "WASHER";
  const Icon = isWasher ? Shirt : Wind;
  const positionCode = getPositionCode(machine);

  const completionTime = machine.expectedCompletionTime
    ? new Date(machine.expectedCompletionTime).getTime()
    : null;
  const remaining =
    status.key === "IN_USE" && completionTime
      ? {
          label: isWasher ? "세탁 완료까지" : "건조 완료까지",
          ms: completionTime - now,
          tone: "text-yellow-600 dark:text-yellow-400",
        }
      : status.key === "RESERVED" && myRoomReservedDeadline
        ? {
            label: "예약 만료까지",
            ms: myRoomReservedDeadline - now,
            tone: "text-orange-600 dark:text-orange-400",
          }
        : null;

  const showBlockMessage =
    status.key === "AVAILABLE" &&
    blockReason !== null &&
    blockReason !== undefined &&
    blockReason !== "MACHINE_UNAVAILABLE";

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${
        status.key === "AVAILABLE"
          ? "border-green-200 hover:border-green-300 dark:border-green-800"
          : status.key === "BROKEN"
            ? "border-red-200 dark:border-red-800"
            : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon className="h-4 w-4 text-[#86A9FF]" />
            {machine.name}
          </CardTitle>
          <Badge className={`${status.color} border-0 text-xs text-white`}>
            {status.text}
          </Badge>
        </div>
        {positionCode && (
          <CardDescription className="flex items-center gap-1 text-xs">
            <MapPin className="h-3 w-3" />
            {positionCode} 위치
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <div
          className={`rounded-md border p-2 text-xs ${operatingStateInfo.color}`}
        >
          <div className="flex items-center gap-2">
            <span>{operatingStateInfo.icon}</span>
            <div className="flex-1">
              <div className="font-medium">{operatingStateInfo.text}</div>
              <div className="mt-1 text-xs opacity-75">
                {operatingStateInfo.description}
              </div>
            </div>
          </div>
        </div>

        {machine.roomNumber &&
          (status.key === "RESERVED" || status.key === "IN_USE") && (
            <div className="flex items-center gap-2 rounded-md bg-blue-50 p-2 text-sm text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <Home className="h-4 w-4" />
              <span className="font-medium">
                {machine.roomNumber}호 {isMyRoomMachine ? "(내 예약)" : "예약"}
              </span>
            </div>
          )}

        {remaining && remaining.ms > 0 && (
          <div className={`flex items-center gap-2 text-sm ${remaining.tone}`}>
            <Clock className="h-4 w-4" />
            <span>
              {remaining.label}: {formatCountdown(remaining.ms)}
            </span>
          </div>
        )}

        <Separator />

        <div className="flex gap-2">
          {status.key === "AVAILABLE" && (
            <ReserveMachineButton
              machine={machine}
              blockReason={blockReason}
              penaltyExpiresAt={penaltyExpiresAt}
            />
          )}

          {status.key === "BROKEN" && (
            <div className="flex-1 py-2 text-center">
              <p className="text-sm text-red-600 dark:text-red-400">
                고장으로 사용 불가
              </p>
            </div>
          )}

          {(status.key === "RESERVED" ||
            status.key === "IN_USE" ||
            status.key === "CLEANING" ||
            status.key === "UNAVAILABLE") && (
            <Button
              variant="outline"
              disabled
              className="flex-1 cursor-not-allowed bg-transparent py-2 text-sm"
            >
              {isMyRoomMachine
                ? "내 예약"
                : status.key === "CLEANING"
                  ? "통세척 중"
                  : status.key === "UNAVAILABLE"
                    ? "사용 불가"
                    : "사용 중"}
            </Button>
          )}

          {actions}
        </div>

        {showBlockMessage && (
          <div className="text-center text-xs text-orange-600 dark:text-orange-400">
            <AlertTriangle className="mr-1 inline h-3 w-3" />
            {getReserveBlockMessage(blockReason, penaltyExpiresAt)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
