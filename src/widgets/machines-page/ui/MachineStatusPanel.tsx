"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";
import type { MachineItem, MachineType } from "@/entities/machine";
import MachineStatusBadge from "@/entities/machine/ui/MachineStatusBadge";
import {
  type ReservationItem,
  useGetReservations,
} from "@/entities/reservation";
import { useRemainingTime } from "@/shared/hooks/useRemainingTime";
import StatusPanelShell from "@/shared/ui/admin/StatusPanelShell";
import StatusRowActions from "@/shared/ui/admin/StatusRowActions";
import ReservationHistoryModal from "@/widgets/reservations-page/ui/ReservationHistoryModal";
import { getMachineReservationInfo } from "../lib/getMachineReservationInfo";
import MachineStatusModal from "./MachineStatusModal";

interface MachineStatusPanelProps {
  title: string;
  icon: ReactNode;
  machines: MachineItem[];
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
  machine,
  reservations,
  onHistory,
  onManage,
}: {
  machine: MachineItem;
  reservations: ReservationItem[];
  onHistory: () => void;
  onManage: () => void;
}) {
  const { warningMessage, timeTarget, secondaryInfo } =
    getMachineReservationInfo({
      machine,
      reservations,
    });

  const timeText = useRemainingTime(timeTarget);

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#E9E9EE] py-4 last:border-b-0">
      <div className="flex min-w-0 items-start gap-4">
        <MachineIcon type={machine.type} />

        <div className="min-w-0 flex flex-col justify-center">
          <div className="text-[15px] font-medium text-[#4A4A4F]">
            <p className="truncate">{machine.name}</p>

            {warningMessage ? (
              <p className="mt-1 text-[13px] text-[#EA3B42]">
                {warningMessage}
              </p>
            ) : (
              <>
                {secondaryInfo && machine.availability !== "AVAILABLE" && (
                  <p className="mt-1 text-[13px] text-[#969696]">
                    기기 상태: {secondaryInfo}
                  </p>
                )}

                {timeText && machine.availability === "IN_USE" && (
                  <p className="mt-1 text-[13px] text-[#969696]">
                    남은 시간: {timeText}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <StatusRowActions
        badge={<MachineStatusBadge status={machine.status} />}
        onHistory={onHistory}
        onDelete={onManage}
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
  const [selectedMachine, setSelectedMachine] = useState<MachineItem | null>(
    null,
  );

  const { data: reservations } = useGetReservations();

  return (
    <div className="relative xl:h-full xl:min-h-0">
      <StatusPanelShell title={title} icon={icon}>
        {machines.map((machine) => (
          <MachineRow
            key={machine.id}
            machine={machine}
            reservations={reservations ?? []}
            onHistory={() =>
              setSelectedHistoryMachineName((prev) =>
                prev === machine.name ? null : machine.name,
              )
            }
            onManage={() =>
              setSelectedMachine((prev) =>
                prev?.id === machine.id ? null : machine,
              )
            }
          />
        ))}
      </StatusPanelShell>

      <ReservationHistoryModal
        machineName={selectedHistoryMachineName}
        onClose={() => setSelectedHistoryMachineName(null)}
        side={side}
      />

      <MachineStatusModal
        machine={selectedMachine}
        onClose={() => setSelectedMachine(null)}
        side={side}
      />
    </div>
  );
}
