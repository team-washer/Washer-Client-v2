"use client";

import { useMemo } from "react";
import type { MachineItem } from "../model/types";
import type { ReservationItem } from "@/entities/reservation/model/types";

interface UseMachineReservationInfoParams {
  machine: MachineItem;
  reservations: ReservationItem[];
}

export function useMachineReservationInfo({
  machine,
  reservations,
}: UseMachineReservationInfoParams) {
  return useMemo(() => {
    const matchingReservation = reservations.find(
      (reservation) => reservation.machineId === machine.id,
    );

    const isUsing = machine.status === "사용중";
    const isReserved = machine.status === "예약";

    return {
      matchingReservation,
      isUsing,
      isReserved,
      warningMessage:
        machine.status === "사용 정지"
          ? "기기 고장으로 인해 현재 사용할 수 없습니다."
          : undefined,
      primaryInfo: isUsing
        ? machine.remain
        : isReserved
          ? machine.reserveAt
          : undefined,
      secondaryInfo: machine.deviceStatus,
    };
  }, [machine, reservations]);
}