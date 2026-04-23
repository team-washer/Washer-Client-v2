import type { MachineItem } from "@/entities/machine";
import type { ReservationItem } from "@/entities/reservation";

interface GetMachineReservationInfoParams {
  machine: MachineItem;
  reservations: ReservationItem[];
}

export function getMachineReservationInfo({
  machine,
  reservations,
}: GetMachineReservationInfoParams) {
  const matchingReservation = reservations.find(
    (reservation) => reservation.machineId === machine.id,
  );

  const isUsing = machine.availability === "IN_USE";
  const isReserved = machine.availability === "RESERVED";
  const isUnavailable = machine.availability === "UNAVAILABLE";
  const isMalfunction = machine.condition === "MALFUNCTION";

  return {
    warningMessage:
      isUnavailable || isMalfunction
        ? "기기 고장으로 인해 현재 사용할 수 없습니다."
        : undefined,
    primaryInfo: isUsing
      ? matchingReservation?.remain
      : isReserved
        ? matchingReservation?.reserveAt
        : undefined,
    secondaryInfo: matchingReservation?.deviceStatus ?? machine.deviceStatus,
  };
}
