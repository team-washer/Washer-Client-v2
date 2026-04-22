"use client";

import { History, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import type { MachineItem, MachineConditionStatusDTO } from "@/entities/machine/model/types";
import type { ReservationItem } from "@/entities/reservation/model/types";
import StatusPanelShell from "@/shared/ui/admin/StatusPanelShell";
import MachineStatusModal from "./MachineStatusModal";
import { useMachineReservationInfo } from "@/entities/machine/hooks/useMachineReservationInfo";

interface MachineStatusPanelProps {
  title: string;
  icon: ReactNode;
  machines: MachineItem[];
  reservations?: ReservationItem[];
  side?: "left" | "right";
}

interface MachineRowProps {
  item: MachineItem;
  reservations: ReservationItem[];
  onOpenModal: (machine: MachineItem) => void;
}

function MachineRow({ item, reservations, onOpenModal }: MachineRowProps) {
  const { warningMessage, primaryInfo, secondaryInfo } =
    useMachineReservationInfo({
      machine: item,
      reservations,
    });

  return (
    <div className="rounded-xl border border-[#E9E9EE] bg-white px-4 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[15px] font-medium text-[#4A4A4F]">
            {item.machine}
          </p>

          <div className="mt-2 space-y-1 text-[14px] text-[#71717A]">
            {warningMessage && <p>{warningMessage}</p>}
            {primaryInfo && <p>{primaryInfo}</p>}
            {secondaryInfo && <p>{secondaryInfo}</p>}
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-[#F4F4F5] px-3 py-1 text-sm font-medium text-[#3F3F46]">
          {item.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onOpenModal(item)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E4E7] text-[#52525B] hover:bg-[#FAFAFA]"
        >
          <History size={16} />
        </button>

        <button
          type="button"
          onClick={() => onOpenModal(item)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#F1B5B8] text-[#D11A2A] hover:bg-[#FFF5F5]"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default function MachineStatusPanel({
  title,
  icon,
  machines,
  reservations = [],
}: MachineStatusPanelProps) {
  const [selectedMachine, setSelectedMachine] = useState<MachineItem | null>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<MachineConditionStatusDTO>("NORMAL");

  const handleOpenModal = (machine: MachineItem) => {
    setSelectedMachine(machine);
    setSelectedStatus(machine.status === "고장" ? "MALFUNCTION" : "NORMAL");
  };

  const handleCloseModal = () => {
    setSelectedMachine(null);
    setSelectedStatus("NORMAL");
  };

  const handleUpdateStatus = () => {
    // TODO: useUpdateMachineStatus 연결
    handleCloseModal();
  };

  const handleDelete = () => {
    // TODO: useDeleteMachine 연결
    handleCloseModal();
  };

  return (
    <>
      <StatusPanelShell title={title} icon={icon}>
        {machines.length === 0 ? (
          <div className="flex h-full items-center justify-center py-10 text-sm text-[#8B8B8B]">
            표시할 기기 상태가 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {machines.map((item) => (
              <MachineRow
                key={item.id}
                item={item}
                reservations={reservations}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        )}
      </StatusPanelShell>

      <MachineStatusModal
        machine={selectedMachine}
        selectedStatus={selectedStatus}
        onChangeStatus={setSelectedStatus}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDelete}
        onClose={handleCloseModal}
      />
    </>
  );
}