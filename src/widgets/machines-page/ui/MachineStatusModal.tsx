"use client";

import { Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  MACHINE_STATUS_OPTIONS,
  type MachineConditionStatusDTO,
  type MachineItem,
  useDeleteMachine,
  useUpdateMachineStatus,
} from "@/entities/machine";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import MachineDeleteConfirmOverlay from "./MachineDeleteConfirmOverlay";
import MachineStatusOptionButton from "./MachineStatusOptionButton";

interface MachineStatusModalProps {
  machine: MachineItem | null;
  onClose: () => void;
  side?: "left" | "right";
}

export default function MachineStatusModal({
  machine,
  onClose,
  side = "right",
}: MachineStatusModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isOpen = Boolean(machine);
  const panelRef = useRef<HTMLDivElement>(null);

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateMachineStatus();
  const { mutate: deleteMachine, isPending: isDeleting } = useDeleteMachine();

  const isPending = isUpdating || isDeleting;

  useOutsideClick(
    panelRef,
    () => {
      if (!isPending) {
        setShowDeleteConfirm(false);
        onClose();
      }
    },
    isOpen,
  );

  if (!isOpen || !machine) {
    return null;
  }

  const handleStatusUpdate = (status: MachineConditionStatusDTO) => {
    updateStatus(
      { id: machine.id, status },
      {
        onSuccess: () => {
          toast.success(`${machine.name} 상태가 변경되었습니다.`);
          onClose();
        },
        onError: (error) => {
          console.error("Machine status update failed:", error);
          toast.error("상태 변경에 실패했습니다.");
        },
      },
    );
  };

  const handleDelete = () => {
    deleteMachine(machine.id, {
      onSuccess: () => {
        toast.success(`${machine.name}이(가) 삭제되었습니다.`);
        setShowDeleteConfirm(false);
        onClose();
      },
      onError: (error) => {
        console.error("Machine deletion failed:", error);
        toast.error("기기 삭제에 실패했습니다.");
        setShowDeleteConfirm(false);
      },
    });
  };

  const overlayPositionClass =
    side === "right"
      ? "absolute left-[calc(100%+16px)] top-0 h-full w-full"
      : "absolute right-[calc(100%+16px)] top-0 h-full w-full";

  return (
    <div className={`${overlayPositionClass} z-30`}>
      <div
        ref={panelRef}
        className="relative flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-[#FDFDFD] px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200"
      >
        {showDeleteConfirm && (
          <MachineDeleteConfirmOverlay
            machineName={machine.name}
            isDeleting={isDeleting}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}

        <div className="mb-6 flex shrink-0 items-center justify-between">
          <h2 className="text-[18px] font-medium text-[#4A4A4F]">
            {machine.name} 설정
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#A1A1AA] transition hover:bg-[#ECECEC]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
          <p className="mb-1 text-sm text-[#71717A]">상태 변경</p>

          {MACHINE_STATUS_OPTIONS.map((option) => (
            <MachineStatusOptionButton
              key={option.value}
              option={option}
              isSelected={machine.condition === option.value}
              disabled={isPending}
              onClick={handleStatusUpdate}
            />
          ))}

          <div className="mt-4 border-t border-[#E5E7EB] pt-4">
            <p className="mb-3 text-sm text-[#71717A]">관리 도구</p>

            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isPending}
              className="flex w-full items-center gap-3 rounded-xl border-2 border-[#E5E7EB] p-4 text-[#EF4B4F] transition-all hover:border-[#EF4B4F] hover:bg-[#FFF1F1]"
            >
              <Trash2 size={24} />

              <div className="text-left">
                <p className="font-semibold">기기 삭제</p>
                <p className="text-xs text-[#9CA3AF]">
                  시스템에서 기기를 영구적으로 제거합니다.
                </p>
              </div>
            </button>
          </div>
        </div>

        {isPending && !showDeleteConfirm && (
          <div className="mt-4 text-center text-sm text-[#9A9AA0]">
            처리 중...
          </div>
        )}
      </div>
    </div>
  );
}