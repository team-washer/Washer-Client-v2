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
  const isUnavailable = machine.availability === "UNAVAILABLE";
  const isMalfunction = machine.condition === "MALFUNCTION";

  return {
    warningMessage:
      isUnavailable || isMalfunction
        ? "기기 고장으로 인하여 당분간 사용이 정지됩니다."
        : undefined,
    timeTarget: isUsing
      ? matchingReservation?.expectedCompletionTime
      : undefined,
    secondaryInfo: matchingReservation?.deviceStatus ?? machine.deviceStatus,
  };
}
