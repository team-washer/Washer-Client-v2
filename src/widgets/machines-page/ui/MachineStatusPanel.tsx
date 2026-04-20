import Image from "next/image";
import { type ReactNode, useState } from "react";
import type {
  AdminMachineItem,
  MachineType,
} from "@/entities/machine/model/types";
import MachineStatusBadge from "@/entities/machine/ui/MachineStatusBadge";
import { useGetReservationDetail } from "@/entities/reservation/api/useGetReservationDetail";
import StatusPanelShell from "@/shared/ui/admin/StatusPanelShell";
import StatusRowActions from "@/shared/ui/admin/StatusRowActions";
import ReservationHistoryModal from "@/widgets/reservations-page/ui/ReservationHistoryModal";
import MachineStatusModal from "./MachineStatusModal";

interface MachineStatusPanelProps {
  title: string;
  icon: ReactNode;
  machines: AdminMachineItem[];
  side?: "left" | "right";
}

function MachineIcon({ type }: { type: MachineType }) {
  const src =
    type === "WASHER" ? "/icons/washer-drop.svg" : "/icons/dryer-wave.svg";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center translate-y-0.5">
      <Image src={src} alt={type} width={28} height={28} />
    </div>
  );
}

function MachineRow({
  item,
  onHistory,
  onDelete,
}: {
  item: AdminMachineItem;
  onHistory: () => void;
  onDelete: () => void;
}) {
  const isUsing =
    item.availability === "IN_USE" || item.availability === "RESERVED";
  const { data: reservationResponse } = useGetReservationDetail(
    item.id,
    isUsing,
  );
  const reservation = reservationResponse?.data;

  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#E9E9EE] py-4 last:border-b-0">
      <div className="flex min-w-0 items-start gap-4">
        <MachineIcon type={item.type} />

        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium text-[#4A4A4F]">
            {item.name}
          </p>

          {isUsing && reservation && (
            <div className="mt-2 space-y-0.5 rounded-lg bg-[#F8F9FB] p-2.5">
              <p className="text-[13px] text-[#4A4A4F]">
                사용자:{" "}
                <span className="font-semibold">{reservation.userName}</span> (
                {reservation.userRoomNumber}호)
              </p>
              <p className="text-[12px] text-[#969696]">
                완료 예정:{" "}
                {new Date(
                  reservation.expectedCompletionTime,
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}

          {item.availability === "UNAVAILABLE" && (
            <p className="mt-1 text-sm text-[#EA3B42]">
              기기 고장으로 인하여 당분간 사용이 정지됩니다.
            </p>
          )}
        </div>
      </div>

      <StatusRowActions
        badge={
          <MachineStatusBadge
            status={item.status}
            availability={item.availability}
          />
        }
        onHistory={onHistory}
        onDelete={onDelete}
      />
    </div>
  );
}

export default function MachineStatusPanel({
  title,
  icon,
  machines,
  side = "right",
}: MachineStatusPanelProps) {
  const [selectedHistoryMachineName, setSelectedHistoryMachineName] = useState<
    string | null
  >(null);
  const [selectedStatusMachine, setSelectedStatusMachine] =
    useState<AdminMachineItem | null>(null);

  return (
    <div className="relative xl:h-full xl:min-h-0">
      <StatusPanelShell title={title} icon={icon}>
        {machines.map((item) => (
          <MachineRow
            key={item.id}
            item={item}
            onHistory={() => setSelectedHistoryMachineName(item.name)}
            onDelete={() => setSelectedStatusMachine(item)}
          />
        ))}
      </StatusPanelShell>

      <ReservationHistoryModal
        machineName={selectedHistoryMachineName}
        onClose={() => setSelectedHistoryMachineName(null)}
        side={side}
      />

      <MachineStatusModal
        machine={selectedStatusMachine}
        onClose={() => setSelectedStatusMachine(null)}
        side={side}
      />
    </div>
  );
}
